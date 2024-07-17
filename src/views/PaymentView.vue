<script setup>
import axios from 'axios'
import { ref, onMounted, onBeforeMount, computed, inject } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'vue-router'

const stripePromise = loadStripe(
  'pk_test_51PbJtmBF26cMbDeX0gQGiTYY6pm11dh8ROAxOGUl2iehL5AlLqYdVy9FFfvM2hShykXdS51XYdb6BjcIVgXxSbuW00Aj2etUYa'
)
const props = defineProps({
  id: String
})

const router = useRouter()
const GlobalStore = inject('GlobalStore')

const offerInfo = ref('')
const cardElement = ref(null)
const confirmedPayment = ref(false)

const firstname = ref('')
const surname = ref('')
const phone = ref('')
const option = ref('handover')

const errorMessage = ref('')

onBeforeMount(async () => {
  const stripe = await stripePromise
  const elements = stripe.elements()
  cardElement.value = elements.create('card')
  cardElement.value.mount('#card-element')
})

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://site--backend-le-bon-coin--grfpcmvjpg8z.code.run/api/offers/${props.id}?populate[0]=picture`
    )

    offerInfo.value = response.data.data

    console.log(offerInfo.value)
  } catch (error) {
    console.log(error)
  }
})

const total = computed(() => {
  let optionPrice = 0
  let total = 0
  if (option.value === 'colissimo') {
    optionPrice = 15.6
  }

  total = (0.99 + offerInfo.value.attributes.price + optionPrice).toFixed(2)
  return total
})

