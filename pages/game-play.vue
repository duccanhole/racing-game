<template>
  <div>
    <h3>this is game play</h3>
    <div ref="gamePlay"></div>
  </div>
</template>
<script lang="ts" setup>
const gamePlay: Ref<HTMLDivElement | null> = ref(null);
const ctx: any = useNuxtApp();
useHead({
  title: "Game Play",
});
onMounted(() => {
  const gameConfig = {
    parent: gamePlay.value,
    // @ts-ignore
    type: Phaser.AUTO,
    width: 100,
    height: 100,
    backgroundColor: "red",
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
  // const game = new Phaser.Game(gameConfig);
  new ctx.$phaser.Game(gameConfig);
});
</script>
