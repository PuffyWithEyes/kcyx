import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import MeView from '../views/MeView.vue'
import UserProfile from '../views/UserProfile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView, 
    },
    {
      path: '/me',
      name: 'me',
      component: MeView,
    },
    {
      path: '/user/:username',
      name: 'user',
      component: UserProfile,
      props: true,
    }
  ],
})

export default router
