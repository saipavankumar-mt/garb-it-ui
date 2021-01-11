<template>
  <b-datepicker
    icon="calendar-today"
    v-model="date"
    :placeholder="placeholder"
    :min-date="minDate"
    :max-date="maxDate"
    :date-formatter="dateFormatter"
    :disabled="disabled"
    :position="position"
    :unselectable-days-of-week="unselectableDaysOfWeek"
    :years-range="yearsRange"
    v-bind="$attrs"
    ref="datepicker"
  >
    <button class="button is-primary" @click.prevent="clearDate()">
      <b-icon icon="close" class="close-icon"></b-icon>
      <span>Clear</span>
    </button>
  </b-datepicker>
</template>

<script>
import { dateFormatter } from '@/utils/foratters'
import dayjs from 'dayjs'

export default {
  name: 'Datepicker',
  props: {
    placeholder: { type: String, default: null },
    minDate: { type: Date, default: null },
    maxDate: { type: Date, default: null },
    disabled: { type: Boolean, default: false },
    position: { type: String, default: null },
    unselectableDaysOfWeek: { type: Array, default: null },
    yearsRange: { type: Array, default: null },
    /** `value prop` which will be used in the `v-model` definition */
    value: { default: null }
  },
  computed: {
    date: {
      get () {
        return this.value ? new Date(this.value) : null
      },
      set (value) {
        const formattedDate = value ? dayjs(value).format() : null
        this.$emit('input', formattedDate)
        console.log({ formattedDate })
      }
    }
  },
  methods: {
    clearDate () {
      /** calling buefy date picker's `toggle` method */
      const dateRef = this.$refs.datepicker
      dateRef.toggle()
      this.date = null
      this.$emit('cleardate')
    },
    dateFormatter (date) {
      return dateFormatter(date)
    }
  }
}
</script>
