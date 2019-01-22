<template>
  <div classs="ui-tabs">

  </div>
</template>

<script>
export default {
  name: 'UiTabs',

  data: () => ({
    items: [
      { id: 0, title: 'Title', icon: 'icon-class', path: 'route-path' }
    ]
  })
}
</script>

<style scoped>
  .ui-tabs {
  }
</style>
