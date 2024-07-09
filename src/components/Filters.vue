<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps(['sort', 'maxPrice', 'minPrice', 'title', 'page'])

const minPrice = ref(props.minPrice)
const maxPrice = ref(props.maxPrice)
const sort = ref(props.sort)

const handleSubmit = () => {
  const queries = { ...props }
  if (minPrice.value) {
    queries.minPrice = minPrice.value
  } else {
    delete queries.minPrice
  }

  if (maxPrice.value) {
    queries.maxPrice = maxPrice.value
  } else {
    delete queries.maxPrice
  }

  if (sort.value) {
    queries.sort = sort.value
  } else {
    delete queries.sort
  }

  queries.page = 1
  router.push({ name: 'home', query: queries })
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <div class="price-block">
        <h3>Prix</h3>
        <div>
          <div>
            <input type="number" min="0" placeholder="Minimum" v-model="minPrice" />
            <label for="minPrice">€</label>
          </div>
          <div>
            <input type="number" :min="minPrice" placeholder="Maximum" v-model="maxPrice" />
            <label for="maxPrice">€</label>
          </div>
        </div>
      </div>

      <div class="sort-block">
        <h3>Tri</h3>
        <label
          >Prix croissants <input type="radio" value="price:asc" id="ascPrice" v-model="sort"
        /></label>

        <label
          >Prix décroissant <input type="radio" value="price:desc" id="descPrice" v-model="sort"
        /></label>

        <label
          >Pas de tri <input type="radio" value="" id="noSort" name="noSort" v-model="sort"
        /></label>
      </div>
      <button>Rechercher</button>
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 45px 0px;
}

h3 {
  margin-bottom: 15px;
}

.price-block > div {
  display: flex;
  gap: 10px;
}

.price-block > div > div {
  display: flex;
  border: 1px solid var(--grey-medium);
  padding: 0px 5px;
  border-radius: 15px;
  width: 200px;
  height: 45px;
}

input[type='number'] {
  border: none;
  appearance: none;
  -moz-appearance: textfield;
  -webkit-appearance: none;
  outline: none;
  padding-left: 10px;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number']::placeholder {
  font-size: 16px;
}

.price-block label {
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid var(--grey-medium);
  padding: 10px;
}

.sort-block input {
  margin-right: 15px;
}

button {
  color: white;
  background-color: var(--orange-main);
  border: none;
  align-self: center;
  padding: 10px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
}
</style>
