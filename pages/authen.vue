<template>
  <div class="h-screen flex justify-center">
    <va-form class="flex flex-col w-96 p-3 bg-slate-400 self-center rounded-md" style="height: 275px">
      <h4 class="text-center text-3xl">Login</h4>
      <va-input
        label="Email"
        type="email"
        required="true"
        class="mt-3"
      ></va-input>
      <va-input label="Password" type="password" class="mt-3"></va-input>
      <va-button type="submit" class="mt-3" @click="login">Login</va-button>
      <p class="text-center text-sm">or</p>
      <va-button
        preset="secondary"
        hover-behavior="opacity"
        :hover-opacity="0.4"
      >
        Register
      </va-button>
    </va-form>
  </div>
</template>
<script lang="ts" setup>
useHead({
  title: "Auth",
});
const router = useRouter();
function login() {
  router.push("/game-play");
}
</script>
