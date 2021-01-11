<template>
  <div>
    <b-field class="mb-3">
      <b-upload v-model="file" @input="upload" :accept="accept">
        <a class="button is-primary">
          <b-icon icon="upload" custom-size="default"></b-icon>
          <span>{{ buttonLabel }}</span>
        </a>
      </b-upload>
    </b-field>
    <div class="tags" v-if="file">
      <span class="tag is-primary">
        {{ file.name }}
        <button class="delete is-small" type="button" @click="() => {file=null}" />
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'FilePicker',
  props: {
    accept: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      file: null,
      uploadPercent: 0
    }
  },
  computed: {
    buttonLabel () {
      return !this.file ? 'Pick a file' : 'Pick another file'
    }
  },
  methods: {
    upload (file) {
      this.$emit('input', file)
      // Use this as an example for handling file uploads
      const formData = new FormData()
      formData.append('file', file)

      axios
        .post(window.routeMediaStore, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: this.progressEvent
        })
        .then(r => {

        })
        .catch(err => {
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger'
          })
        })
    },
    progressEvent (progressEvent) {
      this.uploadPercent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
    }
  }
}
</script>
