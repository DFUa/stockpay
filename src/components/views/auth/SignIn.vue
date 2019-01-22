<template>
  <div>
    <h1>Sign in</h1>
    <button @click="signIn">Sign In</button>
  </div>
</template>

<script>
export default {
  name: 'SignIn',

  methods: {
    signIn () {
      this.$store.dispatch('login')
    }
  }
}
</script>

<style scoped>
</style>
