import Vue from 'vue'
import Router from 'vue-router'
import lazyLoading from './lazyLoading'

import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      name: 'redirect',
      path: '*',
      redirect: store.getters.isAdmin ? '/admin' : '/account'
    }, {
      name: 'admin',
      path: '/admin',
      redirect: '/admin/user-table',
      component: lazyLoading('admin/Admin'),
      children: [
        {
          name: 'user-table',
          path: 'user-table',
          component: lazyLoading('admin/view/UserTable')
        },
        {
          name: 'user-info',
          path: 'user-info/:email/:nickname',
          component: lazyLoading('admin/view/UserInfo')
        }
      ]
    }, {
      name: 'account',
      path: '/account',
      redirect: '/account/main',
      component: lazyLoading('account/Account'),
      children: [
        {
          name: 'main',
          path: 'main',
          redirect: 'main/service',
          component: lazyLoading('account/main/Main'),
          children: [
            {
              name: 'dashboard',
              path: 'dashboard',
              components: {
                default: lazyLoading('account/main/dashboard/Dashboard'),
                sidebar: lazyLoading('account/main/dashboard/DashboardSidebar')
              }
            }, {
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
            }, {
              name: 'transfer',
              path: 'transfer',
              redirect: 'transfer/person',
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
            }, {
              name: 'service',
              path: 'service',
              redirect: 'service/phone',
              components: {
                default: lazyLoading('account/main/service/Service'),
                sidebar: lazyLoading('account/main/service/ServiceSidebar')
              },
              children: [
                {
                  path: 'phone',
                  component: lazyLoading('account/main/service/phone/Phone')
                },
                {
                  path: 'vk',
                  component: lazyLoading('account/main/service/vk/Vk')
                },
                {
                  path: 'internet',
                  component: lazyLoading('account/main/service/internet/Internet')
                },
                {
                  path: 'television',
                  component: lazyLoading('account/main/service/television/Television')
                },
                {
                  path: 'taxi',
                  component: lazyLoading('account/main/service/taxi/Taxi')
                },
                {
                  path: 'house',
                  component: lazyLoading('account/main/service/house/House')
                },
                {
                  path: 'support',
                  component: lazyLoading('account/main/service/support/Support')
                }
              ]
            }
          ]
        },
        {
          name: 'profile',
          path: 'profile',
          component: lazyLoading('account/profile/Profile')
        }
      ]
    }, {
      name: 'auth',
      path: '/auth',
      redirect: 'auth/sign-in',
      component: lazyLoading('auth/Auth'),
      children: [
        { name: 'auth-signin', path: 'sign-in', component: lazyLoading('auth/sign-in/SignIn') },
        { path: 'sign-up', component: lazyLoading('auth/sign-up/SignUp') },
        { path: 'email-confirm', component: lazyLoading('auth/sign-up/ActivationCode') },
        { path: 'password-reset', component: lazyLoading('auth/password-reset/PasswordReset') },
        { path: 'password-setup', component: lazyLoading('auth/password-reset/PasswordSetup') }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (store.getters.isAuth) {
    if (to.path.includes('auth')) {
      next(false) // Не пускаємо авторизовани користувачів на сторінку авторизації
    } else {
      if (store.getters.isAdmin && to.path.includes('admin')) {
        next() // Пускаємо адміна в адмінку
      } else if (!store.getters.isAdmin && to.path.includes('admin')) {
        next(false) // Не пускаємо юзера в адмінку
      } else if (!store.getters.isAdmin && to.path.includes('account')) {
        next() // Пускаємо юзера в профіль
      } else if (store.getters.isAdmin && to.path.includes('account')) {
        next(false) // Не пускаємо адміна в профіль
      } else if (store.getters.isAdmin && to.path.includes('admin')) {
        next() // Пускаємо адміна в адмінку
      } else if (!store.getters.isAdmin && to.path.includes('admin')) {
        next(false) // Не пускаємо юзера в адмінку
      }
    }
  } else {
    if (!to.path.includes('auth')) {
      next(false) // Непускаємо неавторизованих користувачів нікуди крім сторінки авторизації
    } else {
      next()
    }
  }
})

export default router
