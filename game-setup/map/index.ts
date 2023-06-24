export default class Map {
  context: Phaser.Scene;
  constructor(ctx: Phaser.Scene) {
    this.context = ctx;
  }
  createMap() {
    this.context.add
      .grid(400, 300, 800, 200, 50, 50, 0x00b9f2)
      .setAltFillStyle(0x016fce)
      .setOutlineStyle();
  }
}
