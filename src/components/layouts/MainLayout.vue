<template>
  <div>

    <!-- Just header =) -->
    <app-header/>

    <!-- Main router-view -->
    <div class="main-wrapper">
      <router-view/>
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
    padding-top: 120px;
    width: 1280px;
    margin: 0 auto;
  }
</style>
