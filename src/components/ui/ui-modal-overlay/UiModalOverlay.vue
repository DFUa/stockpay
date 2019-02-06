<template>
  <transition name="fade-up">
    <div v-if="show" class="modal-overlay">
      <div class="scroll-wrapper">
        <vue-scroll>
          <div class="inner" @click.self="close">
            <slot></slot>
          </div>
        </vue-scroll>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'UiModalOverlay',

  props: {
    show: Boolean
  },

  methods: {
    close () {
      this.$emit('on-close')
    }
  }
}
</script>

<style scoped>
  .modal-overlay {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: -30px;
    z-index: 1500;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-overlay .scroll-wrapper {
    height: 100vh;
    width: 100%;
  }

  .modal-overlay .inner {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 60px;
    padding-bottom: 60px;
    z-index: 1000;
  }
</style>
