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
      return true
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
