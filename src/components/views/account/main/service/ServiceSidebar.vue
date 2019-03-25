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
      { id: 0, title: 'Пополнить телефон ( Для операторов России )', icon: 'i-sr-smartphone', path: 'phone' },
      { id: 1, title: 'Пополнить ВКонтакте', icon: 'i-sr-vk', path: 'vk' }
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
