<template>
  <div>
    <div v-for="item in items" :key="item.id" @click="navigate(item)"
      :class="{ 'item': true, 'active': isActive(item), 'disabled': item.disabled }">

      <span :class="item.icon"></span>
      <div class="title">{{ item.title }}</div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'TransferSidebar',

  data: () => ({
    items: [
      { id: 0, title: 'Между своими счетами', icon: 'i-tr-cards', path: 'wallets' },
      { id: 1, title: 'Другому человеку', icon: 'i-tr-person', path: 'person' },
      { id: 2, title: 'На банковскую карту', icon: 'i-tr-bank', path: 'bank-card' },
      { id: 3, title: 'На банковский счет', icon: 'i-tr-building', path: 'bank-account' },
      { id: 4, title: 'На криптовалютный кошелек', icon: 'i-tr-coins', path: 'crypto', disabled: true },
      { id: 5, title: 'На кошелек Яндекс Деньги', icon: 'i-tr-yandex', path: 'crypto', disabled: true }
    ]
  }),

  methods: {
    navigate (item) {
      if (!item.disabled) {
        this.$router.push(item.path)
      }
    },

    isActive (item) {
      return this.path.includes(item.path)
    }
  },

  computed: {
    path () {
      return this.$route.path
    }
  }
}
</script>
