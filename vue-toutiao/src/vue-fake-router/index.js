/**
 * @file router
 * @author Yuqin
 */

export default class VueRouter {
    constructor (options) {
        this.options = options
        this.history = new History()
        this.history.listen(newHash => {
            this.vm.$forceUpdate()
        })
    }

    push (path) {
        this.history.push(path)
    }

    static install (Vue, options) {
        Vue.mixin({
            created () {
                // Self-check
                if (this.$options.router) {
                    this.$options.router.vm = this
                    this.$router = this.$options.router
                } else {
                    this.$router = this.$parent.$router
                }
            }
        })
        Vue.component('router-view', {
            functional: true,
            render(h,  { props, parent, childen }) {
                const router = parent.$options.router
                const currentRoute = findComponent(router.options.routes)
                // Get corresponding component
                return h(currentRoute.component)
            }
        })
        Vue.component('router-link', {
            render(h) {
               return h('a', {
                   on: {
                       click: this.clicking
                   }
               }, this.$slots.default)
            },

            methods: {
                clicking () {
                    window.history.back()
                }
            }
        })
    }

}

const findComponent = routes => {
    const hash = location.hash
    return routes.find(route => route.path === hash.replace(/^#/g, ''))
}

class History {
    listen (callback) {
        window.addEventListener('hashchange', () => {
            callback && callback(window.location.hash)
        })
    }
    push (path) {
        window.location.hash = `#${path}`
    }
}
