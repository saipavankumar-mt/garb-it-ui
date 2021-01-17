<template>
  <data-table
    :data="data"
    :columns="recordColumns"
    :per-page="5"
    :loading="isLoading"
    :has-daydrop="true"
    :has-date-filter="true"
    :has-column-filter="true"
    :col-filters="['clientId', 'employeeId']"
    :defaultSortField="`${recordColumns[0].field}`"
    @day-filter="searchRecords($event)"
    @filter="searchRecords($event)"
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
  name: 'Records',
  components: { DataTable },
  data () {
    return {
      isLoading: false,
      headerItems: {
        headerTitle: 'Records',
        headerIcon: 'book-open-variant',
        headerBtnText: 'Export',
        headerBtnClass: 'is-info'
      }
    }
  },
  created () {
    this.searchRecords()
  },
  computed: {
    ...mapState('dashboard', {
      data: state => state.recordList
    }),
    ...mapGetters('dashboard', ['recordColumns'])
  },
  methods: {
    ...mapActions('dashboard', ['getRecordList']),
    //
    searchRecords (params = null) {
      const query = params || { fromDate: lowestDate(), toDate: dayEnd() }
      const request = []
      this.isLoading = true
      this.getRecordList({ request, ...query })
        .then((r) => { this.isLoading = false })
        .catch((e) => { this.isLoading = false })
    },
    //
    exportData () {
      let csvContent = 'data:text/csv;charset=utf-8,'
      csvContent += [
        this.recordColumns.map(col => col.label).join(','),
        ...this.data.map(item => Object.values(item).join(','))
      ]
        .join('\n')
        .replace(/(^\[)|(\]$)/gm, '')

      const data = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', data)
      link.setAttribute('download', 'records.csv')
      link.click()
    }
  }
}
</script>
