<template>
  <div class="sidebar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style>
  .sidebar {
    z-index: 500;
    position: fixed;
    width: 320px;
    background: #fff;
    top: 160px;
    padding-top: 20px;
    height: calc(100vh - 160px);
    border-top: 1px solid #F6F6F6;
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.03);
  }

  .sidebar .item {
    cursor: pointer;
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 35px;
    color: #000;
    font-size: 14px;
    font-weight: normal;
    font-family: "Open Sans";
    transition: .5s;
  }

  .sidebar .item:hover {
    background: rgba(0, 0, 0, 0.03);
  }
</style>
