<template>
  <footer>
    <p>
      Made by
      <a href="https://www.linkedin.com/in/audrey-baufays-821123221/" target="_blank"
        >Audrey Baufays</a
      >
      with
      <a href="https://vuejs.org/" target="_blank">Vue.js</a>
    </p>
  </footer>
</template>

<style scoped>
footer {
  height: var(--footer-height);
  background-color: var(--grey-light);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  font-size: 16px;
}

a {
  text-decoration: none;
  font-weight: bold;
  color: inherit;
}
</style>
