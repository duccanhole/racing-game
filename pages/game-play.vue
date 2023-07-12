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
import { GAME_CONFIG } from "../game-setup/game-variable";
const gamePlay: Ref<HTMLDivElement | undefined> = ref();
useHead({
  title: "Game Play",
});
onMounted(() => {
  const config = {
    parent: gamePlay.value,
    scene: GameScene,
    ...GAME_CONFIG,
  };
  new Phaser.Game(config);
});
</script>
