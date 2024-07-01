<script setup>
import { computed } from 'vue'

const props = defineProps({
  offersInfos: {
    type: Object
  },
  id: {
    type: Number,
    required: true
  }
})

const formattedDate = computed(() => {
  const createdAt = props.offersInfos.createdAt.split('T')[0].split('-').reverse().join('/')

  return createdAt
})
</script>

<template>
  <RouterLink :to="{ name: 'offer', params: { id: id } }">
    <div class="offer">
      <div class="owner-infos">
        <img
          class="img-avatar"
          :src="offersInfos.owner.data.attributes.avatar.data.attributes.url"
          v-if="offersInfos.owner.data.attributes.avatar.data"
        />
        <p>{{ offersInfos.owner.data.attributes.username }}</p>
      </div>
      <div class="article-infos">
        <img class="img-article" :src="offersInfos.pictures.data[0].attributes.url" />
        <h2>{{ offersInfos.title }}</h2>
        <p>{{ offersInfos.price }}€</p>
        <div class="bottom-article-infos">
          <p class="date">{{ formattedDate }}</p>
          <font-awesome-icon :icon="['far', 'heart']" />
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.offer {
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 380px;
  gap: 20px;
  margin-bottom: 70px;
}

a {
  text-decoration: none;
  color: inherit;
}

.owner-infos {
  display: inline-block;
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
}
.owner-infos img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  object-fit: cover;
}

.article-infos img {
  width: 100%;
  height: 240px;
  border-radius: 10px;
  object-fit: cover;
}

.article-infos h2 {
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
}

.article-infos p {
  font-weight: bold;
  font-size: bold;
  margin-top: 10px;
}

.bottom-article-infos {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 45px;
  color: var(--grey-color);
}

.bottom-article-infos p {
  font-weight: 400;
  font-size: 12px;
}

.bottom-article-infos svg {
  font-size: 20px;
}
</style>
