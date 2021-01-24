<template>
  <div
    id="layout"
    class="has-aside-left has-aside-mobile-transition has-navbar-fixed-top has-aside-expanded"
  >
    <nav-bar />
    <aside-menu :menu="menu" />
    <section class="main">
      <router-view />
    </section>
    <footer-bar />
  </div>
</template>

<style lang="scss">
</style>
<script>
import NavBar from '@/views/components/NavBar'
import AsideMenu from '@/views/components/AsideMenu'
import FooterBar from '@/views/components/FooterBar'

import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: { FooterBar, AsideMenu, NavBar },
  computed: {
    ...mapGetters('user', ['isSuperAdmin']),
    menu () {
      return [
        {
          to: '/dashboard',
          label: 'Dashboard',
          icon: 'desktop-mac',
          hide: this.isSuperAdmin
        },
        {
          to: '/admins',
          label: 'Admins',
          icon: 'shield-account',
          hide: !this.isSuperAdmin
        },
        {
          to: '/clients',
          label: 'Households',
          icon: 'home-group',
          hide: this.isSuperAdmin
        },
        {
          to: '/employees',
          label: 'Employees',
          icon: 'clipboard-account',
          hide: this.isSuperAdmin
        }
      ]
    }
  }
}
</script>
