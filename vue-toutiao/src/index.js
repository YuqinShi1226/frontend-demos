/**
 * @file Entry file
 * @author Yuqin
 */
import Vue from 'vue'
import Main from './pages/main.vue'
import { reachBottomNotify, chartTool } from './utils'


Vue.use(reachBottomNotify)
Vue.use(chartTool)

const vm = new Vue({
    el: '#app',
    render: h => h(Main)
})

