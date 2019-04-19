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
      { id: 0, title: 'Мастер на дом', icon: 'i-sr-support', path: 'support' },
      { id: 1, title: 'Оплатить такси', icon: 'i-sr-frontal-taxi-cab', path: 'taxi' },
      { id: 2, title: 'Пополнить телефон', icon: 'i-sr-smartphone', path: 'phone' },
      // { id: 2, title: 'Пополнить телефон ( Для операторов России )', icon: 'i-sr-smartphone', path: 'phone' },
      // { id: 1, title: 'Пополнить ВКонтакте', icon: 'i-sr-vk', path: 'vk' },
      { id: 3, title: 'Пополнить Интернет', icon: 'i-sr-internet', path: 'internet', disabled: true },
      { id: 4, title: 'Пополнить Телевидение', icon: 'i-sr-television', path: 'television', disabled: true },
      { id: 5, title: 'Коммунальные платежи', icon: 'i-sr-house', path: 'house', disabled: true },
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
