<template>
  <form action="#" :id="form" class="ui-form">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'UiForm',

  props: {
    form: String
  },

  methods: {
    validate () {
      let result = []
      for (let i = 0; i < this.$children.length; i++) {
        result.push(this.$children[i].validate())
      }
      return result.every(res => {
        return res
      })
    }
  }
}
</script>

<style scoped>
</style>
