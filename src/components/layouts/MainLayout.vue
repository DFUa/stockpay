<template>
  <div>

    <!-- Just header =) -->
    <app-header/>

    <div class="tabs-wrapper">
      <div class="container">
        <ui-tabs :items="tabs"/>
      </div>
    </div>

    <!-- Main router-view -->
    <div class="main-wrapper">
      <div class="container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './app-header/AppHeader.vue'

import UiTabs from '@/components/ui/ui-tabs/UiTabs.vue'

export default {
  name: 'MainLayout',

  components: {
    AppHeader,
    UiTabs
  },

  data: () => ({
    tabs: [
      { id: 0, title: 'Счета и транзакции', icon: 'i-tab-transaction', path: '/dashboard' },
      { id: 1, title: 'Пополнить', icon: 'i-tab-add-founds', path: '/add-founds' },
      { id: 2, title: 'Перевести', icon: 'i-tab-transfer', path: '/transfer' }
    ]
  })
}
</script>

<style scoped>
  .main-wrapper {
    padding-top: 180px;
    height: 100vh;
    background: #F6F6F6;
  }

  .container {
    width: 1280px;
    margin: 0 auto;
  }

  .tabs-wrapper {
    top: 100px;
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    background: #fff;
    z-index: 10;
  }
</style>
