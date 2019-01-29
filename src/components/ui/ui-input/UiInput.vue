<template>
  <div :class="{ 'group': true, 'disabled': disabled }">

    <input @input="onUpdate" @keyup.enter="onEnter" v-model="currentValue"
      :type="type ? type : 'text'" required>

    <div v-if="disabled" class="disabled-title">
      {{ currentValue }}
    </div>

    <label>{{ title }}</label>

    <slot></slot>

  </div>
</template>

<script>
export default {
  name: 'UiInput',

  props: {
    type: String,
    title: String,
    value: String,
    disabled: Boolean
  },

  mounted () {
    this.currentValue = this.value
  },

  data: () => ({
    currentValue: ''
  }),

  methods: {
    onUpdate () {
      this.$emit('input', this.currentValue)
    },

    onEnter () {
      this.$emit('on-enter')
    }
  },

  watch: {
    value () {
      this.currentValue = this.value
    }
  }
}
</script>

<style scoped>
  .group {
    position: relative;
    margin-bottom: 23px;
  }

  input {
    width: 100%;
    font-size: 14px;
    font-weight: 600;
    font-family: "Open Sans";
    border-radius: 8px;
    border: 1px solid #DFDFDF;
    padding: 15px 22px;
    display: block;
    background: transparent;
  }

  input:focus {
    outline: none;
  }

  label {
    color: #000;
    font-size: 14px;
    background: #fff;
    font-family: "Open Sans";
    position: absolute;
    pointer-events: none;
    left: 16px;
    padding: 0 6px;
    top: 15px;
    opacity: 0.5;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  input:focus ~ label,
  input:valid ~ label {
    top: -10px;
    opacity: 1;
    color: #006344;
    font-weight: 600;
  }

  input:focus,
  input:valid {
    border: 1px solid #006344;
  }

  .disabled input {
    color: transparent;
  }

  .disabled-title {
    position: absolute;
    top: 15px;
    left: 16px;
  }
</style>
