import Phaser from "phaser";

export default defineNuxtPlugin(() => {
    return {
        provide: {
            phaser: Phaser
        }
    }
})
