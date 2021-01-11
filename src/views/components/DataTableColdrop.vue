<template>
  <b-dropdown
    class="data-table-coldrop"
    position="is-bottom-left"
    append-to-body
    aria-role="menu"
    trap-focus
    ref="dropdown"
  >
    <template #trigger>
      <a class="navbar-item" role="button">
        <small v-if="label" class="has-text-grey mr-1">{{label}}</small>
        <b-icon icon="table-merge-cells" size="default"></b-icon>
      </a>
    </template>

    <b-dropdown-item
      aria-role="menu-item"
      :focusable="false"
      custom
      paddingless
    >
      <div class="card coldrop-body">
        <div class="coldrop-header">
          <b-checkbox
            :indeterminate="allCol.selected !== 0 && allCol.selected !== allCol.total"
            @input="toggleAll"
            v-model="allSelect"
          >
            <span
              v-if="allCol.selected && allCol.total && allCol.selected !== allCol.total"
            >
              {{ allCol.selected }} / {{ allCol.total }} selected
            </span>
            <span v-else-if="allSelect"> All {{allCol.total}} selected </span>
            <span v-else>Select All</span>
          </b-checkbox>
        </div>
        <hr />
        <div class="coldrop-content">
          <b-checkbox
            v-for="(col, idx) in selectedCols"
            class="column is-full"
            v-model="col.visible"
            :key="col.field+idx"
            >{{col.label}}</b-checkbox
          >
        </div>
        <hr />
        <div class="buttons is-right coldrop-footer">
          <button
            class="button is-light is-small"
            @click.prevent="cancelFilter"
          >
            cancel
          </button>
          <button
            class="button is-success is-light is-small"
            @click.prevent="applyFilter"
          >
            ok
          </button>
        </div>
      </div>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>

export default {
  name: 'DataTableColdrop',
  props: {
    originalColumns: { type: Array, default: () => [] },
    label: { type: String, default: null }
  },
  data () {
    return {
      finalColumns: JSON.parse(JSON.stringify(this.originalColumns)),
      selectedCols: JSON.parse(JSON.stringify(this.originalColumns)),
      allSelect: false
    }
  },

  mounted () {
    this.allSelect = !!(this.allCol.selected === this.allCol.total)
  },
  computed: {
    visibleFinalCols () {
      return this.finalColumns.filter(col => col.visible).length
    },
    visibleSelectedCols () {
      return this.selectedCols.filter(col => col.visible).length
    },
    allCol () {
      const total = this.originalColumns.length
      const selected = this.visibleSelectedCols
      return { selected, total }
    }
  },
  methods: {
    toggleAll (value) {
      this.selectedCols = this.selectedCols.reduce((list, col) => {
        col.visible = value
        list.push(col)
        return list
      }, [])
    },
    cancelFilter () {
      if (this.visibleFinalCols !== this.visibleSelectedCols) {
        this.selectedCols = JSON.parse(JSON.stringify(this.finalColumns))
      }
      this.$refs.dropdown.toggle()
    },
    applyFilter () {
      this.finalColumns = JSON.parse(JSON.stringify(this.selectedCols))
      this.$refs.dropdown.toggle()
      this.$emit('filter', this.finalColumns)
    }
  }
}
</script>
