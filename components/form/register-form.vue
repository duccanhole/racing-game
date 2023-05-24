<template>
  <va-form class="flex flex-col w-96 p-3 bg-slate-400 self-center rounded-md">
    <h4 class="text-center text-3xl font-bold">Register</h4>
    <va-input
      v-model="formRegister.email"
      label="Email"
      type="email"
      required="true"
      class="mt-3"
      :rules="[
        (v) => !!v || 'required',
        (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'email is not valid',
      ]"
    ></va-input>
    <va-input
      v-model="formRegister.password"
      label="Password"
      type="password"
      class="mt-3"
      :rules="[(v) => !!v || 'required', (v) => v.length >= 6 || 'too weak']"
    ></va-input>
    <va-input
      v-model="formRegister.confirm"
      label="Confirm password"
      type="password"
      class="mt-3"
      :rules="[
        (v) => !!v || 'required',
        (v) => v === formRegister.password || 'not match',
      ]"
    ></va-input>
    <va-button type="submit" class="mt-3">Create account</va-button>
    <p class="text-center text-sm">Do you have an account ?</p>
    <va-button
      preset="secondary"
      hover-behavior="opacity"
      :hover-opacity="0.4"
      @click="$emit('switch-login')"
    >
      Login
    </va-button>
  </va-form>
</template>
<script setup>
const formRegister = reactive({
  email: "",
  password: "",
  confirm: "",
});
</script>
