interface IGrid {
  x: number;
  y: number;
  piece?: string;
}
interface IPieceGroup {
  [name: string]: {
    state: "on-board" | "out-board";
    startPosition: IGrid;
    own: "t1" | "t2";
  };
}
export default class GameState {
  mapDataGrid: IGrid[];
  pieces: IPieceGroup;
  moveTurn: "t1" | "t2";
  constructor(
    mapDataGrid: IGrid[],
    pieces: IPieceGroup,
    firstTurn: "t1" | "t2"
  ) {
    this.mapDataGrid = mapDataGrid;
    this.pieces = pieces;
    this.moveTurn = firstTurn;
  }
  // logic when click to move an piece
  // only move when move turn is your
  // if piece is out board, move to first grid
  // in normal, piece will move by set new position = current grid + step
  // if new position has opponent piece, kill it (move opponent piece to start and set move).
  // if piece reach to the finish point, remove piece and add score for player.
  // when an piece move success, update move turn.
  movePiece(
    name: string,
    step: number,
    notifyEvt: (name: string, position: IGrid) => void
  ) {
    // check piece can move or not
    if (this.checkMovePiece(name, step) === false) return;
    const p = this.pieces[name];
    let newPosition: IGrid;
    // if user roll dice to 6, move piece to first grid
    if (p.state === "out-board" && step === 6) {
      newPosition = {
        x: this.mapDataGrid[0].x,
        y: this.mapDataGrid[0].y,
        piece: name,
      };
      p.state = "on-board";
      notifyEvt(name, this.mapDataGrid[0]);
      this.updatePosition(name, 0);
      return;
    }
    // the current postion of piece
    const { index: currentIndex, postion: currPosition } =
      this.getCurrPosition(name);
    // the destination postion
    const desPostion = this.mapDataGrid[currentIndex + step];
    // if the destination position has opponent piece, kill it by move that piece to start postion
    if(desPostion.piece) {
      
    }
  }
  // logic check piece can move
  // when move turn is your
  // when no piece of your team in new position
  // when opponent piece in new position
  checkMovePiece(name: string, step: number): boolean {
    if (this.pieces[name].own !== this.moveTurn) return false;
    return true;
  }
  getPiece(name: string) {
    return this.pieces[name];
  }
  updatePosition(name: string, index: number) {
    this.mapDataGrid[index].piece = name;
  }
  getCurrPosition(name: string) {
    // return this.mapDataGrid.find((p) => p.piece === name);
    const index = this.mapDataGrid.findIndex((p) => p.piece === name);
    return { index, postion: this.mapDataGrid[index] };
  }
}
