<template>
  <div ref="gameLab" class="h-screen"></div>
</template>
<script lang="ts" setup>
import Phaser from "phaser";
import { Dino } from "../game-setup/game-object";

const gameLab: Ref<HTMLDivElement | undefined> = ref();
onMounted(() => {
  let dino: Dino;
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
        dino = new Dino(this as any, "red");
        dino.load();
      },
      create() {
        dino.create();
        this.input.keyboard.on("keydown", (e) => {
          if (e.code === "ArrowRight") {
            dino.getSpriteSheet()?.play("move");
            dino.getSpriteSheet()!.x += 5;
          }
        });
      },
      update() {},
    },
  };
  new Phaser.Game(gameConfig);
});
</script>
