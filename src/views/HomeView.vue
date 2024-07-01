<script setup>
import OfferButton from '@/components/OfferButton.vue'
import { onMounted, ref } from 'vue'

import axios from 'axios'

const offersList = ref([])

onMounted(async () => {
  try {
    const response = await axios.get(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate[0]=pictures&populate[1]=owner.avatar'
    )

    offersList.value = response.data.data
    console.log(offersList.value)
  } catch (error) {
    console.log(error.message)
  }
})
</script>

<template>
  <main class="container">
    <div class="top-block">
      <p>Des millions de petites annonces et autant d’occasions de se faire plaisir</p>
      <div class="button-block">
        <img class="img-coral" src="../assets/img/onde-corail.svg" />
        <p>C'est le moment de vendre</p>
        <img class="img-blue" src="../assets/img/feuille-bleue.svg" />
        <OfferButton />
      </div>
    </div>
    <div class="offers-block" v-for="offers in offersList" :key="offers.id">
      {{ offers.attributes.title }}
    </div>
  </main>
</template>

<style scoped>
.top-block {
  font-weight: bold;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin: 30px;
}
.button-block {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 80px;
  background-color: #fce9dd;
  border-radius: 20px;
  font-size: 20px;
  font-weight: bold;
  position: relative;
  overflow: hidden;
}

img {
  height: 80px;
  object-fit: cover;
  position: absolute;
  top: 0;
}

.img-coral {
  left: 0;
}

.img-blue {
  right: 0;
}

.offers-block {
  border: 2px solid red;
}
</style>
