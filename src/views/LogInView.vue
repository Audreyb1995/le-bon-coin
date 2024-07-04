<script setup>
import { ref, inject } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const identifier = ref('')
const password = ref('')

const errorMessage = ref('')
const isConnected = ref(false)

const clearErrorMessage = () => {
  errorMessage.value = ''
}

const GlobalStore = inject('GlobalStore')

const submitLogIn = async () => {
  if (identifier.value && password.value) {
    try {
      isConnected.value = true
      const { data } = await axios.post(
        'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local',
        {
          identifier: identifier.value,
          password: password.value
        }
      )

      GlobalStore.changeUserInfos({
        username: data.user.username,
        token: data.jwt
      })

      router.push({ name: 'home' })

      console.log(data)
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
          <p>Connectez-vous pour découvrir toutes nos fonctionnalités.</p>
        </div>

        <form @submit.prevent="submitLogIn">
          <label for="identifier">E-mail<span>*</span></label>
          <input
            type="text"
            name="identifier"
            id="identifier"
            v-model="identifier"
            @input="clearErrorMessage"
          />
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
            Se connecter <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </button>
          <button v-else type="button">Connexion en cours ...</button>
        </form>
        <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
        <p>
          Envie de nous rejoindre ?
          <RouterLink :to="{ name: 'signup' }">Créer un compte</RouterLink>
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
  background-image: url(../assets/img/illustration.png);
  background-size: cover;
  background-position: bottom;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ----- TOP BLOCK ----------------- */

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
  font-size: 16px;
  padding: 10px 0;
}

/* ----- FORM PART ------------------ */

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  margin: 40px 0px;
  justify-content: space-between;
}

label span {
  font-size: 12px;
}
input {
  height: 45px;
  border-radius: 10px;
  border: 1px solid var(--medium-blue);
  outline: none;
}

.password-block {
  display: flex;
  height: 45px;
  margin-bottom: 20px;
}

.password-block input {
  border-radius: 10px 0px 0px 10px;
  margin-bottom: 10px;
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
}

svg {
  font-size: 14px;
}

/* ---------  BOTTOM PART -----------------------*/

.error-message {
  text-align: center;
  color: var(--orange-main);
  font-size: 16px;
}

.content > p {
  text-align: center;
}

.content > p a {
  font-weight: bold;
  text-decoration: underline;
}
</style>
