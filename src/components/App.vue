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

  async mounted () {
    let token = localStorage.getItem('t')
    if (token) {
      this.$store.dispatch('setAuth', true)
      console.log(this.isAdmin)
      if (this.isAdmin) {
        this.$router.push('/admin')
      } else {
        this.$router.push('/account/dashboard')
      }
      setInterval(async () => { await api.refresh() }, 1000 * 60 * 15)
    } else {
      this.$store.dispatch('setAuth', false)
      this.$store.dispatch('setAdmin', false)
      this.$router.push('/auth')
    }
  },

  data: () => ({
    loaded: false
  }),

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
      if (value) {
        this.$router.push('/account/dashboard')
      } else {
        this.$router.push('/auth')
      }
    },

    isAdmin (value) {
      if (value) {
        this.$router.push('/admin')
      } else {
        this.$router.push('/auth')
      }
    },
  }
}
</script>

<style lang="scss">
  @import '../sass/main.scss';
</style>
