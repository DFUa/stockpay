<template>
  <ui-card class="inner ui-card">
    <div class="title">Перевод средств на банковскую карту VISA, Mastercard, Maestro, Мир</div>
    <div class="sub-title">Выберите кошелёк и введите сколько хотите перевести средств, затем введите номер банковской карты и пароль</div>

    <div class="inputs-wrapper">
      <div class="from">
        <ui-currency-input title="Сумма" v-model="inValue" mask="MMMMMMMMM" :tokens="moneyMasks"/>
        <div class="wallet-label">{{ wallets[inValue.key] }}</div>
      </div>
      <div class="toggler" :class="{ 'i-arrow-right': true }"></div>
      <div class="to">
        <ui-input title="Номер карточки" v-model="card" :rules="[{ name: 'pattern', value: /^\d{16}$/, text: 'Номер карты должен состоять из 16 цифр' }]" ref="cardNum"/>
      </div>
    </div>

    <div class="title">Введите имя и фамилию получателя на английском языке</div>
    <div class="inputs-wrapper">
      <div class="input-wrap">
        <ui-input
          title="Имя"
          v-model="firstName"
          :rules="[{ name: 'pattern', value: /^[A-Za-z]*$/, text: 'Введите имя и фамилию получателя на английском языке' }, { name: 'required' }]"
          ref="testFirstName"/>
      </div>
      <div class="input-wrap">
        <ui-input
        title="Фамилия"
        v-model="lastName"
        :rules="[{ name: 'pattern', value: /^[A-Za-z]*$/,text: 'Введите имя и фамилию получателя на английском языке' }, { name: 'required' }]"
        ref="testLastName"/>
      </div>
    </div>

    <p class="commission">Комиссия составит: <span>{{commission}} {{inValue.key.toUpperCase()}}</span></p>
    <p class="received">Пользователь получит после перевода: <span>{{received}} {{inValue.key.toUpperCase()}}</span></p>

    <div class="sub-title">Для подтверждения перевода нажмите <br>
      на кнопку “Отправить средства”</div>

    <div class="received"><span>Средства будут зачислены в течении 5 рабочих дней</span></div>

    <ui-button @click="checkInputFields" :accent="true" title="Отправить средства"/>

    <ui-modal
      v-model="showPasswordModal"
      title="Введите Ваш пароль, пожалуйста"
      button-title="Apply"
      form="bankcard-password"
      @on-apply="submit"
      @on-close="closePasswordModal">

      <template slot="form">
        <ui-input
          type="password"
          title="Пароль"
          v-model="password"
          :rules="[{ name: 'required' }]"/>
      </template>
    </ui-modal>

    <div v-if="loading && showPasswordModal" class="bankcard-spinner-wrapper">
      <ui-spinner/>
    </div>
  </ui-card>
</template>

<script>
import api from '@/api'

import UiModal from '@/components/ui/ui-modal/UiModal.vue'
import UiCard from '@/components/ui/ui-card/UiCard.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'
import UiCurrencyInput from '@/components/ui/ui-currency-input/UiCurrencyInput.vue'
import UiInput from '@/components/ui/ui-input/UiInput.vue'
import UiSpinner from '@/components/ui/ui-spinner/UiSpinner.vue'

export default {
  name: 'BankCard',
  components: {
    UiCard,
    UiButton,
    UiInput,
    UiModal,
    UiSpinner,
    UiCurrencyInput
  },
  data () {
    return {
      inValue: {
        value: 0,
        key: 'usd'
      },
      card: '',
      password: '',
      received: 0,
      commission: 0,
      wallets: {},
      moneyMasks: {
        M: {
          pattern: /^[0-9.]?$/
        }
      },
      firstName: '',
      lastName: '',
      fee: '',
      showPasswordModal: false,
      loading: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      let response = await api.getWallets()
      response.wallets.forEach(wallet => {
        this.$set(this.wallets, wallet.currency.toLowerCase(), wallet.number)
      })
      let fee = await api.getFee()
      this.fee = fee.fee
    },
    checkInputFields () {
      let walletFrom = this.wallets[this.inValue.key]

      if (this.inValue.value <= 0 || this.card.length === 0) {
        this.$toasted.clear()
        this.$toasted.show('Пожалуйста, заполните, все поля!', {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 2000
        })
        return
      }

      if (walletFrom === this.card) {
        this.$toasted.clear()
        this.$toasted.show('Ваш номер кошелька совпадает с номером карты получателя', {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 2000
        })
        return
      }

      if (!this.$refs.cardNum.validate()) return
      if (!this.$refs.testFirstName.validate()) return
      if (!this.$refs.testLastName.validate()) return

      if (this.inValue.value > 15 || this.inValue.value < 11 ) {
        this.$toasted.clear()
        this.$toasted.show('Сумма пополнения должна быть от 11 к 15 USD', {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 2000
        })
        return
      }

      this.openPasswordModal()
    },

    async submit () {
      let reqeustData = {
        wallet_from: this.wallets[this.inValue.key],
        card: this.card,
        amount: this.inValue.value,
        password: this.password,
        card_owner: `${this.firstName} ${this.lastName}`
      }

      this.loading = true
      let response = await api.sendPayoutRequest(reqeustData)
      this.loading = false

      this.$toasted.clear()

      if (response.error) {
        this.$toasted.show(`${this.$store.getters.errorsList[response.message]}`, {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 4000
        })
        if (response.message === 'wrong_password') return
      } else {
        this.$toasted.show('Transfer was done', {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 3000
        })

        this.inValue.value = 0
        this.card = ''
      }

      this.closePasswordModal()
    },
    openPasswordModal () {
      this.showPasswordModal = true
    },
    closePasswordModal () {
      this.password = ''
      this.showPasswordModal = false
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
    color: #006344;
  }
}

.received{
  margin-bottom: 20px;
  span{
    color: #F97979;
  }
}

.bankcard-spinner-wrapper {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  top: 0;
  bottom: 24px;
  left: 0;
  right: 0;
}
</style>
