<template>
  <aside
      v-show="isAsideVisible"
      class="aside is-placed-left is-expanded">
    <h1 class="is-size-3 has-text-centered has-text-weight-semibold has-text-white-ter p-4">GarbIt</h1>
    <div class="menu is-menu-main">
      <aside-menu-list
          @menu-click="menuClick"
          :menu="menu"/>
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import AsideMenuList from '@/views/components/AsideMenuList'

export default {
  name: 'AsideMenu',
  components: { AsideMenuList },
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState([
      'isAsideVisible'
    ])
  },
  methods: {
    menuClick (item) {
      //
    }
  }
}
</script>
