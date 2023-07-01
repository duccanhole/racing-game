const GAME_CONFIG = {
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

export default GAME_CONFIG;
