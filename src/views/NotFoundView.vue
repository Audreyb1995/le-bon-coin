<template>
  <main>
    <div class="container">
      <h1>Désolé cette page n'existe pas !</h1>

      <RouterLink :to="{ name: 'home' }">Retourner à la page d'accueil</RouterLink>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  margin-top: 110px;
  padding-top: 40px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

a {
  margin-top: 50px;
  text-decoration: underline;
  color: var(--orange-main);
}
</style>
