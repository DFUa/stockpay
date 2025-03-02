<template>
  <ui-card class="transactions">

    <!-- Transactions table header -->
    <div class="header">
      <div class="section">
        <h2>Транзакции</h2>
      </div>
      <button class="i-filter" @click="showFilterModal"></button>
      <transition name="fade-up" mode="out-in">
        <ui-filter v-if="showFilter" @filter="filter"></ui-filter>
      </transition>
    </div>

    <!-- Table body -->
    <table v-if="transactions.length" class="dashboard-table">
      <tbody>
        <div v-for="(transaction, index) in transactions" :key="index">
          <tr :class="{'extend-row': transaction.show_row}">
            <td
              class="dashboard-amount"
              :class="{
                'red': transaction.status === 'failure'
              }"
              width="20%">
              {{ transaction.original_amount > 0 ? transaction.received_amount : '-' + transaction.received_amount }} {{ transaction.currency }}
            </td>
            <td width="20%">Дата перевода: {{transaction.date}}</td>
            <td width="25%" class="text-center">Источник: {{ getTransactionTypeName(transaction.type) }}</td>
            <td width="20%" class="text-center">Status: {{transaction.status}}</td>
            <td width="15%" class="text-center">
              <button class="show-extend-row" :class="{ 'rotate': transaction.show_row }" @click="getMoreInfo(index)">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="black" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M1.4 7.40002L6 2.80002L10.6 7.40002L12 6.00002L6 2.43187e-05L0 6.00002L1.4 7.40002Z"/>
                </svg>
              </button>
            </td>
          </tr>
          <transition name="fade" mode="out-in">
            <tr class="extend-row" v-show="transaction.show_row">
              <td width="20%">Изначальный перевод: {{transaction.original_amount}} {{ transaction.currency }}</td>
              <td width="20%">Комиссия: {{transaction.fee_percent * 100 + '%'}} {{Math.round(transaction.fee_amount * 100) / 100}} {{ transaction.currency }}</td>
              <td width="25%" class="text-center">Зачислены средства на: {{transaction.wallet_to}}</td>
              <td width="20%"></td>
              <td width="15%"></td>
            </tr>
          </transition>
        </div>
      </tbody>
    </table>

    <!-- Emty table info -->
    <div v-if="!transactions.length" class="empty-stub">
      <h3>У вас пока не было транзакций</h3>
    </div>
  </ui-card>
</template>

<script>
import api from '@/api'

import UiCard from '@/components/ui/ui-card/UiCard.vue'
import UiFilter from '@/components/ui/ui-filter/UiFilter.vue'

export default {
  name: 'DashboardTransactions',

  components: {
    UiCard,
    UiFilter
  },

  data: () => ({
    transactions: [],
    showFilter: false,
    transactionTypes: [
      { type: 0, name: 'Кошелек пользователя' },
      { type: 1, name: 'Обмен валюты' },
      { type: 2, name: 'Карта зачисление' },
      { type: 3, name: 'Карта вывод' },
    ]
  }),

  mounted () {
    this.init()
  },

  methods: {
    async init (data) {
      let res = await api.getTransactions(data)
      this.transactions = res.transactions
      this.transactions.forEach(item => {
        // reactivity :(
        this.$set(item, 'show_row', false)
      })
    },

    showFilterModal () {
      this.showFilter = !this.showFilter
    },

    filter (data) {
      this.init(data)
    },

    getMoreInfo (index) {
      this.transactions[index].show_row = !this.transactions[index].show_row
    },

    getTransactionTypeName (type) {
      let name = ''
      this.transactionTypes.forEach(item => {
        if (item.type === type) {
          name = item.name
        }
      })
      return name
    }
  }
}
</script>

<style scoped>
  .text-center {
    text-align: center;
  }

  .dashboard-amount{
    font-weight: 600;
    color: #006344;
  }

  .dashboard-amount.red {
    color: red;
  }

  .dashboard-table tbody tr {
    display: flex;
    cursor: default;
    transition: all .3s;
  }

  .transactions {
    padding: 20px 0px;
    min-height: 470px;
  }

  .show-extend-row{
    padding: 5px 10px;
    cursor: pointer;
    background-color: transparent;
  }

  .show-extend-row svg{
    transform: rotate(180deg);
    transition: all .5s;
    display: block
  }

  .show-extend-row.rotate svg{
    transform: rotate(360deg)
  }

  .transactions .header {
    position: relative;
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
