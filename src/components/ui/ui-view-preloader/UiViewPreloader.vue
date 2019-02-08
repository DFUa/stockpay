<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-if="loaded" key="slotkey">
        <slot/>
      </div>
      <div v-else class="preloader-wrapper" key="preloaderkey">
        <ui-spinner/>
      </div>
    </transition>
  </div>
</template>

<script>
import UiSpinner from '@/components/ui/ui-spinner/UiSpinner.vue'

export default {
  name: 'UiViewPreloader',

  props: {
    loaded: Boolean
  },

  components: {
    UiSpinner
  }
}
</script>

<style scoped>
  .preloader-wrapper {
    width: 100%;
    height: calc(100vh - 270px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
