import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import MeView from '../views/MeView.vue'
import AdminView from '../views/AdminView.vue'
import UserProfile from '../views/UserProfile.vue'
import PostView from '../views/PostView.vue'
import axios from 'axios'

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
      beforeEnter: async (_to, _from, next) => {
        try {
          const response = await axios.get('/me');
          if (response.status === 200) {
            next('/me');
          } else {
            next(); // Перенаправление на страницу входа
          }
        } catch (error) {
          next(); // Перенаправление на страницу входа
        }
      }
    },
    {
      path: '/me',
      name: 'me',
      component: MeView,
      beforeEnter: async (_to, _from, next) => {
        try {
          const response = await axios.get('/me');
          if (response.status === 200) {
            next();
          } else {
            next('/auth'); // Перенаправление на страницу входа
          }
        } catch (error) {
          next('/auth'); // Перенаправление на страницу входа
        }
      }
    },
    {
      path: '/user/:username',
      name: 'user',
      component: UserProfile,
      props: true,
    },
    {
      path: '/user/Admins',
      name: 'admins',
      component: AdminView, 
    },
    {
      path: '/users/:username/posts/:postId',
      name: 'post',
      component: PostView,
      props: true,
    },
  ],
})

export default router
