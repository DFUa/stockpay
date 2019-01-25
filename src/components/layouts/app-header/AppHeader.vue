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
    <div class="logout">Logout</div>
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
    padding: 0 50px;
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
    margin-left: 150px;
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
    right: 320px;
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

  .logout {
    cursor: pointer;
    position: absolute;
    opacity: 0.5;
    color: #fff;
    right: 40px;
    transition: .5s;
  }

  .logout:hover {
    opacity: 0.7;
  }
</style>
