<template>
  <button><font-awesome-icon :icon="['far', 'plus-square']" /> Déposer une annonce</button>
</template>

<style scoped>
button {
  background-color: var(--orange-color);
  font-size: 16px;
  border: none;
  font-weight: 700;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

button svg {
  font-size: 18px;
}
</style>
