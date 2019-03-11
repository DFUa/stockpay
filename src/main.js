import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import store from './store'

import vuescroll from 'vuescroll'
import vClickOutside from 'v-click-outside'
import Toasted from 'vue-toasted'

import 'vuescroll/dist/vuescroll.css'

Vue.use(vuescroll)
Vue.use(vClickOutside)
Vue.use(Toasted)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
