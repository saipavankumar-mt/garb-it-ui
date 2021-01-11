import { GENDER, MARITAL_STATUS } from '@/constants'

const initialState = () => ({
  /* NavBar */
  isNavBarVisible: true,

  /* FooterBar */
  isFooterBarVisible: true,

  /* Aside */
  isAsideVisible: true,
  isAsideMobileExpanded: false
})

export const state = initialState

export const getters = {
  gender: () => GENDER,
  maritalStatus: () => MARITAL_STATUS
}

export const mutations = {
  /* A fit-them-all commit */
  BASIC (state, payload) {
    state[payload.key] = payload.value
  },

  /* Aside Mobile */
  ASIDE_MOBILE_STATE_TOGGLE (state, payload = null) {
    const htmlClassName = 'has-aside-mobile-expanded'

    let isShow

    if (payload !== null) {
      isShow = payload
    } else {
      isShow = !state.isAsideMobileExpanded
    }

    if (isShow) {
      document.documentElement.classList.add(htmlClassName)
    } else {
      document.documentElement.classList.remove(htmlClassName)
    }

    state.isAsideMobileExpanded = isShow
  }
}

export const actions = {}

export default {
  state,
  mutations,
  actions,
  getters
}
