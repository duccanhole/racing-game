import Phaser from "phaser";
import { Dice } from "./game-object/dice";
import Map from "./map";
import { GameState, IPieceGroup } from "./core/game-state";

import MAP_GRID_DATA from "../data/map/basic.json";
import { Dino, GameObject } from "./game-object";

const PIECE_GROUP_DATA: IPieceGroup = {};

export default class GameScene extends Phaser.Scene {
  [key: string]: any;
  dice: Dice | undefined;
  map: Map | undefined;
  userTurn: "t1" | "t2" = "t1";
  step: number = 0;
  p1: GameObject | undefined;
  p2: GameObject | undefined;
  p3: GameObject | undefined;
  p4: GameObject | undefined;
  gameController: GameState | undefined;
  preload() {
    this.dice = new Dice(this);
    this.dice.load();
    this.map = new Map(this);
    this.p1 = new Dino(this).load("blue");
    this.p2 = new Dino(this).load("green");
    this.p3 = new Dino(this).load("red");
    this.p4 = new Dino(this).load("yellow");

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
    this.gameController = new GameState(
      MAP_GRID_DATA,
      PIECE_GROUP_DATA,
      this.userTurn
    );
    this.gameController.registerListenerEvt({
      roll: this.onRollEvt,
      move: this.onMoveEvt,
      switch: this.onSwitchEvt,
      pieceFinish: this.onPieceFinish,
      gameFinish: this.onPieceFinish,
    });
  }
  onRollEvt(val: number) {
    console.log("set value of step line 93 is " + val);
    this.step = val;
  }
  onMoveEvt(data: { name: string; from: number; to: number }) {
    console.log(this[data.name] as GameObject);
  }
  onSwitchEvt(turnData: "t1" | "t2") {
    this.step = 0;
    this.userTurn = turnData;
    this.dice?.getSprite()?.play("roll-0");
    // text.setText("Turn: " + this.userTurn);
  }
  onGameFinish(data: { winner: string; score: number }) {}
  onPieceFinish(name: string) {}
  create() {
    this.dice?.create(Number(this.game.config.width) / 2, 25);
    this.map?.createMap();
    const text = this.add
      .text(this.cameras.main.centerX - 30, 75, "Turn: " + this.userTurn)
      .setInteractive();
    // create piece
    this.p1?.create(100, 25);
    this.p2?.create(200, 25);
    this.p3?.create(Number(this.game.config.width) - 200, 25);
    this.p3!.getSprite()!.flipX = true;
    this.p4?.create(Number(this.game.config.width) - 100, 25);
    this.p4!.getSprite()!.flipX = true;
    const onMoveEvt = (data: { name: string; from: number; to: number }) => {
      // console.log(
      //   "move " +
      //     data.name +
      //     " to x:" +
      //     data.position.x +
      //     " y:" +
      //     data.position.y
      // );
      console.log(data);
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
    // const onSwitchEvt = (turnData: "t1" | "t2") => {
    //   this.step = 0;
    //   this.userTurn = turnData;
    //   this.dice?.getSprite()?.play("roll-0");
    //   text.setText("Turn: " + this.userTurn);
    // };
    // const onPieceFinish = (data: {
    //   name: string;
    //   position: { x: number; y: number };
    // }) => {
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
    // };
    // const onGameFinish = (data: { winner: string; score: number }) => {
    //   if (data.winner === "none") text.setText("Game draw");
    //   else {
    //     text.setText(data.winner + " has won with score: " + data.score);
    //   }
    // };
    // const gameState = new GameState(
    //   MAP_GRID_DATA,
    //   PIECE_GROUP_DATA,
    //   this.userTurn
    // );
    // gameState.registerListenerEvt({
    //   roll: this.onRollEvt,
    //   move: onMoveEvt,
    //   switch: onSwitchEvt,
    //   pieceFinish: onPieceFinish,
    //   gameFinish: onGameFinish,
    // });
    this.dice?.getSprite()?.on("pointerdown", () => {
      if (this.step === 0) {
        this.dice?.getSprite()?.play("roll");
        this.gameController?.rollDice();
      }
    });
    this.dice
      ?.getSprite()
      ?.on(
        Phaser.Animations.Events.ANIMATION_COMPLETE,
        (animation: Phaser.Animations.Animation) => {
          console.log(this.step, " line  206");
          if (animation.key === "roll" && this.step !== 0) {
            this.dice?.getSprite()?.play("roll-" + this.step);
            if (this.gameController?.checkMoveTeam(this.step)) {
              text.setText(this.userTurn + " move");
            } else {
              text.setText(this.userTurn + " can't move");
              setTimeout(() => {
                this.gameController?.switchTurn();
              }, 2000);
            }
          }
        }
      );

    // listen event click for all piece
    ["p1", "p2", "p3", "p4"].forEach((p) => {
      (this[p] as GameObject).getSprite()?.on("pointerdown", () => {
        if (this.step !== 0) this.gameController?.movePiece(p, this.step);
      });
    });
  }
  update() {}
}
