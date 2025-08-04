import { createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'
import { privateRoutes } from './private/routes'
import { publicRoutes } from './public/routes'
import { useUserStore } from '@entities'

const routes = publicRoutes.concat(privateRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const authRoutes = ['login', 'register']

router.beforeEach((to, _, next) => {
  const userStore = useUserStore()

  if (authRoutes.includes(to.name as string) && userStore.isAuthenticated) {
    next({ name: 'home' })
  } else if (!authRoutes.includes(to.name as string) && !userStore.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export { router }
