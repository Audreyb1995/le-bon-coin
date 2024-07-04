<script setup>
import axios from 'axios'
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')

const isConnected = ref(false)
const errorMessage = ref('')

const GlobaleStore = inject('GlobalStore')

const clearErrorMessage = () => {
  if (errorMessage.value) {
    errorMessage.value = ''
  }
}

const submitSignUp = async () => {
  if (username.value && email.value && password.value) {
    try {
      isConnected.value = true
      const { data } = await axios.post(
        'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local/register',
        {
          email: email.value,
          username: username.value,
          password: password.value
        }
      )

      GlobaleStore.changeUserInfos({
        username: data.user.username,
        token: data.jwt
      })

      router.push({ name: 'home' })
    } catch (error) {
      isConnected.value = false
      errorMessage.value = 'Un problème est survenu, veuillez essayer à nouveau'
    }
  } else {
    errorMessage.value = 'Veuillez remplir tous les champs'
  }
}

const inputType = ref('password')

const handleDisplayPassword = () => {
  inputType.value = inputType.value === 'password' ? 'text' : 'password'
}
</script>

<template>
  <main>
    <div class="container">
      <div class="content">
        <h2>Bonjour !</h2>
        <p>Inscrivez-vous pour découvrir toutes nos fonctionnalités.</p>

        <form @submit.prevent="submitSignUp">
          <label for="username">Nom <span>*</span></label>
          <input
            type="text"
            name="username"
            id="username"
            v-model="username"
            @input="clearErrorMessage"
          />
          <label for="email">E-mail <span>*</span></label>
          <input type="text" name="email" id="email" v-model="email" @input="clearErrorMessage" />

          <label for="password">Mot de passe<span>*</span></label>
          <div class="password-block">
            <input
              :type="inputType"
              name="password"
              id="password"
              v-model="password"
              @input="clearErrorMessage"
            />
            <div v-if="inputType === 'text'" @click="handleDisplayPassword">
              <font-awesome-icon :icon="['far', 'eye']" />
            </div>
            <div v-else @click="handleDisplayPassword">
              <font-awesome-icon :icon="['far', 'eye-slash']" />
            </div>
          </div>

          <button v-if="!isConnected">
            S'inscrire <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </button>
          <button type="button" v-else>Création en cours ...</button>
        </form>

        <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
        <p>
          Vous avez déjà un compte ? <RouterLink :to="{ name: 'login' }">Connectez-vous</RouterLink>
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  margin-top: 110px;
}

.container {
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  background-image: url(../assets/img/illustration.png);
  background-size: cover;
  background-position: bottom;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ----- TOP BLOCK --------------------- */

.content {
  background-color: white;
  width: 480px;
  box-shadow: 0 0 10px var(--grey-light);
  border-radius: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.content p {
  margin-bottom: 5px;
  padding-left: 20px;
}

/* ---- FORM  ------------------------------*/

form {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
}

label {
  font-size: 16px;
  font-weight: 500;
}
label span {
  font-size: 12px;
}

input {
  height: 45px;
  border-radius: 10px;
  border: 1px solid var(--medium-blue);
  outline: none;
  margin-bottom: 10px;
}

.password-block {
  display: flex;
  height: 45px;
  margin-bottom: 20px;
}

.password-block input {
  border-radius: 10px 0px 0px 10px;
  flex: 1;
}

.password-block > div {
  border: 1px solid var(--medium-blue);
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px 10px 10px 0px;
  border-left: none;
}

.password-block svg {
  color: var(--medium-blue);
  cursor: pointer;
}

button {
  background-color: var(--orange-main);
  color: white;
  font-size: 13px;
  border: none;
  padding: 15px;
  font-weight: bold;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

svg {
  font-size: 14px;
}

/* ------ BOTTOM BLOCK ---------------------------*/

.error-message {
  text-align: center;
  color: var(--orange-main);
}

.content p:last-child {
  text-align: center;
  padding: 10px;
}

.content > div > p a {
  font-weight: bold;
  text-decoration: underline;
}
</style>
