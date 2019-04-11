<template>
  <ui-card class="inner">
    <h1>Находится в разработке</h1>
    <!-- <div class="title">Пополнить телефон</div>
    <div class="sub-title">Выберите оператора и введите телефон для пополнения,
      затем выберите сумму и счет с которого необходимо списать средства.
      После подтвердите операцию</div>

    <div class="inputs-wrapper" style="margin-bottom: 0">
      <div class="input-wrap">
        <ui-input
          title="Идентификатор ВК"
          v-model="vkId"
          :rules="[{ name: 'required' }]"/>
      </div>
      <div class="input-wrap">
        <ui-currency-input title="Сумма к зачислению" v-model="number" mask="################"/>
      </div>
    </div>

    <div class="inputs-wrapper">
      <div class="input-wrap">
        <ui-select
          title="Выберите счет"
          field="value"
          v-model="wallet"
          :options="wallets"
          :rules="[{ name: 'required', text: 'Выберите счет' }]"/>
      </div>
    </div>

    <ui-button @click="submit" :accent="true" title="Подтвердить"/> -->
  </ui-card>
</template>

<script>
// import api from '@/api'

import UiCard from '@/components/ui/ui-card/UiCard.vue'
// import UiSelect from '@/components/ui/ui-select/UiSelect.vue'
// import UiInput from '@/components/ui/ui-input/UiInput.vue'
// import UiCurrencyInput from '@/components/ui/ui-currency-input/UiCurrencyInput.vue'
// import UiButton from '@/components/ui/ui-button/UiButton.vue'

export default {
  name: 'Vk',

  components: {
    UiCard
    // UiSelect,
    // UiInput,
    // UiCurrencyInput,
    // UiButton
  },

  data: () => ({
    vkId: '',
    number: {
      value: '',
      key: 'usd'
    },
    wallet: {
      value: ''
    },
    wallets: [
      // usd: 'USD 0303 9549 7344 5455',
      // uah: 'UAH 6463 7747 7377 8484',
      // eur: 'EUR 6632 4323 4343 3454',
      // kzt: 'KZT 8994 4354 3321 1122',
      // rub: 'RUB 0099 2344 8484 3454'
    ]
  }),

  created () {
    // this.init()
  },

  methods: {
    async init () {
      // let res = await api.getWallets()
      // res.wallets.forEach((wallet, index) => {
      //   if (wallet.currency === 'USD') {
      //     this.wallets.push({ name: wallet.currency, value: wallet.number })
      //   }
      // })
    },

    submit () {
      //
    }
  }
}
</script>

<style lang="scss" scoped></style>
