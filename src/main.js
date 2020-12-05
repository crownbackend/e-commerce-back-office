import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import dayjs from 'dayjs'

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.use(dayjs)
Vue.prototype.$log = console.log.bind(console)
Vue.prototype.$hostName = 'http://127.0.0.1:8000/api'

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
