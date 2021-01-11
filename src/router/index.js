import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'

/* routes */
import { routes } from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters['user/isLoggedIn']
  const isUnauthorizedSuper = to.path === '/unauthorized' && !to.params.isLogout && store.getters['user/isSuperAdmin']
  const currentRole = store.state.user.role
  if (isLoggedIn) {
    if ((to.name === 'login') || (isUnauthorizedSuper)) { next('/') }
    if (to.meta && to.meta.authRoles && !to.meta.authRoles.includes(currentRole)) { next('/unauthorized') }
    next()
  } else if (to.name !== 'login') {
    next('/login')
  } else {
    next()
  }
})

export default router
