<template>
  <div classs="ui-tabs">

  </div>
</template>

<script>
export default {
  name: 'UiTabs',

  props: {
    items: Array
  },

  // items structure example
  // items: [
  //   { id: 0, title: 'Title', icon: 'icon-class', path: 'route-path' },
  //   ...
  // ]

  data: () => ({
  })
}
</script>

<style scoped>
  .ui-tabs {
  }
</style>
