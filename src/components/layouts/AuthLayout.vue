<template>
  <div class="auth-layout">
    <div class="section">
      <router-view/>
    </div>
    <div class="section accent">
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout'
}
</script>

<style scoped>
  .auth-layout {
    height: 100vh;
    display: flex;
  }

  .auth-layout .section {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .section.accent {
    background: linear-gradient(#00593D, #00140E);
  }
</style>
