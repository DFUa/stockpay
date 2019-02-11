<template>
  <div>
    <h1>Регистрация</h1>

    <div class="fields-col-2">
      <div class="col">
        <ui-input title="Имя" v-model="firstname"/>
        <ui-input title="Фамилия" v-model="lastname"/>
        <ui-select title="Страна" field="toponymName" :options="options.countries" v-model="country"/>
        <ui-select title="Город" field="toponymName" :options="options.cities" v-model="city"/>
      </div>
      <div class="col">
        <ui-input title="Никнейм" v-model="nickname"/>
        <ui-input title="Почта" v-model="email"/>
        <ui-input type="password" title="Пароль" v-model="password_0"/>
        <ui-input type="password" title="Повторите пароль" v-model="password_1"/>
      </div>
    </div>

    <div class="btns">
      <ui-button accent title="Регистрация" @click="signUp"/>
      <ui-button air title="Вход" @click="openSignIn"/>
    </div>
  </div>
</template>

<script>
import api from '@/api'

import UiInput from '@/components/ui/ui-input/UiInput.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'
import UiSelect from '@/components/ui/ui-select/UiSelect.vue'

export default {
  name: 'SignIn',

  components: {
    UiInput,
    UiButton,
    UiSelect
  },

  mounted () {
    this.loadCountries()
  },

  data: () => ({
    nickname: '',
    email: '',
    password_0: '',
    password_1: '',
    firstname: '',
    lastname: '',
    country: null,
    city: null,
    options: {
      countries: [],
      cities: []
    }
  }),

  methods: {
    async loadCountries () {
      let res = await api.getCountries()
      this.options.countries = res.countries
    },

    async signUp () {
      if (this.validateData) {
        let data = {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password_0,
          nickname: this.nickname,
          country: this.country.toponymName,
          city: this.city.toponymName
        }
        let res = await api.registration(data)
        if (res.message === 'OK') {
          this.$router.push('/auth/email-confirm')
        }
      }
    },

    validateData () {
      return this.password_0 === this.password_1
    },

    openSignIn () {
      this.$router.push('/auth/sign-in')
    }
  },

  watch: {
    async country (value) {
      this.city = null
      this.options.cities = []
      let filters = {
        country: { value: value.code }
      }
      let res = await api.getCities(filters)
      this.options.cities = res.cities
    }
  }
}
</script>
