
import Phaser from "phaser";
import { GameObject } from ".";
// @ts-ignore
import DiceSpriteSheet from "../../assets/game-object/dice.png";

export class Dice extends GameObject {
  rollEnded: boolean = true;
  constructor(ctx: Phaser.Scene) {
    super(ctx);
  }
  load() {
    this.context.load.spritesheet("dice", DiceSpriteSheet, {
      frameWidth: 100,
      frameHeight: 100,
    });
  }
  create(x: number = 100, y: number = 100) {
    this.sprite = this.context.add
      .sprite(x, y, "dice")
      .setScale(0.5)
      .setInteractive();
    this.sprite.anims.create({
      key: "roll",
      frames: this.context.anims.generateFrameNumbers("dice", {
        start: 1,
        end: 6,
      }),
      frameRate: 5,
    });
    for (let i = 0; i <= 6; i++) {
      this.sprite.anims.create({
        key: "roll-" + i,
        frames: [{ key: "dice", frame: i }],
        frameRate: 10,
      });
    }
    // this.dice.on("pointerdown", () => {
    //   if (this.rollEnded) {
    //     this.dice?.play("roll", true);
    //     this.rollEnded = false;
    //   }
    // });
    // this.dice.on(Phaser.Animations.Events.ANIMATION_COMPLETE, (animation: Phaser.Animations.Animation) => {
    //   console.log(animation.key);
    //   if (!this.rollEnded) {
    //     const val = Math.floor(Math.random() * 6) + 1;
    //     this.dice?.play("roll-" + val);
    //     this.rollEnded = true;
    //   }
    // });
  }
}
