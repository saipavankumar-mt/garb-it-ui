<template>
  <section class="section">
    <title-bar>
      Clients
      <router-link
        to="/clients/create"
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
      :per-page="10"
      :loading="isLoading"
      :show-edit="true"
      :hasEditColumn="true"
      :has-column-filter="true"
      :col-filters="['Id', 'PhoneNumber']"
      :defaultSortField="`${columns[0].field}`"
      @click-col-filter="searchClients($event)"
    >
    </data-table>
  </section>
</template>

<script>
import DataTable from '@/views/components/DataTable'
import TitleBar from '@/views/components/TitleBar'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Clients',
  components: { TitleBar, DataTable },
  data () {
    return {
      isLoading: false
    }
  },
  created () {
    this.searchClients()
  },
  computed: {
    ...mapState('client', {
      data: state => state.clientList
    }),
    ...mapGetters('client', ['columns'])
  },
  methods: {
    ...mapActions('client', ['getClients']),
    //
    searchClients (event = null) {
      const request = (event && event.request) || []
      this.isLoading = true
      this.getClients(request)
        .then((r) => { this.isLoading = false })
        .catch((e) => { this.isLoading = false })
    }
  }
}
</script>
