<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const GlobalStore = inject('GlobalStore')

const title = ref('')
const description = ref('')
const price = ref('')
const pictures = ref(null)
const isPublishing = ref(false)

const errorMessage = ref('')

const handlePublish = async () => {
  isPublishing.value = true

  if (title.value && price.value && description.value && pictures.value) {
    const formData = new FormData()

    for (const key in pictures.value) {
      if (Object.hasOwnProperty.call(pictures.value, key)) {
        formData.append('files.picture', pictures.value[key])
      }
    }

    const stringifiedInfos = JSON.stringify({
      title: title.value,
      description: description.value,
      price: price.value,
      owner: GlobalStore.userInfos.value.id
    })

    formData.append('data', stringifiedInfos)

    try {
      const response = await axios.post(
        'https://site--backend-le-bon-coin--grfpcmvjpg8z.code.run/api/offers',
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + GlobalStore.userInfos.value.token,
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      const idOffer = response.data.data.id
      router.push({ name: 'offer', params: { id: idOffer } })
    } catch (error) {
      console.log(error.message)
    }
    isPublishing.value = false
  } else {
    errorMessage.value = 'Veuillez remplir tous les champs'
    isPublishing.value = false
  }
}

const imgListPreview = computed(() => {
  const tab = []
  for (const key in pictures.value) {
    if (Object.hasOwnProperty.call(pictures.value, key)) {
      tab.push(URL.createObjectURL(pictures.value[key]))
    }
  }

  return tab
})

const selectPictures = (event) => {
  errorMessage.value = ''
  const numOfFile = event.target.files.length
  if (numOfFile <= 10) {
    pictures.value = event.target.files
  } else {
    errorMessage.value = `10 photos maximum (${numOfFile} sélectionnés)`
  }
}

const deleteErrorMessage = () => {
  errorMessage.value = ''
}

const btnText = computed(() => {
  if (isPublishing.value) {
    return 'Envoi en cours ...'
  } else {
    return 'Déposer mon annonce'
  }
})
</script>

<template>
  <main>
    <div class="container">
      <h1>Déposer une annonce</h1>
      <form @submit.prevent="handlePublish">
        <label for="title">Titre de l'annonce</label>
        <input type="text" name="title" id="title" v-model="title" @input="deleteErrorMessage" />
        <p>Vous n'avez pas besoin de mentionner « Achat » ou « Vente » ici.</p>
        <label for="description">Description de l'annonce </label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          v-model="description"
          @input="deleteErrorMessage"
        ></textarea>
        <p>
          Nous vous rappelons que la vente de contrefaçons est interdite. Nous vous invitons à
          ajouter tout élément permettant de prouver l’authenticité de votre article: numéro de
          série, facture, certificat, inscription de la marque sur l’article, emballage etc.
          Indiquez dans le texte de l’annonce si vous proposez un droit de rétractation à
          l’acheteur. En l’absence de toute mention, l’acheteur n’en bénéficiera pas et ne pourra
          pas demander le remboursement ou l’échange du bien ou service proposé
        </p>
        <label for="price">Votre prix de vente</label>
        <div class="price-block">
          <input
            type="number"
            name="price"
            id="price"
            v-model="price"
            @input="deleteErrorMessage"
          />
          <div>
            <span>€</span>
          </div>
        </div>

        <div class="select-pictures">
          <label for="pictures"
            >Ajoutez des photos
            <div>
              <font-awesome-icon :icon="['fas', 'camera-alt']" />
              <span>Sélectionnez jusqu'à 10 photos</span>
            </div>
            <input type="file" multiple name="pictures" id="pictures" @input="selectPictures" />
          </label>
        </div>
        <div v-if="pictures" class="img-preview-block">
          <img v-for="url in imgListPreview" :src="url" />
        </div>
        <button>{{ btnText }}</button>
      </form>

      <p v-if="errorMessage" class="errorMessage">{{ errorMessage }}</p>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  margin-top: 110px;
  background-color: var(--grey-light);
  padding-top: 40px;
}

.container {
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

h1 {
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 40px;
}

/* -------- FORM PART ----------*/

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  margin-bottom: 10px;
}

input {
  border-radius: 10px;
  border: 1px solid var(--medium-blue);
  padding: 13px;
  width: 770px;
  outline: none;
}

p {
  color: var(--medium-blue);
  line-height: 14px;
  font-size: 12px;
  margin: 0px 0 10px;
  width: 770px;
}

input[type='file'] {
  display: none;
}

textarea {
  border-radius: 10px;
  border: 1px solid var(--medium-blue);
  padding: 13px;
  width: 770px;
}

.price-block {
  height: 45px;
  width: 230px;
  display: flex;
  align-items: center;
  border: 1px solid var(--medium-blue);
  border-radius: 10px;
  margin-bottom: 20px;
}

.price-block input {
  border: none;
  appearance: none;
  -moz-appearance: textfield;
  -webkit-appearance: none;
  outline: none;
}

.price-block > div {
  border-left: 1px solid var(--medium-blue);
  height: 45px;
  width: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.select-pictures {
  display: flex;
  flex-direction: column;
  width: 145px;
}

.select-pictures > label > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--medium-blue);
  border-radius: 15px;
  width: 145px;
  height: 145px;
  margin: 10px 0px;
  cursor: pointer;
}

svg {
  font-size: 40px;
  color: var(--blue);
}

span {
  text-align: center;
  color: var(--blue);
}

.img-preview-block {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}

/* --------- BOTTOM PART ---------*/

button {
  align-self: flex-end;
  background-color: var(--orange-main);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
}

.errorMessage {
  text-align: center;
  color: var(--orange-main);
  font-size: 18px;
}
</style>
