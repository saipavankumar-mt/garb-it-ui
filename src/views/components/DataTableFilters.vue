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
      @cleardate="clearFilter()"
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
      @cleardate="clearFilter()"
    />
    <template v-for="field in colFilters">
      <b-input
        v-if="hasColumnFilter"
        size="is-small"
        v-model="request[field]"
        :placeholder="`Seach by ${field}...`"
        :key="field"
        @input="requestNotNull = !!(request[field]);clearFilter()"
      />
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
      requestNotNull: false,
      searchWhenClear: false
    }
  },
  computed: {
    hasFilters () {
      return this.hasColumnFilter || this.hasDateFilter
    },
    disableBtn () {
      return !(this.fromDate || this.toDate || this.requestNotNull)
    }
  },
  watch: {
    toggleFilter () {
      this.fromDate = null
      this.toDate = null
      this.requestNotNull = false
      this.request = {}
    }
  },
  methods: {
    search () {
      this.searchWhenClear = !this.searchWhenClear
      const fromDate = this.fromDate
      const toDate = this.toDate
      const request = []
      for (const [key, value] of Object.entries(this.request)) {
        request.push({
          searchByKey: key,
          searchByValue: value
        })
      }

      this.$emit('col-filter', { request, fromDate, toDate })
    },
    //
    clearFilter () {
      if (this.disableBtn && this.searchWhenClear) {
        this.search()
      }
    }
  }

}

</script>
