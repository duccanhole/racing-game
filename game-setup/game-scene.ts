var piece: any;
var cursor: any;
function create() {
  //@ts-ignore
  const scene: any = this;
  cursor = scene.input.keyboard.createCursorKeys();
  const g2 = scene.add
    .grid(100, 100, 500, 200, 50, 50, 0x00b9f2)
    .setAltFillStyle(0x016fce)
    .setOutlineStyle();
  piece = scene.add.circle(100, 100, 10, 0x6666ff);
}
function preload() {}
function update() {
  // @ts-ignore
  const scene: any = this;
  if (cursor.left.isDown && piece.x > 0) {
    piece.x -= 5;
  } else if (cursor.right.isDown && piece.x < scene.game.config.width) {
    piece.x += 5;
  }

  if (cursor.up.isDown && piece.y > 0) {
    piece.y -= 5;
  } else if (cursor.down.isDown && piece < scene.game.config.height) {
    piece.y += 5;
  }
}

export default { create, preload, update };
