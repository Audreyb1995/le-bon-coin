<script setup>
import PublishedOfferButton from '@/components/PublishedOfferButton.vue'
</script>

<template>
  <div class="content-top">
    <img src="../assets/img/onde-corail.svg" />
    <div>
      <p>C'est le moment de vendre</p>
      <PublishedOfferButton />
    </div>
    <img src="../assets/img/feuille-bleue.svg" />
  </div>
</template>

<style scoped>
.content-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
  gap: 10px;
  width: 100%;
  background-color: var(--orange-light);
  height: 80px;
}

.content-top > div {
  display: flex;
  align-items: center;
  gap: 20px;
}

img {
  height: 100%;
  border-radius: 15px;
}

p {
  font-size: 20px;
  font-weight: 800;
}
</style>
