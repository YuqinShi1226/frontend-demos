/**
 * @file entry file
 * @author Yuqin
 */
import { request } from './utils'

class Manager {
  constructor ($container) {
    this.$container = $container
  }
  init () {
    request({
      url: '/list'
    }).then(rsp => console.log(rsp))
  }
  static getInstance ($container) {
    return new Manager($container)
  }
}

const $container = document.getElementById('container')
const manager = Manager.getInstance($container)

manager.init()
