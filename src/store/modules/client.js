import { Api } from '@/services'
import { clientTableCols } from '@/utils/table-columns'
import { GENDER, MARITAL_STATUS } from '@/constants'

/* Client module initial state */
export const initialState = () => ({
  clientList: {
    paginationToken: null,
    clientInfos: [],
    totalCount: 0
  },
  cachedClients: [],
  clientObj: {
    id: null,
    name: null,
    phoneNumber: null,
    gender: GENDER.slice(-1)[0],
    dateOfBirth: null,
    married: MARITAL_STATUS.slice(-1)[0],
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
  columns: () => clientTableCols,
  //
  colFilters: () => [
    { field: 'Id', label: 'Household Id' },
    { field: 'PhoneNumber', label: 'Phone number' }
  ]
}

/* Client module mutations */
export const mutations = {
  //
  SET_CLIENTS (state, clients) {
    state.clientList = clients
  },
  SET_CACHED_CLIENTS (state, cached) {
    state.cachedClients = cached
  },
  SET_CLIENT_OBJ (state, client) {
    state.clientObj = client
  }
}

/* Client module actions */
export const actions = {
  setClientFormDefaults ({ rootState }, form) {
    Object.assign(form, initialState().clientObj, rootState.user.userAddress)
  },
  //
  async getClients ({ commit }, { request, limit, paginationToken }) {
    //
    request = request || []
    limit = limit || 500
    const paginateQuery = paginationToken ? `&paginationToken=${encodeURIComponent(paginationToken)}` : ''
    //
    try {
      const clientRes = await Api().post(`/Client/search?limit=${limit}${paginateQuery}`, request)
      const clientList = await (clientRes && clientRes.data && clientRes.data.data) || initialState().clientList

      if (clientList) { commit('SET_CLIENTS', clientList) }
      //
    } catch (error) {
      //
      console.error('Error while getting clients => ', error)
      commit('SET_CLIENTS', initialState().clientList)
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
