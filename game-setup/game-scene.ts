import gameInit from "./game-init";
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
  gameInit(scene);
}
function update() {
  // @ts-ignore
  const scene: any = this;
}

export default { create, preload, update };
