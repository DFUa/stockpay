<template>
  <div>
    <dashboard-wallets/>
    <dashboard-transactions/>
  </div>
</template>

<script>
/* eslint-disable */
import DashboardWallets from './DashboardWallets.vue'
import DashboardTransactions from './DashboardTransactions.vue'

export default {
  name: 'Dashboard',

  // data () {
  //   return {
  //     devAlert: false
  //   }
  // },

  // beforeRouteEnter (to, from, next) {
  //   next (vm => {
  //     if (from.name && (from.name === 'auth-signin' || from.path.indexOf('auth') !== -1)) {
  //       vm.devAlert = true
  //     }
  //     next({ path: to.fullpath })
  //   })
  // },

  // watch: {
  //   devAlert (value) {
  //     if (value === true) {
  //       setTimeout(() => {
  //         alert('Сервис находиться в разработке, все транзакции проводятся в тестовом режиме')
  //       }, 1000)
  //     }
  //   }
  // },

  components: {
    DashboardWallets,
    DashboardTransactions
  }
}
</script>
