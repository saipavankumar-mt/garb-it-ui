<template>
  <data-table
    :data="data"
    :columns="empScanColumns"
    :per-page="5"
    :loading="isLoading"
    :has-daydrop="true"
    :has-date-filter="true"
    :defaultSortField="`${empScanColumns[0].field}`"
    @day-filter="getScanCount($event)"
    @filter="getScanCount($event)"
    @header-btn-click="exportData()"
    v-bind="headerItems"
  >
  </data-table>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import DataTable from '@/views/components/DataTable'
import { dayEnd, lowestDate } from '@/utils/foratters/date'

export default {
  name: 'EmpScanCount',
  components: { DataTable },
  data () {
    return {
      isLoading: false,
      headerItems: {
        headerTitle: 'Employee scan count',
        headerIcon: 'account-check',
        headerBtnText: 'Export',
        headerBtnClass: 'is-info'
      }
    }
  },
  created () {
    this.getScanCount()
  },
  computed: {
    ...mapState('dashboard', {
      data: state => state.empScanCountList
    }),
    ...mapGetters('dashboard', ['empScanColumns'])
  },
  methods: {
    ...mapActions('dashboard', ['getEmpScanList']),
    //
    getScanCount (params = null) {
      const query = params || { fromDate: lowestDate(), toDate: dayEnd() }
      this.isLoading = true
      this.getEmpScanList({ ...query })
        .then((r) => { this.isLoading = false })
        .catch((e) => { this.isLoading = false })
    },
    //
    exportData () {
      let csvContent = 'data:text/csv;charset=utf-8,'
      csvContent += [
        this.empScanColumns.join(','),
        ...this.data.map(item => Object.values(item).join(','))
      ]
        .join('\n')
        .replace(/(^\[)|(\]$)/gm, '')

      const data = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', data)
      link.setAttribute('download', 'employee_scan_count.csv')
      link.click()
    }
  }
}
</script>
