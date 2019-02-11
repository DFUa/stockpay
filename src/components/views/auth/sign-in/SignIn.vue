<template>
  <div>
    <h1>Вход</h1>
    <div class="fields">
      <ui-input title="Почта" v-model="email"/>
      <ui-input type="password" title="Пароль" v-model="password"/>
    </div>
    <div class="tips">
      <div class="item">Забыли пароль?</div>
      <div class="item">Лицензионное соглашение</div>
    </div>
    <div class="btns">
      <ui-button accent title="Войти" @click="signIn"/>
      <ui-button air title="Регистрация" @click="openRegistration"/>
    </div>
  </div>
</template>

<script>
import api from '@/api'

import UiInput from '@/components/ui/ui-input/UiInput.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'

export default {
  name: 'SignIn',

  components: {
    UiInput,
    UiButton
  },

  data: () => ({
    email: '',
    password: ''
  }),

  methods: {
    async signIn () {
      let data = {
        email: this.email,
        password: this.password
      }
      if (await api.login(data)) {
        this.$router.push('/account/main/dashboard')
      }
    },

    openRegistration () {
      this.$router.push('/auth/sign-up')
    }
  }
}
</script>
