<template>
  <ui-card class="inner">
    <div class="title">Обмен валют</div>
    <div class="sub-title">Выберите валюту которую хотите продать и валюту которую хотите купить. <br>
      Затем введите сумму которую хотите продать.</div>

    <div class="inputs-wrapper">
      <div class="from">
        <ui-currency-input title="Сумма" v-model="inValue" mask="############"/>
        <div class="wallet-label">{{ wallets[inValue.key] }}</div>
      </div>
      <div @click="toggleCurrencys" :class="{ 'toggler i-arrows': true, 'togged': isCurrencyToggled }"></div>
      <div class="to">
        <ui-currency-input :disabled="true" v-model="outValue" mask="############"/>
        <div class="wallet-label">{{ wallets[outValue.key] }}</div>
      </div>
    </div>

    <div class="sub-title">Для подтверждения перевода нажмите <br>
      на кнопку “Перевести”</div>

    <ui-button :accent="true" title="Обмен"/>
  </ui-card>
</template>

<script>
import UiCard from '@/components/ui/ui-card/UiCard.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'
import UiCurrencyInput from '@/components/ui/ui-currency-input/UiCurrencyInput.vue'

export default {
  name: 'Cards',

  components: {
    UiCard,
    UiButton,
    UiCurrencyInput
  },

  data: () => ({
    inValue: {
      value: 0,
      key: 'usd'
    },
    outValue: {
      value: 0,
      key: 'eur'
    },
    wallets: {
      usd: 'USD 0303 9549 7344 5455',
      // uah: 'UAH 6463 7747 7377 8484',
      eur: 'EUR 6632 4323 4343 3454',
      kzt: 'KZT 8994 4354 3321 1122'
      // rub: 'RUB 0099 2344 8484 3454'
    },
    isCurrencyToggled: false
  }),

  methods: {
    toggleCurrencys () {
      this.isCurrencyToggled = !this.isCurrencyToggled
      let tmpKey = this.inValue.key
      this.inValue.key = this.outValue.key
      this.outValue.key = tmpKey
    }
  }
}
</script>

<style scoped>
</style>
