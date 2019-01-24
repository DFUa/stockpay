<template>
  <div class="app-header">
    <div class="logo">StocksPay</div>
    <div class="info">
      <div class="item">1 USD - 66.0 RUB</div>
      <div class="item">1 UAH - 4.323 RUB</div>
      <div class="item">1 KZT - 0.18 RUB</div>
      <div class="item">1 EUR - 72.0 RUB</div>
    </div>
    <div class="user-profile">
      <div class="name">Name Lastname</div>
      <div class="status">Верифицирован</div>
    </div>
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
    height: 100px;
    width: 100%;
    background: #1D1D1D;
    padding: 0 35px;
    display: flex;
    align-items: center;
  }

  .logo {
    color: #fff;
    font-size: 24px;
    font-weight: 800;
    font-family: "Open Sans";
  }

  .info {
    margin-left: 120px;
    display: flex;
  }

  .info .item {
    color: #fff;
    font-size: 15px;
    font-family: "Open Sans";
    margin-right: 60px;
  }

  .user-profile {
    position: absolute;
    right: 30px;
  }

  .user-profile .name {
    color: #FFDB00;
    font-size: 18px;
    font-family: "Open Sans";
    margin-bottom: 2px;
  }

  .user-profile .status {
    color: #fff;
    font-size: 14px;
    font-family: "Open Sans";
  }
</style>
