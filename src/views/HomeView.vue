<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

import TimeToSell from '../components/TimeToSell.vue'
import OfferCard from '@/components/OfferCard.vue'

const offersList = ref(null)

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate[0]=pictures&populate[1]=owner.avatar'
    )
    offersList.value = data.data
  } catch (error) {
    console.log(error.message)
  }
})
</script>

<template>
  <main class="container">
    <p v-if="!offersList">Chargement en cours ...</p>
    <div v-else>
      <div class="top-main">
        <p>Des millions de petites annonces et autant d’occasions de se faire plaisir</p>
        <TimeToSell />
      </div>
      <div class="offers-block">
        <OfferCard v-for="offer in offersList" :key="offer.id" :offerInfos="offer" :id="offer.id" />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  margin-top: 140px;
}

.top-main > p {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 25px;
}

.offers-block {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 40px 0;
  gap: 40px 30px;
}
</style>
