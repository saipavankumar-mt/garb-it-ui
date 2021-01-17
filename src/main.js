/* Styles */
import './assets/scss/main.scss'

/* Core */
import Vue from 'vue'
import Buefy from 'buefy'

/* Router & Store */
import router from './router'
import store from './store'

/* Service Worker */
import './registerServiceWorker'

/* Vue Filters */
import './filters'

/** dayjs */
import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'

/* Vue. Main component */
import App from './App.vue'

/** customize dayjs weekday */
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  weekStart: 1
})

/* Default title tag */
const defaultDocumentTitle = 'GarbIt Admin'

/* Collapse mobile aside menu on route change & set document title from route meta */
router.afterEach(to => {
  store.commit('ASIDE_MOBILE_STATE_TOGGLE', false)

  if (to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }
})

Vue.config.productionTip = false

Vue.use(Buefy)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
