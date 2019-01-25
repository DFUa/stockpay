<template>
  <div class="auth-layout">
    <h1>Unauthorised</h1>
    <div @click="login" class="auth-btn">Login</div>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',

  methods: {
    login () {
      this.$store.dispatch('login')
      // this.$router.push('/main/dashboard')
      this.$router.push('/profile')
    }
  }
}
</script>

<style scoped>
  .auth-layout {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .auth-layout h1 {
    font-weight: 600;
  }

  .auth-layout .auth-btn {
    cursor: pointer;
    margin-top: 30px;
    background: #eee;
    padding: 7px 25px;
    border-radius: 4px;
    transition: .5s;
  }

  .auth-layout .auth-btn:hover {
    background: #ddd;
  }
</style>
