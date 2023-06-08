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
export interface INotifyEvt {
  [name: string]: ((data: any) => void) | Function;
}
export class GameState {
  mapDataGrid: IGrid[];
  pieces: IPieceGroup;
  moveTurn: "t1" | "t2";
  userTurn: "t1" | "t2";
  notifyEvt: INotifyEvt = {};
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
  registerListenerEvt(notifyEvt: INotifyEvt) {
    this.notifyEvt = notifyEvt;
  }
  // function handle event user roll dice
  rollDice() {
    // you cant roll current turn is not you turn
    if (this.userTurn !== this.moveTurn) return;
    // const val = Math.floor(Math.random() * 6) + 1;
    const val = parseInt(prompt("enter value test") ?? "1");
    console.log("roll:" + val + " turn: " + this.userTurn);
    // check all piece of user can move or not; if not, update turn
    let check = false;
    let isAllPieceOutBoard = true;
    for (const p in this.pieces) {
      if (this.checkMovePiece(p, val) && !check) {
        check = true;
      }
      if (
        isAllPieceOutBoard &&
        this.pieces[p].own === this.moveTurn &&
        this.pieces[p].state === "on-board"
      ) {
        isAllPieceOutBoard = false;
      }
    }
    // user can not move if roll to value not equal 6, and all pieces out board
    if (!check || (val !== 6 && isAllPieceOutBoard)) {
      console.log("you cant move this turn");
      console.log(check, " line 61");
      this.switchTurn();
      return;
    }
    this.onNotifyEvt("roll", val);
  }
  // function handle event user click piece
  movePiece(name: string, step: number) {
    // check user rolled or not
    if (step === 0) return;
    // check your piece you clicked can move or not
    if (this.checkMovePiece(name, step) === false) {
      console.log(name + " cant move");
      return;
    }
    const p = this.pieces[name];
    // if user roll dice to 6, move piece to first grid
    if (p.state === "out-board" && step === 6) {
      // but if at first grid has your piece, you cant move that piece which you have choosen
      const pieceAtFirst = this.mapDataGrid[0].piece ?? "none";
      if (
        this.pieces[pieceAtFirst] &&
        this.pieces[pieceAtFirst].own === this.userTurn
      )
        return;
      // else piece at first is owned by opponent, you can kill it
      else if (
        this.pieces[pieceAtFirst] &&
        this.pieces[pieceAtFirst].own !== this.userTurn
      ) {
        console.log(pieceAtFirst + " was killed");
        this.onNotifyEvt("move", {
          name: pieceAtFirst,
          position: this.pieces[pieceAtFirst].startPosition,
        });
        this.updatePosition(null, 0);
        this.updateState(pieceAtFirst, "out-board");
      }
      console.log("move " + name + " to " + 0);
      this.updateState(name, "on-board");
      this.updatePosition(name, 0);
      this.onNotifyEvt("move", {
        name,
        position: this.mapDataGrid[0],
      });
      this.switchTurn();
      return;
    }
    // the current postion of piece
    const { index: currentIndex } = this.getCurrPosition(name);
    // check piece can finish or not
    if (currentIndex + step >= this.mapDataGrid.length - 1) {
      console.log(name + " has finished");
      this.updateState(name, "finish");
      this.updatePosition(null, currentIndex);
      this.onNotifyEvt("finish", name);
      return;
    }
    // the destination postion
    const desPostion = this.mapDataGrid[currentIndex + step];
    // if the destination position has opponent piece, kill it by move that piece to start postion
    if (
      desPostion.piece &&
      this.pieces[desPostion.piece].own !== this.userTurn
    ) {
      // move opponent piece to start position
      console.log(desPostion.piece + " was killed");
      const otherP = this.pieces[desPostion.piece];
      this.onNotifyEvt("move", {
        name: desPostion.piece,
        postion: otherP.startPosition,
      });
      this.updatePosition(null, currentIndex + step);
      this.updateState(desPostion.piece, "on-board");
    }
    // move your piece to destination position
    // notifyEvt(name, desPostion);
    this.onNotifyEvt("move", {
      name,
      position: desPostion,
    });
    console.log("move " + name + " to " + (currentIndex + step));
    this.updatePosition(name, currentIndex + step);
    // after move piece to destination, remove store piece at current position
    console.log("clear position of " + name + " at " + currentIndex);
    this.updatePosition(null, currentIndex);
    // and update turn
    this.switchTurn();
  }
  // function check piece can move with number step or not
  checkMovePiece(name: string, step: number): boolean {
    // ypu cant move piece from outside board to board if you dont roll to 6
    if (this.pieces[name].state === "out-board") return step === 6;
    // you cant move piece if current turn is not your turn
    if (this.pieces[name].own !== this.moveTurn) return false;
    // you also cannot move the piece if it is behind at least 1 of your pieces with distance <= step
    const { index } = this.getCurrPosition(name);
    for (let i = index; i <= index + step; i++) {
      const desPostion = this.mapDataGrid[i];
      if (desPostion.piece) {
        const ownerPiece = this.getPiece(desPostion.piece).own;
        if (ownerPiece === this.userTurn) return false;
      }
    }
    return true;
  }
  getPiece(name: string) {
    return this.pieces[name];
  }
  updatePosition(name: string | null, index: number) {
    if (name) this.mapDataGrid[index].piece = name;
    else {
      if (this.mapDataGrid[index].piece) delete this.mapDataGrid[index].piece;
    }
  }
  updateState(name: string, state: "on-board" | "out-board" | "finish") {
    this.pieces[name].state = state;
  }
  getCurrPosition(name: string) {
    const index = this.mapDataGrid.findIndex((p) => p.piece === name);
    return { index, postion: this.mapDataGrid[index] };
  }
  switchTurn() {
    this.moveTurn = this.moveTurn === "t1" ? "t2" : "t1";
    this.onNotifyEvt("switch", this.moveTurn);
    //this is for testing, need remove in release
    this.setTurn(this.moveTurn);
  }
  onNotifyEvt(eventName: string, data: any = null) {
    if (this.notifyEvt[eventName]) {
      this.notifyEvt[eventName](data);
    }
  }
  setTurn(turn: "t1" | "t2") {
    this.userTurn = turn;
  }
}
// BUG DETECT: when a piece kill oponenent at first grid; it cant move next turn
