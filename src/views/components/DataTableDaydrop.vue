<template>
  <b-dropdown
    append-to-body
    v-model="currentMenu"
    aria-role="list"
    position="is-bottom-left"
    max-height="150px"
    :scrollable="true"
    @change="search"
  >
    <template #trigger="{ active }">
      <b-button
        :label="currentMenu.label"
        type="is-small"
        :icon-right="active ? 'menu-up' : 'menu-down'"
      />
    </template>

    <b-dropdown-item
      v-for="(menu, index) in menus"
      :key="index"
      :value="menu"
      aria-role="listitem"
      :focusable="false"
    >
      {{menu.label}}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { dayEnd, dayStart, yesterday, last7thDay, last30thDay } from '@/utils/foratters/date'

export default {
  name: 'DataTableDaydrop',
  props: {
    toggleDrop: { type: Boolean, default: false },
    isForGraph: { type: Boolean, default: false },
    defaultDrop: { type: Object, default: null }
  },
  data () {
    return {
      currentMenu: {}
    }
  },
  created () {
    this.currentMenu = this.menus[0]
  },
  computed: {
    menus () {
      const menuItems = [
        { label: 'Today', code: 'day' },
        { label: 'Last 7 days', code: 'week' },
        { label: 'Last 30 days', code: 'month' }
        // { label: 'All', code: 'ALL' }
      ]

      return this.isForGraph ? menuItems.filter(item => item.code !== 'day') : menuItems
    }
  },
  watch: {
    toggleDrop () {
      this.currentMenu = this.defaultDrop || this.menus[0]
    }
  },
  methods: {
    search (value) {
      let fromDate
      let toDate
      switch (value.code) {
        case 'day':
          fromDate = dayStart()
          toDate = dayEnd()
          break
        case 'week':
          fromDate = last7thDay
          toDate = yesterday
          break
        case 'month':
          fromDate = last30thDay
          toDate = yesterday
          break
        default:
          fromDate = dayStart()
          toDate = dayEnd()
          break
      }
      this.$emit('day-filter', { fromDate, toDate })
    }
  }

}
</script>
