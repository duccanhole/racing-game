// @ts-ignore
import CheemsSpriteSheet from "../../assets/game-object/cheems.png";

export class Cheems {
  private cheems: Phaser.GameObjects.Sprite | undefined;
  private context: Phaser.Scene;
  constructor(ctx: Phaser.Scene) {
    this.context = ctx;
  }
  load() {
    this.context.load.spritesheet("cheems", CheemsSpriteSheet, {
      frameWidth: 100,
      frameHeight: 100,
    });
  }
  create() {
    this.cheems = this.context.add.sprite(100, 100, "cheems").setInteractive();
    // create animation
    this.cheems.anims.create({
      key: "active",
      frames: this.context.anims.generateFrameNumbers("cheems", {
        start: 3,
        end: 4,
      }),
      frameRate: 10,
    });
    this.cheems.anims.create({
      key: "default",
      frames: [{ key: "cheems", frame: 0 }],
      frameRate: 10,
      repeat: -1,
    });
    this.cheems.anims.create({
      key: "attack",
      frames: [0, 5, 6, 7, 8, 0].map((i) => ({ key: "cheems", frame: i })),
      frameRate: 10,
      repeat: 0,
    });
    this.cheems.anims.create({
      key: "beaten",
      frames: [0, 1, 2, 0].map((i) => ({ key: "cheems", frame: i })),
      frameRate: 10,
      repeat: 0,
    });
    // action
    this.cheems.on("pointerover", () => {
      this.cheems?.play("active");
    });
    this.cheems.on("pointerout", () => {
      this.cheems?.play("default");
    });
    // this.cheems.on("pointerdown", () => {
    //   this.cheems?.play("attack");
    // });
  }
  getSprite() {
    return this.cheems;
  }
}
