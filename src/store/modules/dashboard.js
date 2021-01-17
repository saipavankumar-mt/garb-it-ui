import { Api } from '@/services'
import { fromDayStart, toDayEnd, fromWeekStart, fromMonthStart, lowestDate, dayEnd } from '@/utils/foratters/date'
import { empScanTableCols } from '@/utils/table-columns'
import { recordTableCols } from '@/utils/table-columns/recordTable'

/* Dashboard module initial state */
export const initialState = () => ({
  clientCount: 0,
  empCount: 0,
  recordCount: {
    today: 0,
    week: 0,
    month: 0
  },
  empScanCountList: [],
  recordList: [],
  chartList: []
})

/* Dashboard module state */
export const state = initialState

/* Dashboard module getters */
export const getters = {
  //
  empScanColumns: () => empScanTableCols,
  //
  recordColumns: () => recordTableCols,
  //
  allCounts: (state) => ({
    client: state.clientCount,
    emp: state.empCount,
    record: state.recordCount
  })
}

/* Dashboard module mutations */
export const mutations = {
  //
  SET_CLIENT_COUNT (state, clinetCount) {
    state.clientCount = clinetCount
  },
  SET_EMP_COUNT (state, empCount) {
    state.empCount = empCount
  },
  SET_RECORD_COUNT (state, recordCount) {
    state.recordCount = recordCount
  },
  SET_EMP_SCAN_COUNT (state, list) {
    state.empScanCountList = list
  },
  SET_RECORD_LIST (state, list) {
    state.recordList = list
  },
  SET_CHART_LIST (state, list) {
    state.chartList = list
  }
}

/* Dashboard module actions */
export const actions = {
  //
  async getClientCount ({ commit }) {
    try {
      const result = await Api().get('/Client/count')
      const count = await (result && result.data && result.data.data && result.data.data.count) || 0
      commit('SET_CLIENT_COUNT', count)
      return count
      //
    } catch (error) {
      //
      console.error('Error while getting client count =>', error)
      commit('SET_CLIENT_COUNT', 0)
    }
  },
  //
  async getEmployeeCount ({ commit }) {
    try {
      const result = await Api().get('/Employee/count')
      const count = await (result && result.data && result.data.data && result.data.data.count) || 0
      commit('SET_EMP_COUNT', count)
      return count
      //
    } catch (error) {
      //
      console.error('Error while getting employee count =>', error)
      commit('SET_EMP_COUNT', 0)
    }
  },
  //
  async getRecordCount ({ commit }) {
    const dayBegin = fromDayStart()
    const toDate = toDayEnd()
    const weekBegin = fromWeekStart()
    const monthBegin = fromMonthStart()
    try {
      const dayResult = await Api().post(`/RecordEntry/count?fromDate=${dayBegin}&toDate=${toDate}`)
      const weekResult = await Api().post(`/RecordEntry/count?fromDate=${weekBegin}&toDate=${toDate}`)
      const monthResult = await Api().post(`/RecordEntry/count?fromDate=${monthBegin}&toDate=${toDate}`)

      const count = {
        today: await (dayResult && dayResult.data && dayResult.data.data && dayResult.data.data.count) || 0,
        week: await (weekResult && weekResult.data && weekResult.data.data && weekResult.data.data.count) || 0,
        month: await (monthResult && monthResult.data && monthResult.data.data && monthResult.data.data.count) || 0
      }
      commit('SET_RECORD_COUNT', count)
      return count
      //
    } catch (error) {
      //
      console.error('Error while getting employee count =>', error)
      commit('SET_RECORD_COUNT', {
        today: 0,
        week: 0,
        month: 0
      })
    }
  },
  //
  getAllCount ({ dispatch }) {
    dispatch('getClientCount')
    dispatch('getEmployeeCount')
    dispatch('getRecordCount')
  },
  //
  async getEmpScanList ({ commit }, { fromDate, toDate }) {
    fromDate = encodeURIComponent(fromDate || lowestDate())
    toDate = encodeURIComponent(toDate || dayEnd())
    try {
      const scanResult = await Api().get(`/RecordEntry/employeescannedcounts?fromDate=${fromDate}&toDate=${toDate}`)
      const empScanList = await (scanResult && scanResult.data && scanResult.data.data) || []
      commit('SET_EMP_SCAN_COUNT', empScanList)
    } catch (error) {
      console.error('Error while getting employee scan count =>', error)
      commit('SET_EMP_SCAN_COUNT', [])
    }
  },
  //
  async getRecordList ({ commit }, { request, fromDate, toDate }) {
    fromDate = encodeURIComponent(fromDate || lowestDate())
    toDate = encodeURIComponent(toDate || dayEnd())
    try {
      const recordResult = await Api().post(
        `/RecordEntry/search?fromDate=${fromDate}&toDate=${toDate}`,
        request)
      const recordList = await (recordResult && recordResult.data && recordResult.data.data) || []
      commit('SET_RECORD_LIST', recordList)
    } catch (error) {
      console.error('Error while getting record list =>', error)
      commit('SET_RECORD_LIST', [])
    }
  },
  //
  async getChartData ({ commit }, { fromDate, toDate }) {
    fromDate = encodeURIComponent(fromDate || lowestDate())
    toDate = encodeURIComponent(toDate || dayEnd())
    try {
      const chartResult = await Api().post(`/RecordEntry/daycount?fromDate=${fromDate}&toDate=${toDate}`)
      const chartList = await (chartResult && chartResult.data && chartResult.data.data) || []
      commit('SET_CHART_LIST', chartList)
    } catch (error) {
      console.error('Error while getting chart list =>', error)
      commit('SET_CHART_LIST', [])
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
