<template>
  <div class="admin-panel">
    <admin-header></admin-header>
    <div class="admin-wrap">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import AdminHeader from './AdminHeader'

export default {
  name: 'Admin',

  components: {
    AdminHeader
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

<style lang="scss" scoped>
  .admin-panel {
    background-color: rgba(#E5E5E5, .5);
    min-height: 100vh;
    padding-bottom: 40px;
  }

  .admin-wrap {
    position: relative;
    margin: 0 25px;
    max-width: 1550px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
  }
</style>
