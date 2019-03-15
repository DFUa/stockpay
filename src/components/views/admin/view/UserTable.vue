<template>
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
</template>

<script>
import api from '@/api'

export default {
  name: 'UserTable',

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
    usersData: []
  }),

  mounted () {
    this.init()
  },

  methods: {
    async init () {
      let res = await api.getUserList()
      this.usersData = res.users
      console.log(this.usersData)
    },

    getInfo (email, nickname) {
      this.$router.push(`user-info/${email}/${nickname}`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
