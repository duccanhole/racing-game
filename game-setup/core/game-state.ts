export interface IGrid {
  x: number;
  y: number;
  piece?: string | null;
}
export interface IPieceGroup {
  [name: string]: {
    state: "on-board" | "out-board" | "finish";
    startPosition: IGrid;
    finishPosition: IGrid;
    own: "t1" | "t2";
  };
}
export interface INotifyEvt {
  [name: string]: ((data: any) => void) | Function;
}

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export class GameState {
  mapDataGrid: IGrid[];
  pieces: IPieceGroup;
  moveTurn: "t1" | "t2";
  userTurn: "t1" | "t2";
  t1Score: number = 0;
  t2Score: number = 0;
  scoreRank = 85;
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
  /**
   * this function will generate a random number (from 1 - 6) and emit value
   * @returns notify function
   */
  // function handle event user roll dice
  rollDice() {
    // you cant roll current turn is not you turn
    if (this.userTurn !== this.moveTurn) return;
    const val = Math.floor(Math.random() * 6) + 1;
    // const val = parseInt(prompt("enter value test") ?? "1");
    this.onNotifyEvt("roll", val);
  }
  /**
   * use this function to handle event user click piece
   * @param name Piece name
   * @param step Number to move
   * @returns
   */
  // function handle event user click piece
  async movePiece(name: string, step: number) {
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
      const pieceAtFirst = this.mapDataGrid[0].piece ?? "none";
      // if piece at first is owned by opponent, you can kill it
      if (
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
      this.onPieceFinish(name, currentIndex);
      return;
    }
    // the destination postion
    const desPostion = this.mapDataGrid[currentIndex + step];
    // if the destination position has opponent piece, kill it by move that piece to start postion
    if (
      desPostion.piece &&
      this.pieces[desPostion.piece].own !== this.userTurn
    ) {
      const opponentPiece = desPostion.piece;
      // move opponent piece to start position
      console.log(opponentPiece + " was killed");
      const otherP = this.pieces[opponentPiece];
      this.onNotifyEvt("move", {
        name: desPostion.piece,
        position: otherP.startPosition,
      });
      this.updatePosition(null, currentIndex + step);
      this.updateState(opponentPiece, "out-board");
      await sleep(500);
    }
    // move your piece to destination position
    // notifyEvt(name, desPostion);
    this.onNotifyEvt("move", {
      name,
      position: desPostion,
    });
    console.log("move " + name + " to " + (currentIndex + step));
    this.updatePosition(name, currentIndex + step);
    await sleep(500);
    // after move piece to destination, remove store piece at current position
    console.log("clear position of " + name + " at " + currentIndex);
    this.updatePosition(null, currentIndex);
    // and update turn
    this.switchTurn();
  }
  // function handle event piece finish
  async onPieceFinish(name: string, currentIndex: number) {
    this.updateState(name, "finish");
    this.updatePosition(null, currentIndex);
    await sleep(500);
    this.onNotifyEvt("pieceFinish", {
      name,
      position: this.pieces[name].finishPosition,
    });
    // add score to player base on rank of piece
    if (this.pieces[name].own === "t1") this.t1Score += this.scoreRank;
    else this.t2Score += this.scoreRank;
    this.scoreRank -= 10;
    // we also need to check the winner
    // the game ends when all the pieces of one of the two teams reach the finish point
    let isT1Finish = true,
      isT2Finish = true;
    for (const key in this.pieces) {
      const piece = this.pieces[key];
      if (piece.own === "t1" && piece.state !== "finish" && isT1Finish)
        isT1Finish = false;
      if (piece.own === "t2" && piece.state !== "finish" && isT2Finish)
        isT2Finish = false;
    }
    if (isT1Finish || isT2Finish) {
      let winner = "none";
      if (this.t1Score > this.t2Score) winner = "t1";
      else if (this.t1Score < this.t2Score) winner = "t2";
      this.onNotifyEvt("gameFinish", {
        winner,
        score: Math.max(this.t1Score, this.t2Score),
      });
    } else {
      console.log("switch turn after piece finish");
      this.switchTurn();
    }
  }
  /**
   * this function will loop over all piece of current team to check current team can move or not
   * @param val the value return of dice
   * @returns boolean
   */
  // check all piece of your team can move or not
  checkMoveTeam(val: number) {
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
      // this.switchTurn();
      return false;
    }
    return true;
  }
  // function check piece can move with number step or not
  checkMovePiece(name: string, step: number): boolean {
    // you cant move piece if current turn is not your turn
    // or that piece has finished
    if (
      this.pieces[name].own !== this.moveTurn ||
      this.pieces[name].state === "finish"
    )
      return false;
    // we need check piece can move to board or not
    if (this.pieces[name].state === "out-board") {
      // you cant move piece from outside board to board if you dont roll to 6
      if (step !== 6) return false;
      // you also cant move if at first grid has your piece
      const pieceAtFirst = this.mapDataGrid[0]?.piece;
      if (pieceAtFirst) {
        return this.pieces[pieceAtFirst].own !== this.userTurn;
      }
      return true;
    }
    // you also cannot move the piece if it is behind at least 1 piece with distance < step
    const { index } = this.getCurrPosition(name);
    // we only check grid in board, if piece move step > map length, we need skip it.
    let maxPostion = Math.min(this.mapDataGrid.length, index + step);
    for (let i = index + 1; i < maxPostion; i++) {
      const desPostion = this.mapDataGrid[i];
      if (desPostion.piece) return false;
    }
    // if exist a piece that can finish, we dont need to check it anymore
    if (index + step >= this.mapDataGrid.length) return true;
    // if at destination position have your piece, you cant move (because your team can't kill each other)
    return !(
      this.getPiece(this.mapDataGrid[index + step].piece || "")?.own ===
      this.userTurn
    );
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
  // function to notify event to listener event
  onNotifyEvt(eventName: string, data: any = null) {
    if (this.notifyEvt[eventName]) {
      this.notifyEvt[eventName](data);
    }
  }
  setTurn(turn: "t1" | "t2") {
    this.userTurn = turn;
  }
}
