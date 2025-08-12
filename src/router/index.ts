import { createRouter, createWebHistory } from 'vue-router'
import NotesView from '../views/NotesView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'notes',
      component: NotesView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresGuest: true }
    }
  ],
})

// Route guard for authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Route requires authentication but user is not logged in
    next('/login')
  } else if (to.meta.requiresGuest && isAuthenticated) {
    // Route requires guest (not logged in) but user is authenticated
    next('/')
  } else {
    // Route is accessible
    next()
  }
})

export default router
