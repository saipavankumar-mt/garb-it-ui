import Vue from 'vue'
import Vuex from 'vuex'

/* Global store */
import globalStore from './global'

/* Store modules */
import userModule from './modules/user'
import employeeModule from './modules/employee'
import clientModule from './modules/client'
import adminModule from './modules/admin'
import dashboardModule from './modules/dashboard'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: userModule,
    employee: employeeModule,
    client: clientModule,
    admin: adminModule,
    dashboard: dashboardModule
  },
  ...globalStore
})
