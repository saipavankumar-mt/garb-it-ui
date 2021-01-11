<template>
  <footer v-show="isFooterBarVisible" class="footer">
    <div class="container-fluid">
      <div class="level">
        <div class="level-left">
        </div>
        <div class="level-right">
          <div class="level-item">
            <div>
              &copy; <b>{{ year }} Garb-it</b> <span class="tag">v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'

export default {
  name: 'FooterBar',
  computed: {
    year () {
      return dayjs().year()
    },
    ...mapState([
      'isFooterBarVisible'
    ])
  }
}
</script>
