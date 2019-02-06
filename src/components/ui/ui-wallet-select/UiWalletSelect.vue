<template>
  <div class="ui-wallet-select" v-click-outside="closeDropDown">

    <div @click="toggleDropDown"
      :class="{ 'value': true, 'remove-border': showDropDown }">
        {{ selectedItem ? selectedItem.title : '' }}</div>

    <div @click="toggleDropDown" class="currency">
      {{ selectedItem ? selectedItem.currency : '' }}</div>

    <label>{{ title }}</label>

    <ui-toggle-arrow class="arrow" v-model="showDropDown"/>

    <transition name="fade">
      <div v-if="showDropDown" class="items-wrapper" key="items">
        <div v-for="item in currItems" @click="selectItem(item)"
          :key="item.id" class="item">
          <div>{{ item.title }}</div>
          <div class="currency">{{ item.currency }}</div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import UiToggleArrow from '@/components/ui/ui-toggle-arrow/UiToggleArrow.vue'

export default {
  name: 'UiWalletSelect',

  components: {
    UiToggleArrow
  },

  props: {
    title: String,
    value: Object
  },

  mounted () {
    this.init()
  },

  data: () => ({
    currentValue: '',
    currItems: [
      { id: 0, title: '1234 3242 3234 3453', currency: 'USD' },
      { id: 1, title: '1234 3242 3234 3453', currency: 'RUB' },
      { id: 2, title: '1234 3242 3234 3453', currency: 'UAH' },
      { id: 3, title: '1234 3242 3234 3453', currency: 'KZT' }
    ],
    showDropDown: false,
    selectedItem: null
  }),

  methods: {
    init () {
      this.currentValue = this.value.value
    },

    toggleDropDown () {
      this.showDropDown = !this.showDropDown
    },

    openDropDown () {
      this.showDropDown = true
    },

    selectItem (item) {
      this.selectedItem = item
      this.closeDropDown()
    },

    onChange () {
      let data = {
        value: this.currentValue,
        key: this.selectedItem.key
      }
      this.$emit('input', data)
    },

    closeDropDown () {
      if (this.showDropDown) {
        this.showDropDown = false
      }
    }
  }
}
</script>

<style scoped>
  .ui-wallet-select {
    position: relative;
    width: 100%;
    cursor: pointer;
  }

  .ui-wallet-select .value {
    height: 50px;
    padding: 0 20px;
    border-radius: 8px;
    border: 1px solid #E7E7E7;
    display: flex;
    align-items: center;
    font-size: 14px;
    z-index: 1;
  }

  .ui-wallet-select .remove-border {
    border-radius: 8px 8px 0 0;
    border-bottom: 1px solid transparent;
  }

  .ui-wallet-select .currency {
    position: absolute;
    top: 15px;
    right: 45px;
    color: #006344;
    font-size: 14px;
    font-weight: 600;
  }

  .ui-wallet-select label {
    position: absolute;
    top: -10px;
    left: 14px;
    padding: 0 6px;
    color: #000;
    font-size: 12px;
    font-weight: 600;
    background: #fff;
    font-family: "Open Sans";
  }

  .ui-wallet-select .arrow {
    position: absolute;
    top: 20px;
    right: 15px;
    z-index: 1;
  }

  .ui-wallet-select .items-wrapper {
    position: absolute;
    top: 40px;
    width: 100%;
    padding-bottom: 5px;
    background: #fff;
    border-radius: 0 0 8px 8px;
    border: 1px solid #E8E8E8;
    border-top: 0;
    z-index: 1;
  }

  .ui-wallet-select .items-wrapper .item {
    position: relative;
    width: 100%;
    padding: 7px 20px;
    cursor: pointer;
    transition: .5s;
    font-size: 14px;
  }

  .ui-wallet-select .items-wrapper .item .currency {
    top: 5px;
    color: #000;
  }

  .ui-wallet-select .items-wrapper .item:hover {
    color: #006344;
    background: rgba(0, 0, 0, 0.03);
  }
</style>
