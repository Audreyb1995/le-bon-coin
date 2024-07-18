<script setup>
import axios from 'axios'

import { useCycleList } from '@vueuse/core'
import { onMounted, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

import { formatPrice } from '../assets/utils/formatPrice'

const props = defineProps({
  id: {
    type: String
  }
})

const offer = ref(null)

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--backend-le-bon-coin--grfpcmvjpg8z.code.run/api/offers/${props.id}?populate[0]=picture&populate[1]=owner.avatar`
    )
    offer.value = data.data
  } catch (error) {
    console.log(error.message)
  }
})

const date = computed(() => {
  return offer.value.attributes.createdAt.split('T')[0].split('-').reverse().join('/')
})

const picturesList = computed(() => {
  const { state, prev, next } = useCycleList(offer.value.attributes.picture.data)
  return { state, prev, next }
})

const formatedPrice = computed(() => {
  const price = offer.value.attributes.price
  return formatPrice(price)
})
</script>

<template>
  <main class="container">
    <p v-if="!offer">Chargement en cours ...</p>
    <div class="offer-block" v-else>
      <div class="offer-content">
        <div class="img-offer">
          <font-awesome-icon :icon="['fas', 'chevron-left']" @click="picturesList.prev()" />
          <img v-if="picturesList" :src="picturesList.state.value.attributes.url" />
          <font-awesome-icon :icon="['fas', 'chevron-right']" @click="picturesList.next()" />
        </div>
        <div class="offer-details">
          <p>{{ offer.attributes.title }}</p>
          <p>{{ formatedPrice }} €</p>
          <p>{{ date }}</p>
        </div>
        <div class="border-bottom"></div>
        <div>
          <h3>Description</h3>
          <p>{{ offer.attributes.description }}</p>
        </div>
        <div class="border-bottom"></div>
        <div>
          <p><font-awesome-icon :icon="['fas', 'location-dot']" /> Agon-Coutainville (50230)</p>
        </div>
      </div>

      <div class="owner-content">
        <div class="owner-infos">
          <img
            v-if="offer.attributes.owner.data.attributes.avatar.data"
            :src="offer.attributes.owner.data.attributes.avatar.data.attributes.url"
          />
          <p>{{ offer.attributes.owner.data.attributes.username.toUpperCase() }}</p>
        </div>
        <div class="owner-details">
          <p><font-awesome-icon :icon="['fas', 'check-double']" /> Pièce d'identité vérifiée</p>
          <p><font-awesome-icon :icon="['far', 'clock']" /> Répond généralement en 1 heure</p>
        </div>

        <div class="btn-block">
          <div class="border-bottom"></div>

          <button>
            <RouterLink :to="{ name: 'payment', params: props.id }">Acheter</RouterLink>
          </button>

          <button>Message</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  margin-top: 130px;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
}
.offer-block {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 30px;
  gap: 20px;
}

.border-bottom {
  border-bottom: 1px solid var(--grey-light);
  width: 100%;
}
/* ---- OFFER PART ---- */

.offer-content {
  display: flex;
  flex-direction: column;
  flex: 2;
  gap: 20px;
  margin-bottom: 50px;
}

.img-offer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.img-offer img {
  width: 400px;
  height: 350px;
  object-fit: cover;
}

.img-offer svg {
  cursor: pointer;
}

.offer-details p {
  margin-bottom: 20px;
  font-weight: bold;
}
.offer-details p:first-child {
  font-size: 24px;
}

.offer-details :nth-child(2) {
  font-size: 18px;
}

.offer-details p:last-child {
  font-size: 12px;
  color: var(--medium-blue);
  font-weight: 400;
}

/* ---- OWNER PART ---- */

.owner-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 0 7px var(--grey-light);
  padding: 20px;
  height: 370px;
  width: 350px;
}

.owner-infos {
  display: flex;
  gap: 15px;
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 20px;
}
.owner-infos img {
  width: 65px;
  height: 65px;
  border-radius: 50%;
}

.owner-details p:first-child {
  font-size: 12px;
  color: var(--orange-dark);
  background-color: var(--orange-light);
  display: inline;
  border-radius: 10px;
  padding: 3px 10px;
}

.owner-details p:last-child {
  font-size: 14px;
  margin-top: 20px;
  font-weight: 500;
}

.btn-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  justify-content: flex-end;
  height: 100%;
}

.btn-block button {
  border: none;
  padding: 15px 0px;
  border-radius: 15px;
  color: white;
  font-size: 16px;
  font-weight: bold;
}

.btn-block :nth-child(2) {
  background-color: var(--orange-main);
}

.btn-block button:last-child {
  background-color: var(--blue);
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