const handlePayment = async () => {
  try {
    if (!firstname.value || !surname.value) {
      return (errorMessage.value = 'Votre nom et prénom sont obligatoires')
    }

    const stripe = await stripePromise
    const { token } = await stripe.createToken(cardElement.value)
    const stripeToken = token.id

    console.log(GlobalStore.userInfos.value.token)

    const response = await axios.post(
      `https://site--backend-le-bon-coin--grfpcmvjpg8z.code.run/api/offers/payment`,
      {
        token: stripeToken,
        amount: 100,
        title: 'pantalon'
      },
      {
        headers: {
          Authorization: 'Bearer ' + GlobalStore.userInfos.value.token,
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    if (response.data.status === 'succeeded') {
      confirmedPayment.value = true
      console.log(confirmedPayment.value)
      alert(
        `Paiement de ${total.value} € validé pour l'achat du produit ${offerInfo.value.attributes.title} par ${firstname.value} ${surname.value}`
      )
      router.push({ name: 'home' })
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Finalisez votre paiement</h1>

      <div class="content-block">
        <div class="left-column">
          <div>
            <form @submit.prevent="handlePayment">
              <div class="input-block">
                <h2>Informations personnelles</h2>
                <p>Une pièce d’identité vous sera demandée pour récupérer votre colis.</p>
                <label for="firstname">Prénom</label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="Prénom"
                  v-model="firstname"
                  @input="() => (errorMessage = '')"
                />
                <label for="surname">Nom</label>
                <input
                  type="text"
                  name="surname"
                  id="surname"
                  placeholder="Nom"
                  v-model="surname"
                  @input="() => (errorMessage = '')"
                />
                <label for="phone">Téléphone</label>
                <div></div>
                <input type="tel" name="phone" id="phone" placeholder="Téléphone" v-model="phone" />
                <p>Recevoir un SMS pour l’arrivée de votre colis ou votre code de locker</p>
              </div>

              <p>
                Vous ne serez débité que lorsque le vendeur aura confirmé la disponibilité de la
                commande.
              </p>

              <div class="payment-block">
                <h2>Coordonnées bancaires</h2>
                <div id="card-element"></div>
                <div class="button-block">
                  <button>Payer</button>
                  <p class="error-message">{{ errorMessage }}</p>
                </div>

                <p>
                  Paiement sécurisé Votre banque peut vous demander d’autoriser le paiement pour
                  compléter votre achat.
                </p>
                <p>
                  Vous êtes sur un serveur de paiement sécurisé par les normes ssl (https) et pcidss
                  de nos partenaires bancaires. Vos données sont encryptées pour plus de sécurité.
                </p>
              </div>
            </form>
          </div>
        </div>

        <p v-if="!offerInfo">Chargement en cours ...</p>
        <div v-else class="right-column">
          <div class="offer-block">
            <div>
              <img :src="offerInfo.attributes.picture.data[0].attributes.url" />
              <h3>{{ offerInfo.attributes.title }}</h3>
            </div>

            <p>{{ offerInfo.attributes.price }}€</p>
          </div>

          <div class="options-part">
            <h3>Mode de remise</h3>
            <div class="handover-option">
              <input type="radio" name="handover" id="handover" value="handover" v-model="option" />
              <label for="handover">
                <p>Remise en main propre</p>
                <span>
                  Payez en ligne et récupérez votre achat en main propre lors de votre rendez-vous
                  avec le vendeur
                </span>
              </label>
            </div>

            <div class="colissimo-option">
              <label for="colissimo">
                <div class="colissimo-label">
                  <input
                    type="radio"
                    name="colissimo"
                    id="colissimo"
                    value="colissimo"
                    v-model="option"
                  />
                  <div class="colissimo-text">
                    <p>Colissimo</p>
                    <span>à votre domicile sous 2-3 jours</span>
                  </div>
                </div>
              </label>
              <p class="price">15,60€</p>
            </div>

            <div class="protection-option">
              <div>
                <h3>Protection leboncoin</h3>
                <p class="price">0,99€</p>
              </div>
              <div class="guarantee">
                <font-awesome-icon :icon="['fas', 'check']" />
                <p>Votre argent est sécurisé et versé au bon moment</p>
              </div>
              <div class="guarantee">
                <font-awesome-icon :icon="['fas', 'check']" />
                <p>Notre service client dédié vous accompagne</p>
              </div>
            </div>
          </div>
          <div class="total-price-block">
            <p>TOTAL</p>
            <p class="total">{{ total }}€</p>
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

.content-block {
  display: flex;
  margin-bottom: 40px;
  gap: 30px;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* -------------- LEFT PART --------------- */

/* --- buyer block --- */

h2 {
  font-size: 18px;
}

p {
  font-size: 12px;
  margin-top: 5px;
}

.left-column form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-block {
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 7px 3px var(--grey-medium);
  padding: 20px;
  border-radius: 10px;
}

.input-block label {
  margin-top: 20px;
  margin-bottom: 10px;
}

.input-block input {
  height: 45px;
  border-radius: 15px;
  border: 1.5px solid var(--grey-medium);
  font-size: 16px;
  outline: none;
  padding-left: 10px;
}

.input-block input::placeholder {
  font-size: 16px;
}

/* --- payment block --- */

.payment-block {
  box-shadow: 0 0 7px 3px var(--grey-medium);
  padding: 20px;
  border-radius: 10px;
}

#card-element {
  margin: 20px 0;
  border: 1.5px solid var(--grey-medium);
  border-radius: 15px;
  padding: 15px;
  min-height: 45px;
}

.button-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.button-block button {
  border: none;
  color: #fff;
  padding: 10px 15px;
  border-radius: 15px;
  font-weight: 700;
  font-size: inherit;
  background-color: var(--orange-main);
  margin-bottom: 10px;
  cursor: pointer;
  align-self: baseline;
}

.error-message {
  margin-bottom: 20px;
  color: var(--orange-main);
  font-size: 16px;
}

/* -------------- RIGHT PART --------------- */

.right-column {
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 7px 3px var(--grey-medium);
  border-radius: 10px;
  height: fit-content;
}

.offer-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

.offer-block > div {
  display: flex;
  align-items: center;
  gap: 10px;
}

h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0;
}

img {
  height: 80px;
  width: 80px;
  border-radius: 5px;
}

.offer-block p {
  font-weight: 700;
  color: var(--orange-dark);
  font-size: 16px;
}

.options-part {
  border-top: 1px solid var(--grey-medium);
  margin: 5px 0;
  padding: 20px;
  border-bottom: 1px solid var(--grey-medium);
}

.options-part > div {
  display: flex;
  gap: 10px;
  margin: 10px 0;
  justify-content: space-between;
}

.colissimo-option {
  align-items: center;
}

span {
  color: var(--medium-blue);
  font-size: 12px;
}

.options-part > div p:first-of-type {
  font-size: 16px;
}

.colissimo-label {
  display: flex;
  gap: 10px;
  margin: 10px 0;
}

.price {
  color: var(--orange-dark);
  font-weight: bold;
}

.protection-option {
  display: flex;
  flex-direction: column;
}

.protection-option div:first-child {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.guarantee {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.guarantee p {
  margin-top: 0;
}

svg {
  font-size: 20px;
  color: green;
}

.total-price-block {
  display: flex;
  justify-content: space-between;
}
.total-price-block > p {
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
}

.total {
  color: var(--orange-dark);
}
</style>
