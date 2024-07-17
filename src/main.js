import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'

import VueCookies from 'vue-cookies'

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
  faArrowRightFromBracket,
  faAngleLeft,
  faAngleRight,
  faCameraAlt,
  faCheck
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
  faEyeSlash,
  faAngleLeft,
  faAngleRight,
  faCameraAlt,
  faCheck
)

/* ------------------ */

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

/* ------ DEPENDENCY PROVIDER ----- */

const userInfos = ref(
  $cookies.get('userInfos') || {
    id: '',
    username: '',
    token: ''
  }
)

const changeUserInfos = (infos) => {
  userInfos.value = infos
}

app.provide('GlobalStore', { userInfos: userInfos, changeUserInfos: changeUserInfos })

app.use(router)
app.use(VueCookies)

app.mount('#app')
