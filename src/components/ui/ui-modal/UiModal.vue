<template>
  <ui-modal-overlay
    :show="showModal"
    @on-close="closeModal">
    <div class="ui-modal">
      <span @click="closeModal" class="close-icon i-close-modal"></span>
      <div class="title">{{ title }}</div>
      <div class="inner">
        <slot></slot>
      </div>
      <ui-button @click="apply" :accent="true" :title="buttonTitle"/>
    </div>
  </ui-modal-overlay>
</template>

<script>
import UiButton from '@/components/ui/ui-button/UiButton.vue'
import UiModalOverlay from '@/components/ui/ui-modal-overlay/UiModalOverlay.vue'

export default {
  name: 'UiModal',

  props: {
    value: Boolean,
    title: String,
    buttonTitle: String
  },

  components: {
    UiButton,
    UiModalOverlay
  },

  mounted () {
    this.showModal = this.value
  },

  data: () => ({
    showModal: false
  }),

  methods: {
    apply () {
      this.$emit('on-apply')
    },

    closeModal () {
      this.$emit('on-close')
    }
  },

  watch: {
    value (value) {
      this.showModal = value
    },

    showModal (value) {
      if (this.value !== value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style scoped>
  .ui-modal {
    position: relative;
    width: 600px;
    min-height: 120px;
    border-radius: 5px;
    background: #fff;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .inner {
    min-width: 350px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .title {
    color: #1D1D1D;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 50px;
  }

  .close-icon {
    position: absolute;
    top: 25px;
    right: 25px;
    cursor: pointer;
  }
</style>
