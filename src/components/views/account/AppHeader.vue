<template>
  <div class="app-header">

    <div class="dev-alert">
      <p>сервис находится в разработке</p>
    </div>

    <div class="top-bar">
      <div class="logo">StocksPay</div>
        <div v-if="cources.loaded" class="info">
          <div class="item">1 USD - {{ cources.usd.toFixed(2) }} RUB</div>
          <div class="item">1 UAH - {{ cources.uah.toFixed(2) }} RUB</div>
          <div class="item">1 KZT - {{ cources.kzt.toFixed(2) }} RUB</div>
          <div class="item">1 EUR - {{ cources.eur.toFixed(2) }} RUB</div>
        </div>
        <div class="user-profile">
          <div @click="openUserProfile" class="icon">
            <span class="i-user"></span>
          </div>
          <div @click="openUserProfile" class="name">{{ username }}</div>
          <div class="status">Верифицирован</div>
        </div>
        <div @click="logout" class="logout">Выход</div>
    </div>

    <div class="tabs-wrapper">
      <div class="container">
        <ui-tabs :items="tabs"/>
      </div>
    </div>

  </div>
</template>

<script>
import api from '@/api'

import UiTabs from '@/components/ui/ui-tabs/UiTabs.vue'

export default {
  name: 'AppHeader',

  components: {
    UiTabs
  },

  mounted () {
    this.loadCources()
    this.loadProfile()
    this.cources.loaded = true
    this.runCourcesUpdating()
  },

  data: () => ({
    tabs: [
      { id: 0, title: 'Счета и транзакции', icon: 'i-tab-transaction', path: '/account/main/dashboard' },
      { id: 1, title: 'Пополнить', icon: 'i-tab-add-founds', path: '/account/main/add-founds' },
      { id: 2, title: 'Перевести', icon: 'i-tab-transfer', path: '/account/main/transfer' },
      { id: 3, title: 'Услуги', icon: 'i-tab-phone', path: '/account/main/service' }
    ],
    cources: {
      usd: 0,
      uah: 0,
      kzt: 0,
      eur: 0,
      loaded: false
    },
    username: ''
  }),

  methods: {
    async loadCources () {
      if (this.isAuth) {
        let res = await api.getCources()
        this.cources.usd = res.Valute.USD.Value / res.Valute.USD.Nominal
        this.cources.uah = res.Valute.UAH.Value / res.Valute.UAH.Nominal
        this.cources.kzt = res.Valute.KZT.Value / res.Valute.KZT.Nominal
        this.cources.eur = res.Valute.EUR.Value / res.Valute.EUR.Nominal
      }
    },

    async loadProfile () {
      let res = await api.getProfile()
      this.username = res.first_name + ' ' + res.last_name
    },

    runCourcesUpdating () {
      setInterval(() => { this.loadCources() }, 300 * 1000)
    },

    openUserProfile () {
      this.$router.push('/account/profile')
    },

    logout () {
      api.logout()
    }
  },

  computed: {
    isAuth () {
      return this.$store.getters.isAuth
    }
  }
}
</script>

<style scoped>
  .app-header {
    position: fixed;
    width: 100%;
    z-index: 1000;
  }

  .top-bar {
    height: 100px;
    background: #1D1D1D;
    padding: 0 50px;
    display: flex;
    align-items: center;
  }

  .logo {
    color: #fff;
    font-size: 24px;
    font-weight: 800;
    font-family: "Open Sans";
  }

  .info {
    margin-left: 150px;
    display: flex;
  }

  .info .item {
    color: #fff;
    font-size: 15px;
    font-family: "Open Sans";
    margin-right: 60px;
  }

  .user-profile {
    position: absolute;
    right: 320px;
  }

  .user-profile .icon {
    display: none;
  }

  .user-profile .name {
    cursor: pointer;
    color: #FFDB00;
    font-size: 18px;
    font-family: "Open Sans";
    margin-bottom: 2px;
    transition: .2s;
  }

  .user-profile .name:hover {
    text-shadow: 2px 1px 10px rgba(255, 219, 0, 1);
  }

  .user-profile .status {
    color: #fff;
    font-size: 14px;
    font-family: "Open Sans";
  }

  .logout {
    cursor: pointer;
    position: absolute;
    opacity: 0.5;
    color: #fff;
    right: 40px;
    transition: .5s;
  }

  .logout:hover {
    opacity: 0.7;
  }

  .tabs-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    background: #fff;
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.03);
  }

  .dev-alert {
    height: 35px;
    width: 100%;
    color: #fff;
    font-size: 14px;
    background: #ec1919;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 1650px) {
    .user-profile .name {
      display: none;
    }

    .user-profile .status {
      display: none;
    }

    .user-profile {
      right: 140px;
    }

    .user-profile .icon {
      cursor: pointer;
      height: 34px;
      width: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      transition: .5s;
    }

    .user-profile .icon:hover {
      background: rgba(255, 255, 255, 0.17);
    }
  }

  @media screen and (max-width: 1300px) {
    .info {
      margin-left: 40px;
    }

    .info .item {
      margin-right: 23px;
    }
  }

  @media screen and (max-width: 985px) {
    .info {
      display: none;
    }
  }
</style>
