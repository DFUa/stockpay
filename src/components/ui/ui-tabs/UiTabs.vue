<template>
  <div classs="ui-tabs">
    <div class="items-wrapper">
      <div v-for="item in items" :key="item.id" @click="onClick(item)"
        :class="{ 'item': true, 'active': isActive(item) || item.activeTab }">
        <span :class="item.icon"></span>
        <div class="title">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiTabs',

  props: {
    items: Array
  },

  // if there is no path - click return item's id (u should check @active)
  methods: {
    onClick (item) {
      if (item.path) {
        this.$router.push(item.path)
      } else {
        for (let i = 0; i < this.items.length; i++) {
          let element = this.items[i]
          if (element.id === item.id) {
            element.activeTab = true
          } else {
            element.activeTab = false
          }
        }
        this.$emit('active', item.id)
      }
    },

    isActive (item) {
      return this.$route.path.includes(item.path)
    }
  }
}
</script>

<style scoped>
  .ui-tabs {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .items-wrapper {
    /* padding: 0 80px; */
    display: flex;
    justify-content: space-between;
  }

  .items-wrapper .item {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 10px;
    opacity: 0.5;
    transition: .5s;
    border-bottom: 2px solid transparent;
  }

  .items-wrapper .item:hover {
    opacity: 1;
  }

  .items-wrapper .item.active {
    opacity: 1;
    border-bottom: 2px solid #FFDB00;
  }

  .items-wrapper .item span {
    margin-right: 20px;
  }

  .items-wrapper .item .title {
    font-size: 18px;
    font-weight: 600;
    font-family: "Open Sans";
  }

  @media screen and (max-width: 925px) {
    .items-wrapper .item .title {
      font-size: 14px;
    }
  }

  @media screen and (max-width: 735px) {
    .items-wrapper .item span {
      display: none;
    }

    .items-wrapper .item span {
      margin: 0;
    }
  }

  @media screen and (max-width: 375px) {
    .items-wrapper {
      padding: 0 4px;
    }
  }

  @media screen and (min-width: 425px) {
    .items-wrapper {
      padding: 0 30px;
    }
  }

  @media screen and (max-width: 360px) {
    .items-wrapper .item .title {
      display: none;
    }

    .items-wrapper .item span {
      display: inline-block;
    }
  }
</style>
