<template>
  <b-field grouped group-multiline>
    <datepicker
      v-if="hasDateFilter"
      append-to-body
      v-model="fromDate"
      placeholder="From date"
      icon="calendar-today"
      size="is-small"
      type="is-from-date"
      trap-focus
      :years-range="[-100, 100]"
      :max-date="toDate ? new Date(toDate) : null"
    />
    <datepicker
      v-if="hasDateFilter"
      append-to-body
      v-model="toDate"
      placeholder="To date"
      icon="calendar-today"
      size="is-small"
      type="is-to-date"
      trap-focus
      :years-range="[-100, 100]"
      :min-date="fromDate ? new Date(fromDate) : null"
    />
    <template v-for="field in colFilters">
      <b-input
        v-if="hasColumnFilter"
        size="is-small"
        v-model="request[field]"
        :placeholder="`Seach by ${field}...`"
        :key="field"
        @input="requestNotNull = !!(request[field])"
      ></b-input>
    </template>
    <button
      v-if="hasFilters"
      class="button is-primary is-small control"
      @click.prevent="search"
      :disabled="disableBtn"
    >
      search
    </button>
  </b-field>
</template>

<script>
import Datepicker from '@/views/components/Datepicker'

export default {
  name: 'DataTableFilters',
  components: { Datepicker },
  props: {
    hasColumnFilter: { type: Boolean, default: false },
    hasDateFilter: { type: Boolean, default: false },
    toggleFilter: { type: Boolean, default: false },
    colFilters: { type: Array, default: () => [] }
  },
  data () {
    return {
      fromDate: null,
      toDate: null,
      request: {},
      requestNotNull: false
    }
  },
  computed: {
    hasFilters () {
      return this.hasColumnFilter || this.hasDateFilter
    },
    disableBtn () {
      const disable = !(this.fromDate || this.toDate || this.requestNotNull)
      if (disable) { this.search() }
      return disable
    }
  },
  watch: {
    toggleFilter () {
      this.fromDate = null
      this.toDate = null
      this.request = {}
    }
  },
  methods: {
    search () {
      const fromDate = this.fromDate
      const toDate = this.toDate
      const request = []
      for (const [key, value] of Object.entries(this.request)) {
        request.push({
          searchByKey: key,
          searchByValue: value
        })
      }

      this.$emit('filter', { request, fromDate, toDate })
    }
  }

}

</script>
