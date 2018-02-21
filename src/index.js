import ApiService from './service'

// Expose
export {
  ApiService
}

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
const plugin = {
  /* eslint-disable no-undef */
  version: VERSION,
  install: (Vue, options) => {
    const { client, endpoints = {}, mocks = {} } = options
    const api = ApiService(client, endpoints, mocks)
    Vue.$api = Vue.prototype.$api = api
  }
}

export default plugin

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}
