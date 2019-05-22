<template>
  <ul>
    <li v-for="(item, i) in length" :key="i">
      <a href="#" @click.prevent="changePage(i + 1)">{{i + 1}}</a>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'UiPagination',

  props: {
    length: Number,
    currentPage: Number
  },

  data: () => ({}),

  methods: {
    changePage(i) {
      this.$emit('changePage', i);
    }
  },
}
</script>

<style lang="scss" scoped>
ul{
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 20px 10px;
  li {
    margin: 0 5px;
    a{
      font-weight: 600;
      padding: 5px 10px;
      border: 1px solid lightgrey;
      border-radius: 5px;
      color: #006344;
      text-decoration: none;
      transition: all .3s;
    }
    &.disabled {
      a{
        cursor: default;
        color: lightgrey;
      }
    }
  }
}
</style>
