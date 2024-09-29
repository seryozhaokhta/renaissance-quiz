<!-- App.vue -->

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
</script>

<style global>
body {
  margin: 0;
  font-family: Helvetica, sans-serif;
  background-color: hsla(220, 15%, 10%, 1);
  color: hsla(0, 0%, 90%, 1);
}

* {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  cursor: pointer;
}
</style>
