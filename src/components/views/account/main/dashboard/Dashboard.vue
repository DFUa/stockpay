<template>
  <div>
    <dashboard-wallets/>
    <dashboard-transactions/>
  </div>
</template>

<script>
import DashboardWallets from './DashboardWallets.vue'
import DashboardTransactions from './DashboardTransactions.vue'

export default {
  name: 'Dashboard',

  components: {
    DashboardWallets,
    DashboardTransactions
  }
}
</script>
