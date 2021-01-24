<template>
  <section class="section">
    <title-bar>
      Employees
      <router-link
        to="/employees/create"
        class="button is-primary is-small"
        slot="button"
      >
        <b-icon size="is-small" icon="account-plus" />
        <span>Create Employee</span>
      </router-link>
    </title-bar>

    <data-table
      :data="data"
      :columns="columns"
      :per-page="10"
      :loading="isLoading"
      :show-edit="true"
      :has-edit-column="true"
      :has-column-filter="true"
      :col-filters="colFilters"
      :defaultSortField="`${columns[0].field}`"
      @click-col-filter="searchEmployees($event)"
    >
    </data-table>
  </section>
</template>

<script>
import DataTable from '@/views/components/DataTable'
import TitleBar from '@/views/components/TitleBar'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Employees',
  components: { TitleBar, DataTable },
  data () {
    return {
      isLoading: false
    }
  },
  created () {
    this.searchEmployees()
  },
  computed: {
    ...mapState('employee', {
      data: state => state.employeeList
    }),
    ...mapGetters('employee', ['columns', 'colFilters'])
  },
  methods: {
    ...mapActions('employee', ['getEmployees']),
    //
    searchEmployees (event = null) {
      const request = (event && event.request) || []
      this.isLoading = true
      this.getEmployees(request)
        .then((r) => { this.isLoading = false })
        .catch((e) => { this.isLoading = false })
    }
  }
}
</script>
