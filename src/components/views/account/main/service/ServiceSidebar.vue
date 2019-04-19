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
  name: 'ServiceSidebar',

  data: () => ({
    items: [
      { id: 3, title: 'Мастер на дом', icon: 'i-sr-support', path: 'support' },
      { id: 2, title: 'Оплатить такси', icon: 'i-sr-frontal-taxi-cab', path: 'taxi' },
      { id: 0, title: 'Пополнить телефон', icon: 'i-sr-smartphone', path: 'phone' },
      // { id: 1, title: 'Пополнить ВКонтакте', icon: 'i-sr-vk', path: 'vk' },
      { id: 4, title: 'Пополнить Интернет', icon: 'i-sr-internet', path: 'internet' },
      { id: 5, title: 'Пополнить Телевидение', icon: 'i-sr-television', path: 'television' },
      { id: 6, title: 'Коммунальные платежи', icon: 'i-sr-house', path: 'house' },
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
