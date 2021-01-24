import { Api } from '@/services'
import { empTableCols } from '@/utils/table-columns'
import { GENDER, MARITAL_STATUS } from '@/constants'

/* Employee module initial state */
export const initialState = () => ({
  employeeList: [],
  empObj: {
    id: '',
    name: '',
    phoneNumber: '',
    gender: GENDER.slice(-1)[0],
    dateOfBirth: '',
    married: MARITAL_STATUS.slice(-1)[0],
    role: 'Employee',
    designation: 'Garbage Collector',
    department: 'Garbage Collection',
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
    password: ''
  }
})

/* Employee module state */
export const state = initialState

/* Employee module getters */
export const getters = {
  columns: () => empTableCols,
  //
  colFilters: () => [
    { field: 'Id', label: 'Employee Id' },
    { field: 'PhoneNumber', label: 'Phone number' }
  ]
}

/* Employee module mutations */
export const mutations = {
  //
  SET_EMPLOYEES (state, employees) {
    state.employeeList = employees
  },
  SET_EMP_OBJ (state, employee) {
    state.empObj = employee
  }
}

/* Employee module actions */
export const actions = {
  //
  setEmpFormDefaults ({ rootState }, form) {
    Object.assign(form, initialState().empObj, rootState.user.userAddress)
  },
  //
  async getEmployees ({ commit, rootGetters }, request = []) {
    //
    const isSuperAdmin = rootGetters['user/isSuperAdmin']
    const END_POINT = isSuperAdmin ? '/Employee/all' : '/Employee/search'
    //
    try {
      const empRes = isSuperAdmin
        ? await Api().get(END_POINT)
        : await Api().post(END_POINT, request)
      const empList = await (empRes && empRes.data && empRes.data.data)

      if (empList) { commit('SET_EMPLOYEES', empList) }
      //
    } catch (error) {
      //
      console.error('Error while getting employees => ', error)
      commit('SET_EMPLOYEES', [])
      throw error
    }
  },

  async getEmployeeById ({ commit }, employeeId) {
    try {
      const empRes = await Api().get(`/Employee/${employeeId}`)
      const empObj = await (empRes && empRes.data && empRes.data.data)

      if (empObj) { commit('SET_EMP_OBJ', empObj) }
    } catch (error) {
      console.error('Error while getting employee details => ', error)
      commit('SET_EMP_OBJ', null)
      throw error
    }
  },

  async addEmployee ({ commit }, empRequest) {
    try {
      const empRes = await Api().post('/Employee/add', empRequest)
      const empObj = await (empRes && empRes.data && empRes.data.data)

      if (empObj) { commit('SET_EMP_OBJ', empObj) }
    } catch (error) {
      console.error('Error while adding employee details => ', error)
      commit('SET_EMP_OBJ', null)
      throw error
    }
  },

  async updateEmployee ({ commit }, empRequest) {
    try {
      const empRes = await Api().post('/Employee/update', empRequest)
      const empObj = await (empRes && empRes.data && empRes.data.data)

      if (empObj) { commit('SET_EMP_OBJ', empObj) }
    } catch (error) {
      console.error('Error while updating employee details => ', error)
      throw error
    }
  },

  async deleteEmployee ({ commit }, employeeId) {
    try {
      await Api().delete(`/Employee/${employeeId}`)
    } catch (error) {
      console.error('Error while getting employee details => ', error)
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
