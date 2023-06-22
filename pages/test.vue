<template>
  <div ref="gameLab" class="h-screen"></div>
</template>
<script lang="ts" setup>
// @ts-nocheck
import { Dice } from "../game-setup/game-object/dice";
import { GameScene } from "../game-setup/game-scene";

const gameLab: Ref<HTMLDivElement | undefined> = ref();
onMounted(() => {
  // let dice;
  // let rollEnded = true;
  const dice = new Dice();
  const gameConfig = {
    parent: gameLab.value,
    type: Phaser.AUTO,
    scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH,
      expandParent: true,
    },
    width: 500,
    height: 500,
    scene: GameScene,
  };
  new Phaser.Game(gameConfig);
});
</script>
