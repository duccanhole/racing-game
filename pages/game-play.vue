<template>
  <div class="h-screen flex flex-col justify-center p-5">
    <div
      class="flex flex-row justify-center rounded game-screen"
      ref="gamePlay"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import { GameScene } from "../game-setup/game-scene";
import gameConfig from "../game-setup/game-config";
const gamePlay: Ref<HTMLDivElement | undefined> = ref();
useHead({
  title: "Game Play",
});
onMounted(() => {
  const config = {
    parent: gamePlay.value,
    scene: GameScene,
    ...gameConfig,
  };
  new Phaser.Game(config);
});
</script>
<style scoped>
.game-screen > canvas {
  border-radius: 15px !important;
}
</style>
