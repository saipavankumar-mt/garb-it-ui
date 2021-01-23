<template>
  <b-datepicker
    class="scroll"
    ref="datepicker"
    icon="calendar-today"
    v-model="date"
    v-bind="$attrs"
    :placeholder="placeholder"
    :min-date="minDate"
    :max-date="maxDate"
    :date-formatter="dateFormatter"
    :disabled="disabled"
    :position="position"
    :unselectable-days-of-week="unselectableDaysOfWeek"
    :years-range="yearsRange"
    :size="size"
    @click.prevent="scrollToView('scroll')"
  >
    <div class="buttons is-centered">
      <button class="button is-light is-small" @click.prevent="closeDate()">
        <b-icon icon="close" class="close-icon"></b-icon>
        <span>close</span>
      </button>
      <button
        class="button is-danger is-light is-small"
        @click.prevent="clearDate()"
      >
        clear
      </button>
    </div>
  </b-datepicker>
</template>

<script>
import { dateFormatter } from '@/utils/foratters'
import { dateOnly, dateWithCurrentTime, dayEnd, dayStart } from '@/utils/foratters/date'

export default {
  inheritAttrs: false,
  name: 'Datepicker',
  props: {
    placeholder: { type: String, default: null },
    minDate: { type: Date, default: null },
    maxDate: { type: Date, default: null },
    disabled: { type: Boolean, default: false },
    position: { type: String, default: null },
    unselectableDaysOfWeek: { type: Array, default: null },
    yearsRange: { type: Array, default: null },
    size: { type: String, default: null },
    type: { type: String, default: null },
    /** `value prop` which will be used in the `v-model` definition */
    value: { default: null }
  },
  computed: {
    date: {
      get () {
        return this.value ? new Date(this.value) : null
      },
      set (value) {
        const formattedDate = value ? this.formatSentDate(value) : null
        this.$emit('input', formattedDate)
      }
    }
  },
  methods: {
    closeDate () {
      /** calling buefy date picker's `toggle` method */
      const dateRef = this.$refs.datepicker
      dateRef.toggle()
    },
    clearDate () {
      this.date = null
      this.$emit('cleardate')
    },
    formatSentDate (date) {
      switch (this.type) {
        case 'is-from-date':
          return dayStart(date)
        case 'is-to-date':
          return dayEnd(date)
        case 'is-only-date':
          return dateOnly(date)
        default:
          return dateWithCurrentTime(date)
      }
    },
    scrollToView (className) {
      document.querySelector('.' + className).scrollIntoView({
        behavior: 'smooth'
      })
    },
    dateFormatter (date) {
      return dateFormatter(date)
    }
  }
}
</script>
