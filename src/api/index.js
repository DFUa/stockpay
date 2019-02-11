import axios from 'axios'

import store from '@/store'

import { addFilters } from '@/utils'

const client = axios.create({
  baseURL: 'http://stockpay-api.winstars.tech:9696/api',
  json: true
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
      return { error: true }
    })
  },

  async registration (data) {
    return this.execute('post', 'site/registration', data)
  },

  async confirmEmail (data) {
    return this.execute('post', 'code/registration', data)
  },

  async login (data) {
    let res = await this.execute('post', 'site/login', data)
    if (res.token) {
      localStorage.setItem('t', res.token)
      store.dispatch('setAuth', true)
      return true
    }
    return false
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
    localStorage.removeItem('t')
  },

  // GEODATA
  getCountries () {
    return this.execute('get', 'countries')
  },

  getCities (data) {
    return this.execute('get', addFilters('cities', data))
  },

  // ACCOUNT
  getProfile () {
    return this.execute('get', 'site/me')
  },

  updateProfile (data) {
    return this.execute('put', 'site/me', data)
  }
}
