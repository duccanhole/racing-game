export class GameObject {
  context: Phaser.Scene;
  sprite: Phaser.GameObjects.Sprite | undefined;
  constructor(ctx: Phaser.Scene) {
    this.context = ctx;
  }
  load(): void {}
  create(): void {}
  getSprite(): Phaser.GameObjects.Sprite | undefined {
    return this.sprite;
  }
}
