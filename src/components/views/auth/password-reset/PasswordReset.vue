<template>
  <div>
    <div v-if="loaded">
      <h1>Восстановление пароля</h1>

      <div class="fields">
        <ui-input title="Почта" v-model="email"/>
      </div>

      <div class="btns">
        <ui-button air title="Назад" @click="goBack"/>
        <ui-button accent title="Дальше" @click="passwordReset"/>
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
  name: 'PasswordReset',

  components: {
    UiInput,
    UiButton,
    UiSpinner
  },

  data: () => ({
    email: '',
    loaded: true
  }),

  methods: {
    async passwordReset () {
      this.loaded = false
      let data = {
        email: this.email
      }
      let res = await api.passwordReset(data)
      if (!res.error) {
        localStorage.setItem('way', res.way)
        this.nextStep()
      } else {
        this.code = ''
        this.loaded = true
      }
    },

    goBack () {
      this.$router.go(-1)
    },

    nextStep () {
      localStorage.setItem('email', this.email)
      this.$router.push('/auth/password-setup')
    }
  }
}
</script>
