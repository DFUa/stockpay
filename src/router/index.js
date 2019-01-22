import Vue from 'vue'
import Router from 'vue-router'
import lazyLoading from './lazyLoading'
import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'not-found-redirect',
      path: '*',
      redirect: '/auth/sign-in'
    },
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

router.beforeEach((to, from, next) => {
  const isAuth = store.getters.isAuth
  if (isAuth && to.path.includes('auth')) {
      return router.push({ name: 'dashboard' });
  } else {
    if (!isAuth && to.path.includes('profile')) {
      return router.push({ name: 'sign-in' });
    }
  }
  return next();
})

export default router
