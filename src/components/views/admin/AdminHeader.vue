<template>
  <header>
    <a href="#" class="logo">StocksPay</a>
    <a href="#" class="logout" @click="logout">Logout</a>
  </header>
</template>

<script>
import api from '@/api'

export default {
  name: 'AdminHeader',

  methods: {
    logout () {
      api.logout()
    }
  }
}
</script>

<style lang="scss" scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1D1D1D;
    padding: 30px 50px;
    margin-bottom: 40px;
    a{
      text-decoration: none;
      color: #fff;
    }
    .logo{
      font-size: 24px;
      font-weight: 800;
    }
    .logout{
      opacity: .5;
    }
  }
</style>
