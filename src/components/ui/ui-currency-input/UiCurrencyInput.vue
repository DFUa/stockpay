<template>
  <div class="ui-currency-input group" v-click-outside="closeDropDown"
    :style="{ borderColor: borderColor ? borderColor : '#E7E7E7',
    background: backgroundColor ? backgroundColor : '#fff' }">

    <the-mask v-if="!disabled" :mask="mask" :tokens="tokens" v-model="currentValue"/>
    <div v-else class="input-value">{{ currentValue }}</div>

    <label v-if="!disabled" :style="{ background: backgroundColor ? backgroundColor : '#fff' }">
      {{ title }}</label>

    <ui-toggle-arrow class="arrow" v-model="showDropDown" v-if="currItems.length > 1" />

    <transition name="fade" mode="out-in">
      <div v-if="showDropDown" class="items-wrapper" key="items">
        <div v-for="item in currItems" @click="selectItem(item)"
          :key="item.id" class="item">{{ item.title }}</div>
      </div>
      <div v-else @click="openDropDown"
        key="item" class="selected-wrapper">
        {{ selectedItem ? selectedItem.title : '' }}
      </div>
    </transition>

  </div>
</template>

<script>
import { TheMask } from 'vue-the-mask'

import UiToggleArrow from '@/components/ui/ui-toggle-arrow/UiToggleArrow.vue'

export default {
  name: 'UiCurrencyInput',

  components: {
    TheMask,
    UiToggleArrow
  },

  props: {
    title: String,
    value: [Object, Number],
    mask: String,
    backgroundColor: String,
    borderColor: String,
    disabled: Boolean,
    tokens: Object
  },

  mounted () {
    this.init()
  },

  data: () => ({
    currentValue: '',
    showDropDown: false,
    selectedItem: null
  }),

  methods: {
    init () {
      this.currentValue = this.value.value
      this.selectByKey(this.value.key)
    },

    openDropDown () {
      this.showDropDown = this.currItems.length > 1
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

    selectByKey (key) {
      for (let i = 0; i < this.currItems.length; i++) {
        if (this.currItems[i].key === key) {
          this.selectedItem = this.currItems[i]
          break
        }
      }
    },

    closeDropDown () {
      if (this.showDropDown) {
        this.showDropDown = false
      }
    }
  },

  watch: {
    value: {
      handler () {
        this.init()
      },
      deep: true
    },

    currentValue () {
      this.onChange()
    },

    selectedItem () {
      this.onChange()
    }
  },

  computed: {
    currItems: function () {
      return this.$store.getters.currencies
    }
  }
}
</script>

<style scoped>
  .ui-currency-input.group {
    position: relative;
    width: 100%;
    height: 50px;
    padding: 0 22px;
    border-radius: 8px;
    border: 1px solid #E7E7E7;
    display: flex;
    align-items: center;
  }

  label {
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

  input,
  .input-value {
    width: 100%;
    font-size: 14px;
    font-family: "Open Sans";
    background: transparent;
  }

  .input-value {
    opacity: .5;
  }

  input:focus {
    outline: none;
  }

  .ui-currency-input .arrow {
    position: absolute;
    top: 20px;
    right: 15px;
    z-index: 100;
  }

  .items-wrapper {
    position: absolute;
    top: 5px;
    right: 3px;
    padding: 5px 0;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    z-index: 2;
  }

  .selected-wrapper {
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 45px;
    color: #006344;
    font-size: 14px;
    font-weight: 600;
  }

  .items-wrapper .item {
    width: 85.5px;
    padding: 5px 15px;
    cursor: pointer;
    transition: .5s;
    font-size: 14px;
    font-weight: 600;
  }

  .items-wrapper .item:hover {
    color: #006344;
    background: rgba(0, 0, 0, 0.02);
  }
</style>
