<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { inject, ref } from 'vue'

import PublishedOfferButton from './PublishedOfferButton.vue'

const search = ref('')

const route = useRoute()
const router = useRouter()

const GlobalStore = inject('GlobalStore')

const disconnection = () => {
  $cookies.remove('UserCookie')
  $cookies.remove('TokenCookie')
  GlobalStore.changeUserInfos({
    username: null,
    token: null
  })
}

const handleSearch = () => {
  const queries = { ...route.query }

  if (search.value) {
    queries.title = search.value
  } else {
    delete queries.title
  }

  queries.page = 1

  router.push({ name: 'home', query: queries })
}
</script>

<template>
  <header>
    <div class="container">
      <div class="header-top">
        <RouterLink :to="{ name: 'home' }">
          <img src="../assets/img/logo.svg" />
        </RouterLink>

        <div class="header-middle">
          <PublishedOfferButton />

          <form @submit.prevent="handleSearch" class="search-bar">
            <input name="search" placeholder="Rechercher sur leboncoin" v-model="search" />
            <button><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
          </form>
        </div>

        <div v-if="GlobalStore.userInfos.value.username" class="connected-disconnected">
          <div class="connection">
            <font-awesome-icon :icon="['far', 'user']" />
            <p>{{ GlobalStore.userInfos.value.username }}</p>
          </div>
          <div class="disconnection">
            <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" @click="disconnection" />
          </div>
        </div>

        <RouterLink v-else :to="{ name: 'login' }">
          <div class="log-in">
            <font-awesome-icon :icon="['far', 'user']" />
            <a>Se connecter</a>
          </div>
        </RouterLink>
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

/* ------ HEADER TOP ----------------------------- */

img {
  width: 140px;
}

.header-middle {
  display: flex;
  gap: 20px;
}

.search-bar {
  display: flex;
  background-color: var(--grey-light);
  padding: 7px;
  border-radius: 10px;
  width: 300px;
}
input {
  background-color: var(--grey-light);
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

.search-bar button {
  background-color: #ffffff00;
  border: none;
  cursor: pointer;
}

.search-bar svg {
  background-color: var(--orange-main);
  padding: 8px;
  box-sizing: content-box;
  border-radius: 7px;
}

/* ----- LOG IN PART -----*/

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

/* ------- CONNECTED / DISCONNECTED PART ----- */

.connected-disconnected {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.connection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: none;
  background-color: #ffffff;
  gap: 5px;
}

.connection svg {
  font-size: 16px;
}

.connection p {
  font-size: 12px;
}

.disconnection {
  cursor: pointer;
  color: var(--medium-blue);
}

/* ------ HEADER BOTTOM ----------------------------- */

.header-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-bottom svg {
  font-size: 2px;
}
</style>
