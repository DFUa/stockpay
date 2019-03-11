<template>
  <div>
    <div v-if="loaded">
      <h1>Регистрация</h1>

      <ui-form class="fields-col-2" ref="signUp">
        <div class="col">
          <ui-input type="text" title="Имя" v-model="firstname" :rules="[{ name: 'required' }]"/>
          <ui-input type="text" title="Фамилия" v-model="lastname" :rules="[{ name: 'required' }]"/>
          <ui-select title="Страна" field="toponymName" :options="options.countries" v-model="country" :rules="[{ name: 'required', text: 'Выберите страну' }]"/>
          <ui-select title="Город" field="toponymName" :options="options.cities" v-model="city" :rules="[{ name: 'required', text: 'Выберите город' }]"/>
        </div>
        <div class="col">
          <ui-input type="text" title="Никнейм" v-model="nickname" :rules="[{ name: 'min', value: 3 }, { name: 'required' }]"/>
          <ui-input type="email" title="Почта" v-model="email"/>
          <ui-input type="password" title="Пароль" v-model="password_0" :rules="[{ name: 'min', value: 8 }, { name: 'required' }]"/>
          <ui-input type="password" title="Повторите пароль" v-model="password_1" :rules="[{ name: 'compare', value: password_0, text: 'Пароли не совпадают' }, { name: 'required' }]"/>
        </div>
      </ui-form>

      <div class="btns">
        <ui-button accent title="Регистрация" @click="signUp"/>
        <ui-button air title="Вход" @click="openSignIn"/>
      </div>
    </div>
    <div class="spinner-wrapper" v-else>
      <ui-spinner/>
    </div>
  </div>
</template>

<script>
import api from '@/api'

import UiForm from '@/components/ui/ui-form/UiForm.vue'
import UiInput from '@/components/ui/ui-input/UiInput.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'
import UiSelect from '@/components/ui/ui-select/UiSelect.vue'
import UiSpinner from '@/components/ui/ui-spinner/UiSpinner.vue'

export default {
  name: 'SignIn',

  components: {
    UiInput,
    UiButton,
    UiSelect,
    UiSpinner,
    UiForm
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
    },
    loaded: true
  }),

  methods: {
    async loadCountries () {
      let res = await api.getCountries()
      this.options.countries = res.countries
    },

    async signUp () {
      if (this.$refs.signUp.validate()) {
        this.loaded = false
        let data = {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password_0,
          nickname: this.nickname,
          country: this.country ? this.country.toponymName : '',
          city: this.city ? this.city.toponymName : ''
        }
        let res = await api.registration(data)
        if (!res.error) {
          this.$router.push('/auth/email-confirm')
        } else {
          this.$toasted.show(`${this.$store.getters.errorsList[res.message]}`, {
            theme: 'toasted-primary',
            position: 'bottom-center',
            duration: 5000
          })
          this.loaded = true
        }
      }
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
