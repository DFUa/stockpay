import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import store from './store'

import vuescroll from 'vuescroll'
import vClickOutside from 'v-click-outside'
import Toasted from 'vue-toasted'
import Datetime from 'vue-datetime'
import { Settings } from 'luxon'

import 'vue-datetime/dist/vue-datetime.css'
import 'vuescroll/dist/vuescroll.css'

Vue.use(Datetime)
Vue.use(vuescroll)
Vue.use(vClickOutside)
Vue.use(Toasted)

Settings.defaultLocale = 'ru'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
