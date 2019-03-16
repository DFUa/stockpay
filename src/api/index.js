import axios from 'axios'

import store from '@/store'

import { addFilters } from '@/utils'

const client = axios.create({
  baseURL: 'http://stockpay-web.winstars.tech/api'
})

export default {
  async execute (method, resource, data) {
    let accessToken = localStorage.getItem('t')

    return client({
      method,
      url: resource,
      data,
      headers: { Authorization: accessToken }
    }).then(resp => {
      if (resp.error && resp.error === 'unauthorized') {
        this.logout()
      }
      return resp.data
    }).catch(resp => {
      return {
        error: true,
        message: resp.response.data.error
      }
    })
  },

  // ACCOUNT
  async registration (data) {
    return this.execute('post', 'site/registration', data)
  },

  async confirmEmail (data) {
    return this.execute('post', 'code/registration', data)
  },

  async passwordReset (data) {
    return this.execute('post', 'code/reset_password', data)
  },

  async setupPassword (data) {
    return this.execute('post', 'site/change_password', data)
  },

  async changeNickname (data) {
    return this.execute('post', '/site/change_nickname', data)
  },

  async setPhone (data) {
    return this.execute('post', '/site/set_number', data)
  },

  async confirmPhone (data) {
    return this.execute('post', '/site/confirm_number', data)
  },

  async getTransactions () {
    return this.execute('get', 'site/transactions')
  },

  async login (data) {
    let res = await this.execute('post', 'site/login', data)
    if (res.token) {
      localStorage.setItem('t', res.token)
      store.dispatch('setAuth', true)
      if (res.role === 2) {
        store.dispatch('setAdmin', true)
      }
      return { error: false }
    }
    return res
  },

  async refresh () {
    let res = await this.execute('get', 'site/refresh')
    if (res && res.token) {
      localStorage.setItem('t', 'StocksPay ' + res.token)
      return true
    }
    localStorage.removeItem('t')
    store.dispatch('setAuth', false)
    return false
  },

  logout () {
    store.dispatch('setAuth', false)
    store.dispatch('setAdmin', false)
    localStorage.removeItem('t')
  },

  // GEODATA
  getCountries () {
    return this.execute('get', 'countries')
  },

  getCities (data) {
    return this.execute('get', addFilters('cities', data))
  },

  getCources () {
    return this.execute('get', 'site/course')
  },

  // PROFILE
  getProfile () {
    return this.execute('get', 'site/me')
  },

  updateProfile (data) {
    return this.execute('put', 'site/me', data)
  },

  // ADMIN
  getUserList () {
    return this.execute('get', '/admin/users')
  },

  getUserInfo (filters) {
    return this.execute('get', addFilters('/admin/users', filters))
  },

  changeUserInfo (data) {
    return this.execute('put', '/admin/change_user_info', data)
  },

  changeUserPassword (data) {
    return this.execute('put', '/admin/change_user_password', data)
  },

  getUserTransactions (filters) {
    return this.execute('get', addFilters('/admin/users_transactions', filters))
  }
}
