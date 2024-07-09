<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import axios from 'axios'

import Filters from '../components/Filters.vue'
import TimeToSell from '../components/TimeToSell.vue'
import OfferCard from '@/components/OfferCard.vue'
import Pagination from '../components/Pagination.vue'

const props = defineProps(['sort', 'maxPrice', 'minPrice', 'title', 'page'])

const numOfPages = ref(1)
const pagination = ref(1)

const offersList = ref(null)

onMounted(() => {
  watchEffect(async () => {
    try {
      let pricefilters = ''

      if (props.maxPrice) {
        pricefilters += `&filters[price][$lte]=${props.maxPrice}`
      }
      if (props.minPrice) {
        pricefilters += `&filters[price][$gte]=${props.minPrice}`
      }

      const { data } = await axios.get(
        `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate[0]=pictures&populate[1]=owner.avatar&filters[title][$containsi]=${props.title}${pricefilters}&pagination[page]=${props.page}&pagination[pageSize]=10&sort=${props.sort}`
      )

      console.log('HomeView - data >>>', data)

      offersList.value = data.data
      numOfPages.value = data.meta.pagination.pageCount
      pagination.value = data.meta.pagination
    } catch (error) {
      console.log('HomeView - catch >>>', error)
    }
  })
})
</script>

<template>
  <main class="container">
    <p v-if="!offersList">Chargement en cours ...</p>
    <div v-else>
      <div class="top-main">
        <Filters
          :sort="sort"
          :maxPrice="maxPrice"
          :minPrice="minPrice"
          :title="title"
          :page="page"
        />
        <p>Des millions de petites annonces et autant d’occasions de se faire plaisir</p>
        <TimeToSell />
      </div>
      <div class="offers-block">
        <OfferCard v-for="offer in offersList" :key="offer.id" :offerInfos="offer" :id="offer.id" />
      </div>
      <Pagination
        :sort="sort"
        :maxPrice="maxPrice"
        :minPrice="minPrice"
        :title="title"
        :page="page"
        :numOfPages="numOfPages"
        :pagination="pagination"
      />
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
