<template>
  <div ref="gameLab" class="h-screen"></div>
</template>
<script lang="ts" setup>
// @ts-nocheck
import DiceSpriteSheet from "../assets/game-object/dice.png";

const gameLab: Ref<HTMLDivElement | undefined> = ref();
onMounted(() => {
  let dice;
  let rollEnded = true;
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
      preload: function () {
        this.load.spritesheet("dice", DiceSpriteSheet, {
          frameWidth: 100,
          frameHeight: 100,
        });
      },
      create: function () {
        dice = this.add.sprite(250, 250, "dice").setInteractive();
        this.anims.create({
          key: "roll",
          frames: this.anims.generateFrameNumbers("dice", {
            start: 1,
            end: 6,
          }),
          frameRate: 5,
          repeate: -1,
        });
        for (let i = 1; i <= 6; i++) {
          this.anims.create({
            key: "roll-" + i,
            frames: [{ key: "dice", frame: i }],
            frameRate: 10,
          });
        }
        dice.on("pointerdown", () => {
          if (rollEnded) {
            dice.play("roll", true);
            rollEnded = false;
          }
        });
        dice.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          if (!rollEnded) {
            const val = Math.floor(Math.random() * 6) + 1;
            dice.play("roll-" + val);
            rollEnded = true;
          }
        });
      },
      update: function () {},
    },
  };
  new Phaser.Game(gameConfig);
});
</script>
