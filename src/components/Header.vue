<script setup>
import { RouterLink } from 'vue-router'
import OfferButton from './OfferButton.vue'
</script>

<template>
  <header>
    <div class="container">
      <section class="header-top">
        <RouterLink :to="{ name: 'home' }">
          <img class="logo-img" src="../assets/img/logo.svg"
        /></RouterLink>

        <div class="search-and-button-block">
          <OfferButton />
          <div class="search-bar">
            <input
              type="text"
              name="searching"
              id="searching"
              placeholder="Rechercher sur leboncoin"
            /><font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </div>
        </div>
        <div class="log-in">
          <font-awesome-icon :icon="['far', 'user']" />
          <p>Se connecter</p>
        </div>
      </section>
      <section>
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
      </section>
    </div>
  </header>
</template>

<style scoped>
.container {
  padding: 10px 0 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
header {
  height: 110px;
  border-bottom: 1px solid var(--grey-color);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background-color: white;
}

.header-top {
  display: flex;
  justify-content: space-between;
}

.logo-img {
  width: 140px;
  height: 30px;
}

.search-and-button-block {
  display: flex;
  gap: 20px;
}

.search-bar {
  display: flex;
  gap: 10px;
  width: 300px;
  height: 40px;
  background-color: #f4f9fe;
  border-radius: 5px;
  padding: 5px;
}

.search-bar input {
  border: none;
  width: 100%;
  background-color: #f4f9fe;
  font-size: 16px;
}

.search-bar svg {
  background-color: var(--orange-color);
  padding: 5px;
  border-radius: 5px;
}

.log-in {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
}

.log-in svg {
  font-size: 18px;
  font-weight: 400;
}

.log-in p {
  font-size: 12px;
}

.header-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.header-bottom svg {
  font-size: 2px;
}
</style>
