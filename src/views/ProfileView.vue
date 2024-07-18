<script setup>
import axios from 'axios'
import { onMounted, ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router'

const GlobalStore = inject('GlobalStore')
const profileInfos = ref('')
const router = useRouter()

onMounted(async () => {
  try {
    const response = await axios.get(
      'https://site--backend-le-bon-coin--grfpcmvjpg8z.code.run/api/users/me?populate[0]=offers&populate[1]=offers.picture&populate[2]=avatar',
      {
        headers: {
          Authorization: 'Bearer ' + GlobalStore.userInfos.value.token,
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    profileInfos.value = response.data
  } catch (error) {
    console.log(error)
  }
})

const usernameFirstLetter = computed(() => {
  const username = profileInfos.value.username
  return username ? username.charAt(0) : ''
})

const numberOfOffers = computed(() => {
  const offers = profileInfos.value.offers
  let numOffers = 0
  for (let i = 0; i < offers.length; i++) {
    numOffers += 1
  }
  return numOffers
})

const handleDeleteOffer = (id) => {
  try {
    const response = axios.delete(
      `https://site--backend-le-bon-coin--grfpcmvjpg8z.code.run/api/offers/${id}`,
      {
        headers: {
          Authorization: `Bearer ${GlobalStore.userInfos.value.token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    router.go()
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <main>
    <div class="container">
      <p v-if="!profileInfos">Chargement en cours...</p>
      <div v-else>
        <div class="infos-profile-block">
          <img v-if="profileInfos.avatar !== null" :src="profileInfos.avatar.url" />
          <div v-else class="avatar">
            <p>{{ usernameFirstLetter }}</p>
          </div>
          <div>
            <h1>{{ profileInfos.username }}</h1>
            <p>{{ profileInfos.email }}</p>
          </div>
        </div>
        <div class="offers-block">
          <h2>{{ numberOfOffers }} annonces</h2>
          <div class="offer-infos" v-for="offer in profileInfos.offers">
            <div class="offer-name">
              <img :src="offer.picture[0].url" />
              <h3>{{ offer.title }}</h3>
            </div>

            <div class="offer-price">
              <p>{{ offer.price }}€</p>
              <button @click="handleDeleteOffer(offer.id)">
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  margin-top: 110px;
  padding-top: 40px;
}

.infos-profile-block {
  display: flex;
  align-items: center;
  gap: 30px;
  border: 1px solid var(--medium-blue);
  border-radius: 15px;
  padding: 20px;
}

.infos-profile-block img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.avatar p {
  font-size: 40px;
  font-weight: bold;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--medium-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

h2 {
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0;
}

.offers-block {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 50px;
}

.offer-infos {
  box-shadow: 0 0 7px 3px var(--grey-medium);
  padding: 20px;
  display: flex;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.offer-name {
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
}

.offer-infos img {
  width: 115px;
  height: 115px;
  object-fit: cover;
}

.offer-infos h3 {
  font-size: 22px;
  font-weight: bold;
}

.offer-price {
  display: flex;
  gap: 180px;
}

.offer-price {
  font-size: 18px;
  color: var(--orange-dark);
  font-weight: bold;
}

.offer-price button {
  cursor: pointer;
  background-color: white;
  border: none;
  width: 30px;
  font-size: 18px;
  color: var(--orange-dark);
}
</style>
