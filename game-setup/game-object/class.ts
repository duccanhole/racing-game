export class GameObject {
  protected context: Phaser.Scene;
  protected sprite: Phaser.GameObjects.Sprite | undefined;
  constructor(ctx: Phaser.Scene) {
    this.context = ctx;
  }
  load(...args: any) {
    throw new Error("Method not implemented.");
  }
  create(...args: any) {
    throw new Error("Method not implemented.");
  }
  getSprite(): Phaser.GameObjects.Sprite | undefined {
    return this.sprite;
  }
}
