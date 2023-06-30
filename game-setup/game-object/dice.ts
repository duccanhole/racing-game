import Phaser from "phaser";
// @ts-ignore
import DiceSpriteSheet from "../../assets/game-object/dice.png";
export class Dice {
  context: Phaser.Scene;
  dice: Phaser.GameObjects.Sprite | undefined;
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
  create() {
    this.dice = this.context.add
      .sprite(Number(this.context.game.config.width) / 2, 25, "dice")
      .setScale(0.5)
      .setInteractive();
    this.dice.anims.create({
      key: "roll",
      frames: this.context.anims.generateFrameNumbers("dice", {
        start: 1,
        end: 6,
      }),
      frameRate: 5,
    });
    for (let i = 0; i <= 6; i++) {
      this.dice.anims.create({
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
  getSprite() {
    return this.dice;
  }
}
