<template>
  <div>
    <h1>Регистрация</h1>

    <div class="fields-col-2">
      <div class="col">
        <ui-input title="Имя" v-model="firstname"/>
        <ui-input title="Фамилия" v-model="lastname"/>
        <ui-select title="Страна" :options="options.countrys" v-model="country"/>
        <ui-select title="Город" :options="options.cities" v-model="city"/>
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
      countrys: [
        { id: 0, title: 'Ukraine' },
        { id: 1, title: 'France' },
        { id: 2, title: 'German' }
      ],
      cities: [
        { id: 0, title: 'Kyiv' },
        { id: 1, title: 'Lviv' },
        { id: 2, title: 'Vinnitsya' }
      ]
    }
  }),

  methods: {
    signUp () {
    },

    openSignIn () {
      this.$router.push('/auth/sign-in')
    }
  }
}
</script>
