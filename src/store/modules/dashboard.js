import { Api } from '@/services'
import { dayEnd, dayStart, yesterday, last7thDay, last30thDay } from '@/utils/foratters/date'
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
  recordList: {
    paginationToken: null,
    recordEntries: [],
    totalCount: 0
  },
  recordExport: [],
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
  SET_RECORD_EXPORT (state, list) {
    state.recordExport = list
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
    const fromDayStart = encodeURIComponent(dayStart())
    const toDayEnd = encodeURIComponent(dayEnd())
    const toYesterday = encodeURIComponent(yesterday)
    const from7thDay = encodeURIComponent(last7thDay)
    const from30thDay = encodeURIComponent(last30thDay)
    try {
      const dayResult = await Api().post(`/RecordEntry/count?fromDate=${fromDayStart}&toDate=${toDayEnd}`)
      const weekResult = await Api().post(`/RecordEntry/count?fromDate=${from7thDay}&toDate=${toYesterday}`)
      const monthResult = await Api().post(`/RecordEntry/count?fromDate=${from30thDay}&toDate=${toYesterday}`)

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
      commit('SET_RECORD_COUNT', initialState().recordCount)
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
    fromDate = encodeURIComponent(fromDate || dayStart())
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
  async getRecordList ({ commit }, { request, fromDate, toDate, limit, paginationToken }) {
    fromDate = encodeURIComponent(fromDate || dayStart())
    toDate = encodeURIComponent(toDate || dayEnd())
    request = request || []
    limit = limit || 100
    const paginateQuery = paginationToken ? `&paginationToken=${encodeURIComponent(paginationToken)}` : ''
    try {
      const recordResult = await Api().post(
        `/RecordEntry/search?fromDate=${fromDate}&toDate=${toDate}&limit=100${paginateQuery}`,
        request)
      const recordList = await (recordResult && recordResult.data && recordResult.data.data) || initialState().recordList
      commit('SET_RECORD_LIST', recordList)
    } catch (error) {
      console.error('Error while getting record list =>', error)
      commit('SET_RECORD_LIST', initialState().recordList)
    }
  },
  //
  async getRecordsToExport ({ commit }, date) {
    const fromDate = encodeURIComponent(dayStart(date))
    const toDate = encodeURIComponent(dayEnd(date))
    try {
      const recordResult = await Api().post(
        `/RecordEntry/export?fromDate=${fromDate}&toDate=${toDate}`,
        [])
      const recordExport = await (recordResult && recordResult.data && recordResult.data.data) || []
      commit('SET_RECORD_EXPORT', recordExport)
    } catch (error) {
      console.error('Error while getting records to export =>', error)
      commit('SET_RECORD_EXPORT', [])
    }
  },
  //
  async getChartData ({ commit }, { fromDate, toDate }) {
    fromDate = encodeURIComponent(fromDate || last7thDay)
    toDate = encodeURIComponent(toDate || yesterday)
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
