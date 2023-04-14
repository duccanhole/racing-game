<template>
  <div ref="gamePlay">alo</div>
</template>
<script lang="ts" setup>
import Phaser from 'phaser';
const gamePlay: Ref<HTMLDivElement | string> = ref("");
const ctx: any = useNuxtApp();
useHead({
  title: "Game Play",
});
onMounted(() => {
  const gameConfig = {
    parent: gamePlay.value,
    // @ts-ignore
    type: Phaser.AUTO,
    width: 220,
    height: 200,
    backgroundColor: "#ef4444",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 500 },
      },
    },
    render: {
      pixelArt: true,
    },
  };
  // @ts-ignore
  const game = new Phaser.Game(gameConfig);
  ctx.$phaser.initialize(game);
});
</script>
