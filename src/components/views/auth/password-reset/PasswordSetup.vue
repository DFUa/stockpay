<template>
  <div>
    <div v-if="loaded">
      <h2 class="header-text" v-if="way == 1">Вам на телефон должен прийти СМС в котором будет указан код, впешите данный код в необходимое поле и создайте новый пароль</h2>
      <h2 class="header-text" v-if="way == 0">Зайдите на почту, скопируйте код которы вам пришел в сообщении, вставьте его в необходимое поле "Код" и создайте новый пароль</h2>

      <ui-form class="fields" form="reset-pass" ref="resetPass">
        <ui-input title="Код" v-model="code"/>
        <ui-input
          type="password"
          title="Новый пароль"
          v-model="password_0"
          :rules="[{ name: 'min', value: 8 }, { name: 'required' }]"/>
        <ui-input
          type="password"
          title="Подтвердите пароль"
          v-model="password_1"
          :rules="[{ name: 'compare', value: password_0, text: 'Пароли не совпадают' }, { name: 'required' }]"/>
      </ui-form>
      <a v-if="way == 1" href="#" class="no-access" @click="noAccess">No access to the phone?</a>

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
import UiForm from '@/components/ui/ui-form/UiForm.vue'
import UiSpinner from '@/components/ui/ui-spinner/UiSpinner.vue'

export default {
  name: 'PasswordSetup',

  components: {
    UiInput,
    UiButton,
    UiSpinner,
    UiForm
  },

  data: () => ({
    code: '',
    way: 0,
    password_0: '',
    password_1: '',
    loaded: true
  }),

  created () {
    this.way = localStorage.getItem('way')
  },

  methods: {
    async resetPassword () {
      let email = localStorage.getItem('email')
      let data = {
        password: this.password_0,
        code: this.code,
        email: email
      }
      if (this.$refs.resetPass.validate()) {
        let res = await api.setupPassword(data)
        if (!res.error) {
          localStorage.removeItem('email')
          this.$router.push('/auth/sign-in')
        } else {
          this.code = ''
          this.loaded = true
          this.$toasted.show(`${this.$store.getters.errorsList[res.message]}`, {
            theme: 'toasted-primary',
            position: 'bottom-center',
            duration: 5000
          })
        }
      }
    },

    async noAccess (event) {
      event.preventDefault()
      let data = {
        email: localStorage.getItem('email'),
        way: 1
      }
      let res = await api.passwordReset(data)
      this.way = res.way
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-text {
    margin-bottom: 30px;
  }
</style>
