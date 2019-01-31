import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import store from './store'

import vuescroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'

Vue.use(vuescroll)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
