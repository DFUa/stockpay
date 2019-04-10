import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth: false,
    isAdmin: (+localStorage.getItem('r') === 2),
    errors: {
      wrong_json: 'Неправильный формат запроса ',
      email_busy: 'Этот адрес электронной почты уже используется. Пожалуйста, введите другой адрес электронной почты.',
      nickname_busy: 'Этот никнейм уже используется',
      short_password: 'Пароль должен иметь 8 или более символов',
      no_username: 'Пользователь не аутентифицирован',
      no_user: 'Неверная электронная почта',
      wrong_password: ' Вы ввели не верный пароль',
      no_link: 'Ссылка не может быть найдена',
      link_expired: 'Время дейтвия ссылки истекло',
      invalid_auth_data: 'Данные введены не верно. Пожалуйста, проверьте свои учетные данные',
      JWTDecodeException: 'Ссылку не возможно декодировать',
      AddressException: 'Адресс электронной почты введён некорректно',
      MessagingException: 'Ошибка при отправке электронной почты',
      JSONException: 'Невозможно обработать данные',
      SignatureVerificationException: 'Не могу проверить ссылку',
      no_code: 'Код не верен',
      code_expired: 'Код устарел',
      number_busy: 'Номер уже используется',
      not_number: 'Вы используете недоступные символы',
      wallet_from_not_exists: 'Даного кошелька не существует',
      foreign_wallet: 'Данный кошелек не пренадлежит вам',
      wallet_to_not_exists: 'Даного кошелька не существует',
      currency_conflict: 'Валюта кошелька указана не верно',
      bad_amount: 'Сумма пополнения должна быть менее или равна 1 USD',
      no_money: 'Недостаточно средств на кошельке',
      forbidden_symbols: 'Недопустимые символы'
    },
    currenciesList: [
      { id: 0, title: 'USD', key: 'usd' }
      // { id: 1, title: 'UAH', key: 'uah' },
      // { id: 2, title: 'EUR', key: 'eur' },
      // { id: 3, title: 'KZT', key: 'kzt' },
      // { id: 4, title: 'RUB', key: 'rub' }
    ]
  },

  getters: {
    isAuth (state) {
      return state.isAuth
    },

    isAdmin (state) {
      return state.isAdmin
    },

    errorsList (state) {
      return state.errors
    },

    currencies (state) {
      return state.currenciesList
    }
  },

  mutations: {
    setAuth (state, value) {
      state.isAuth = value
    },

    setAdmin (state, value) {
      state.isAdmin = value
    }
  },

  actions: {
    setAuth ({ commit }, value) {
      commit('setAuth', value)
    },

    setAdmin ({ commit }, value) {
      commit('setAdmin', value)
    }
  }
})
