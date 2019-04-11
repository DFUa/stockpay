<template>
  <ui-view-preloader :loaded="loaded">
    <div class="profile-wrapper">
      <div class="container">
        <ui-card>
          <div class="card-inner">

            <!-- Personal information -->
            <div class="section">
              <div class="title">Личные данные</div>
              <ui-form form="profile-form" class="inputs cols" ref="profile">
                <div class="col-3">
                  <ui-input
                    title="Имя"
                    v-model="firstname"
                    :rules="[{ name: 'required' }]"/>
                </div>
                <div class="col-3">
                  <ui-input
                    title="Фамилия"
                    v-model="lastname"
                    :rules="[{ name: 'required' }]"/>
                </div>
                <div class="col-3">
                  <ui-select title="Страна"
                    :options="options.countries"
                    field="toponymName"
                    v-model="country"
                    :rules="[{ name: 'required', text: 'Выберите страну' }]"/>
                </div>
                <div class="col-3">
                  <ui-select
                    title="Город"
                    :options="options.cities"
                    :field="['name', 'toponymName']"
                    v-model="city"
                    :rules="[{ name: 'required', text: 'Выберите город' }]"/>
                </div>
              </ui-form>
              <ui-button @click="updateData" :accent="true" title="Применить"/>
            </div>

            <!-- Security section -->
            <div class="section">
              <div class="cols">
                <div class="col-6">
                  <div class="title">Безопасность</div>
                  <div class="fields-wrapper">

                    <security-nickname :nickname="nickname" @updates="showUpdates"/>
                    <security-password/>

                    <ui-input class="field" title="Почта"
                      :disabled="true" v-model="email"/>
                  </div>
                </div>
                <div class="col-6">
                  <div class="title">{{ phone ? 'Телефон' : 'Привязать телефон' }}</div>
                  <div class="fields-wrapper">
                    <security-phone :phone="phone" @updates="showUpdates"/>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </ui-card>
      </div>
    </div>
  </ui-view-preloader>
</template>

<script>
import api from '@/api'

import UiCard from '@/components/ui/ui-card/UiCard.vue'
import UiInput from '@/components/ui/ui-input/UiInput.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'
import UiSelect from '@/components/ui/ui-select/UiSelect.vue'
import UiForm from '@/components/ui/ui-form/UiForm.vue'
import UiViewPreloader from '@/components/ui/ui-view-preloader/UiViewPreloader.vue'

import SecurityPhone from './security/Phone.vue'
import SecurityNickname from './security/Nickname.vue'
import SecurityPassword from './security/Password.vue'

export default {
  name: 'Profile',

  components: {
    UiCard,
    UiInput,
    UiButton,
    UiSelect,
    UiViewPreloader,
    SecurityPhone,
    SecurityNickname,
    SecurityPassword,
    UiForm
  },

  mounted () {
    this.loadData()
  },

  data: () => ({
    firstname: '',
    lastname: '',
    country: null,
    city: null,
    email: '',
    nickname: '',
    phone: '',
    options: {
      countries: [],
      cities: []
    },
    loaded: false
  }),

  methods: {
    async loadData () {
      let res = await api.getProfile()
      this.firstname = res.first_name
      this.lastname = res.last_name
      this.email = res.email
      this.nickname = res.nickname
      this.phone = res.number

      await this.loadCountries()
      this.selectCountry(res.country)

      await this.loadCities()
      this.selectCity(res.city)

      this.loaded = true
    },

    async loadCountries () {
      let res = await api.getCountries()
      this.options.countries = res.countries
    },

    async loadCities () {
      let filters = {
        country: { value: this.country.code }
      }
      let res = await api.getCities(filters)
      this.options.cities = res.cities
    },

    selectCountry (name) {
      let items = this.options.countries
      this.country = this.findElementInArray(items, 'toponymName', name)
    },

    selectCity (name) {
      let items = this.options.cities
      this.city = this.findElementInArray(items, 'toponymName', name)
    },

    // Don't touch my perfect code!!!
    findElementInArray (array, field, value) {
      let count = array.length
      for (let i = 0; i < count; i++) {
        if (array[i][field] === value) {
          return array[i]
        }
      }
      return null
    },

    async updateData () {
      if (this.$refs.profile.validate()) {
        let data = {
          country: this.country.code,
          city: this.city.toponymName,
          nickname: this.nickname,
          last_name: this.lastname,
          first_name: this.firstname
        }
        let res = await api.updateProfile(data)
        if (!res.error) {
          this.$toasted.show('Данные изменены', {
            theme: 'toasted-primary',
            position: 'bottom-center',
            duration: 5000
          })
          this.showUpdates()
        }
      }
    },

    showUpdates () {
      this.loaded = false
      this.loadData()
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

<style scoped>
  .profile-wrapper {
    padding: 0 20px;
    padding-bottom: 20px;
  }

  .card-inner {
    padding: 25px 45px;
  }

  .card-inner .title {
    font-size: 14px;
    font-weight: 600;
    font-family: "Open Sans";
    margin-bottom: 25px;
  }

  .card-inner .inputs {
    margin-bottom: 7px;
  }

  .card-inner .section {
    margin-bottom: 55px;
  }

  .card-inner .section:last-child {
    margin-bottom: 0;
  }

  .section .cols {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
  }

  .section .col-6 {
    width: 50%;
    padding: 0 15px;
  }

  .section .col-3 {
    width: 25%;
    padding: 0 15px;
  }

  .fields-wrapper {
    width: 380px;
  }

  @media screen and (max-width: 1185px) {
    .section .col-3 {
      width: 50%;
    }
  }

   @media screen and (max-width: 925px) {
     .section .col-3 {
        width: 100%;
      }

      .section .col-6 {
        width: 100%;
      }

      .fields-wrapper {
        width: 100%;
      }
   }
</style>
