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
      <div @click="openUserProfile" class="icon">
        <span class="i-user"></span>
      </div>
      <div @click="openUserProfile" class="name">Name Lastname</div>
      <div class="status">Верифицирован</div>
    </div>
    <div class="logout">Logout</div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',

  methods: {
    openUserProfile () {
      this.$router.push('/profile')
    }
  }
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
    z-index: 500;
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

  .user-profile .icon {
    display: none;
  }

  .user-profile .name {
    cursor: pointer;
    color: #FFDB00;
    font-size: 18px;
    font-family: "Open Sans";
    margin-bottom: 2px;
    transition: .2s;
  }

  .user-profile .name:hover {
    text-shadow: 2px 1px 10px rgba(255, 219, 0, 1);
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

  @media screen and (max-width: 1650px) {
    .user-profile .name {
      display: none;
    }

    .user-profile .status {
      display: none;
    }

    .user-profile {
      right: 140px;
    }

    .user-profile .icon {
      cursor: pointer;
      height: 34px;
      width: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      transition: .5s;
    }

    .user-profile .icon:hover {
      background: rgba(255, 255, 255, 0.17);
    }
  }

  @media screen and (max-width: 1300px) {
    .info {
      margin-left: 40px;
    }

    .info .item {
      margin-right: 23px;
    }
  }

  /* @media screen and (max-width: 1065px) {
    .info {
      width: 300px;
      display: flex;
      flex-wrap: wrap;
    }

    .info .item {
      width: 50%;
      margin: 5px 0;
      margin-right: 0;
    }
  } */
</style>
