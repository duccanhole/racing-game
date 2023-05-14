import initMovement from "./movement";

const mapWidth = 300,
  mapHeight = 300;
// var piece: any;
var p1, p2, p3, p4;
var p5, p6, p7, p8;
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
  // piece = scene.add.circle(25, 25, 10, 0xffffff);
  // init my piece
  p1 = scene.add.circle(600, 25, 10, 0xffffff).setInteractive();
  p2 = scene.add.circle(700, 25, 10, 0xffffff).setInteractive();
  p3 = scene.add.circle(600, 100, 10, 0xffffff).setInteractive();
  p4 = scene.add.circle(700, 100, 10, 0xffffff).setInteractive();
  // init opponent piece
  p5 = scene.add.circle(600, 150, 10, 0x0000ff).setInteractive();
  p6 = scene.add.circle(700, 150, 10, 0x000ff).setInteractive();
  p7 = scene.add.circle(600, 225, 10, 0x0000ff).setInteractive();
  p8 = scene.add.circle(700, 225, 10, 0x0000ff).setInteractive();
  p1.on("pointerdown", function () {
    console.log("p1 clicked");
  });
  // initMovement(scene, piece);
}
function update() {
  // @ts-ignore
  const scene: any = this;
}

export default { create, preload, update };
