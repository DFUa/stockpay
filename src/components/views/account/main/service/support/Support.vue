<template>
  <ui-card class="inner">
    <ui-tabs @active="changeActiveTab" :items="tabs" class="support-tabs"/>
    
    <div class="support-content">
      <div class="title">Оплатa мастеру</div>
      <div class="sub-title">Для того что бы вызвать мастера на дом позвоните по номеру +380990832640 и закажите мастера. После того как мастер выполнит свою работу вам необходимо будет провести оплату мастера на этой же странице оплаты</div>

      <div v-if="currentTab === 0" class="support-form">
        <div class="inputs-wrapper">
          <div class="input-wrap">
            <ui-currency-input title="Сумма" v-model="amount" mask="MMMMMMMMM" :tokens="moneyMasks"/>
          </div>
          <div class="input-wrap">
            <ui-select title="ФИО"
            :options="usernames"
            field="username"
            v-model="username"
            :rules="[{ name: 'required' }]"/>
          </div>
        </div>
      </div>

      <div v-if="currentTab === 1" form="support-form">
        <div class="inputs-wrapper">
          <div class="input-wrap">
            <ui-currency-input title="Сумма" v-model="amount" mask="MMMMMMMMM" :tokens="moneyMasks"/>
          </div>
          <div class="input-wrap">
            <ui-select title="ФИО"
            :options="usernames"
            field="username"
            v-model="username"
            :rules="[{ name: 'required' }]"/>
          </div>
          <div class="input-wrap">
            <ui-input
            title="Номер кошелька"
            v-model="wallet"
            :rules="[{ name: 'required' }, { name: 'pattern', value: /^[0-9]+$/ }]"
            ref="supportWalletTo"/>
          </div>
        </div>
      </div>
     
      <ui-button @click="submit" :accent="true" title="Оплатить"/>
    </div>
  </ui-card>
</template>

<script>
import UiCard from '@/components/ui/ui-card/UiCard.vue'
import UiTabs from '@/components/ui/ui-tabs/UiTabs.vue'
import UiInput from '@/components/ui/ui-input/UiInput.vue'
import UiCurrencyInput from '@/components/ui/ui-currency-input/UiCurrencyInput.vue'
import UiSelect from '@/components/ui/ui-select/UiSelect.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'

export default {
  name: 'Support',
  components: {
    UiCard,
    UiTabs,
    UiInput,
    UiCurrencyInput,
    UiSelect,
    UiButton
  },
  data () {
    return {
      currentTab: 0,
      tabs: [
        { id: 0, title: 'Оплата картой', activeTab: true },
        { id: 1, title: 'Оплата StocksPay', activeTab: false }
      ],
      moneyMasks: {
        M: {
          pattern: /^[0-9.]?$/
        }
      },
      names: [
        { name: 'John', surname: 'Dou' }
      ],
      amount: {
        value: '',
        key: 'usd'
      },
      wallet: '',
      username: {
        value: ''
      }
    }
  },
  methods: {
    changeActiveTab (id) {
      this.currentTab = id
    },
    submit () {
      let data = {
        amount: this.amount.value,
        username: this.username
      }
      if (this.currentTab === 1) data.wallet = this.wallet

      if (!this.checkFields(data)) {
        this.$toasted.clear()
        this.$toasted.show('Пожалуйста, заполните, все поля!', {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 2000
        })
        return
      }

      if (this.currentTab === 1 && !this.$refs.supportWalletTo.validate()) return;

      console.log(data);

      // for test
      this.$toasted.clear()
      this.$toasted.show('Ошибка транзакции', {
        theme: 'toasted-primary',
        position: 'bottom-center',
        duration: 2000
      })
      return
      // for test

      // send request
    },
    checkFields (fields) {
      for (let item in fields) {
        if (fields[item].length === 0) return false  
      }

      return true
    }
  },
  computed: {
    usernames: function () {
      let result = []
      if (this.names.length === 0) return result
      this.names.forEach(item => result.push({ username: `${item.name} ${item.surname}` }))
      return result
    }
  }
}
</script>

<style lang="scss">
  .support-tabs {
    display: flex;

    .items-wrapper {
      padding: 0;
    }

    .item span {
      display: none;
    }
  }
</style>
<style lang="scss" scoped>
  .support-content {
    margin-top: 40px;
  }
</style>
