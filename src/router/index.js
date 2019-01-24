import Vue from 'vue'
import Router from 'vue-router'
import lazyLoading from './lazyLoading'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'not-found-redirect',
      path: '*',
      redirect: '/dashboard'
    },
    {
      name: 'dashboard',
      path: '/dashboard',
      component: lazyLoading('dashboard/Dashboard')
    }
  ]
})

export default router
