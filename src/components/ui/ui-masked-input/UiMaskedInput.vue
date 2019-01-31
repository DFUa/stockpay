<template>
  <div class="group" :style="{ borderColor: borderColor ? borderColor : '#E7E7E7',
    background: backgroundColor ? backgroundColor : '#fff' }">

    <the-mask :mask="mask" v-model="currentValue"/>

    <label :style="{ background: backgroundColor ? backgroundColor : '#fff' }">{{ title }}</label>

  </div>
</template>

<script>
import { TheMask } from 'vue-the-mask'

export default {
  name: 'UiMaskedInput',

  components: {
    TheMask
  },

  props: {
    type: String,
    title: String,
    value: String,
    mask: String,
    backgroundColor: String,
    borderColor: String
  },

  mounted () {
    this.currentValue = this.value
  },

  data: () => ({
    currentValue: ''
  }),

  watch: {
    value () {
      this.currentValue = this.value
    },

    currentValue () {
      this.$emit('input', this.currentValue)
    }
  }
}
</script>

<style scoped>
  .group {
    position: relative;
    width: 100%;
    height: 40px;
    padding: 0 22px;
    border-radius: 8px;
    border: 1px solid #E7E7E7;
    display: flex;
    align-items: center;
  }

  label {
    position: absolute;
    top: -10px;
    left: 14px;
    padding: 0 6px;
    color: #000;
    font-size: 12px;
    font-weight: 600;
    background: #fff;
    font-family: "Open Sans";
  }

  input {
    font-size: 14px;
    font-weight: 600;
    font-family: "Open Sans";
    background: transparent;
  }

  input:focus {
    outline: none;
  }
</style>
