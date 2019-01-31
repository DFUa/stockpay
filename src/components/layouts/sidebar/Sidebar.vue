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
    top: 195px;
    padding-top: 20px;
    height: calc(100vh - 160px);
    border-top: 1px solid #F6F6F6;
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }

  .sidebar .item {
    width: 320px;
    cursor: pointer;
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 30px;
    color: #000;
    font-size: 14px;
    font-weight: 600;
    font-family: "Open Sans";
    transition: .5s;
  }

  .sidebar .item span {
    min-width: 24px;
  }

  .sidebar .item .title {
    margin-left: 20px;
  }

  .sidebar .item:hover {
    background: rgba(0, 0, 0, 0.03);
  }

  .sidebar .item.active {
    background: #006344;
  }

  .sidebar .item.active:not(.disabled) * {
    filter: invert(1);
  }

  .sidebar .item.disabled {
    cursor: default;
    background: #fff;
  }

  .sidebar .item.disabled * {
    opacity: 0.3;
  }

  @media screen and (max-width: 1680px) {
    .sidebar {
      width: 80px;
      transition: .5s;
    }

    .sidebar .item .title {
      opacity: 0;
      transition-delay: .5s;
      transition: .5s;
    }

    .sidebar:hover {
      width: 320px;
    }

    .sidebar:hover .item .title {
      opacity: 1;
    }
  }
</style>
