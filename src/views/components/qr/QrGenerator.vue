<template>
  <div class="qr-generator has-text-centered">
    <qrcode-vue
      id="qr-code"
      :value="value"
      :size="size"
      :level="level"
    ></qrcode-vue>
    <div class="mt-3 mb-3"><a @click="downloadQR()">Download QR</a></div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'QrGenerator',
  components: { QrcodeVue },
  props: {
    value: { type: String },
    size: { type: Number },
    level: { type: String },
    renderAs: { type: String },
    background: { type: String }
  },
  methods: {
    downloadQR () {
      this.$emit('click-download-qr')
    }
  }
}
</script>
