import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'

/* routes */
import { routes } from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
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
  const isSuperAdmin = store.getters['user/isSuperAdmin']
  const isUnauthorizedSuper = to.path === '/unauthorized' && !to.params.isLogout && isSuperAdmin
  const currentRole = store.state.user.role
  if (isLoggedIn) {
    if (to.name === 'home') { return isSuperAdmin ? next('/admins') : next('/dashboard') }
    if ((to.name === 'login') || (isUnauthorizedSuper)) { next('/') }
    if (to.meta && to.meta.authRoles && !to.meta.authRoles.includes(currentRole)) { next('/unauthorized') }
    next()
  } else if (!['login', 'privacy-policy'].includes(to.name)) {
    next('/login')
  } else {
    next()
  }
})

export default router
