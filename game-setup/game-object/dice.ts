import Phaser from "phaser";
// @ts-ignore
import DiceSpriteSheet from "../../assets/game-object/dice.png";
import gameConfig from "../game-config";
export class Dice {
  context: Phaser.Scene;
  dice: any;
  rollEnded: boolean = true;
  constructor(context: Phaser.Scene) {
    this.context = context;
  }
  load() {
    this.context.load.spritesheet("dice", DiceSpriteSheet, {
      frameWidth: 100,
      frameHeight: 100,
    });
  }
  createObject() {
    this.dice = this.context.add
      .sprite(gameConfig.width / 2, 25, "dice")
      .setScale(0.5)
      .setInteractive();
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
    this.dice.on("pointerdown", () => {
      if (this.rollEnded) {
        this.dice.play("roll", true);
        this.rollEnded = false;
      }
    });
    this.dice.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      if (!this.rollEnded) {
        const val = Math.floor(Math.random() * 6) + 1;
        this.dice.play("roll-" + val);
        this.rollEnded = true;
      }
    });
  }
}
