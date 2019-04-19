<template>
  <ui-card class="inner">
    <ui-tabs @active="changeActiveTab" :items="tabs" class="taxi-tabs"/>
    
    <div class="taxi-content">
      <div class="title">Оплатa такси</div>
      <div class="sub-title">Для того что бы вызвать такси позвоните по номеру +380990832640 и озвучьте адрес доставки и прибытия такси. После того как вы прибудете в место назначения или не задолго до прибытия вам необходимо будет провести оплату такси на этой же странице оплаты</div>

      <div v-if="currentTab === 0" class="taxi-form">
        <div class="inputs-wrapper">
          <div class="from">
            <ui-currency-input title="Сумма" v-model="amount" mask="MMMMMMMMM" :tokens="moneyMasks"/>
            <div class="wallet-label">{{ wallets[amount.key] }}</div>
          </div>
          <div class="input-wrap">
            <ui-select title="Имя, фамилия сотрудника"
            :options="usernames"
            field="username"
            v-model="username"
            :rules="[{ name: 'required' }]"/>
          </div>
        </div>
      </div>

      <div v-if="currentTab === 1" form="taxi-form">
        <div class="inputs-wrapper">
          <div class="from">
            <ui-currency-input title="Сумма" v-model="amount" mask="MMMMMMMMM" :tokens="moneyMasks"/>
            <div class="wallet-label">{{ wallets[amount.key] }}</div>
          </div>
          <div class="input-wrap">
            <ui-select title="Имя, фамилия сотрудника"
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
            ref="taxiWalletTo"/>
          </div>
        </div>
      </div>
     
      <ui-button @click="submit" :accent="true" title="Оплатить"/>
    </div>
  </ui-card>
</template>

<script>
import api from '@/api'
import UiCard from '@/components/ui/ui-card/UiCard.vue'
import UiTabs from '@/components/ui/ui-tabs/UiTabs.vue'
import UiInput from '@/components/ui/ui-input/UiInput.vue'
import UiCurrencyInput from '@/components/ui/ui-currency-input/UiCurrencyInput.vue'
import UiSelect from '@/components/ui/ui-select/UiSelect.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'

export default {
  name: 'Taxi',
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
        { name: 'Владислав', surname: 'Подольский' },
        { name: 'Дмитрий', surname: 'Сыченко' }
      ],
      amount: {
        value: '',
        key: 'usd'
      },
      wallets: {},
      wallet: '',
      username: {
        value: ''
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      let res = await api.getWallets()
      res.wallets.forEach(item => {
        this.$set(this.wallets, item.currency.toLowerCase(), item.number)
      })
    },
    changeActiveTab (id) {
      this.currentTab = id
    },
    submit () {
      let data = {}
      if (this.currentTab === 0) {
        data = {
          amount: this.amount.value,
          username: this.username
        }
      } else if (this.currentTab === 1) {
        data = {
          amount: this.amount.value,
          wallet_from: this.wallets[this.amount.key],
          wallet_to: this.amount.key.toUpperCase() + this.wallet,
          username: this.username
        }
      }

      if (!this.checkFields(data)) {
        this.$toasted.clear()
        this.$toasted.show('Пожалуйста, заполните, все поля!', {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 2000
        })
        return
      }

      if (this.currentTab === 1 && !this.$refs.taxiWalletTo.validate()) return;

      if (data.amount > 1) {
        this.$toasted.clear()
        this.$toasted.show(this.$store.getters.errorsList['bad_amount'], {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 2000
        })
        return
      }

      if (this.currentTab === 0) this.cardPay(data)
      else if (this.currentTab === 1) this.stocksPay(data)

    },
    cardPay (data) {
      // for test
      this.$toasted.clear()
      this.$toasted.show('Ошибка транзакции', {
        theme: 'toasted-primary',
        position: 'bottom-center',
        duration: 2000
      })
      return
      // for test
    },
    async stocksPay (data) {
      console.log(data)
      return
      let res = await api.sendMoneyToPerson(data)
      this.$toasted.clear()
      if (res.error) {
        this.$toasted.show(`${this.$store.getters.errorsList[res.message]}`, {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 2000
        })
      } else {
        this.$toasted.show('Transfer was done', {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 2000
        })
        this.amount.value = ''
        this.wallet = ''
        this.username.value = ''
      }
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
  .taxi-tabs {
    display: flex;

    .items-wrapper {
      padding: 0;
    }

    .item span {
      display: none;
    }
  }

  @media screen and (max-width: 360px) {
    .taxi-tabs .items-wrapper .item .title {
      display: block;
    }
  }
</style>
<style lang="scss" scoped>
  .taxi-content {
    margin-top: 40px;
  }
  .from {
    margin-right: 30px;
  }
</style>
