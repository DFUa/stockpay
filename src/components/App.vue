<template>
  <div v-if="loaded">
    <transition name="fade" mode="out-in">
      <AuthLayout v-if="!isAuth" key="auth"/>
      <MainLayout v-else key="main"/>
    </transition>
  </div>
</template>

<script>
import api from '@/api'

import AuthLayout from '@/components/layouts/AuthLayout.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'

export default {
  name: 'App',

  components: {
    AuthLayout,
    MainLayout
  },

  async mounted () {
    let token = localStorage.getItem('t')
    if (token && await api.refresh()) {
      this.$store.dispatch('setAuth', true)
      this.$router.push('/main/dashboard')
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
        this.$router.push('/main/dashboard')
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
