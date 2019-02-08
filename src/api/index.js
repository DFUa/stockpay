import axios from 'axios'

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
      return resp.data
    }).catch(error => {
      console.log(error)
    })
  },

  async registration (data) {
    return this.execute('post', 'site/registration', data)
  },

  async login (data) {
    let res = await this.execute('post', 'site/login', data)
    if (res.token) {
      localStorage.setItem('t', res.token)
      return true
    }
    return false
  },

  logout () {
    localStorage.removeItem('t')
  },

  // GEODATA
  getCountries () {
    return this.execute('get', 'countries')
  },

  getCities (data) {
    return this.execute('get', addFilters('cities', data))
  }
}
