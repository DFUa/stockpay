import Vue from 'vue'
import Router from 'vue-router'
import lazyLoading from './lazyLoading'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'sign-in',
      path: '/auth/sign-in',
      component: lazyLoading('auth/SignIn')
    },
    {
      name: 'sign-up',
      path: '/auth/sign-up',
      component: lazyLoading('auth/SignUp')
    },
    {
      name: 'dashboard',
      path: '/profile/dashboard',
      component: lazyLoading('profile/dashboard/Dashboard')
    }
  ]
})
