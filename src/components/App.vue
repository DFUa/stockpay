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

  computed: {
    isAuth () {
      return this.$store.getters.isAuth
    }
  },

  watch: {
    isAuth (value) {
      if (value) {
        this.$router.push('/profile/dashboard')
      } else {
        this.$router.push('/auth/sign-in')
      }
    }
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    border: none;
    box-sizing: border-box;
  }
</style>
