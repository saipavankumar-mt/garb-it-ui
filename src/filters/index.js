import Vue from 'vue'
import { dateFormatter } from '@/utils/foratters'

Vue.filter('toDate', dateFormatter)
