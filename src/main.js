import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { ref } from 'vue'

/* ------- IMPORT FONTAWESOME ------  */
import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faPlusSquare,
  faUser,
  faHeart,
  faClock,
  faEye,
  faEyeSlash
} from '@fortawesome/free-regular-svg-icons'
import {
  faSearch,
  faCircle,
  faChevronRight,
  faChevronLeft,
  faLocationDot,
  faCheckDouble,
  faArrowRight,
  faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faPlusSquare,
  faSearch,
  faUser,
  faCircle,
  faHeart,
  faChevronLeft,
  faChevronRight,
  faLocationDot,
  faCheckDouble,
  faClock,
  faArrowRight,
  faArrowRightFromBracket,
  faEye,
  faEyeSlash
)

/* -------------------------*/

const userInfos = ref({
  username: '',
  token: ''
})

const changeUserInfos = (infos) => {
  userInfos.value = infos
}

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.provide('GlobalStore', { userInfos: userInfos, changeUserInfos: changeUserInfos })

app.use(router)

app.mount('#app')
