<template>
  <section class="section">
    <title-bar>
      Admins
      <router-link
        to="/admins/create"
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
      :hasEditColumn="true"
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
  name: 'Admins',
  components: { TitleBar, DataTable },
  data () {
    return {
      isLoading: false
    }
  },
  created () {
    this.isLoading = true
    this.getAdmins()
      .then((r) => { this.isLoading = false })
      .catch((e) => { this.isLoading = false })
  },
  computed: {
    ...mapState('admin', {
      data: state => state.adminList
    }),
    ...mapGetters('admin', ['columns'])
  },
  methods: {
    ...mapActions('admin', ['getAdmins'])
  }
}
</script>
