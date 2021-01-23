<template>
  <div>
    <data-table
      :data="paginatedData"
      :columns="recordColumns"
      :per-page="perPage"
      :loading="isLoading"
      :has-daydrop="true"
      :has-date-filter="true"
      :has-column-filter="true"
      :col-filters="['ClientId', 'EmployeeId']"
      :defaultSortField="`${recordColumns[0].field}`"
      :total-records="total"
      :backend-pagination="true"
      @page-change="onPageChange"
      @click-day-filter="searchRecords($event)"
      @click-col-filter="searchRecords($event)"
      @header-btn-click="isModalActive = true"
      v-bind="headerItems"
    >
    </data-table>
    <b-modal
      v-model="isModalActive"
      has-modal-card
      :can-cancel="!exporting"
      :on-cancel="resetModal"
    >
      <div class="modal-card export-modal">
        <section class="modal-card-body">
          <b-field
            label="Select Date to export records for"
            custom-class="is-small"
            :type="exportError ? 'is-danger' : ''"
            :message="exportError ? ['No data found for selected date', 'Please select a valid date'] : ''"
          >
            <datepicker
              v-model="exportDate"
              placeholder="Click to select..."
              icon="calendar-today"
              position="is-bottom-left"
              size="is-small"
              type="is-only-date"
              name="exportDate"
              :years-range="[-100, 100]"
              trap-focus
              required
              @input="exportError = false"
            />
          </b-field>
          <hr class="mb-4 mt-4" />
          <button
            class="button is-small is-primary"
            :class="{'is-loading' : exporting}"
            :disabled="!exportDate || exportError"
            @click.prevent="exportData()"
          >
            download csv
          </button>
        </section>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import DataTable from '@/views/components/DataTable'
import Datepicker from '@/views/components/Datepicker'

export default {
  name: 'Records',
  components: { DataTable, Datepicker },
  data () {
    return {
      isLoading: false,
      headerItems: {
        headerTitle: 'Records',
        headerIcon: 'book-open-variant',
        headerBtnText: 'Export',
        headerBtnClass: 'is-info'
      },
      perPage: 20,
      paginatedData: [],
      paginationToken: null,
      loadMore: false,
      apiRequest: null,
      isModalActive: false,
      exportDate: null,
      exporting: false,
      exportError: false
    }
  },
  created () {
    this.searchRecords()
  },
  computed: {
    ...mapState('dashboard', {
      data: state => state.recordList,
      exportRecords: state => state.recordExport
    }),
    ...mapGetters('dashboard', ['recordColumns']),
    total () {
      if (this.loadMore) {
        const reminder = this.paginatedData.length % this.perPage
        if (reminder !== 0) {
          return this.paginatedData.length + this.perPage - reminder
        }
        return this.paginatedData.length + this.perPage
      }
      return this.paginatedData.length
    }
  },
  methods: {
    ...mapActions('dashboard', ['getRecordList', 'getRecordsToExport']),
    //
    async searchRecords (params = null, isNew = true) {
      if (isNew) {
        this.paginatedData = []
        this.paginationToken = null
      }
      const query = this.apiRequest = params || {}
      this.isLoading = true
      try {
        await this.getRecordList({ ...query, paginationToken: this.paginationToken })
        this.isLoading = false
        this.paginatedData = [...this.paginatedData, ...this.data.recordEntries]
        const nextToken = JSON.parse(this.data.paginationToken)
        this.paginationToken = Object.keys(nextToken).length ? JSON.stringify(nextToken) : null
        this.loadMore = false
        //
        if (this.paginationToken) {
          this.loadMore = true
        }
      } catch (error) {
        this.isLoading = false
        this.loadMore = false
      }
    },
    //
    async onPageChange (pageNumber) {
      const reminder = this.paginatedData.length % this.perPage
      const subValue = reminder !== 0 ? this.perPage - reminder : this.perPage
      if (this.loadMore && pageNumber === Math.round(this.total / this.perPage) &&
        ((this.total - subValue) === this.paginatedData.length)) {
        await this.searchRecords(this.apiRequest, false)
      }
    },
    //
    resetModal () {
      this.exportError = false
      this.exportDate = null
      this.isModalActive = false
    },
    //
    async exportData () {
      this.exportError = false
      this.exporting = true
      try {
        await this.getRecordsToExport(this.exportDate)
        this.exporting = false
        if (this.exportRecords.length) {
          this.resetModal()
          let csvContent = 'data:text/csv;charset=utf-8,'
          csvContent += [
            this.recordColumns.map(col => col.label).join(','),
            ...this.exportRecords.map(item => Object.values(item).join(','))
          ]
            .join('\n')
            .replace(/(^\[)|(\]$)/gm, '')

          const data = encodeURI(csvContent)
          const link = document.createElement('a')
          link.setAttribute('href', data)
          link.setAttribute('download', 'records.csv')
          link.click()
        } else {
          this.exportError = true
        }
      } catch (error) {
        this.exporting = false
        this.exportError = true
      }
    }
  }
}
</script>
