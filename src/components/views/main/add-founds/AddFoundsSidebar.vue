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
  name: 'AddFoundsSidebar',

  data: () => ({
    items: [
      { id: 0, title: 'Создать счет', icon: 'i-af-cards', path: 'cards' },
      { id: 1, title: 'С помощью электронного кошелька ADV Cash', icon: 'i-af-adv', path: 'adv', disabled: true },
      { id: 2, title: 'С помощью криптовалютного кошелька', icon: 'i-af-coin', path: 'crypto', disabled: true },
      { id: 3, title: 'С помощью кошелька Яндекс. Деньги', icon: 'i-af-yandex', path: 'crypto', disabled: true },
      { id: 4, title: 'С помощью кошелька QIWI VISA Wallet', icon: 'i-af-visa', path: 'crypto', disabled: true }
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
