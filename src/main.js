import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faPlusSquare, faUser } from '@fortawesome/free-regular-svg-icons'
import { faSearch, faCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faPlusSquare, faSearch, faUser, faCircle)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
