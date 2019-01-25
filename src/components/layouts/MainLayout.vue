<template>
  <div>

    <!-- Just header =) -->
    <app-header/>

    <div class="tabs-wrapper">
      <div class="container">
        <ui-tabs :items="tabs"/>
      </div>
    </div>

    <div class="main-wrapper">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
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
      { id: 0, title: 'Счета и транзакции', icon: 'i-tab-transaction', path: '/main/dashboard' },
      { id: 1, title: 'Пополнить', icon: 'i-tab-add-founds', path: '/main/add-founds' },
      { id: 2, title: 'Перевести', icon: 'i-tab-transfer', path: '/main/transfer' }
    ]
  })
}
</script>

<style scoped>
  .tabs-wrapper {
    top: 100px;
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    background: #fff;
    z-index: 500;
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.03);
  }

  .main-wrapper {
    padding-top: 180px;
    height: 100vh;
    background: #F6F6F6;
  }
</style>
