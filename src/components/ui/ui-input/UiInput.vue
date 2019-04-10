<template>
  <div :class="{ 'group': true, 'disabled': disabled, 'has-text' : (currentValue || currentValue === 0), 'invalid': !isValid }">

    <input
    @input="onUpdate"
    @keyup.enter="onEnter"
    v-model="currentValue"
    :maxlength="type === 'password' ? 35 : 100"
    :disabled="disabled"
    :style="{ background: background ? background : '#fff' }"
    :type="(type && !showPassword) ? type : 'text'" required>

    <div v-if="disabled" class="disabled-title">
      {{ currentValue }}
    </div>

    <span v-if="!isValid" class="error-text">{{errorText}}</span>
    <span v-if="desc" class="input-desc">{{desc}}</span>
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
    value: [String, Number],
    disabled: Boolean,
    background: String,
    desc: String,
    rules: [Array, Object]
  },

  mounted () {
    this.currentValue = this.value
    this.$on('validate', this.validate)
  },

  data: () => ({
    currentValue: '',
    isValid: true,
    showPassword: false,
    errorText: 'error text'
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
    },

    /*
    ToDo: compare inputs (return true/false)
    remove required from email
    */
    validate () {
      this.isValid = true
      this.errorText = ''
      const result = []
      if (this.rules) {
        this.rules.forEach(element => {
          switch (element.name) {
            case 'required':
              if (!this.currentValue) {
                result.push({
                  result: false,
                  text: element.text
                    ? this.errorText = element.text
                    : this.errorText = 'Это поле не должно быть пустым'
                })
              } else {
                result.push({
                  result: true
                })
                this.isValid = true
              }
              break
            case 'min':
              if (this.currentValue.length < element.value) {
                result.push({
                  result: false,
                  text: element.text
                    ? this.errorText = element.text
                    : this.errorText = `Это поле должно иметь ${element.value} или более символов`
                })
              } else {
                result.push({
                  result: true
                })
                this.isValid = true
              }
              break
            case 'max':
              if (this.currentValue.length > element.value) {
                result.push({
                  result: false,
                  text: element.text
                    ? this.errorText = element.text
                    : this.errorText = `Это поле должно иметь ${element.value} или менее символов`
                })
              } else {
                result.push({
                  result: true
                })
                this.isValid = true
              }
              break
            case 'compare':
              if (this.currentValue !== element.value) {
                result.push({
                  result: false,
                  text: element.text
                    ? this.errorText = element.text
                    : this.errorText = `Поля не совпадают`
                })
              } else {
                result.push({
                  result: true
                })
                this.isValid = true
              }
              break
            case 'pattern':
              if (this.currentValue.length > 0 && !element.value.test(this.currentValue)) {
                result.push({
                  result: false,
                  text: element.text
                    ? this.errorText = element.text
                    : this.errorText = 'Неверный формат'
                })
              } else {
                result.push({
                  result: true
                })
                this.isValid = true
              }
              break
            default:
              this.isValid = false
              this.errorText = 'чото пішло не так'
              break
          }
        })
        for (let element of result) {
          if (!element.result) {
            this.isValid = false
            this.errorText = element.text
          }
        }
        return result.every(res => {
          return res.result
        })
      } else if (this.type === 'email') {
        const testMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!(testMail.test(this.currentValue))) {
          this.isValid = false
          this.errorText = 'Не верный формат почты'
          return false
        }
        return true
      } else {
        this.isValid = true
        return true
      }
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
    margin-bottom: 30px;
  }

  input {
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

  input:focus {
    outline: none;
  }

  label {
    color: #000;
    font-size: 14px;
    background: #fff;
    font-family: 'Montserrat';
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
  .has-text input ~ label {
    top: -10px;
    opacity: 1;
    color: #006344;
    font-weight: 600;
  }

  .has-text.disabled input ~ label {
    color: #000;
  }

  .invalid input ~ label{
    color: red;
  }

  input:focus{
    border: 1px solid #006344;
  }

  .invalid input{
    border-color: red;
  }

  .error-text{
    font-size: 11px;
    color: red;
    position: absolute;
    top: 50px;
    left: 0;
  }

  .slot-wrapper {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    font-size: 14px;
    font-weight: 600;
  }

  .disabled input {
    color: transparent;
  }

  .input-desc{
    position: absolute;
    font-weight: 600;
    font-size: 14px;
    font-family: 'Montserrat';
  }

  .disabled-title {
    font-family: 'Montserrat';
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
