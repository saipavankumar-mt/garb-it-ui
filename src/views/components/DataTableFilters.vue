<template>
  <b-field grouped group-multiline>
    <datepicker
      v-if="hasDateFilter && isSingleDate"
      append-to-body
      v-model="singleDate"
      placeholder="Select date..."
      icon="calendar-today"
      size="is-small"
      type="is-from-date"
      trap-focus
      :years-range="[-100, 100]"
      :max-date="new Date(toDate)"
      @cleardate="clearFilter()"
    />
    <datepicker
      v-if="hasDateFilter && !isSingleDate"
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
      v-if="hasDateFilter && !isSingleDate"
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
    <template v-for="filter in colFilters">
      <b-input
        v-if="hasColumnFilter"
        size="is-small"
        v-model="request[filter.field]"
        :placeholder="`Seach by ${filter.label}...`"
        :key="filter.field"
        @input="requestNotNull = !!(request[filter.field]);clearFilter()"
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
import { dayEnd } from '@/utils/foratters/date'

export default {
  name: 'DataTableFilters',
  components: { Datepicker },
  props: {
    hasColumnFilter: { type: Boolean, default: false },
    hasDateFilter: { type: Boolean, default: false },
    isSingleDate: { type: Boolean, default: false },
    toggleFilter: { type: Boolean, default: false },
    colFilters: { type: Array, default: () => [] }
  },
  data () {
    return {
      fromDate: null,
      toDate: null,
      singleDate: null,
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
      return !(this.fromDate || this.toDate || this.singleDate || this.requestNotNull)
    }
  },
  watch: {
    toggleFilter () {
      this.fromDate = null
      this.toDate = null
      this.singleDate = null
      this.requestNotNull = false
      this.request = {}
    }
  },
  methods: {
    search () {
      this.searchWhenClear = !this.searchWhenClear
      const fromDate = this.isSingleDate ? this.singleDate : this.fromDate
      const toDate = this.isSingleDate ? dayEnd(this.singleDate) : this.toDate
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
