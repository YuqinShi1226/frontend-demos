/**
 * @file all utils
 * @author Yuqin
 */
import Echarts from 'echarts'

const createDebounce = (delay = 2000) => {
    let timer = null
    return function debounce (fn) {
        clearTimeout(timer)
        timer = setTimeout(() => {
        fn && fn()
        }, delay)
    }
}

const createThrottle = (delay = 1000) => {
    let status = 'start'
    return function throttle (fn) {
      if (status === 'waiting') {
        return
      }
      status = 'waiting'
      setTimeout(() => {
        fn && fn()
        status = 'start'
      }, delay)
    }
}

const THRESHOLD = 50

export const reachBottomNotify = {
  install: Vue => {
      Vue.mixin({
          created () {
            if (typeof this.onReachBottom === 'function') {
              const throttle = createThrottle(3000)
              window.onscroll = () => {
                const offsetHeight = document.documentElement.offsetHeight
                const screenHieght = window.screen.height
                const scrollY = window.scrollY
                const gap = offsetHeight - screenHieght - scrollY
                if (gap < THRESHOLD) {
                  throttle(() => {
                    this.onReachBottom && this.onReachBottom()
                  })
                }
              }
            }
          },
          beforeDestroy () {
            if (typeof this.onReachBottom === 'function') {
                window.onscroll = null
            }
          },
          methods: {
            createDebounce
          }
      })
  }
}

export const chartTool = {
  install: Vue => {
    Vue.mixin({
      methods: {
        createDebounce,
        createThrottle
      }
    })

    Vue.component('echarts', {
      props: {
        options: {
            type: Object,
            default: {}
        }
      },
      render (createElement) {
        return createElement(
            'div', 
            {
              attrs: {
                id: this.randomId
              },
              style: {
                width: '100%',
                height: '100px'
              },
              directives: [
                {
                  name: 'echarts'
                }
              ]
            }
        )
      },
      computed: {
        randomId () {
          return 'echarts-' + Math.floor(Math.random() * 10)
        }
      },
      methods: {
        receiveEchartsHandler (handler) {
            this.echartHandler = handler
        },
        draw() {
          const options = this.options;
          this.echartHandler.setOption(options)
        }
      },
      mounted() {
        this.draw()
        this.$watch('options', options => {
          this.draw()
        })
      }
    })

    Vue.directive('echarts', {
      inserted (el, binding, vnode) {
        const echartHandler = Echarts.init(el)
        vnode.context.receiveEchartsHandler && vnode.context.receiveEchartsHandler(echartHandler)
      }
    })
  }
}

