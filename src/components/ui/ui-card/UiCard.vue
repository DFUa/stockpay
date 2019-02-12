<template>
  <div class="ui-card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'UiCard'
}
</script>

<style scoped>
  .ui-card {
    background: #fff;
    border-radius: 15px;
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.03);
  }
</style>
