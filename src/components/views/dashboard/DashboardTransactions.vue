<template>
  <ui-card class="transactions">
    <div class="header">
      <div class="section">
        <h2>Транзакции</h2>
      </div>
      <div class="section">
        <ui-button class="right-offset" title="Пополнение"/>
        <ui-button :accent="true" title="Перевод"/>
      </div>
    </div>
    <div class="empty-stub">
      <h3>У вас пока не было транзакций</h3>
    </div>
  </ui-card>
</template>

<script>
import UiCard from '@/components/ui/ui-card/UiCard.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'

export default {
  name: 'DashboardTransactions',

  components: {
    UiCard,
    UiButton
  }
}
</script>

<style scoped>
  .transactions {
    padding: 20px 0px;
  }

  .transactions .header {
    margin: 0 30px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }

  .transactions .header .section {
    display: flex;
  }

  .transactions .header .right-offset {
    margin-right: 10px;
  }

  .transactions h2 {
    font-size: 24px;
    font-weight: 600;
    font-family: "Open Sans";
  }

  .transactions h3 {
    font-size: 18px;
    font-weight: 600;
    font-family: "Open Sans";
  }

  .transactions .empty-stub {
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(245, 245, 245, 0.5);
  }
</style>
