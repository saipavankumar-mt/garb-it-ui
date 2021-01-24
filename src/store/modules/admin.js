import { Api } from '@/services'
import { adminTableCols } from '@/utils/table-columns'
import { GENDER, MARITAL_STATUS } from '@/constants'

export const initialState = () => ({
  adminList: [],
  adminObj: {
    id: '',
    name: '',
    phoneNumber: '',
    gender: GENDER.slice(-1)[0],
    dateOfBirth: '',
    married: MARITAL_STATUS.slice(-1)[0],
    role: 'Admin',
    designation: 'Admin',
    department: 'Garbage collection',
    location: '',
    municipality: '',
    city: '',
    state: '',
    country: '',
    reportsToId: '',
    reportsToName: '',
    createdDateTime: '',
    updatedDateTime: '',
    createdById: '',
    createdByName: '',
    updatedById: '',
    updatedByName: '',
    userName: '',
    password: '',
    secretQuestions: [],
    secretAnswers: []
  }
})

/* Admin module state */
export const state = initialState

/* Admin module getters */
export const getters = {
  columns: () => adminTableCols

}

/* Admin module mutations */
export const mutations = {
  //
  SET_ADMINS (state, admins) {
    state.adminList = admins
  },
  SET_ADMIN_OBJ (state, admin) {
    state.adminObj = admin
  }
}

/* Admin module actions */
export const actions = {
  //
  setAdminFormDefaults ({ rootState }, form) {
    Object.assign(form, initialState().adminObj, rootState.user.userAddress)
  },
  //
  async getAdmins ({ commit }) {
    //
    try {
      const adminRes = await Api().get('/Admin')
      const adminList = await (adminRes && adminRes.data && adminRes.data.data)

      if (adminList) { commit('SET_ADMINS', adminList) }
      //
    } catch (error) {
      //
      console.error('Error while getting admins => ', error)
      commit('SET_ADMINS', [])
      throw error
    }
  },

  async getAdminById ({ commit }, adminId) {
    try {
      const adminRes = await Api().get(`/Admin/${adminId}`)
      const adminObj = await (adminRes && adminRes.data && adminRes.data.data)

      if (adminObj) { commit('SET_ADMIN_OBJ', adminObj) }
    } catch (error) {
      console.error('Error while getting admin details => ', error)
      commit('SET_ADMIN_OBJ', null)
      throw error
    }
  },

  async addAdmin ({ commit }, adminRequest) {
    try {
      const adminRes = await Api().post('/Admin/add', adminRequest)
      const adminObj = await (adminRes && adminRes.data && adminRes.data.data)

      if (adminObj) { commit('SET_ADMIN_OBJ', adminObj) }
    } catch (error) {
      console.error('Error while adding admin details => ', error)
      commit('SET_ADMIN_OBJ', null)
      throw error
    }
  },

  async updateAdmin ({ commit }, adminRequest) {
    try {
      const adminRes = await Api().post('/Admin/update', adminRequest)
      const adminObj = await (adminRes && adminRes.data && adminRes.data.data)

      if (adminObj) { commit('SET_EMP_OBJ', adminObj) }
    } catch (error) {
      console.error('Error while updating admin details => ', error)
      throw error
    }
  },

  async deleteAdmin ({ commit }, adminId) {
    try {
      await Api().delete(`/Admin/${adminId}`)
    } catch (error) {
      console.error('Error while getting admin details => ', error)
      throw error
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
