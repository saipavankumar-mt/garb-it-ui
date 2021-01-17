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
import { dayEnd, dayStart, lowestDate, monthStart, weekStart } from '@/utils/foratters/date'

export default {
  name: 'DataTableDaydrop',
  props: {
    toggleDrop: { type: Boolean, default: false }
  },
  data () {
    return {
      currentMenu: { label: 'All', code: 'ALL' },
      menus: [
        { label: 'Today', code: 'day' },
        { label: 'This week', code: 'week' },
        { label: 'This month', code: 'month' },
        { label: 'All', code: 'ALL' }
      ]
    }
  },
  watch: {
    toggleDrop () {
      this.currentMenu = { label: 'All', code: 'ALL' }
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
          fromDate = weekStart()
          toDate = dayEnd()
          break
        case 'month':
          fromDate = monthStart()
          toDate = dayEnd()
          break
        default:
          fromDate = lowestDate()
          toDate = dayEnd()
          break
      }
      this.$emit('day-filter', { fromDate, toDate })
    }
  }

}
</script>
