<template>
  <div class="card">
    <header v-if="hasHeader" class="card-header">
      <p v-if="title" class="card-header-title">
        <b-icon v-if="icon" :icon="icon" custom-size="default" />
        {{ title }}
      </p>
      <button
        v-if="headerBtnIcon || headerBtnText"
        type="button"
        class="button is-small"
        :class="[headerBtnClass]"
        @click.prevent="$emit('header-btn-click')"
      >
        <b-icon
          v-if="headerBtnIcon"
          :icon="headerBtnIcon"
          custom-size="default"
        />
        <span v-if="headerBtnText">{{ headerBtnText }}</span>
      </button>
      <slot v-if="hasHeaderAction" name="header-action"></slot>
    </header>
    <section v-if="hasActions" class="notification is-card-action">
      <div class="level">
        <div class="level-left">
          <slot name="action-left" type="level-item"></slot>
        </div>
        <div class="level-right">
          <slot name="action-right" type="level-item"></slot>
        </div>
      </div>
    </section>
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    title: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    headerBtnIcon: {
      type: String,
      default: null
    },
    headerBtnText: {
      type: String,
      default: null
    },
    headerBtnClass: {
      type: String,
      default: null
    },
    hasActions: {
      type: Boolean,
      default: false
    },
    hasHeaderAction: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasHeader () {
      return !!(this.title || this.headerBtnText || this.headerBtnIcon || this.hasHeaderAction)
    }
  }
}
</script>
