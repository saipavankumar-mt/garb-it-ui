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
        { label: 'this week', number: allCounts.record.week },
        { label: 'this month', number: allCounts.record.month }
      ]"
      />
    </tiles>

    <tiles :cols="['is-8', 'is-4']">
      <card-component
        class="tile is-child"
        title="Performance"
        @header-btn-click="fillChartData"
        header-btn-icon="reload"
        header-btn-class="is-light"
      >
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
import CardComponent from '@/views/components/CardComponent'
import Tiles from '@/views/components/Tiles'
import CardWidget from '@/views/components/CardWidget'
import LineChart from '@/views/components/Charts/LineChart'
import TitleBar from '@/views/components/TitleBar'
import EmpScanCount from '@/views/layout/dashboard/EmpScanCount'
import Records from '@/views/layout/dashboard/Records'
import dayjs from 'dayjs'

export default {
  name: 'home',
  components: {
    TitleBar,
    CardWidget,
    Tiles,
    CardComponent,
    LineChart,
    EmpScanCount,
    Records
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
      return this.sortedData().map(data => dayjs(data.date).format('dddd'))
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
    sortedData () {
      const weekStart = (at) => dayjs().startOf('week').add(at, 'day').format('YYYY/MM/DD')
      const sorted = this.chartList.sort((a, b) => {
        if (dayjs(a.date).isBefore(dayjs(b.date), 'day')) {
          return -1
        }
        return 0
      })
      const sortedDates = sorted.map(s => s.date)
      const final = []
      for (const i of [0, 1, 2, 3, 4, 5, 6]) {
        if (sortedDates.indexOf(weekStart(i)) !== -1) {
          final.splice(i, 0, sorted[sortedDates.indexOf(weekStart(i))])
        } else {
          final.splice(i, 0, { date: weekStart(i), count: 0 })
        }
      }
      return final
    },
    async fillChartData () {
      await this.getChartData({})
      this.defaultChart.chartData = {
        labels: this.dates,
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
            data: this.countData
          }
        ]
      }
    }
  }
}
</script>
