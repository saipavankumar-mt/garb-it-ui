<template>
  <card-component class="has-table" :has-actions="true">
    <template #action-right="props">
      <data-table-coldrop
        :class="props.type"
        title="Columns to display"
        label="Edit Columns"
        :original-columns="columns"
        @filter="($event) => finalColumns = $event"
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
          :key="col.field+idx"
        >
          <small v-if="col.date" class="has-text-grey is-abbr-like">
            {{ props.row[col.field] | toDate }}
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

export default {
  name: 'DataTable',
  components: { CardComponent, DataTableColdrop },
  props: {
    data: { type: Array, default: () => [] },
    columns: { type: Array, default: () => [] },
    checkable: { type: Boolean, default: false },
    perPage: { type: Number, default: 10 },
    isLoading: { type: Boolean, default: false },
    defaultSortField: { type: String, default: 'name' },
    defaultSortOrder: { type: String, default: 'asc' },
    showEdit: { type: Boolean, default: false }
  },
  data () {
    return {
      finalColumns: JSON.parse(JSON.stringify(this.columns))
    }
  },
  computed: {
    hasVisibleCols () {
      return this.finalColumns.filter(col => col.visible).length > 0
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
    }
  }
}
</script>
