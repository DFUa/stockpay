<template>
  <ui-card class="wallets-wrapper">
    <div class="wallets">
      <div v-for="item in wallets" :key="item.id" class="item" :class="{disabled: item.disabled}">
        <div class="title">
          <span :class="item.icon"></span>
          <div>{{ item.title }}</div>
        </div>
        <div class="info-item">{{ item.value }} {{ item.symbol }}</div>
        <div class="info-item">{{ item.number }}</div>
      </div>
    </div>
  </ui-card>
</template>

<script>
import api from '@/api'

import UiCard from '@/components/ui/ui-card/UiCard.vue'

export default {
  name: 'DashboardWallets',

  components: {
    UiCard
  },

  data: () => ({
    wallets: [
      { id: 0, title: 'Доллар', value: '100', symbol: 'USD', icon: 'i-c-usd', number: 'USD0303 9549 7344 5455' },
      { id: 1, title: 'Рубль', value: '14 000', symbol: 'RUB', icon: 'i-c-rub', number: 'RUB0099 2344 8484 3454', disabled: true },
      { id: 4, title: 'Евро', value: '14 000', symbol: 'EUR', icon: 'i-c-eur', number: 'EUR6632 4323 4343 3445', disabled: true },
      { id: 2, title: 'Гривны', value: '0', symbol: 'UAH', icon: 'i-c-uah', number: 'UAH6463 7747 7377 8484', disabled: true },
      { id: 3, title: 'Тенге', value: '0', symbol: 'KZT', icon: 'i-c-kzt', number: 'KZT8994 4354 3321 1122', disabled: true }
    ]
  }),

  created () {
    this.init()
  },

  methods: {
    async init () {
      let res = await api.getWallets()
      this.wallets.forEach(item => {
        res.wallets.forEach(wallet => {
          if (item.symbol === wallet.currency) {
            item.number = wallet.number
            item.value = wallet.balance
          }
        })
      })
    }
  }
}
</script>

<style scoped>
  .wallets-wrapper {
    margin-bottom: 20px;
  }

  .wallets {
    display: flex;
    flex-wrap: wrap;
  }

  .wallets .item {
    width: 20%;
    padding: 30px 40px;
    border-right: 1px solid rgba(0, 0, 0, 0.03);
  }

  .wallets .item:last-child {
    border: none;
  }

  .wallets .item .title {
    color: #006344;
    font-weight: 800;
    font-family: "Open Sans";
    margin-bottom: 17px;
    display: flex;
  }

  .wallets .item.disabled .title{
    color: grey;
  }

  .wallets .item .title span {
    margin-right: 10px;
  }

  .wallets .item.disabled .title span {
    filter: grayscale(1);
    opacity: .75;
  }

  .wallets .item .info-item {
    color: rgba(0, 0, 0, 0.5);
    font-size: 16px;
    font-family: "Open Sans";
    margin-bottom: 10px;
  }

  .wallets .item .info-item:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 1460px) {
    .wallets .item {
      width: 33.3333%;
      border-bottom: 1px solid rgba(0, 0, 0, 0.03);
    }

    .wallets .item:last-child {
      border-right: 1px solid rgba(0, 0, 0, 0.03);
    }
  }

  @media screen and (max-width: 1080px) {
    .wallets .item {
      width: 50%;
    }
  }

  @media screen and (max-width: 735px) {
    .wallets .item {
      width: 100%;
    }

    .wallets .item {
      border-right: none;
    }

    .wallets .item:last-child {
      border-bottom: none;
    }
  }
</style>
