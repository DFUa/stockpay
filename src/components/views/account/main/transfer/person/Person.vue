<template>
  <ui-card class="inner ui-card">
    <div class="title">Мгновенный платеж любому человеку по номеру кошелька</div>
    <div class="sub-title">Выберите кошелёк и введите сколько хотите перевести средств, затем введите кошелек и выберите валюту для данного кошелька.</div>

    <div class="inputs-wrapper">
      <div class="from">
        <ui-currency-input title="Сумма" v-model="inValue" mask="############"/>
        <div class="wallet-label">{{ wallets[inValue.key] }}</div>
      </div>
      <div class="toggler" :class="{ 'i-arrow-right': true }"></div>
      <div class="to">
        <ui-currency-input title="Номер кошелька" v-model="outValue" mask="################"/>
      </div>
    </div>

    <p class="received">Пользователь получит после перевода: <span>{{received}} {{outValue.key.toUpperCase()}}</span></p>
    <p class="commission">Комиссия составит: <span>{{commission}} {{inValue.key.toUpperCase()}}</span></p>

    <div class="sub-title">Для подтверждения перевода нажмите <br>
      на кнопку “Отправить средства”</div>

    <ui-button @click="submit" :accent="true" title="Отправить средства"/>
  </ui-card>
</template>

<script>
import api from '@/api'

import UiCard from '@/components/ui/ui-card/UiCard.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'
import UiCurrencyInput from '@/components/ui/ui-currency-input/UiCurrencyInput.vue'

export default {
  name: 'Person',

  components: {
    UiCard,
    UiButton,
    UiCurrencyInput
  },

  data: () => ({
    received: 0,
    commission: 0,
    inValue: {
      value: 0,
      key: 'usd'
    },
    outValue: {
      value: '',
      key: 'usd'
    },
    fee: '',
    wallets: {
      usd: 'USD 0303 9549 7344 5455',
      // uah: 'UAH 6463 7747 7377 8484',
      eur: 'EUR 6632 4323 4343 3454',
      // kzt: 'KZT 8994 4354 3321 1122',
      rub: 'RUB 0099 2344 8484 3454'
    }
  }),

  created () {
    this.init()
  },

  methods: {
    async init () {
      let res = await api.getWallets()
      res.wallets.forEach(wallet => {
        this.wallets[wallet.currency.toLowerCase()] = wallet.number
      })
      let fee = await api.getFee()
      this.fee = fee.fee
    },

    async submit () {
      let data = {
        wallet_from: this.wallets[this.inValue.key],
        wallet_to: this.outValue.key.toUpperCase() + this.outValue.value,
        amount: this.inValue.value
      }
      if (data.amount <= 0 || this.outValue.value.length <= 0) return
      let res = await api.sendMoneyToPerson(data)
      if (res.error) {
        this.$toasted.show(`${this.$store.getters.errorsList[res.message]}`, {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 1000
        })
      } else {
        this.$toasted.show('Transfer was done', {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 1000
        })
        this.inValue.value = 0
        this.outValue.value = 0
      }
    }
  },

  watch: {
    inValue: {
      handler (newValue) {
        this.received = Math.round((newValue.value - newValue.value * this.fee) * 100) / 100
        this.commission = Math.round(newValue.value * this.fee * 100) / 100
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="scss">
.received,
.commission{
  font-size: 14px;
  span{
    font-family: 'Montserrat';
    font-weight: 600;
    color: #F97979;
  }
}

.commission{
  margin-bottom: 20px;
  span{
    color: #006344;
  }
}
</style>
