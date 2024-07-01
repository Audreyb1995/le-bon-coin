<template>
  <footer>
    <p>
      Made by
      <a href="https://www.linkedin.com/in/audrey-baufays-821123221/" target="_blank"
        >Audrey Baufays</a
      >
      avec
      <a href="https://vuejs.org/" target="_blank">Vue.js</a>
    </p>
  </footer>
</template>

<style scoped>
footer {
  height: 80px;
  background-color: var(--blue-light);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}

p {
  font-family: sans-serif;
}

a {
  text-decoration: none;
  color: inherit;
  font-weight: bold;
}
</style>
