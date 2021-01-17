<template>
  <card-component
    class="has-table"
    :title="headerTitle"
    :icon="headerIcon"
    :header-btn-text="headerBtnText"
    :header-btn-icon="headerBtnIcon"
    :header-btn-class="headerBtnClass"
    :has-actions="hasActions"
    @header-btn-click="$emit('header-btn-click')"
  >
    <template v-if="hasDateFilter || hasColumnFilter" #action-left="{ type }">
      <data-table-filters
        :class="type"
        :has-date-filter="hasDateFilter"
        :has-column-filter="hasColumnFilter"
        :col-filters="colFilters"
        :toggleFilter="toggleFilter"
        @filter="onChangeDate($event)"
      />
    </template>
    <template v-if="hasEditColumn || hasDaydrop" #action-right="{ type }">
      <data-table-coldrop
        v-if="hasEditColumn"
        label="Edit Columns"
        :class="type"
        :original-columns="columns"
        @filter="($event) => finalColumns = $event"
      />
      <data-table-daydrop
        v-if="hasDaydrop"
        :class="type"
        :toggleDrop="toggleDrop"
        @day-filter="onChangeDaydrop($event)"
      />
    </template>
    <b-table
      :default-sort="[defaultSortField, defaultSortOrder]"
      :loading="isLoading"
      :paginated="data && data.length > perPage && hasVisibleCols"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      :scrollable="true"
      :pagination-size="'is-small'"
      :checkable="checkable"
      :data="data"
    >
      <slot></slot>
      <template v-for="(col, idx) in finalColumns">
        <b-table-column
          v-slot="props"
          :label="col.label"
          :field="col.field"
          :sortable="col.sortable"
          :visible="col.visible"
          :centered="col.centered"
          :key="col.field+idx"
        >
          <small v-if="col.date" class="has-text-grey is-abbr-like">
            {{ props.row[col.field] | toDate(!!(col.withTime)) }}
          </small>
          <small v-else class="has-text-grey is-abbr-like">
            {{ props.row[col.field] }}
          </small>
        </b-table-column>
      </template>
      <b-table-column
        v-if="showEdit"
        :visible="hasVisibleCols"
        custom-key="actions"
        sticky
        cell-class="is-actions-cell is-sticky__right"
        header-class="is-sticky__right"
        v-slot="props"
      >
        <div class="buttons is-right">
          <button
            class="button is-small is-primary is-outlined"
            title="edit"
            @click="editRecord(props.row)"
          >
            <b-icon icon="account-edit" size="is-small" />
          </button>
        </div>
      </b-table-column>

      <section class="section" slot="empty">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large" />
            </p>
            <p>Fetching data...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large" />
            </p>
            <p>Nothing's there&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
  </card-component>
</template>

<script>
import CardComponent from '@/views/components/CardComponent'
import DataTableColdrop from '@/views/components/DataTableColdrop'
import DataTableDaydrop from '@/views/components/DataTableDaydrop'
import DataTableFilters from '@/views/components/DataTableFilters'

export default {
  name: 'DataTable',
  components: { CardComponent, DataTableColdrop, DataTableDaydrop, DataTableFilters },
  props: {
    data: { type: Array, default: () => [] },
    columns: { type: Array, default: () => [] },
    checkable: { type: Boolean, default: false },
    perPage: { type: Number, default: 10 },
    isLoading: { type: Boolean, default: false },
    defaultSortField: { type: String, default: 'name' },
    defaultSortOrder: { type: String, default: 'asc' },
    showEdit: { type: Boolean, default: false },
    hasDateFilter: { type: Boolean, default: false },
    hasColumnFilter: { type: Boolean, default: false },
    colFilters: { type: Array, default: null },
    hasEditColumn: { type: Boolean, default: false },
    hasDaydrop: { type: Boolean, default: false },
    headerTitle: { type: String, default: null },
    headerIcon: { type: String, default: null },
    headerBtnText: { type: String, default: null },
    headerBtnIcon: { type: String, default: null },
    headerBtnClass: { type: String, default: null }
  },
  data () {
    return {
      finalColumns: JSON.parse(JSON.stringify(this.columns)),
      toggleFilter: false,
      toggleDrop: false
    }
  },
  computed: {
    hasVisibleCols () {
      return this.finalColumns.filter(col => col.visible).length > 0
    },
    hasActions () {
      return this.hasDateFilter || this.hasColumnFilter || this.hasEditColumn || this.hasDaydrop
    }
  },
  methods: {
    editRecord (record) {
      if (record && record.id) {
        this.$router.push(
          {
            path: `${this.$route.path}/${record.id}/edit`,
            ...(record.qrCodeId ? { query: { code: record.qrCodeId } } : {})
          })
      }
    },
    onChangeDate (query) {
      this.toggleDrop = !this.toggleDrop
      this.$emit('filter', query)
    },
    onChangeDaydrop (query) {
      this.toggleFilter = !this.toggleFilter
      this.$emit('day-filter', query)
    }
  }
}
</script>
