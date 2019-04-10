<template>
  <ui-card class="add-founds-cards">
    <div class="title">Введите необходимую информацию для того чтобы пополнить ваш счет</div>
    <div class="cols">
      <!-- <div class="col-6">

        <div class="card">
          <div class="card-front">
            <div class="number-wrapper">
              <ui-masked-input title="Номер карточки"
                mask="#### #### #### ####" v-model="cardNumber"/>
            </div>
            <div class="date-wrapper">
              <ui-masked-input title="Дата" class="date-input"
                background-color="#f8f8f8" mask="## / ##" v-model="cardDate"/>
            </div>
          </div>

          <div class="card-back">
            <ui-masked-input title="CVV" class="cvv-input"
              background-color="#FFDB00" border-color="#fff" mask="###" v-model="cardCVV"/>
          </div>
        </div>

      </div> -->
      <div class="col">
        <div id="liqpay_checkout"></div>
      </div>
      <div class="col-6">
        <div id="liqpay_checkout"></div>
        <div class="inputs-wrapper">
          <ui-currency-input title="Сумма пополнения" mask="MMMMMMMMM" :tokens="moneyMasks" v-model="amount"/>
          <!-- <ui-wallet-select title="Кошелек" v-model="value" mask="### ### ###"/> -->
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="info-title">Для подтверждения пополнения нажмите <br>
        на кнопку "Пополнить"</div>
      <ui-button @click="submit" :accent="true" title="Пополнить"/>
    </div>
  </ui-card>
</template>

<script>
import api from '@/api'

import UiCard from '@/components/ui/ui-card/UiCard.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'
// import UiWalletSelect from '@/components/ui/ui-wallet-select/UiWalletSelect.vue'
// import UiMaskedInput from '@/components/ui/ui-masked-input/UiMaskedInput.vue'
import UiCurrencyInput from '@/components/ui/ui-currency-input/UiCurrencyInput.vue'

export default {
  name: 'AddFoundsCards',

  components: {
    UiCard,
    UiButton,
    // UiWalletSelect,
    // UiMaskedInput,
    UiCurrencyInput
  },

  data: () => ({
    // cardNumber: '',
    // cardDate: '',
    // cardCVV: '',
    form: '',
    amount: {
      value: 0,
      key: 'usd'
    },
    moneyMasks: {
      M: {
        pattern: /^[0-9.]?$/
      }
    }
    // value: {
    //   value: 13,
    //   key: 'usd'
    // }
  }),

  methods: {
    async submit () {
      let data = {
        currency: this.amount.key.toUpperCase(),
        amount: this.amount.value
      }
      let res = await api.sendMoneyByCard(data)
      console.log(res)
      if (!res.error) {
        window.LiqPayCheckoutCallback = function () {
          LiqPayCheckout.init({
            data: res.data,
            signature: res.signature,
            embedTo: '#liqpay_checkout',
            mode: 'embed' // embed || popup,
          })
        }
        let script = document.createElement('script')
        script.src = '//static.liqpay.ua/libjs/checkout.js'
        document.getElementById('liqpay_checkout').appendChild(script)
      } else {
        this.$toasted.show(`${this.$store.getters.errorsList[res.message]}`, {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 5000
        })
      }
    }
  }
}
</script>

<style scoped>
  .add-founds-cards {
    padding: 25px 35px;
    padding-bottom: 30px;
  }

  .title {
    font-size: 14px;
    font-weight: 600;
    font-family: "Open Sans";
    margin-bottom: 35px;
  }

  .cols {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
  }

  .col {
    width: 100%;
    margin-bottom: 10px;
  }

  .col-6 {
    width: 50%;
    padding: 0 15px;
  }

  .card {
    position: relative;
    height: 190px;
    width: 445px;
  }

  .card-front {
    position: absolute;
    top: 0;
    bottom: 10px;
    left: 0;
    right: 125px;
    border-radius: 10px;
    background: #fff;
    z-index: 100;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  }

  .card-front .number-wrapper {
    padding: 20px;
    padding-top: 30px;
  }

  .card-front .date-wrapper {
    padding: 15px 20px;
    background: #f8f8f8;
  }

  .card-back {
    position: absolute;
    top: 10px;
    bottom: 0;
    left: 125px;
    right: 0;
    border-radius: 10px;
    background: #FFDB00;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
  }

  .date-input {
    width: 100px;
  }

  .inputs-wrapper {
    width: 300px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
  }

  .inputs-wrapper > div {
    margin-bottom: 30px;
  }

  .inputs-wrapper > div:last-child {
    margin-bottom: 0;
  }

  .cvv-input {
    width: 90px;
    position: absolute;
    right: 20px;
    bottom: 45px;
  }

  .footer {
    padding-top: 35px;
  }

  .footer .info-title {
    opacity: 0.4;
    color: #1D1D1D;
    font-size: 14px;
    font-family: "Open Sans";
    margin-bottom: 20px;
  }

  @media screen and (max-width: 1110px) {
    .col-6 {
      width: 100%;
    }

    .cols {
      flex-direction: column-reverse;
    }
  }

  @media screen and (max-width: 650px) {
    .card {
      height: 290px;
      width: 330px;
      margin: 0 auto;
    }

    .card-front {
      height: 180px;
      width: 320px;
    }

    .card-back {
      top: 110px;
      left: 10px;
      width: 320px;
      height: 180px;
    }
  }
</style>
