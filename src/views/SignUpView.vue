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

const GlobalStore = inject('GlobalStore')

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

      GlobalStore.changeUserInfos({
        username: data.user.username,
        token: data.jwt
      })

      $cookies.set('UserCookie', GlobalStore.userInfos.value.username)
      $cookies.set('TokenCookie', GlobalStore.userInfos.value.token)

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
        <div>
          <h2>Bonjour !</h2>
          <p>Inscrivez-vous pour découvrir toutes nos fonctionnalités.</p>
        </div>

        <form @submit.prevent="submitSignUp">
          <label for="username">Nom <sup>*</sup></label>
          <input
            type="text"
            name="username"
            id="username"
            v-model="username"
            @input="clearErrorMessage"
          />
          <label for="email">E-mail <sup>*</sup></label>
          <input type="text" name="email" id="email" v-model="email" @input="clearErrorMessage" />

          <label for="password">Mot de passe <sup>*</sup></label>
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
  height: calc(100vh - var(--header-height) - var(--footer-height));
}

.container {
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
  height: 490px;
  box-shadow: 0 0 10px var(--grey-light);
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.content > div p {
  padding: 10px 0;
}

/* ---- FORM  ------------------------------*/

form {
  display: flex;
  flex-direction: column;

  gap: 10px;
}

input {
  height: 45px;
  border-radius: 10px;
  border: 1px solid var(--medium-blue);
  outline: none;
}

sup {
  color: var(--medium-blue);
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
  color: var(--orange-main);
  margin: 20px 0px;
}

.content > p {
  text-align: center;
}

.content > p a {
  font-weight: bold;
  text-decoration: underline;
}
</style>
