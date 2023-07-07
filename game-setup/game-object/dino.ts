// @ts-ignore
import blueDino from "../../assets/game-object/dino/blue.png";
// @ts-ignore
import greenDino from "../../assets/game-object/dino/green.png";
// @ts-ignore
import redDino from "../../assets/game-object/dino/red.png";
// @ts-ignore
import yellowDino from "../../assets/game-object/dino/yellow.png";

export class Dino {
  private dino: Phaser.GameObjects.Sprite | undefined;
  private context: Phaser.Scene;
  private color: "red" | "blue" | "green" | "yellow";
  constructor(ctx: Phaser.Scene, color: "red" | "blue" | "green" | "yellow") {
    this.context = ctx;
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
  create() {
    this.dino = this.context.add.sprite(100, 100, "dino").setScale(2);
    this.dino.anims.create({
      key: "idle",
      frames: this.context.anims.generateFrameNumbers("dino", {
        start: 1,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });
    this.dino.anims.create({
      key: "move",
      frames: this.context.anims.generateFrameNumbers("dino", {
        start: 5,
        end: 10,
      }),
      frameRate: 10,
    });
    this.dino.play("idle");
  }
  getSpriteSheet() {
    return this.dino;
  }
}
