<template>
  <div class="profile-wrapper">
    <div class="container">
      <ui-card>

        <div class="card-inner">

          <div class="section">
            <div class="title">Личные данные</div>

            <div class="inputs cols">
              <div class="col-3">
                <ui-input title="Firstname" v-model="firstname"/>
              </div>
              <div class="col-3">
                <ui-input title="Lastname" v-model="lastname"/>
              </div>
              <div class="col-3">
                <ui-input title="Country" v-model="country"/>
              </div>
              <div class="col-3">
                <ui-input title="Сity" v-model="city"/>
              </div>
            </div>

            <ui-button :accent="true" title="Применить"/>
          </div>

          <div class="section">
            <div class="cols">
              <div class="col-6">
                <div class="title">Безопасность</div>

                <ui-input class="field" title="Nickname" :disabled="true" v-model="nickname">
                  <ui-button class="ui-input-btn" :accent="true" title="Изменить"/>
                </ui-input>

                <ui-input class="field" title="Password" :disabled="true" v-model="password">
                  <ui-button class="ui-input-btn" :accent="true" title="Изменить"/>
                </ui-input>

                <ui-input class="field" title="Email" :disabled="true" v-model="email"/>
              </div>
              <div class="col-6">
                <div class="title">Привязать телефон</div>

                <ui-input class="field" title="Phone" :disabled="true" v-model="phone">
                  <ui-button class="ui-input-btn" :accent="true" title="Привязать"/>
                </ui-input>
              </div>
            </div>
          </div>

        </div>
      </ui-card>
    </div>
  </div>
</template>

<script>
import UiCard from '@/components/ui/ui-card/UiCard.vue'
import UiInput from '@/components/ui/ui-input/UiInput.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'

export default {
  name: 'Profile',

  components: {
    UiCard,
    UiInput,
    UiButton
  },

  data: () => ({
    firstname: 'Vlad',
    lastname: 'Podolsky',
    country: 'Country',
    city: 'City',
    nickname: 'justnick',
    password: 'xxxxxxxxxxxxx',
    email: 'mail@mail.com',
    phone: '+790 009 9999 999'
  })
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

  .field {
    width: 380px;
  }

  .ui-input-btn {
    position: absolute;
    right: 5px;
    top: 5px;
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

      .field {
        width: 100%;
      }
   }
</style>
