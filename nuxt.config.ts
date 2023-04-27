// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@vuestic/nuxt"],
  plugins: [{ src: "~/plugins/phaser.client.ts", mode: "client" }],
});
