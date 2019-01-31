<template>
  <div>

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
import Sidebar from '@/components/layouts/sidebar/Sidebar.vue'

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

  @media screen and (max-width: 1680px) {
    .main-wrapper {
      margin-left: 80px;
    }
  }
</style>
