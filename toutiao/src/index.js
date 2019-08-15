/**
 * @file entry file
 * @author Yuqin
 */
import { request } from './utils'
import components from './items'

class Manager {
  constructor ($container) {
    this.$container = $container
  }
  init () {
    this.appendData()
    detectReachBottom(this.appendData.bind(this))
  }
  appendData () {
    request({
      url: '/list'
    }).then(rsp => {
      const items = rsp.data
      items.forEach(item => {
        const componentName = item.type.replace(/^\w/g, w => w.toUpperCase())
        const Component = components[componentName]
        
        const currentComponent = new Component(item)
        const componentElement = currentComponent.constructElement()
        this.$container.appendChild(componentElement)
      })
    })
  }

  static getInstance ($container) {
    return new Manager($container)
  }
}


const detectReachBottom = callback => {
  const THRESHOLD = 50
  window.onscroll = () => {
    const offsetHeight = document.documentElement.offsetHeight
    const screenHieght = window.screen.height
    const scrollY = window.scrollY
    const gap = offsetHeight - screenHieght - scrollY
    if (gap < THRESHOLD) {
      callback()
    }
  }
}
const $container = document.getElementById('container')
const manager = Manager.getInstance($container)

manager.init()
