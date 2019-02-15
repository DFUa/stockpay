<template>
  <div :class="{ 'group': true, 'disabled': disabled }">

    <input @input="onUpdate" @keyup.enter="onEnter" :maxlength="type === 'password' ? 35 : 100" v-model="currentValue"
      :style="{ background: background ? background : '#fff' }"
      :type="(type && !showPassword) ? type : 'text'" required>

    <div v-if="disabled" class="disabled-title">
      {{ currentValue }}
    </div>

    <label :style="{ background: background ? background : '#fff' }">{{ title }}</label>

    <div v-if="type === 'password'" class="eye-wrapper">
      <transition name="fade" mode="out-in">
        <div v-if="!showPassword" @click="togglePassword" key="key1" class="btn i-eye-closed"></div>
        <div v-else @click="togglePassword" key="key2" class="btn i-eye-show"></div>
      </transition>
    </div>

    <div class="slot-wrapper">
      <slot></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: 'UiInput',

  props: {
    type: String,
    title: String,
    value: String,
    disabled: Boolean,
    background: String
  },

  mounted () {
    this.currentValue = this.value
  },

  data: () => ({
    currentValue: '',
    showPassword: false
  }),

  methods: {
    onUpdate () {
      this.$emit('input', this.currentValue)
    },

    onEnter () {
      this.$emit('on-enter')
    },

    togglePassword () {
      this.showPassword = !this.showPassword
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
    height: 50px;
    margin-bottom: 20px;
  }
  input {
    width: 100%;
    height: 50px;
    font-size: 14px;
    font-family: "Open Sans";
    border-radius: 8px;
    border: 1px solid #DFDFDF;
    padding: 0px 21px;
    display: flex;
    align-items: center;
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

  .slot-wrapper {
    position: absolute;
    right: 5px;
    top: 5px;
  }

  .disabled input {
    color: transparent;
  }

  .disabled-title {
    position: absolute;
    top: 15px;
    left: 22px;
    font-size: 14px;
  }

  .eye-wrapper {
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 15px;
    display: flex;
    align-items: center;
  }

  .eye-wrapper .btn {
    cursor: pointer;
  }
</style>
