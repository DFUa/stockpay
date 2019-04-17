<template>
  <ui-card class="inner ui-card">
    <div class="title">Перевод средств на банковскую карту VISA, Mastercard, Maestro, Мир</div>
    <div class="sub-title">Выберите кошелёк и введите сколько хотите перевести средств, затем введите немер банковской карты</div>

    <div class="inputs-wrapper">
      <div class="from">
        <ui-currency-input title="Сумма" v-model="inValue" mask="############"/>
        <div class="wallet-label">{{ wallets[inValue.key] }}</div>
      </div>
      <div class="toggler" :class="{ 'i-arrow-right': true }"></div>
      <div class="to">
        <ui-currency-input title="Номер карточки" v-model="outValue" mask="################"/>
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
  name: 'BankCard',
  components: {
    UiCard,
    UiButton,
    UiCurrencyInput
  },
  data () {
    return {
      inValue: {
        value: 0,
        key: 'usd'
      },
      outValue: {
        value: '',
        key: 'usd'
      },
      received: 0,
      commission: 0,
      wallets: {},
      fee: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      let res = await api.getWallets()
      res.wallets.forEach(wallet => {
        this.$set(this.wallets, wallet.currency.toLowerCase(), wallet.number)
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
      if (data.amount <= 0 || this.outValue.value.length === 0) {
        this.$toasted.clear()
        this.$toasted.show('Пожалуйста, заполните, все поля!', {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 2000
        })
        return
      }
      if (data.wallet_from === data.wallet_to) {
        this.$toasted.clear()
        this.$toasted.show('Ваш номер кошелька совпадает с номером кошелька получателя. Введите другой кошелек получателя', {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 2000
        })
        return
      }
      let res = await api.sendMoneyToPerson(data)
      this.$toasted.clear()
      if (res.error) {
        this.$toasted.show(`${this.$store.getters.errorsList[res.message]}`, {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 2000
        })
      } else {
        this.$toasted.show('Transfer was done', {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 2000
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
