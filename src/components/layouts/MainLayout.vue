<template>
  <div>

    <!-- Just header =) -->
    <app-header/>

    <div class="tabs-wrapper">
      <div class="container">
        <ui-tabs :items="tabs"/>
      </div>
    </div>

    <!-- App sidebar -->
    <sidebar>
      <transition name="slide-left" mode="out-in">
        <router-view name="sidebar"/>
      </transition>
    </sidebar>

    <!-- Main router-view -->
    <div class="main-wrapper">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import AppHeader from './app-header/AppHeader.vue'
import Sidebar from './sidebar/Sidebar.vue'

import UiTabs from '@/components/ui/ui-tabs/UiTabs.vue'

export default {
  name: 'MainLayout',

  components: {
    AppHeader,
    Sidebar,
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
    margin-left: 320px;
    padding: 0 20px;
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
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.03);
  }
</style>
