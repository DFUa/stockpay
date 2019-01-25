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
      components: {
        default: lazyLoading('dashboard/Dashboard'),
        sidebar: lazyLoading('dashboard/DashboardSidebar')
      }
    },
    {
      name: 'add-founds',
      path: '/add-founds',
      components: {
        default: lazyLoading('add-founds/AddFounds'),
        sidebar: lazyLoading('add-founds/AddFoundsSidebar')
      }
    },
    {
      name: 'transfer',
      path: '/transfer',
      component: lazyLoading('transfer/Transfer')
    }
  ]
})

export default router
