export interface IGrid {
  x: number;
  y: number;
  piece?: string | null;
}
export interface IPieceGroup {
  [name: string]: {
    state: "on-board" | "out-board" | "finish";
    startPosition: IGrid;
    own: "t1" | "t2";
  };
}
export class GameState {
  mapDataGrid: IGrid[];
  pieces: IPieceGroup;
  moveTurn: "t1" | "t2";
  userTurn: "t1" | "t2";
  constructor(
    mapDataGrid: IGrid[],
    pieces: IPieceGroup,
    userTurn: "t1" | "t2",
    firstTurn: "t1" | "t2" = "t1"
  ) {
    this.mapDataGrid = mapDataGrid;
    this.pieces = pieces;
    this.moveTurn = firstTurn;
    this.userTurn = userTurn;
  }
  // function handle event user roll dice
  rollDice(notifyEvt: (value: number) => void) {
    // you cant roll current turn is not you turn
    if (this.userTurn !== this.moveTurn) return;
    const val = Math.floor(Math.random() * 6) + 1;
    notifyEvt(val);
    // check all piece of user can move or not; if not, update turn
    let check = false;
    for (const p in this.pieces) {
      if (this.checkMovePiece(p, val)) {
        check = true;
        break;
      }
    }
    if (!check) {
      this.switchTurn();
    }
  }
  // function handle event user click piece
  movePiece(
    name: string,
    step: number,
    notifyEvt: (name: string, position: IGrid) => void
  ) {
    // check user rolled or not
    if (step === 0) return;
    // check your piece you clicked can move or not
    if (this.checkMovePiece(name, step) === false) return;
    const p = this.pieces[name];
    // if user roll dice to 6, move piece to first grid
    if (p.state === "out-board" && step === 6) {
      p.state = "on-board";
      notifyEvt(name, this.mapDataGrid[0]);
      this.updatePosition(name, 0);
      return;
    }
    // the current postion of piece
    const { index: currentIndex } = this.getCurrPosition(name);
    // the destination postion
    const desPostion = this.mapDataGrid[currentIndex + step];
    // if the destination position has opponent piece, kill it by move that piece to start postion
    if (desPostion.piece) {
      // move opponent piece to start position
      const otherP = this.pieces[desPostion.piece];
      notifyEvt(desPostion.piece, otherP.startPosition);
      this.updatePosition(null, currentIndex + step);
    }
    // move your piece to destination position
    notifyEvt(name, desPostion);
    this.updatePosition(name, currentIndex + step);
    // after move piece to destination, remove store piece at current position
    this.updatePosition(null, currentIndex);
    // and update turn
    this.switchTurn();
  }
  // function check piece can move with number step or not
  checkMovePiece(name: string, step: number): boolean {
    // you cant move piece if current turn is not your turn
    if (this.pieces[name].own !== this.moveTurn) return false;
    // you also cant move piece if the destination position has your piece
    const { index } = this.getCurrPosition(name);
    const desPostion = this.mapDataGrid[index + step];
    if (desPostion.piece) {
      const ownerPiece = this.getPiece(desPostion.piece).own;
      if (ownerPiece === this.userTurn) return false;
    }
    return true;
  }
  getPiece(name: string) {
    return this.pieces[name];
  }
  updatePosition(name: string | null, index: number) {
    this.mapDataGrid[index].piece = name;
  }
  getCurrPosition(name: string) {
    const index = this.mapDataGrid.findIndex((p) => p.piece === name);
    return { index, postion: this.mapDataGrid[index] };
  }
  switchTurn() {
    this.moveTurn = this.moveTurn === "t1" ? "t2" : "t1";
  }
}
