<script setup>
import { RouterLink } from 'vue-router'

import { computed } from 'vue'

import { formatPrice } from '../assets/utils/formatPrice.js'

const props = defineProps({
  offerInfos: {
    type: Object
  },

  id: {
    type: Number
  }
})

const date = computed(() => {
  return props.offerInfos.attributes.createdAt.split('T')[0].split('-').reverse().join('/')
})

const formatedPrice = computed(() => {
  const price = props.offerInfos.attributes.price
  return formatPrice(price)
})
</script>

<template>
  <RouterLink :to="{ name: 'offer', params: { id: id } }">
    <section>
      <div class="owner-infos">
        <img
          v-if="offerInfos.attributes.owner.data.attributes.avatar.data"
          :src="offerInfos.attributes.owner.data.attributes.avatar.data.attributes.url"
        />
        <p>{{ offerInfos.attributes.owner.data.attributes.username }}</p>
      </div>
      <div class="offer-infos">
        <img
          v-if="offerInfos.attributes.picture.data"
          :src="offerInfos.attributes.picture.data[0].attributes.url"
        />
        <p>{{ offerInfos.attributes.title }}</p>
        <p>{{ formatedPrice }} €</p>
      </div>
      <div class="offer-infos-bottom">
        <p>{{ date }}</p>
        <font-awesome-icon :icon="['far', 'heart']" />
      </div>
    </section>
  </RouterLink>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 185px;
  height: 380px;
}

a {
  text-decoration: none;
  color: inherit;
}

/* ---- OWNER PART ---- */

.owner-infos {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: bold;
}

.owner-infos img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}

/* ---- OFFER PART ---- */

.offer-infos img {
  height: 240px;
  width: 200px;
  border-radius: 10px;
  object-fit: cover;
}

.offer-infos {
  font-weight: 800;
  font-size: 16px;
  line-height: 26px;
}

.offer-infos-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
}

.offer-infos-bottom p {
  font-size: 12px;
  color: var(--medium-blue);
  font-weight: 500;
}

.offer-infos-bottom svg {
  font-size: 20px;
  color: var(--medium-blue);
}
</style>
