<template>
  <div class="h-screen flex flex-col justify-center p-5">
    <div
      class="flex flex-row justify-center rounded game-screen"
      ref="gamePlay"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import GameScene from "../game-setup/game-scene";
const gamePlay: Ref<HTMLDivElement | undefined> = ref();
useHead({
  title: "Game Play",
});
onMounted(() => {
  const gameConfig = {
    parent: gamePlay.value,
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      expandParent: true,
    },
    width: 800,
    height: 400,
    scene: GameScene,
  };
  new Phaser.Game(gameConfig);
});
</script>
<style scoped>
.game-screen > canvas {
  border-radius: 15px !important;
}
</style>
