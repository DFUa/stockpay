<template>
  <div>

    <!-- App sidebar -->
    <sidebar>
      <transition name="slide-left" mode="out-in">
        <router-view name="sidebar"/>
      </transition>
    </sidebar>

    <!-- Main router-view -->
    <div class="main-wrapper" :class="{'dashboard': this.$route.name === 'dashboard'}">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>

  </div>
</template>

<script>
import Sidebar from './Sidebar.vue'

export default {
  name: 'Main',

  components: {
    Sidebar
  }
}
</script>

<style scoped>
  .main-wrapper {
    margin-left: 320px;
    padding: 0 20px;
    padding-bottom: 20px;
  }
  .main-wrapper.dashboard {
    margin-left: 0;
  }

  @media screen and (max-width: 1680px) {
    .main-wrapper {
      margin-left: 80px;
    }
    .main-wrapper.dashboard {
      margin-left: 0;
    }
  }
</style>
