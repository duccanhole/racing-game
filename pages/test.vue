<template>
  <div ref="gameLab" class="h-screen"></div>
</template>
<script lang="ts" setup>
import Phaser from "phaser";
import { Dino } from "../game-setup/game-object";
import { ANIMS_KEY_MOVE } from "~/game-setup/game-variable";

function sleep(time: number) {
  return new Promise((resolve, _reject) =>
    setTimeout(() => resolve(true), time)
  );
}

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
        // this.input.keyboard.on("keydown", (e) => {
        //   if (e.code === "ArrowRight") {
        //     dino.getSpriteSheet()!.flipX = false;
        //     dino.getSpriteSheet()?.play("move", true);
        //     dino.getSpriteSheet()!.x += 5;
        //   }
        //   if (e.code === "ArrowLeft") {
        //     dino.getSpriteSheet()!.flipX = true;
        //     dino.getSpriteSheet()!.x -= 5;
        //     dino.getSpriteSheet()?.play("move", true);
        //   }
        //   if (e.code === "KeyA") {
        //     dino.getSpriteSheet()!.play("attack");
        //   }
        //   if (e.code === "KeyS") {
        //     dino.getSpriteSheet()!.play("hurt");
        //   }
        // });
        dino.getSprite()!.on("pointerdown", async () => {
          for (let i = 0; i <= 5; i++) {
            await sleep(150);
            dino.getSprite()?.play(ANIMS_KEY_MOVE, true);
            dino.getSprite()!.y += 10;
          }
        });
      },
      update() {},
    },
  };
  new Phaser.Game(gameConfig);
});
</script>
