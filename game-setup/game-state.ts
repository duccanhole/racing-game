interface IGrid {
  x: number;
  y: number;
  piece: string | null;
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
  movePiece(name: string, step: number, notifyEvt: (name: string, position: IGrid)=>void){
    
  }
  // logic check piece can move
  // when move turn is your
  // when no piece of your team in new position
  // when opponent piece in new position
  checkMovePiece(name: string): boolean {
    if(this.pieces[name].own !== this.moveTurn) return false;
    return false
  }
}
