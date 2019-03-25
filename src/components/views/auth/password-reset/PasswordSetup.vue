<template>
  <div>
    <div v-if="loaded">
      <h1>Ведите код с <span v-if="way == 0">почты</span> <span v-if="way == 1">номера</span> и создайте новый пароль</h1>

      <div class="fields">
        <ui-input title="Код" v-model="code"/>
        <ui-input type="password" title="Новый пароль" v-model="password_0"/>
        <ui-input type="password" title="Подтвердите пароль" v-model="password_1"/>
      </div>
      <a  v-if="way == 1" href="#" class="no-access" @click="noAccess">No access to the phone?</a>

      <div class="btns">
        <ui-button accent title="Применить" @click="resetPassword"/>
      </div>
    </div>
    <div class="spinner-wrapper" v-else>
      <ui-spinner/>
    </div>
  </div>
</template>

<script>
import api from '@/api'

import UiInput from '@/components/ui/ui-input/UiInput.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'
import UiSpinner from '@/components/ui/ui-spinner/UiSpinner.vue'

export default {
  name: 'PasswordSetup',

  components: {
    UiInput,
    UiButton,
    UiSpinner
  },

  data: () => ({
    code: '',
    way: 0,
    password_0: '',
    password_1: '',
    loaded: true
  }),

  created() {
    this.way = localStorage.getItem('way')
  },

  methods: {
    async resetPassword () {
      this.loaded = false
      let email = localStorage.getItem('email')
      let data = {
        password: this.password_0,
        code: this.code,
        email: email
      }
      let res = await api.setupPassword(data)
      if (!res.error) {
        localStorage.removeItem('email')
        this.$router.push('/auth/sign-in')
      } else {
        this.code = ''
        this.loaded = true
      }
    },

    async noAccess (event) {
      event.preventDefault()
      let data = {
        email: localStorage.getItem('email'),
        way: 1
      }
      let res = await api.passwordReset(data)
      console.log(res);
      this.way = res.way
    }
  }
}
</script>

<style lang="scss" scoped>
  .no-access{
    color: #000;
    font-family: 'Montserrat';
    font-size: 12px;
  }
</style>
