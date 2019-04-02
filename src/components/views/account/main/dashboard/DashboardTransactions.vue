<template>
  <ui-card class="transactions">
    <div class="header">
      <div class="section">
        <h2>Транзакции</h2>
      </div>
      <!-- <div class="section">
        <ui-button class="right-offset" title="Пополнение"/>
        <ui-button :accent="true" title="Перевод"/>
      </div> -->
    </div>
    <div v-if="!transactions.length" class="empty-stub">
      <h3>У вас пока не было транзакций</h3>
    </div>
    <!-- https://jsfiddle.net/2q41d3ym/13/ -->
    <!-- <ui-table :headers="headers">
      <div class="row-custom-table" slot="items">
        <div class="row-custom-table-item">
          <div>1</div>
          <div>3</div>
          <div>4</div>
          <div>3</div>
        </div>
      </div>
    </ui-table> -->
    <table v-if="transactions.length" class="dashboard-table">
      <tbody>
        <tr
        v-for="(transaction, index) in transactions"
        :key="index"
        @click="getMoreInfo($event, transaction)">
          <td width="20%">{{index + 1}}</td>
          <td width="20%">Дата перевода: {{transaction.date}}</td>
          <td width="20%">Источник: Карта</td>
          <td width="20%">Статус: Завершено</td>
        </tr>
      </tbody>
    </table>
  </ui-card>
</template>

<script>
import api from '@/api'

import UiCard from '@/components/ui/ui-card/UiCard.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'
import UiTable from '@/components/ui/ui-table/UiTable'

export default {
  name: 'DashboardTransactions',

  components: {
    UiCard,
    UiButton,
    UiTable
  },

  data: () => ({
    transactions: [],
    headers: [{
      text: '#',
    }, {
      text: 'date'
    }, {
      text: 'source'
    }, {
      text: 'status'
    }]
  }),

  created () {
    this.init()
  },

  methods: {
    async init () {
      let res = await api.getTransactions()
      this.transactions = res.transactions
      console.log(this.transactions)
    },

    fadeIn(el) {
      el.style.opacity = 0;

      var last = +new Date();
      var tick = function() {
        el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
        last = +new Date();

        if (+el.style.opacity < 1) {
          (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
      };

      tick();
    },

    getMoreInfo ($event, data) {
      // el.parentNode.removeChild(el);
      if (document.getElementById('extend')){
        document.getElementById('extend').outerHTML = ""
      }
      let tr = $event.path[1]
      let extendTr = document.createElement('tr')
      let markup = `
        <td>Изначальный перевод: ${data.original_amount} ${data.currency}</td>
        <td>Комиссия: ${data.fee_percent * 100 + '%'} (${Math.round(data.fee_amount * 100) / 100} ${data.currency})</td>
        <td>Зачислены средства на: ${data.wallet_to}</td>
        <td></td>
      `
      extendTr.id = 'extend'
      extendTr.innerHTML = markup
      this.fadeIn(extendTr)
      tr.after(extendTr)
    }
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
