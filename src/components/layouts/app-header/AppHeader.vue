<template>
  <div class="app-header">
    <div class="logo">StocksPay</div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
  .app-header {
    position: fixed;
    height: 80px;
    width: 100%;
    background: #006344;
    padding: 0 35px;
    display: flex;
    align-items: center;
  }

  .logo {
    color: #fff;
    font-size: 30px;
    font-family: "Roboto Mono";
  }
</style>
