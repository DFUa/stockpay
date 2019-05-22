<template>
  <vue-scroll :ops="ops">
    <table>
      <thead>
        <tr>
          <td v-for="header in headers" :key="header.id">{{ header.text }}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in usersData" :key="index" @click="getInfo(user.email, user.nickname)">
          <td>{{index}}</td>
          <td>{{user.nickname}}</td>
          <td>{{user.email}}</td>
          <td>{{user.country}}</td>
          <td>{{user.first_name}} {{user.last_name}}</td>
        </tr>
      </tbody>
    </table>
    <ui-pagination :length="paginationLength" @changePage="init"></ui-pagination>
  </vue-scroll>
</template>

<script>
import api from '@/api'
import UiPagination from '@/components/ui/ui-pagination/UiPagination.vue'

export default {
  name: 'UserTable',

  components: {
    UiPagination
  },

  data: () => ({
    headers: [{
      id: 0,
      text: '№'
    }, {
      id: 1,
      text: 'Никнейм'
    }, {
      id: 2,
      text: 'Почта'
    }, {
      id: 3,
      text: 'Страна'
    }, {
      id: 4,
      text: 'Имя Фамилия'
    }],
    paginationLength: 0,
    usersData: [],
    ops: {
      bar: {
        background: '#006344',
        opacity: 0.8
      }
    }
  }),

  mounted () {
    this.init(1)
  },

  methods: {
    async init (page) {
      let filters = {
          page: { value: page }
        }
      let res = await api.getUserInfo(filters)
      console.log(res)
      this.paginationLength = res.count
      this.usersData = res.users
    },

    getInfo (email, nickname) {
      this.$router.push(`user-info/${email}/${nickname}`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
