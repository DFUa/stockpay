<template>
  <div class="profile-wrapper">
    <div class="container">
      <ui-card>

        <div class="card-inner">

          <div class="section">
            <div class="title">Личные данные</div>

            <div class="inputs cols">
              <div class="col-3">
                <ui-input title="Firstname"/>
              </div>
              <div class="col-3">
                <ui-input title="Lastname"/>
              </div>
              <div class="col-3">
                <ui-input title="Country"/>
              </div>
              <div class="col-3">
                <ui-input title="Сity"/>
              </div>
            </div>

            <ui-button :accent="true" title="Применить"/>
          </div>

          <div class="section">
            <div class="cols">
              <div class="col-6">
                <div class="title">Безопасность</div>
                <ui-input title="Nickname"/>
                <ui-input title="Password"/>
                <ui-input title="Email"/>
              </div>
              <div class="col-6">
                <div class="title">Привязать телефон</div>
                <ui-input title="Phone"/>
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
  }
}
</script>

<style scoped>
  .profile-wrapper {
    padding: 0 20px;
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

  .section .cols {
    display: flex;
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
</style>
