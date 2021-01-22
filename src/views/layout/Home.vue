<template>
  <section class="section">
    <title-bar> Welcome, {{ username }}! </title-bar>
    <tiles :cols="['is-3', 'is-4', 'is-5']">
      <card-widget
        class="tile is-child"
        type="is-danger"
        icon="clipboard-account"
        label="Employees"
        :number="allCounts.emp"
      />
      <card-widget
        class="tile is-child"
        type="is-primary"
        icon="home-group"
        label="Clients"
        :number="allCounts.client"
      />
      <card-widget
        class="tile is-child"
        type="is-info"
        icon="hand-right"
        label="Collected"
        :multiple-number="[
        { label: 'today', number: allCounts.record.today },
        { label: 'last 7 days', number: allCounts.record.week },
        { label: 'last 30 days', number: allCounts.record.month }
      ]"
      />
    </tiles>

    <tiles :cols="['is-8', 'is-4']">
      <card-component
        class="tile is-child"
        icon="finance"
        title="Performance"
        :has-header-action="true"
      >
        <template #header-action>
          <data-table-daydrop
            :is-for-graph="true"
            @day-filter="fillChartData($event)"
          />
        </template>

        <div v-if="defaultChart.chartData" class="chart-area">
          <line-chart
            style="height: 100%"
            ref="bigChart"
            chart-id="big-line-chart"
            :chart-data="defaultChart.chartData"
            :extra-options="defaultChart.extraOptions"
          >
          </line-chart>
        </div>
      </card-component>
      <emp-scan-count class="tile is-child"></emp-scan-count>
    </tiles>

    <records></records>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

import * as chartConfig from '@/views/components/Charts/chart.config'
import { dateOnly, dateRange, dayjsDate, formatDate, last7thDay, yesterday } from '@/utils/foratters/date'
import { MD_FORMAT } from '@/constants'
import { rangeArray } from '@/utils/helper'

import CardComponent from '@/views/components/CardComponent'
import Tiles from '@/views/components/Tiles'
import CardWidget from '@/views/components/CardWidget'
import LineChart from '@/views/components/Charts/LineChart'
import TitleBar from '@/views/components/TitleBar'
import EmpScanCount from '@/views/layout/dashboard/EmpScanCount'
import Records from '@/views/layout/dashboard/Records'
import DataTableDaydrop from '@/views/components/DataTableDaydrop'

export default {
  name: 'home',
  components: {
    TitleBar,
    CardWidget,
    Tiles,
    CardComponent,
    LineChart,
    EmpScanCount,
    Records,
    DataTableDaydrop
  },
  data () {
    return {
      defaultChart: {
        chartData: null,
        extraOptions: chartConfig.chartOptionsMain
      }
    }
  },
  computed: {
    ...mapState('user', {
      username: state => state.username
    }),
    ...mapState('dashboard', {
      chartList: state => JSON.parse(JSON.stringify(state.chartList))
    }),
    ...mapGetters('dashboard', ['allCounts']),
    //
    dates () {
      return this.sortedData().map(data => formatDate(data.date, MD_FORMAT))
    },
    countData () {
      return this.sortedData().map(data => data.count)
    }
  },
  mounted () {
    this.getAllCount()
    this.fillChartData()
  },
  methods: {
    ...mapActions('dashboard', ['getAllCount', 'getChartData']),
    //
    sortedData (startDate = last7thDay) {
      const sorted = this.chartList.sort((a, b) => {
        if (dayjsDate(a.date).isBefore(dayjsDate(b.date), 'day')) {
          return -1
        }
        return 0
      })
      const sortedDates = sorted.map(s => dateOnly(s.date))
      const final = []
      const diff = dayjsDate(yesterday).diff(dayjsDate(startDate), 'day')
      for (const i of rangeArray(1, diff)) {
        if (sortedDates.indexOf(dateOnly(dateRange(startDate, i))) !== -1) {
          final.splice(i, 0, sorted[sortedDates.indexOf(dateOnly(dateRange(startDate, i)))])
        } else {
          final.splice(i, 0, { date: dateOnly(dateRange(startDate, i)), count: 0 })
        }
      }
      return final
    },
    //
    async fillChartData (query = {}) {
      await this.getChartData(query)

      const { fromDate } = query
      const sortedData = this.sortedData(fromDate)
      this.defaultChart.chartData = {
        labels: sortedData.map(data => formatDate(data.date, MD_FORMAT)),
        datasets: [
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: sortedData.map(data => data.count)
          }
        ]
      }
    }
  }
}
</script>
