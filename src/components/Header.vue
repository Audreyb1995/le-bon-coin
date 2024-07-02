<script setup>
import PublishedOfferButton from './PublishedOfferButton.vue'
</script>

<template>
  <header>
    <div class="container">
      <div class="header-top">
        <!-- <RouterLink :to="{ name: 'home' }"> -->
        <img src="../assets/img/logo.svg" />
        <!-- </RouterLink> -->

        <div class="header-block-1">
          <PublishedOfferButton />
          <div class="search-bar">
            <input name="search" placeholder="Rechercher sur leboncoin" />
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </div>
        </div>
        <div class="log-in">
          <font-awesome-icon :icon="['far', 'user']" />
          <a>Se connecter</a>
        </div>
      </div>

      <div class="header-bottom">
        <p>Immobilier</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Véhicules</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Locations de vacances</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Emploi</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Mode</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Maison & Jardin</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Famille</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Electronique</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Loisirs</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Autres</p>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  height: var(--header-height);
  border-bottom: 1px solid var(--medium-blue);
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 100;
  top: 0;
  width: 100%;
  background-color: white;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.container > div {
  display: flex;
  justify-content: space-between;
}

img {
  width: 140px;
}

.header-block-1 {
  display: flex;
  gap: 20px;
}

.search-bar {
  display: flex;
  background-color: var(--white);
  padding: 7px;
  border-radius: 10px;
  width: 300px;
}
input {
  background-color: inherit;
  border: none;
  flex: 1;
  font-size: 16px;
}

input:focus {
  border: none;
  outline: none;
}

input::placeholder {
  color: var(--medium-blue);
}

.search-bar svg {
  background-color: var(--orange-main);
  padding: 8px;
  box-sizing: content-box;
  border-radius: 7px;
}

.log-in {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.log-in a {
  font-size: 13px;
  text-decoration: none;
}

.log-in svg {
  font-size: 16px;
}

.header-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-bottom svg {
  font-size: 2px;
}
</style>
