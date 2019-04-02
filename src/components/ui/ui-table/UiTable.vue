<template>
  <div class="custom-table">
    <div v-if="!hideHeader && !headers" class="headers">
      <slot name="header"></slot>
    </div>
    <div v-if="!hideHeader && headers" class="header-custom-table">
      <div class="row-custom-table">
        <div
          class="row-custom-table-item header-item-custom-table"
          v-for="(header, index) in headers"
          :key="index">
          {{header.text}}
        </div>
      </div>
    </div>
    <div class="row-custom-items">
      <slot name="items"></slot>
    </div>
  </div>
</template>

<script>
// i create this custom table without tag table, cause of responsibility and other staff
export default {
  name: 'UiTable',

  props: {
    headers: Array,
    hideHeader: Boolean
  }
};
</script>

<style lang="scss" scoped>
.custom-table{
  padding: 15px 20px;
  .row-custom-table{
    display: flex;
    justify-content: space-between;
    .row-custom-table-item{
      padding: 0 10px;
    }
  }
}
</style>
