import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogInView from '../views/LogInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import PaymentView from '@/views/PaymentView.vue'

import { inject } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: (route) => ({
        title: route.query.title || '',
        minPrice: Number(route.query.minPrice) || '',
        maxPrice: Number(route.query.maxPrice) || '',
        sort: route.query.sort || '',
        page: parseInt(route.query.page) || 1
      })
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
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('../views/PublishView.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/payment/:id',
      name: 'payment',
      component: PaymentView,
      props: true,
      meta: { requireAuth: true }
    }
  ],

  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})

router.beforeEach((to, from) => {
  const GlobalStore = inject('GlobalStore')

  if (to.meta.requireAuth && !GlobalStore.userInfos.value.token) {
    return { name: 'login', query: { redirect: to.path }, params: to.params }
  }
})

export default router
