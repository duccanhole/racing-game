<template>
  <va-form class="flex flex-col w-96 p-3 bg-slate-400 self-center rounded-md">
    <h4 class="text-center text-3xl font-bold">LOGIN</h4>
    <va-input
      label="Email"
      type="email"
      required="true"
      class="mt-3"
    ></va-input>
    <va-input label="Password" type="password" class="mt-3"></va-input>
    <va-button type="submit" class="mt-3">Login</va-button>
    <p class="text-center text-sm">or</p>
    <va-button
      preset="secondary"
      hover-behavior="opacity"
      :hover-opacity="0.4"
      @click="$emit('switch-register')"
    >
      Register
    </va-button>
  </va-form>
</template>
