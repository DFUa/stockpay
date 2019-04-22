<template>
  <div>
    <div v-if="loaded" class="inner">
      <h1>Вход</h1>
      <div class="fields">
        <ui-form ref="signIn">
          <ui-input
          type="email"
          title="Почта"
          v-model="email"/>
          <ui-input
          type="password"
          title="Пароль"
          v-model="password"
          :rules="[{ name: 'min', value: 8 }, { name: 'required' }]"/>
        </ui-form>
        <div class="tips">
          <div @click="openPasswordReset" class="item">Забыли пароль?</div>
          <!-- <div class="item">Лицензионное соглашение</div> -->
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
import UiForm from '@/components/ui/ui-form/UiForm.vue'

export default {
  name: 'SignIn',

  components: {
    UiInput,
    UiButton,
    UiSpinner,
    UiForm
  },

  data: () => ({
    email: '',
    password: '',
    loaded: true
  }),

  methods: {
    async signIn () {
      if (this.$refs.signIn.validate()) {
        this.loaded = false
        let data = {
          email: this.email,
          password: this.password
        }
        await api.login(data).then(res => {
          if (!res.error) {
            if (!this.$store.getters.isAdmin) {
              this.$router.push('/account/main')
            } else {
              this.$router.push('/admin')
            }
          } else {
            this.$toasted.show(`${this.$store.getters.errorsList[res.message]}`, {
              theme: 'toasted-primary',
              position: 'bottom-center',
              duration: 5000
            })
            this.loaded = true
          }
        })
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
