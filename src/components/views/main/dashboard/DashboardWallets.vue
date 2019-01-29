<template>
  <ui-card class="wallets-wrapper">
    <div class="wallets">
      <div class="item">
        <div class="title">Рубль</div>
        <div class="info-item">14 000 RUB</div>
        <div class="info-item">Ru 7948 4954 0495 0459</div>
      </div>
      <div class="item">
        <div class="title">Доллар</div>
        <div class="info-item">100 USD</div>
        <div class="info-item">Ru 5465 4954 0495 9089</div>
      </div>
      <div class="item">
        <div class="title">Гривны</div>
        <div class="info-item">0 UAH</div>
        <div class="info-item">Ru 1234 4954 0495 3453</div>
      </div>
      <div class="item">
        <div class="title">Тенге</div>
        <div class="info-item">30 000 KZT</div>
        <div class="info-item">Ru 4543 4954 0495 1235</div>
      </div>
      <div class="item">
        <div class="title">Евро</div>
        <div class="info-item">3 500 000 EUR</div>
        <div class="info-item">Ru 9223 4954 0495 9235</div>
      </div>
    </div>
  </ui-card>
</template>

<script>
import UiCard from '@/components/ui/ui-card/UiCard.vue'

export default {
  name: 'DashboardWallets',

  components: {
    UiCard
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
  }

  .wallets .item .info-item {
    opacity: 0.5;
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

  @media screen and (max-width: 925px) {
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
