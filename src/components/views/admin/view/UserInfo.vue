<template>
  <div class="user-info">
    <div class="user-info-nav">
      <a href="#" class="back-btn" @click="routeBack">Назад</a>
      <ui-tabs @active="changeActiveTab" class="user-info-tab" :items="tabs"/>

      <transition name="fade" mode="out-in">
        <button v-if="currentTab === 1" class="i-filter" @click="showFilterModal"></button>
      </transition>

      <transition name="fade-up" mode="out-in">
        <ui-filter v-if="showFilter" @filter="filter"></ui-filter>
      </transition>

    </div>
    <div v-if="currentTab === 0" class="user-info-content">
      <h4>Личные данные</h4>
      <div class="input-wrap">
        <ui-input
          disabled
          v-model="userInfo.nickname"
          class="user-info-input"
          title="Никнейм"/>
        <ui-input
          disabled
          v-model="userInfo.email"
          class="user-info-input"
          title="Почта"/>
        <ui-input
          disabled
          v-model="userInfo.number"
          class="user-info-input"
          title="Телефон"/>
      </div>
      <ui-form form="personal-data" class="input-wrap" ref="personalData">
        <ui-input
          v-model="firstname"
          class="user-info-input"
          title="Имя"
          :rules="[{ name: 'required' }]"/>
        <ui-input
          v-model="lastname"
          class="user-info-input"
          title="Фамилия"
          :rules="[{ name: 'required' }]"/>
        <ui-select title="Страна"
          :options="options.countries"
          class="user-info-input"
          field="toponymName"
          v-model="country"
          :rules="[{ name: 'required', text: 'Выберите страну' }]"/>
        <ui-select
          title="Город"
          class="user-info-input"
          :options="options.cities"
          :field="['name', 'toponymName']"
          v-model="city"
          :rules="[{ name: 'required', text: 'Выберите город' }]"/>
      </ui-form>
      <div class="btn-wrap">
        <ui-button @click="updateData" :accent="true" title="Сохранить"/>
      </div>
      <ui-form form="change-pass" class="input-wrap" ref="changePass">
        <ui-input
        type="password"
          v-model="newPassword_0"
          class="user-info-input"
          title="Новый пароль"
          :rules="[{ name: 'min', value: 8 }, { name: 'required' }]"/>
        <ui-input
          type="password"
          v-model="newPassword_1"
          class="user-info-input"
          title="Подтвердить пароль"
          :rules="[{ name: 'compare', value: newPassword_0, text: 'Пароли не совпадают' }, { name: 'required' }]"/>
      </ui-form>
      <div class="btn-wrap">
        <ui-button @click="changeUserPassword" :accent="true" title="Сохранить"/>
      </div>
      <h4>Счета</h4>
      <div class="input-wrap">
        <ui-input
          v-for="(wallet, index) in userInfo.wallets"
          :key="index"
          disabled
          v-model="wallet.balance"
          :desc="wallet.number"
          class="user-info-input"
          title="Сумма">{{wallet.currency}}</ui-input>
      </div>
    </div>
    <div v-if="currentTab === 1" class="user-info-content">
      <div v-if="!transactions.transactions.length" class="empty-text">You havent transactions</div>
      <table v-if="transactions.transactions.length">
        <thead>
          <tr>
            <td v-for="header in transactionsHeader" :key="header.id">{{ header.text }}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(transaction, index) in transactions.transactions" :key="index">
            <td>{{index + 1}}</td>
            <td>{{transaction.wallet_to}}</td>
            <td>{{transaction.original_amount > 0 ? '+' + transaction.original_amount : transaction.original_amount}}</td>
            <td>{{transaction.date}}</td>
            <td>{{transaction.wallet_from}}</td>
            <td
              :class="{
                'failure': transaction.status === 'failure',
                'success': transaction.status === 'success'
              }">
              {{transaction.status}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import UiForm from '@/components/ui/ui-form/UiForm.vue'
import UiInput from '@/components/ui/ui-input/UiInput.vue'
import UiTabs from '@/components/ui/ui-tabs/UiTabs.vue'
import UiSelect from '@/components/ui/ui-select/UiSelect.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'
import UiFilter from '@/components/ui/ui-filter/UiFilter.vue'

export default {
  name: 'UserInfo',

  components: {
    UiInput,
    UiTabs,
    UiSelect,
    UiButton,
    UiForm,
    UiFilter
  },

  data: () => ({
    userInfo: [],
    showFilter: false,
    currentTab: 0,
    tabs: [
      { id: 0, title: 'Личные данные', icon: 'i-tab-transfer', activeTab: true },
      { id: 1, title: 'Транзакции', icon: 'i-tab-transaction', activeTab: false }
    ],
    firstname: '',
    lastname: '',
    country: null,
    city: null,
    options: {
      countries: [],
      cities: []
    },
    newPassword_0: '',
    newPassword_1: '',
    transactions: [],
    transactionsHeader: [{
      id: 0,
      text: '№'
    }, {
      id: 1,
      text: 'Номер кошелька'
    }, {
      id: 2,
      text: 'Сумма'
    }, {
      id: 3,
      text: 'Дата перевода'
    }, {
      id: 4,
      text: 'Источник транзакции'
    }, {
      id: 5,
      text: 'Статус'
    }]
  }),

  async created () {
    let filters = {
      email: { value: this.$route.params.email },
      nickname: { value: this.$route.params.nickname },
      page: {value: 1}
    }
    let res = await api.getUserInfo(filters)
    this.userInfo = res.users[0]
    this.firstname = this.userInfo.first_name
    this.lastname = this.userInfo.last_name
    this.loadCountries()
    // this.selectCountry(this.userInfo.country)
    this.loadCities()
    // this.selectCity(this.userInfo.city)
    this.getTransactions()
  },

  methods: {
    routeBack () {
      this.$router.go(-1)
    },

    changeActiveTab (id) {
      this.currentTab = id
    },

    async loadCountries () {
      let res = await api.getCountries()
      this.options.countries = res.countries
      this.selectCountry(this.userInfo.country)
    },

    selectCountry (name) {
      let items = this.options.countries
      this.country = this.findElementInArray(items, 'toponymName', name)
    },

    async loadCities () {
      let filters = {
        country: { value: this.country.code }
      }
      let res = await api.getCities(filters)
      this.options.cities = res.cities
      this.selectCity(this.userInfo.city)
    },

    selectCity (name) {
      let items = this.options.cities
      this.city = this.findElementInArray(items, 'toponymName', name)
    },

    async updateData () {
      if (this.$refs.personalData.validate()) {
        let data = {
          id: this.userInfo.id,
          country: this.country.code,
          city: this.city.toponymName,
          last_name: this.lastname,
          first_name: this.firstname
        }
        await api.changeUserInfo(data).then(res => {
          if (!res.error) {
            this.$toasted.show('Данные изменены', {
              theme: 'toasted-primary',
              position: 'bottom-center',
              duration: 5000
            })
          } else {
            this.$toasted.show(`${this.$store.getters.errorsList[res.message]}`, {
              theme: 'toasted-primary',
              position: 'bottom-center',
              duration: 5000
            })
          }
        })
      }
    },

    async changeUserPassword () {
      if (this.$refs.changePass.validate()) {
        let data = {
          id: this.userInfo.id,
          new_password: this.newPassword_0
        }
        await api.changeUserPassword(data).then(res => {
          if (!res.error) {
            this.$toasted.show('Пароль изменен', {
              theme: 'toasted-primary',
              position: 'bottom-center',
              duration: 5000
            })
          } else {
            this.$toasted.show(`${this.$store.getters.errorsList[res.message]}`, {
              theme: 'toasted-primary',
              position: 'bottom-center',
              duration: 5000
            })
          }
        })
      }
    },

    findElementInArray (array, field, value) {
      for (let item of array) {
        if (item[field] === value) {
          return item
        }
      }
      return null
    },

    async getTransactions (filter) {
      let data = {
        userId: { value: this.userInfo.id }
      }
      let transactions = await api.getUserTransactions(Object.assign(data, filter))
      this.transactions = transactions
    },

    filter (data) {
      this.getTransactions(data)
    },

    showFilterModal () {
      this.showFilter = !this.showFilter
    }
  },

  watch: {
    country () {
      this.city = null
      this.options.cities = []
      this.loadCities()
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info-nav {
  padding: 25px 40px;
  display: flex;
  align-items: center;
  .filter{
    top: 20px;
    right: 10px;
  }
}

.user-info-tab {
  margin: 0 auto;
}

.back-btn {
  display: flex;
  align-items: center;
  text-decoration: none;
  font-weight: 600;
  color: #000;
  font-size: 18px;
  &:before {
    content: '';
    width: 8px;
    height: 8px;
    border-bottom: 3px solid #000;
    border-left: 3px solid #000;
    transform: rotate(45deg);
    margin-right: 20px;
  }
}

.user-info-content {
  padding: 30px 40px;
  h4 {
    font-weight: 600;
    font-family: 'Montserrat';
    margin-bottom: 25px;
  }
  table {
    tbody {
      tr {
        .success {
          color: green;
        }
        .failure {
          color: red;
        }
      }
    }
  }
}

.btn-wrap {
  width: 100%;
  margin: 0 0 30px;
  .button-wrapper {
    width: 250px;
    .ui-button {
      width: 100%;
    }
  }
}

.input-wrap {
  display: flex;
  flex-wrap: wrap;
  margin: 10px -10px 30px;
  .user-info-input {
    width: 250px;
    margin: 0 10px 30px;
  }
}

.empty-text {
  text-align: center;
  font-weight: 700;
  font-family: 'Montserrat';
  font-size: 18px;
}

@media screen and (max-width: 535px) {
  .back-btn {
    font-size: 0;
  }
}
</style>
