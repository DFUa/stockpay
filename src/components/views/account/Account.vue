<template>
  <div class="app-wrapper">

    <!-- Just header =) -->
    <app-header/>

    <div class="main-wrapper">
      <vue-scroll :ops="ops">
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </vue-scroll>
    </div>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue'

export default {
  name: 'Account',

  components: {
    AppHeader
  },

  data: () => ({
    ops: {
      bar: {
        background: '#006344',
        opacity: 0.8
      }
    }
  })
}
</script>

<style scoped>
  .main-wrapper {
    width: 100vw;
    padding-top: 175px;
    height: 100vh;
    background: #F6F6F6;
  }
</style>
