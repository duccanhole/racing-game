<template>
  <div ref="gameLab" class="h-screen"></div>
</template>
<script lang="ts" setup>
import { Cheems } from "../game-setup/game-object";

const gameLab: Ref<HTMLDivElement | undefined> = ref();
onMounted(() => {
  let cheems: Cheems;
  const gameConfig = {
    parent: gameLab.value,
    type: Phaser.AUTO,
    scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH,
      expandParent: true,
    },
    width: 500,
    height: 500,
    scene: {
      preload() {
        cheems = new Cheems(this as any);
        cheems.load();
      },
      create() {
        cheems.create();
        const b1 = this.add.circle(300, 25, 10, 0xffffff).setInteractive();
        const b2 = this.add.circle(300, 50, 10, 0xff0000).setInteractive();
        const b3 = this.add.circle(300, 75, 10, 0x0000ff).setInteractive();
        b1.on("pointerdown", () => {
          cheems.getSprite()?.play("default");
        });
        b2.on("pointerdown", () => {
          cheems.getSprite()?.play("attack");
        });
        b3.on("pointerdown", () => {
          cheems.getSprite()?.play("beaten");
        });
      },
      update() {},
    },
  };
  new Phaser.Game(gameConfig);
});
</script>
