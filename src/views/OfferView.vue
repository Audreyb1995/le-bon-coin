<script setup>
import { onMounted, ref, computed } from 'vue'
import { useCycleList } from '@vueuse/core'
import axios from 'axios'

const props = defineProps({
  id: {
    required: true
  }
})

const offer = ref({})

onMounted(async () => {
  const response = await axios.get(
    'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/' +
      props.id +
      '?populate[0]=pictures&populate[1]=owner.avatar'
  )
  offer.value = response.data.data
  console.log(offer.value)
  console.log(response.data.data)
})

const formattedDate = computed(() => {
  return offer.value.attributes.createdAt?.split('T')[0].split('-').reverse().join('/')
})

const picturesList = computed(() => {
  const { state, next, prev } = useCycleList(offer.value.attributes.pictures.data)

  return { state, next, prev }
})
</script>

<template>
  <div class="container">
    <p v-if="!offer.id">Chargement en cours ...</p>
    <div v-else class="offer-block">
      <div class="content-offer">
        <div class="img-offer">
          <font-awesome-icon :icon="['fas', 'chevron-left']" @click="picturesList.prev()" />
          <img :src="picturesList.state.value.attributes.url" />
          <font-awesome-icon :icon="['fas', 'chevron-right']" @click="picturesList.next()" />
        </div>
        <div class="offer-infos">
          <h2>{{ offer.attributes.title }}</h2>
          <p>{{ offer.attributes.price }}€</p>
          <p class="date">{{ formattedDate }}</p>
        </div>
        <div class="border-bottom"></div>
        <div class="offer-description">
          <p>Description</p>
          <p>{{ offer.attributes.description }}</p>
        </div>
        <div class="border-bottom"></div>
        <div class="offer-location">
          <font-awesome-icon :icon="['fas', 'location-dot']" />
          <p>Agon-Coutainville (50230)</p>
        </div>
      </div>

      <div class="content-owner">
        <div class="owner-infos">
          <img
            :src="offer.attributes.owner.data.attributes.avatar.data.attributes.url"
            v-if="offer.attributes.owner.data.attributes.avatar"
          />
          <p>{{ offer.attributes.owner.data.attributes.username.toUpperCase() }}</p>
        </div>
        <div class="owner-details">
          <p class="owner-verification">
            <font-awesome-icon :icon="['fas', 'check-double']" /> Pièce d'identité confirmée
          </p>
          <p>
            <font-awesome-icon :icon="['far', 'check-circle']" /> Répond généralement en 1 heure
          </p>
        </div>
        <div class="border-bottom"></div>
        <div class="button-block">
          <button class="buy-btn">Acheter</button>
          <button class="msg-btn">Message</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  padding-top: 140px;
}
p {
  font-family: sans-serif;
}

.offer-block {
  display: flex;
  justify-content: space-around;
  gap: 30px;
}

.content-offer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 2;
  gap: 20px;
}

.content-offer img {
  width: 260px;
  height: 350px;
  object-fit: cover;
}

.img-offer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.img-offer svg {
  cursor: pointer;
}
.offer-infos {
  align-self: flex-start;
  font-weight: 800;
}

.offer-infos h2 {
  font-size: 24px;
}

.offer-infos p {
  font-size: 18px;
  padding: 10px 0px;
}

.offer-infos .date {
  font-size: 12px;
  font-weight: 400;
  color: var(--grey-color);
}
.content-owner {
  display: flex;
  flex-direction: column;
  flex: 1;
  box-shadow: 0 0 7px var(--blue-light);
  height: 410px;
}

.border-bottom {
  border-bottom: 1px solid var(--grey-color);
  width: 100%;
  opacity: 0.3;
  margin-top: 30px;
}

.offer-description {
  font-size: 18px;
}

.offer-description :first-child {
  font-weight: bold;
  margin-bottom: 20px;
  font-family: sans-serif;
}

.offer-location {
  display: flex;
  gap: 10px;
  align-self: flex-start;
  margin-bottom: 30px;
}

.content-owner {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.owner-infos {
  display: flex;
  gap: 20px;
  font-weight: bold;
  font-size: 18px;
  font-family: sans-serif;
}

.owner-infos img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.owner-details {
  font-size: 14px;
}

.owner-details p {
  margin: 20px 0px;
}

.owner-verification {
  background-color: var(--orange-light);
  color: #89381b;
  font-size: 12px;
  font-family: sans-serif;
  padding: 2px 5px;
  border-radius: 5px;
  display: inline;
}

.button-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
}

button {
  padding: 14px 20px;
  border-radius: 15px;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin: 0px 10px;
}

.buy-btn {
  background-color: var(--orange-color);
}

.msg-btn {
  background-color: var(--blue-color);
}
</style>
