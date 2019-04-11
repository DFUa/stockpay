<template>
  <div class="filter">
    <p class="filter-header">Фильтр</p>
    <div class="filter-wrap">
      <div class="col-2">
        <ui-button @click="filterIn" style="width: 100%" title="Пополнение"></ui-button>
      </div>
      <div class="col-2">
        <ui-button @click="filterOut" style="width: 100%" title="Перевод" :accent="true"></ui-button>
      </div>
      <div class="col-2">
        <datetime v-model="dateFrom" placeholder="Дата от" title="Дата от"></datetime>
      </div>
      <div class="col-2">
        <datetime v-model="dateTo" placeholder="Дата до" title="Дата до"></datetime>
      </div>
      <div class="col">
        <ui-input title="Зачислены средства на" v-model="targetWallet"/>
      </div>
      <div class="col-2">
        <ui-input title="Сумма от" v-model="amountFrom"/>
      </div>
      <div class="col-2">
        <ui-input title="Сумма до" v-model="amountTo"/>
      </div>
      <div class="col-2">
        <ui-input title="Статус" v-model="status"/>
      </div>
      <div class="col-2">
        <ui-select
          title="Источник"
          field="type"
          v-model="type"
          :options="typeOptions"/>
      </div>
      <div class="col-2">
        <ui-button title="Применить" @click="filter" :accent="true"></ui-button>
      </div>
    </div>
  </div>
</template>

<script>
import UiInput from '@/components/ui/ui-input/UiInput.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'
import UiSelect from '@/components/ui/ui-select/UiSelect.vue'

export default {
  name: 'UiFilter',

  components: {
    UiInput,
    UiButton,
    UiSelect
  },

  data: () => ({
    type: {
      value: ''
    },
    typeOptions: [
      { name: '0', type: 'Кошелек пользователя' },
      // { name: '1', type: 'Обмен валюты' },
      { name: '2', type: 'Карта' }
    ],
    dateFrom: '',
    dateTo: '',
    targetWallet: '',
    amountFrom: '',
    amountTo: '',
    status: '',
    source: ''
  }),

  methods: {
    filter () {
      let data = {
        beforeDate: { value: this.dateTo.split('T')[0] },
        afterDate: { value: this.dateFrom.split('T')[0] },
        to: { value: this.targetWallet },
        minAmount: { value: this.amountFrom },
        maxAmount: { value: this.amountTo },
        type: { value: this.type.name }
      }
      this.$emit('filter', data)
    },

    filterIn () {
      let data = {
        way: {
          value: 'incoming'
        }
      }
      this.$emit('filter', data)
    },

    filterOut () {
      let data = {
        way: {
          value: 'outcoming'
        }
      }
      this.$emit('filter', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter {
  z-index: 1;
  position: absolute;
  right: -15px;
  top: -15px;
  background-color: #fff;
  width: 460px;
  min-height: 450px;
  padding: 20px 30px;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.15);
  border-radius: 5px;

  .filter-header {
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 30px;
  }

  .filter-wrap {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -5px;

    .col {
      width: 100%;
      margin: 0 5px 15px;
      .group{
        margin-bottom: 0;
      }
    }

    .col-2 {
      width: calc(50% - 10px);
      margin: 0 5px 15px;
      .group{
        margin-bottom: 0;
      }
    }
  }
}
</style>
