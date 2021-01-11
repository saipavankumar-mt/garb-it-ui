import { Api } from '@/api'

/* User module initial state */
export const initialState = () => ({
  username: window.localStorage.getItem('current_username') || null,
  role: window.localStorage.getItem('current_role') || null,
  token: window.localStorage.getItem('session_key') || null,
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
  }
}

/* User module actions */
export const actions = {
  //
  async userLogin ({ dispatch }, userCredential) {
    try {
      const userRes = await Api().post('Login', userCredential)
      //
      const user = await (userRes && userRes.data && userRes.data.data)
      //
      if (!user || !user.sessionKey) {
        dispatch('DESTROY_USER')
        return { errors: ['username/password is incorrect'] }
        //
      } else {
        dispatch('RETRIEVE_USER', { user, userCredential })
      }
      //
    } catch (error) {
      //
      dispatch('DESTROY_USER')
      return { errors: ['Something went wrong, please try again later'] }
    }
  },

  RETRIEVE_USER ({ commit }, { user, userCredential }) {
    /* save user details in store */
    commit('SET_TOKEN', user.sessionKey)
    commit('SET_ROLE', user.role || userCredential.role)
    commit('SET_USER_NAME', user.name || userCredential.username)

    /* save user details in local storage */
    window.localStorage.setItem('session_key', user.sessionKey)
    window.localStorage.setItem('current_role', user.role || userCredential.role)
    window.localStorage.setItem('current_username', user.name || userCredential.username)
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
