import Phaser from "phaser";
// @ts-ignore
import DiceSpriteSheet from "../../assets/game-object/dice.png";
export class Dice {
  context: Phaser.Scene;
  obj: any;
  rollEnded: boolean = true;
  constructor(context: Phaser.Scene) {
    this.context = context;
  }
  loadObject() {
    this.context.load.spritesheet("dice", DiceSpriteSheet, {
      frameWidth: 100,
      frameHeight: 100,
    });
  }
  createObject() {
    this.obj = this.context.add.sprite(250, 250, "dice").setInteractive();
    this.context.anims.create({
      key: "roll",
      frames: this.context.anims.generateFrameNumbers("dice", {
        start: 1,
        end: 6,
      }),
      frameRate: 5,
    });
    for (let i = 1; i <= 6; i++) {
      this.context.anims.create({
        key: "roll-" + i,
        frames: [{ key: "dice", frame: i }],
        frameRate: 10,
      });
    }
    this.obj.on("pointerdown", () => {
      if (this.rollEnded) {
        this.obj.play("roll", true);
        this.rollEnded = false;
      }
    });
    this.obj.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      if (!this.rollEnded) {
        const val = Math.floor(Math.random() * 6) + 1;
        this.obj.play("roll-" + val);
        this.rollEnded = true;
      }
    });
  }
}
