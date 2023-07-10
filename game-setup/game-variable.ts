// game config
export const GAME_CONFIG = {
  type: Phaser.AUTO,
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    expandParent: true,
  },
  physics: {
    default: "matter",
    matter: {
      debug: true,
    },
  },
  width: 800,
  height: 400,
};
// animation key
export const ANIMS_KEY_IDLE = "idle";
export const ANIMS_KEY_MOVE = "move";
export const ANIMS_KEY_ATTACK = "attack";
export const ANIMS_KEY_HURT = "hurt";
// helper function
export function sleep(time: number) {
  return new Promise((resolve) => setTimeout(() => resolve(true), time));
}
