<template>
  <div>
    <MainLayout v-if="isAuth"/>
    <AuthLayout v-else/>
  </div>
</template>

<script>
import AuthLayout from '@/components/layouts/AuthLayout.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'

export default {
  name: 'App',

  components: {
    AuthLayout,
    MainLayout
  },

  mounted () {
    let token = ('token')
    if (token) {
      this.$store.dispatch('login')
      this.$router.push('/main/dashboard')
    }
  },

  methods: {
  },

  computed: {
    isAuth () {
      return this.$store.getters.isAuth
    }
  }
}
</script>

<style lang="sass">
  @import '../sass/main.scss'
</style>
