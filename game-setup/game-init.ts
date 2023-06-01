import { GameState, IGrid, IPieceGroup } from "./core/game-state";

const mapData: IGrid[] = [
  //top
  {
    x: 25,
    y: 25,
  },
  {
    x: 25 + 50,
    y: 25,
  },
  {
    x: 25 + 50 * 2,
    y: 25,
  },
  {
    x: 25 + 50 * 3,
    y: 25,
  },
  {
    x: 25 + 50 * 4,
    y: 25,
  },
  // right
  {
    x: 25 + 50 * 5,
    y: 25,
  },
  {
    x: 25 + 50 * 5,
    y: 25 + 50,
  },
  {
    x: 25 + 50 * 5,
    y: 25 + 50 * 2,
  },
  {
    x: 25 + 50 * 5,
    y: 25 + 50 * 3,
  },
  {
    x: 25 + 50 * 5,
    y: 25 + 50 * 4,
  },
  // bottom
  {
    x: 25 + 50 * 5,
    y: 25 + 50 * 5,
  },
  {
    x: 25 + 50 * 4,
    y: 25 + 50 * 5,
  },
  {
    x: 25 + 50 * 3,
    y: 25 + 50 * 5,
  },
  {
    x: 25 + 50 * 2,
    y: 25 + 50 * 5,
  },
  {
    x: 25 + 50,
    y: 25 + 50 * 5,
  },
  // left
  {
    x: 25,
    y: 25 + 50 * 5,
  },
  {
    x: 25,
    y: 25 + 50 * 4,
  },
  {
    x: 25,
    y: 25 + 50 * 3,
  },
  {
    x: 25,
    y: 25 + 50 * 2,
  },
  {
    x: 25,
    y: 25 + 50,
  },
];
const pieceGroup: IPieceGroup = {
  p1: {
    state: "out-board",
    startPosition: {
      x: 600,
      y: 25,
    },
    own: "t1",
  },
  p2: {
    state: "out-board",
    startPosition: {
      x: 700,
      y: 25,
    },
    own: "t1",
  },
  p3: {
    state: "out-board",
    startPosition: {
      x: 600,
      y: 150,
    },
    own: "t2",
  },
  p4: {
    state: "out-board",
    startPosition: {
      x: 700,
      y: 150,
    },
    own: "t2",
  },
};

export default function gameInit(scene: any) {
  let userTurn: "t1" | "t2" = "t1";
  let step = 0;
  // init my piece
  const p1 = scene.add.circle(600, 25, 10, 0xffffff).setInteractive();
  const p2 = scene.add.circle(700, 25, 10, 0xffffff).setInteractive();
  //   const p3 = scene.add.circle(600, 100, 10, 0xffffff).setInteractive();
  //   const p4 = scene.add.circle(700, 100, 10, 0xffffff).setInteractive();
  // init opponent piece
  const p3 = scene.add.circle(600, 150, 10, 0x0000ff).setInteractive();
  const p4 = scene.add.circle(700, 150, 10, 0x000ff).setInteractive();
  //   const p7 = scene.add.circle(600, 225, 10, 0x0000ff).setInteractive();
  //   const p8 = scene.add.circle(700, 225, 10, 0x0000ff).setInteractive();
  // listen event game state emit
  const onRollEvt = (val: number) => {
    console.log("roll: " + val);
    step = val;
  };
  const onMoveEvt = (data: {
    name: string;
    position: { x: number; y: number };
  }) => {
    switch (data.name) {
      case "p1":
        p1.x = data.position.x;
        p1.y = data.position.y;
        break;
      case "p2":
        p2.x = data.position.x;
        p2.y = data.position.y;
        break;
      case "3":
        p3.x = data.position.x;
        p3.y = data.position.y;
        break;
      case "p4":
        p4.x = data.position.x;
        p4.y = data.position.y;
        break;
    }
  };
  const onSwitchEvt = (turnData: "t1" | "t2") => {
    step = 0;
    userTurn = turnData;
  };
  const gameState = new GameState(mapData, pieceGroup, userTurn);
  gameState.registerNotifyEvt({
    roll: onRollEvt,
    move: onMoveEvt,
    switch: onSwitchEvt,
  });
  // create dice
  const dice = scene.add.circle(750, 300, 10, 0xffff00).setInteractive();
  dice.on("pointerdown", () => {
    if (step === 0) gameState.rollDice();
  });
  // add event for piece
  p1.on("pointerdown", () => {
    gameState.movePiece("p1", 6);
  });
  p2.on("pointerdown", () => {
    gameState.movePiece("p2", step);
  });
  p3.on("pointerdown", () => {
    gameState.movePiece("p3", step);
  });
  p4.on("pointerdown", () => {
    gameState.movePiece("p4", step);
  });
}
