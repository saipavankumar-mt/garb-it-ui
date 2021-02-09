<template>
  <section class="section">
    <title-bar>
      Households
      <router-link
        to="/clients/create"
        class="button is-primary is-small"
        slot="button"
      >
        <b-icon size="is-small" icon="account-plus" />
        <span>Create Household</span>
      </router-link>
    </title-bar>

    <data-table
      :data="paginatedData"
      :columns="columns"
      :per-page="perPage"
      :loading="isLoading"
      :show-edit="true"
      :has-edit-column="true"
      :has-column-filter="true"
      :col-filters="colFilters"
      :defaultSortField="`${columns[0].field}`"
      :total-records="total"
      :backend-pagination="true"
      @page-change="onPageChange"
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
      isLoading: false,
      perPage: 20,
      paginatedData: [],
      paginationToken: null,
      loadMore: false,
      apiRequest: null
    }
  },
  created () {
    if (this.cachedData.length === 0) {
      this.searchClients()
    } else {
      this.paginatedData = this.cachedData
      this.setNextToken()
    }
  },
  computed: {
    ...mapState('client', {
      data: state => state.clientList,
      cachedData: state => state.cachedClients
    }),
    //
    ...mapGetters('client', ['columns', 'colFilters']),
    //
    //
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
    ...mapActions('client', ['getClients']),
    //
    async searchClients (params = null, isNew = true) {
      if (isNew) {
        this.paginatedData = []
        this.paginationToken = null
      }
      const query = this.apiRequest = params || {}
      this.isLoading = true
      try {
        await this.getClients({ ...query, paginationToken: this.paginationToken })
        this.isLoading = false
        this.paginatedData = [...this.paginatedData, ...this.data.clientInfos]
        this.$store.commit('client/SET_CACHED_CLIENTS', this.paginatedData)
        //
        this.setNextToken()
        //
      } catch (error) {
        this.isLoading = false
        this.loadMore = false
      }
    },
    //
    setNextToken () {
      const nextToken = JSON.parse(this.data.paginationToken)
      this.paginationToken = Object.keys(nextToken).length ? JSON.stringify(nextToken) : null
      this.loadMore = false
      //
      if (this.paginationToken) {
        this.loadMore = true
      }
    },
    //
    async onPageChange (pageNumber) {
      const reminder = this.paginatedData.length % this.perPage
      const subValue = reminder !== 0 ? this.perPage - reminder : this.perPage
      if (this.loadMore && pageNumber === Math.round(this.total / this.perPage) &&
        ((this.total - subValue) === this.paginatedData.length)) {
        await this.searchClients(this.apiRequest, false)
      }
    }
  }
}
</script>
