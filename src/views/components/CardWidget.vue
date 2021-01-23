<template>
  <card-component>
    <div class="level">
      <div v-if="icon" class="level-item has-widget-icon">
        <div class="is-widget-icon">
          <b-icon :icon="icon" size="is-large" :type="type" />
        </div>
      </div>
      <div class="level-item">
        <div class="is-widget-label">
          <h3 class="subtitle is-spaced">
            {{ label }}
          </h3>
          <div
            class="level sub-label"
            v-if="multipleNumber && multipleNumber.length"
          >
            <div
              class="level-item"
              v-for="item in multipleNumber"
              :key="item.label"
            >
              <div>
                <h3 class="title is-4 is-spaced">
                  <growing-number :value="item.number || 0" />
                </h3>
                <h4 class="subtitle is-size-7">{{item.label}}</h4>
              </div>
            </div>
          </div>
          <h1 v-else class="title">
            <growing-number
              :value="number || 0"
              :prefix="prefix"
              :suffix="suffix"
            />
          </h1>
        </div>
      </div>
    </div>
  </card-component>
</template>

<script>
import CardComponent from '@/views/components/CardComponent'
import GrowingNumber from '@/views/components/GrowingNumber'
export default {
  name: 'CardWidget',
  components: { GrowingNumber, CardComponent },
  props: {
    icon: {
      type: String,
      default: null
    },
    number: {
      type: Number,
      default: 0
    },
    prefix: {
      type: String,
      default: null
    },
    suffix: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    multipleNumber: {
      type: Array,
      default: null
    }
  },
  computed: {
    maxMultiple () {
      return this.multipleNumber.slice(0, 3)
    }
  }
}
</script>
