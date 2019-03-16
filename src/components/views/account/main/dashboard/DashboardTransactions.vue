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
    <div v-if="!transactions.length" class="empty-stub">
      <h3>У вас пока не было транзакций</h3>
    </div>
    <table v-if="transactions.length">
      <tbody>
        <tr v-for="(transaction, index) in transactions" :key="index">
          <td>{{index}}</td>
          <!-- <td>{{user.nickname}}</td>
          <td>{{user.email}}</td>
          <td>{{user.country}}</td>
          <td>{{user.first_name}} {{user.last_name}}</td> -->
        </tr>
      </tbody>
    </table>
  </ui-card>
</template>

<script>
import api from '@/api'

import UiCard from '@/components/ui/ui-card/UiCard.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'

export default {
  name: 'DashboardTransactions',

  components: {
    UiCard,
    UiButton
  },

  data: () => ({
    transactions: []
  }),

  created() {
    this.init()
  },

  methods: {
    async init () {
      let res = await api.getTransactions()
      this.transactions = res.transactions
      console.log(this.transactions)
    }
  },
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
    font-family: "Montserrat";
  }

  .transactions h3 {
    font-size: 18px;
    font-weight: 600;
    font-family: "Montserrat";
  }

  .transactions .empty-stub {
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(245, 245, 245, 0.5);
  }
</style>
