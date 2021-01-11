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
        <span>Create new</span>
      </router-link>
    </title-bar>

    <data-table
      :data="data"
      :columns="columns"
      :per-page="5"
      :loading="isLoading"
      :show-edit="true"
      :defaultSortField="`${columns[0].field}`"
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
    this.isLoading = true
    this.getEmployees()
      .then((r) => { this.isLoading = false })
      .catch((e) => { this.isLoading = false })
  },
  computed: {
    ...mapState('employee', {
      data: state => state.employeeList
    }),
    ...mapGetters('employee', ['columns'])
  },
  methods: {
    ...mapActions('employee', ['getEmployees'])
  }
}
</script>
