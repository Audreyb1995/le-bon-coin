<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <RouterLink :to="{ name: 'publish' }">
    <button>
      <font-awesome-icon :icon="['far', 'plus-square']" /> Déposer une annonce
    </button></RouterLink
  >
</template>

<style scoped>
button {
  background-color: var(--orange-main);
  border: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
