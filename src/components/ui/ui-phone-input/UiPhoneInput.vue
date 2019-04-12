<template>
  <div class="ui-phone-input">

    <div class="code">{{ code }}</div>

    <the-mask :mask="mask" :disabled="lock" v-model="currentValue"/>

    <label>{{ title }}</label>

    <div class="slot-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { TheMask } from 'vue-the-mask'

export default {
  name: 'UiPhoneInput',

  components: {
    TheMask
  },

  props: {
    value: String,
    title: String,
    code: String,
    mask: String,
    lock: Boolean
  },

  mounted () {
    this.currentValue = this.value
  },

  data: () => ({
    currentValue: ''
  }),

  watch: {
    value (value) {
      this.currentValue = value
    },

    mask () {
      this.currentValue = ''
    },

    currentValue (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>
  .ui-phone-input {
    position: relative;
    width: 100%;
    height: 50px;
    font-size: 14px;
    font-family: 'Montserrat';
    border-radius: 8px;
    border: 1px solid #DFDFDF;
    padding: 0px 21px;
    display: flex;
    align-items: center;
  }

  .ui-phone-input .code {
    opacity: 0.7;
    margin-right: 5px;
  }

  .ui-phone-input label {
    top: -10px;
    color: #000;
    font-weight: 600;
    font-size: 14px;
    background: #fff;
    font-family: 'Montserrat';
    position: absolute;
    pointer-events: none;
    left: 16px;
    padding: 0 6px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  .ui-phone-input input {
    opacity: 0.7;
    font-size: 14px;
    font-family: 'Open Sans';
  }

  .ui-phone-input input[disabled] {
    opacity: 0.9;
    background: transparent;
  }

  .ui-phone-input input:hover,
  .ui-phone-input input:focus {
    opacity: 1;
  }

  .ui-phone-input .slot-wrapper {
    position: absolute;
    right: 10px;
  }
</style>
