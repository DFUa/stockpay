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
    },
    {
      name: 'add-founds',
      path: '/add-founds',
      component: lazyLoading('add-founds/AddFounds')
    },
    {
      name: 'transfer',
      path: '/transfer',
      component: lazyLoading('transfer/Transfer')
    }
  ]
})

export default router
