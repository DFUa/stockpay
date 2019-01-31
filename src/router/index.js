import Vue from 'vue'
import Router from 'vue-router'
import lazyLoading from './lazyLoading'

Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   name: 'not-found-redirect',
    //   path: '*',
    //   redirect: '/main/dashboard'
    // },
    {
      name: 'main',
      path: '/main',
      redirect: '/main/dashboard',
      component: lazyLoading('main/Main'),
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          components: {
            default: lazyLoading('main/dashboard/Dashboard'),
            sidebar: lazyLoading('main/dashboard/DashboardSidebar')
          }
        },
        {
          name: 'add-founds',
          path: 'add-founds',
          redirect: 'add-founds/cards',
          components: {
            default: lazyLoading('main/add-founds/AddFounds'),
            sidebar: lazyLoading('main/add-founds/AddFoundsSidebar')
          },
          children: [
            { path: 'cards', component: lazyLoading('main/add-founds/cards/Cards') },
            { path: 'adv', component: lazyLoading('main/add-founds/adv/Adv') }
          ]
        },
        {
          name: 'transfer',
          path: 'transfer',
          component: lazyLoading('main/transfer/Transfer')
        }
      ]
    },
    {
      name: 'Profile',
      path: '/profile',
      component: lazyLoading('profile/Profile')
    }
  ]
})

export default router
