<template>
  <div class="h-screen flex justify-center bg-slate-800">
    <login-form v-if="isLogin" @switch-register="isLogin = false" />
    <register-form v-else @switch-login="isLogin = true" />
  </div>
</template>
<script lang="ts" setup>
useHead({
  title: "Auth",
});
import LoginForm from "~/components/form/login-form.vue";
import RegisterForm from "~/components/form/register-form.vue";
const isLogin = ref(true);
</script>
