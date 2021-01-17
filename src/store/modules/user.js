import { Api } from '@/services'

/* User module initial state */
export const initialState = () => ({
  username: window.localStorage.getItem('current_username') || null,
  role: window.localStorage.getItem('current_role') || null,
  token: window.localStorage.getItem('session_key') || null,
  userLocation: window.localStorage.getItem('location') || null,
  userMunicipality: window.localStorage.getItem('municipality') || null,
  expiration: window.localStorage.getItem('expiration') || null
})

/* User module state */
export const state = initialState

/* User module getters */
export const getters = {
  //
  isLoggedIn: (state) => state.token !== null,
  //
  userRoles: (state) => ['SuperAdmin', 'Admin'],
  //
  isSuperAdmin: (state) => !!(state.role && state.role === 'SuperAdmin'),
  //
  isAdmin: (state) => !!(state.role && state.role === 'Admin')
}

/* User module mutations */
export const mutations = {
  //
  SET_USER_NAME (state, username) {
    state.username = username
  },
  SET_ROLE (state, role) {
    state.role = role
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_USER_LOCATION (state, location) {
    state.userLocation = location
  },
  SET_USER_MUNICIPALITY (sate, municipality) {
    state.userMunicipality = municipality
  }

}

/* User module actions */
export const actions = {
  //
  async userLogin ({ dispatch }, userCredential) {
    window.localStorage.clear()
    try {
      const userRes = await Api().post('/Login', userCredential)
      //
      const user = await (userRes && userRes.data && userRes.data.data)
      //
      if (!user || !user.sessionKey) {
        dispatch('DESTROY_USER')
        return { errors: ['username/password is incorrect'] }
        //
      } else {
        dispatch('RETRIEVE_USER', { user, userCredential })
        if (user.role === 'Admin') {
          try {
            const adminRes = await Api().get(`/Admin/${user.id}`)
            const userLocation = await (adminRes && adminRes.data && adminRes.data.data)
            dispatch('RETRIEVE_USER', { user, userCredential, userLocation })
          } catch (error) {
            console.error('Error while getting user location =>', error)
          }
        }
      }
      //
    } catch (error) {
      //
      dispatch('DESTROY_USER')
      return { errors: ['Something went wrong, please try again later'] }
    }
  },

  RETRIEVE_USER ({ commit }, { user, userCredential, userLocation }) {
    /* save user details in store */
    commit('SET_TOKEN', user.sessionKey)
    commit('SET_ROLE', user.role || userCredential.role)
    commit('SET_USER_NAME', user.name || userCredential.username)

    /* save user details in local storage */
    window.localStorage.setItem('session_key', user.sessionKey)
    window.localStorage.setItem('current_role', user.role || userCredential.role)
    window.localStorage.setItem('current_username', user.name || userCredential.username)

    if (userLocation) {
      commit('SET_USER_LOCATION', userLocation.location)
      commit('SET_USER_MUNICIPALITY', userLocation.municipality)
      window.localStorage.setItem('location', userLocation.location)
      window.localStorage.setItem('municipality', userLocation.municipality)
    }
  },

  DESTROY_USER ({ commit }) {
    /* destroy user details in store */
    commit('SET_TOKEN', null)
    commit('SET_ROLE', null)
    commit('SET_USER_NAME', null)

    /* destroy user details in local storage */
    window.localStorage.removeItem('session_key')
    window.localStorage.removeItem('current_role')
    window.localStorage.removeItem('current_username')
    window.localStorage.clear()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
