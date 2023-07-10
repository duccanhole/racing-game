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
  private color: "red" | "blue" | "green" | "yellow";
  constructor(ctx: Phaser.Scene, color: "red" | "blue" | "green" | "yellow") {
    super(ctx);
    this.color = color;
  }
  load() {
    let spritesheet = null;
    switch (this.color) {
      case "red":
        spritesheet = redDino;
        break;
      case "blue":
        spritesheet = blueDino;
        break;
      case "green":
        spritesheet = greenDino;
        break;
      case "yellow":
        spritesheet = yellowDino;
        break;
    }
    if (spritesheet)
      this.context.load.spritesheet("dino", spritesheet, {
        frameWidth: 24,
        frameHeight: 24,
      });
  }
  create(x: number = 100, y: number = 100) {
    this.sprite = this.context.add
      .sprite(x, y, "dino")
      .setScale(2)
      .setInteractive();
    this.sprite.anims.create({
      key: ANIMS_KEY_IDLE,
      frames: this.context.anims.generateFrameNumbers("dino", {
        start: 1,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });
    this.sprite.anims.create({
      key: ANIMS_KEY_MOVE,
      frames: this.context.anims.generateFrameNumbers("dino", {
        start: 5,
        end: 10,
      }),
      frameRate: 10,
    });
    this.sprite.anims.create({
      key: ANIMS_KEY_ATTACK,
      frames: this.context.anims.generateFrameNumbers("dino", {
        start: 10,
        end: 13,
      }),
      frameRate: 10,
    });
    this.sprite.anims.create({
      key: ANIMS_KEY_HURT,
      frames: this.context.anims.generateFrameNumbers("dino", {
        start: 13,
        end: 16,
      }),
      frameRate: 10,
    });
    this.sprite.play(ANIMS_KEY_IDLE);
    this.sprite.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.sprite!.play("idle");
    });
  }
}
