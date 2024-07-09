<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps([
  'sort',
  'maxPrice',
  'minPrice',
  'title',
  'page',
  'numOfPages',
  'pagination'
])

const changePage = (num) => {
  const queries = { ...props }
  delete queries.numOfPages
  delete queries.pagination

  queries.page = num

  router.push({ name: 'home', query: queries })
}
</script>

<template>
  <section class="pagination">
    <font-awesome-icon
      :icon="['fas', 'angle-left']"
      @click="changePage(page - 1)"
      v-if="page > 1"
    />
    <p
      v-for="num in numOfPages"
      :key="num"
      :class="{
        selected: num === pagination.page
      }"
      @click="changePage(num)"
    >
      {{ num }}
    </p>
    <font-awesome-icon
      :icon="['fas', 'angle-right']"
      @click="changePage(page + 1)"
      v-if="page < numOfPages"
    />
  </section>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 20px;
  width: 100%;
  gap: 25px;
}

p {
  height: 40px;
  width: 40px;
  border-radius: 5px;

  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.selected {
  background-color: var(--dark-blue);
  color: white;
}

svg {
  cursor: pointer;
}
</style>
