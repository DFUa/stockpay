<template>
  <div class="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'App',

  mounted () {
    this.init()
  },

  data: () => ({
    loaded: false
  }),

  methods: {
    async init () {
      let token = localStorage.getItem('t')
      if (token && await api.refresh()) {
        this.$store.dispatch('setAuth', true)
        setInterval(async () => { await api.refresh() }, 1000 * 60 * 15)
      } else {
        this.$store.dispatch('setAuth', false)
        this.$store.dispatch('setAdmin', false)
        this.$router.push('/auth')
      }
      this.loaded = true
    }
  },

  computed: {
    isAuth () {
      return this.$store.getters.isAuth
    },

    isAdmin () {
      return this.$store.getters.isAdmin
    }
  },

  watch: {
    isAuth (value) {
      this.$router.push(value ? (this.isAdmin ? '/admin' : '/account') : '/auth')
    }
  }
}
</script>

<style lang="scss">
  @import '../sass/main.scss';
</style>
