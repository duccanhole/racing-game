// @ts-ignore
import DiceSpriteSheet from "../../assets/game-object/dice.png";

export class Dice {
  preloadContext: any;
  createContext: any;
  updateContext: any;
  obj: any;
  rollEnded: boolean = true;
  constructor() {}
  addContextPreload(preloadContext: any) {
    this.preloadContext = preloadContext;
  }
  addContextCreate(createContext: any) {
    this.createContext = createContext;
  }
  loadObject() {
    if (this.preloadContext) {
      this.preloadContext.load.spritesheet("dice", DiceSpriteSheet, {
        frameWidth: 100,
        frameHeight: 100,
      });
    }
  }
  createObject() {
    if (this.createContext) {
      this.obj = this.createContext.add
        .sprite(250, 250, "dice")
        .setInteractive();
      this.createContext.anims.create({
        key: "roll",
        frames: this.createContext.anims.generateFrameNumbers("dice", {
          start: 1,
          end: 6,
        }),
        frameRate: 5,
        repeate: -1,
      });
      for (let i = 1; i <= 6; i++) {
        this.createContext.anims.create({
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
}
