<template>
  <div class="h-screen flex flex-col justify-center">
    <div class="flex flex-row justify-center" ref="gamePlay"></div>
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
    width: 800,
    height: 400,
    backgroundColor: "red",
    scene: GameScene,
  };
  new Phaser.Game(gameConfig);
});
</script>
