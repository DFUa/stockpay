<template>
  <div>
    <div v-if="loaded" class="inner">
      <h1>Вход</h1>
      <div class="fields">
        <ui-input title="Почта" v-model="email"/>
        <ui-input type="password" title="Пароль" v-model="password"/>
        <div class="tips">
          <div @click="openPasswordReset" class="item">Забыли пароль?</div>
          <div class="item">Лицензионное соглашение</div>
        </div>
      </div>
      <div class="btns">
        <ui-button accent title="Войти" @click="signIn"/>
        <ui-button air title="Регистрация" @click="openRegistration"/>
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
  name: 'SignIn',

  components: {
    UiInput,
    UiButton,
    UiSpinner
  },

  data: () => ({
    email: '',
    password: '',
    loaded: true
  }),

  methods: {
    async signIn () {
      this.loaded = false
      let data = {
        email: this.email,
        password: this.password
      }
      if (await api.login(data)) {
        this.$router.push('/account/main/dashboard')
      } else {
        this.loaded = true
      }
    },

    openRegistration () {
      this.$router.push('/auth/sign-up')
    },

    openPasswordReset () {
      this.$router.push('/auth/password-reset')
    }
  }
}
</script>
