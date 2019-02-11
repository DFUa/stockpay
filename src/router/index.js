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
      redirect: '/account'
    },
    {
      name: 'account',
      path: '/account',
      redirect: '/account/main',
      component: lazyLoading('account/Account'),
      children: [
        {
          name: 'main',
          path: 'main',
          redirect: 'main/dashboard',
          component: lazyLoading('account/main/Main'),
          children: [
            {
              name: 'dashboard',
              path: 'dashboard',
              components: {
                default: lazyLoading('account/main/dashboard/Dashboard'),
                sidebar: lazyLoading('account/main/dashboard/DashboardSidebar')
              }
            },
            {
              name: 'add-founds',
              path: 'add-founds',
              redirect: 'add-founds/cards',
              components: {
                default: lazyLoading('account/main/add-founds/AddFounds'),
                sidebar: lazyLoading('account/main/add-founds/AddFoundsSidebar')
              },
              children: [
                { path: 'cards', component: lazyLoading('account/main/add-founds/cards/Cards') },
                { path: 'adv', component: lazyLoading('account/main/add-founds/adv/Adv') }
              ]
            },
            {
              name: 'transfer',
              path: 'transfer',
              redirect: 'transfer/wallets',
              components: {
                default: lazyLoading('account/main/transfer/Transfer'),
                sidebar: lazyLoading('account/main/transfer/TransferSidebar')
              },
              children: [
                { path: 'wallets', component: lazyLoading('account/main/transfer/wallets/Wallets') },
                { path: 'person', component: lazyLoading('account/main/transfer/person/Person') },
                { path: 'bank-card', component: lazyLoading('account/main/transfer/bank-card/BankCard') },
                { path: 'bank-account', component: lazyLoading('account/main/transfer/bank-account/BankAccount') }
              ]
            }
          ]
        },
        {
          name: 'Profile',
          path: 'profile',
          component: lazyLoading('account/profile/Profile')
        }
      ]
    },
    {
      name: 'Auth',
      path: '/auth',
      redirect: 'auth/sign-in',
      component: lazyLoading('auth/Auth'),
      children: [
        { path: 'sign-in', component: lazyLoading('auth/sign-in/SignIn') },
        { path: 'sign-up', component: lazyLoading('auth/sign-up/SignUp') },
        { path: 'email-confirm', component: lazyLoading('auth/sign-up/ActivationCode') },
        { path: 'password-reset', component: lazyLoading('auth/password-reset/PasswordReset') },
        { path: 'password-setup', component: lazyLoading('auth/password-reset/PasswordSetup') }
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
