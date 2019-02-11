<template>
  <div v-if="loaded">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'App',

  async mounted () {
    let token = localStorage.getItem('t')
    if (token && await api.refresh()) {
      this.$store.dispatch('setAuth', true)
      this.$router.push('/account/main/dashboard')
      setInterval(async () => { await api.refresh() }, 1000 * 60 * 15)
    } else {
      this.$store.dispatch('setAuth', false)
      this.$router.push('/auth')
    }
    this.loaded = true
  },

  data: () => ({
    loaded: false
  }),

  computed: {
    isAuth () {
      return this.$store.getters.isAuth
    }
  },

  watch: {
    isAuth (value) {
      if (value) {
        this.$router.push('/account/main/dashboard')
      } else {
        this.$router.push('/auth')
      }
    }
  }
}
</script>

<style lang="sass">
  @import '../sass/main.scss'
</style>
