import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogInView from '../views/LogInView.vue'
import SignUpView from '@/views/SignUpView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/offers/:id',
      name: 'offer',
      component: () => import('../views/OfferView.vue'),
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: LogInView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    }
  ]
})

export default router
