<template>
  <data-table
    :data="data"
    :columns="empScanColumns"
    :loading="isLoading"
    :has-daydrop="true"
    :has-date-filter="true"
    :defaultSortField="`${empScanColumns[0].field}`"
    @click-day-filter="getScanCount($event)"
    @click-col-filter="getScanCount($event)"
    v-bind="headerItems"
  >
  </data-table>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import DataTable from '@/views/components/DataTable'

export default {
  name: 'EmpScanCount',
  components: { DataTable },
  data () {
    return {
      isLoading: false,
      headerItems: {
        headerTitle: 'Employee scan count',
        headerIcon: 'account-check'
        // headerBtnText: 'Export',
        // headerBtnClass: 'is-info'
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
      const query = params || {}
      this.isLoading = true
      this.getEmpScanList({ ...query })
        .then((r) => { this.isLoading = false })
        .catch((e) => { this.isLoading = false })
    }
    //
    // exportData () {
    //   let csvContent = 'data:text/csv;charset=utf-8,'
    //   csvContent += [
    //     this.empScanColumns.join(','),
    //     ...this.data.map(item => Object.values(item).join(','))
    //   ]
    //     .join('\n')
    //     .replace(/(^\[)|(\]$)/gm, '')

    //   const data = encodeURI(csvContent)
    //   const link = document.createElement('a')
    //   link.setAttribute('href', data)
    //   link.setAttribute('download', 'employee_scan_count.csv')
    //   link.click()
    // }
  }
}
</script>
