import Phaser from "phaser";
import { Dice } from "./game-object/dice";
import Map from "./map";
import { GameState, IPieceGroup } from "./core/game-state";

import MAP_GRID_DATA from "../data/map/basic.json";
import { Dino } from "./game-object";
const PIECE_GROUP_DATA: IPieceGroup = {};

export default class GameScene extends Phaser.Scene {
  dice: Dice | undefined;
  map: Map | undefined;
  userTurn: "t1" | "t2" = "t1";
  step: number = 0;
  p1: any;
  p2: any;
  p3: any;
  p4: any;
  preload() {
    this.dice = new Dice(this);
    this.dice.load();
    this.map = new Map(this);
    this.p1 = new Dino(this, "blue").load();
    this.p2 = new Dino(this, "green").load();
    this.p3 = new Dino(this, "red").load();
    this.p3 = new Dino(this, "yellow").load();
  }
  create() {
    this.dice?.create(Number(this.game.config.width) / 2, 25);
    this.map?.createMap();
    const text = this.add
      .text(this.cameras.main.centerX - 30, 75, "Turn: " + this.userTurn)
      .setInteractive();
    // create piece
    // const p1 = this.add.circle(100, 25, 10, 0xffffff).setInteractive();
    this.p1.create(100, 25);
    PIECE_GROUP_DATA.p1 = {
      state: "out-board",
      startPosition: {
        x: 100,
        y: 25,
      },
      finishPosition: {
        x: 100,
        y: 25,
      },
      own: "t1",
    };
    // const p2 = this.add.circle(200, 25, 10, 0xffffff).setInteractive();
    this.p2.create(200, 25);
    PIECE_GROUP_DATA.p2 = {
      state: "out-board",
      startPosition: {
        x: 200,
        y: 25,
      },
      finishPosition: {
        x: 200,
        y: 25,
      },
      own: "t1",
    };
    // const p3 = this.add
    //   .circle(Number(this.game.config.width) - 200, 25, 10, 0x0000ff)
    //   .setInteractive();
    this.p3.create();
    PIECE_GROUP_DATA.p3 = {
      state: "out-board",
      startPosition: {
        x: Number(this.game.config.width) - 200,
        y: 25,
      },
      finishPosition: {
        x: Number(this.game.config.width) - 200,
        y: 25,
      },
      own: "t2",
    };
    const p4 = this.add
      .circle(Number(this.game.config.width) - 100, 25, 10, 0x0000ff)
      .setInteractive();
    PIECE_GROUP_DATA.p4 = {
      state: "out-board",
      startPosition: {
        x: Number(this.game.config.width) - 100,
        y: 25,
      },
      finishPosition: {
        x: Number(this.game.config.width) - 100,
        y: 25,
      },
      own: "t2",
    };
    // listen event game state emit
    const onRollEvt = (val: number) => {
      this.step = val;
    };
    const onMoveEvt = (data: {
      name: string;
      position: { x: number; y: number };
    }) => {
      console.log(
        "move " +
          data.name +
          " to x:" +
          data.position.x +
          " y:" +
          data.position.y
      );
      // switch (data.name) {
      //   case "p1":
      //     p1.x = data.position.x;
      //     p1.y = data.position.y;
      //     break;
      //   case "p2":
      //     p2.x = data.position.x;
      //     p2.y = data.position.y;
      //     break;
      //   case "p3":
      //     p3.x = data.position.x;
      //     p3.y = data.position.y;
      //     break;
      //   case "p4":
      //     p4.x = data.position.x;
      //     p4.y = data.position.y;
      //     break;
      // }
    };
    const onSwitchEvt = (turnData: "t1" | "t2") => {
      this.step = 0;
      this.userTurn = turnData;
      this.dice?.getSprite()?.play("roll-0");
      text.setText("Turn: " + this.userTurn);
    };
    const onPieceFinish = (data: {
      name: string;
      position: { x: number; y: number };
    }) => {
      // switch (data.name) {
      //   case "p1":
      //     p1.x = data.position.x;
      //     p1.y = data.position.y;
      //     break;
      //   case "p2":
      //     p2.x = data.position.x;
      //     p2.y = data.position.y;
      //     break;
      //   case "p3":
      //     p3.x = data.position.x;
      //     p3.y = data.position.y;
      //     break;
      //   case "p4":
      //     p4.x = data.position.x;
      //     p4.y = data.position.y;
      //     break;
      // }
    };
    const onGameFinish = (data: { winner: string; score: number }) => {
      if (data.winner === "none") text.setText("Game draw");
      else {
        text.setText(data.winner + " has won with score: " + data.score);
      }
    };
    const gameState = new GameState(
      MAP_GRID_DATA,
      PIECE_GROUP_DATA,
      this.userTurn
    );
    gameState.registerListenerEvt({
      roll: onRollEvt,
      move: onMoveEvt,
      switch: onSwitchEvt,
      pieceFinish: onPieceFinish,
      gameFinish: onGameFinish,
    });
    this.dice?.getSprite()?.on("pointerdown", () => {
      if (this.step === 0) {
        this.dice?.getSprite()?.play("roll");
        gameState.rollDice();
      }
    });
    this.dice
      ?.getSprite()
      ?.on(
        Phaser.Animations.Events.ANIMATION_COMPLETE,
        (animation: Phaser.Animations.Animation) => {
          if (animation.key === "roll" && this.step !== 0) {
            this.dice?.getSprite()?.play("roll-" + this.step);
            if (gameState.checkMoveTeam(this.step)) {
              text.setText(this.userTurn + " move");
            } else {
              text.setText(this.userTurn + " can't move");
              setTimeout(() => {
                gameState.switchTurn();
              }, 2000);
            }
          }
        }
      );
    // p1.on("pointerdown", () => {
    //   if (this.step !== 0) gameState.movePiece("p1", this.step);
    // });
    // p2.on("pointerdown", () => {
    //   if (this.step !== 0) gameState.movePiece("p2", this.step);
    // });
    // p3.on("pointerdown", () => {
    //   if (this.step !== 0) gameState.movePiece("p3", this.step);
    // });
    // p4.on("pointerdown", () => {
    //   if (this.step !== 0) gameState.movePiece("p4", this.step);
    // });
  }
  update() {}
}
