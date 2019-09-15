/**
 * @file Entry file
 * @author Yuqin
 */
import Vue from 'vue'
import VueRouter from './vue-fake-router'
import Main from './pages/main.vue'
import Detail from './pages/detail.vue'
import Setting from './components/setting.vue'
import Video from './components/detail-contents/video.vue'
import { reachBottomNotify, chartTool } from './utils'

const routes = [
  {
    path: '/page',
    component: Main
  },
  {
    name: 'setting',
    path: '/setting',
    component: Setting
  },
  {
    path: '/detail/:id',
    component: Detail,
    props: true,
    children: [
      {
        path: 'video/:vid',
        component: Video,
        props: true
      }
    ]
  }
]
const router = new VueRouter({ 
  routes
})
Vue.use(reachBottomNotify)
Vue.use(chartTool)

Vue.use(VueRouter)
const vm = new Vue({
    el: '#app',
    router,
    render: h => h('router-view')
})
