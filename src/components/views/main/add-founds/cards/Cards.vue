<template>
  <ui-card class="add-founds-cards">
    <div class="title">Введите необходимую информацию для того чтобы пополнить ваш счет</div>
    <div class="cols">
      <div class="col-6">

        <div class="card">
          <div class="card-front">
            <div class="number-wrapper">
              <ui-masked-input title="Номер карточки"
                mask="#### #### #### ####" v-model="cardNumber"/>
            </div>
            <div class="date-wrapper">
              <ui-masked-input title="Дата" class="date-input"
                background-color="#f4f4f4" mask="## / ##" v-model="cardDate"/>
            </div>
          </div>

          <div class="card-back">
            <ui-masked-input title="CVV" class="cvv-input"
              background-color="#FFDB00" border-color="#fff" mask="###" v-model="cardCVV"/>
          </div>
        </div>

      </div>
      <div class="col-6">
        <ui-input title="Сумма пополнения" v-model="amount"/>
      </div>
    </div>
    <div class="footer">
      <div class="info-title">Для подтверждения пополнения нажмите <br>
        на кнопку "Пополнить"</div>
      <ui-button :accent="true" title="Пополнить"/>
    </div>
  </ui-card>
</template>

<script>
import UiCard from '@/components/ui/ui-card/UiCard.vue'
import UiInput from '@/components/ui/ui-input/UiInput.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'
import UiMaskedInput from '@/components/ui/ui-masked-input/UiMaskedInput.vue'

export default {
  name: 'AddFoundsCards',

  components: {
    UiCard,
    UiInput,
    UiButton,
    UiMaskedInput
  },

  data: () => ({
    cardNumber: '',
    cardDate: '',
    cardCVV: '',
    amount: ''
  })
}
</script>

<style scoped>
  .add-founds-cards {
    padding: 25px 35px;
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
    background: #f4f4f4;
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

  .cvv-input {
    width: 90px;
    position: absolute;
    right: 20px;
    bottom: 45px;
  }

  .footer {
    padding-top: 35px;
    margin-bottom: 40px;
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
