import initMovement from "./movement";

const mapWidth = 300,
  mapHeight = 300;
var piece: any;
var p1, p2, p3, p4;
function preload() {
  //@ts-ignore
  const scene: any = this;
}
function create() {
  //@ts-ignore
  const scene: any = this;
  // cursor = scene.input.keyboard.createCursorKeys();
  // create a grid map
  scene.add
    .grid(150, 150, mapWidth, mapHeight, 50, 50, 0x00b9f2)
    .setAltFillStyle(0x016fce)
    .setOutlineStyle();
  piece = scene.add.circle(25, 25, 10, 0xffffff);
  p1 = scene.add.circle(600, 25, 10, 0xffffff).setInteractive();
  p2 = scene.add.circle(700, 25, 10, 0xffffff);
  p3 = scene.add.circle(600, 100, 10, 0xffffff);
  p4 = scene.add.circle(700, 100, 10, 0xffffff);
  p1.on("pointerdown", function () {
    console.log("p1 clicked");
  });
  initMovement(scene, piece);
}
function update() {
  // @ts-ignore
  const scene: any = this;
}

export default { create, preload, update };
