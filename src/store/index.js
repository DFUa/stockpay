import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth: false
  },

  getters: {
    isAuth (state) {
      return state.isAuth
    }
  },

  mutations: {
    setAuth (state, value) {
      state.isAuth = value
    }
  },

  actions: {
    login ({ commit }) {
      commit('setAuth', true)
    },

    logout ({ commit }) {
      commit('setAuth', false)
    }
  }
})
