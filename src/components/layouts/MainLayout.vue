<template>
  <div>

    <div class="app-wrapper">

      <!-- Just header =) -->
      <app-header/>

      <div class="main-wrapper">
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </div>
    </div>

  </div>
</template>

<script>
import AppHeader from './app-header/AppHeader.vue'

export default {
  name: 'MainLayout',

  components: {
    AppHeader
  }
}
</script>

<style scoped>
  .main-wrapper {
    padding-top: 210px;
    min-height: 100vh;
    background: #F6F6F6;
  }
</style>
