import Vue from 'vue'
import Router from 'vue-router'
import lazyLoading from './lazyLoading'

import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'redirect',
      path: '*',
      redirect: '/auth'
    },
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
          redirect: 'transfer/wallets',
          components: {
            default: lazyLoading('main/transfer/Transfer'),
            sidebar: lazyLoading('main/transfer/TransferSidebar')
          },
          children: [
            { path: 'wallets', component: lazyLoading('main/transfer/wallets/Wallets') },
            { path: 'person', component: lazyLoading('main/transfer/person/Person') },
            { path: 'bank-card', component: lazyLoading('main/transfer/bank-card/BankCard') },
            { path: 'bank-account', component: lazyLoading('main/transfer/bank-account/BankAccount') }
          ]
        }
      ]
    },
    {
      name: 'Profile',
      path: '/profile',
      component: lazyLoading('profile/Profile')
    },
    {
      name: 'Auth',
      path: '/auth',
      redirect: 'auth/sign-in',
      component: lazyLoading('auth/Auth'),
      children: [
        { path: 'sign-in', component: lazyLoading('auth/sign-in/SignIn') },
        { path: 'sign-up', component: lazyLoading('auth/sign-up/SignUp') },
        { path: 'email-confirm', component: lazyLoading('auth/sign-up/ActivationCode') }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (store.getters.isAuth && to.path.includes('auth')) {
    next(false)
  } else {
    if (!store.getters.isAuth && !to.path.includes('auth')) {
      next(false)
    } else {
      next()
    }
  }
})

export default router
