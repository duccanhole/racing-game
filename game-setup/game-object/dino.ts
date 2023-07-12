import { GameObject } from ".";
// @ts-ignore
import blueDino from "../../assets/game-object/dino/blue.png";
// @ts-ignore
import greenDino from "../../assets/game-object/dino/green.png";
// @ts-ignore
import redDino from "../../assets/game-object/dino/red.png";
// @ts-ignore
import yellowDino from "../../assets/game-object/dino/yellow.png";

import {
  ANIMS_KEY_ATTACK,
  ANIMS_KEY_HURT,
  ANIMS_KEY_IDLE,
  ANIMS_KEY_MOVE,
} from "../game-variable";

export class Dino extends GameObject {
  // private color: "red" | "blue" | "green" | "yellow";
  private DINO_KEY: string | undefined;
  constructor(ctx: Phaser.Scene) {
    super(ctx);
    // this.color = color;
  }
  load(color: "red" | "blue" | "green" | "yellow") {
    let spritesheet = null;
    switch (color) {
      case "red":
        spritesheet = redDino;
        this.DINO_KEY = "red-dino";
        break;
      case "blue":
        spritesheet = blueDino;
        this.DINO_KEY = "blue-dino";
        break;
      case "green":
        spritesheet = greenDino;
        this.DINO_KEY = "green-dino";
        break;
      case "yellow":
        spritesheet = yellowDino;
        this.DINO_KEY = "yellow-dino";
        break;
    }
    if (spritesheet) {
      this.context.load.spritesheet(this.DINO_KEY, spritesheet, {
        frameWidth: 24,
        frameHeight: 24,
      });
    }
    return this;
  }
  create(x: number = 100, y: number = 100) {
    if (!this.DINO_KEY) return;
    this.sprite = this.context.add
      .sprite(x, y, this.DINO_KEY)
      .setScale(2)
      .setInteractive();
    this.sprite.anims.create({
      key: ANIMS_KEY_IDLE,
      frames: this.context.anims.generateFrameNumbers(this.DINO_KEY, {
        start: 1,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });
    this.sprite.anims.create({
      key: ANIMS_KEY_MOVE,
      frames: this.context.anims.generateFrameNumbers(this.DINO_KEY, {
        start: 5,
        end: 10,
      }),
      frameRate: 10,
    });
    this.sprite.anims.create({
      key: ANIMS_KEY_ATTACK,
      frames: this.context.anims.generateFrameNumbers(this.DINO_KEY, {
        start: 10,
        end: 13,
      }),
      frameRate: 10,
    });
    this.sprite.anims.create({
      key: ANIMS_KEY_HURT,
      frames: this.context.anims.generateFrameNumbers(this.DINO_KEY, {
        start: 13,
        end: 16,
      }),
      frameRate: 10,
    });
    this.sprite.play(ANIMS_KEY_IDLE);
    this.sprite.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.sprite!.play(ANIMS_KEY_IDLE);
    });
    return this;
  }
}
