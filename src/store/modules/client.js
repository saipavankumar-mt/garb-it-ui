import { Api } from '@/services'
import { clientTableCols } from '@/utils/table-columns'

/* Client module initial state */
export const initialState = () => ({
  clientList: [],
  clientObj: {
    id: null,
    name: null,
    phoneNumber: null,
    gender: null,
    dateOfBirth: null,
    married: null,
    address: null,
    location: null,
    municipality: null,
    city: null,
    state: null,
    country: null,
    qrCodeId: null,
    createdById: null,
    createdByName: null,
    updatedById: null,
    updatedByName: null,
    createdDateTime: null,
    updatedDateTime: null
  }
})

/* Client module state */
export const state = initialState

/* Client module getters */
export const getters = {
  columns: () => clientTableCols
}

/* Client module mutations */
export const mutations = {
  //
  SET_CLIENTS (state, clients) {
    state.clientList = clients
  },
  SET_CLIENT_OBJ (state, client) {
    state.clientObj = client
  }
}

/* Client module actions */
export const actions = {
  //
  async getClients ({ commit }, request = []) {
    //
    try {
      const clientRes = await Api().post('/Client/search', request)
      const clientList = await (clientRes && clientRes.data && clientRes.data.data)

      if (clientList) { commit('SET_CLIENTS', clientList) }
      //
    } catch (error) {
      //
      console.error('Error while getting clients => ', error)
      commit('SET_CLIENTS', [])
      throw error
    }
  },

  async getClientByQrId ({ commit }, qrCodeId) {
    try {
      const clientRes = await Api().get(`/Client/${qrCodeId}`)
      const clientObj = await (clientRes && clientRes.data && clientRes.data.data)

      if (clientObj) { commit('SET_CLIENT_OBJ', clientObj) }
    } catch (error) {
      console.error('Error while getting client details => ', error)
      commit('SET_CLIENT_OBJ', null)
      throw error
    }
  },

  async registerClient ({ commit }, clientRequest) {
    try {
      const clientRes = await Api().post('/Client/register', clientRequest)
      const clientObj = await (clientRes && clientRes.data && clientRes.data.data)

      if (clientObj) { commit('SET_CLIENT_OBJ', clientObj) }
    } catch (error) {
      console.error('Error while registering client details => ', error)
      commit('SET_CLIENT_OBJ', null)
      throw error
    }
  },

  async updateClient ({ commit }, clientRequest) {
    try {
      const clientRes = await Api().post('/Client/update', clientRequest)
      const clientObj = await (clientRes && clientRes.data && clientRes.data.data)

      if (clientObj) { commit('SET_CLIENT_OBJ', clientObj) }
    } catch (error) {
      console.error('Error while updating client details => ', error)
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
