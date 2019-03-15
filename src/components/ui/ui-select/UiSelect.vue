<template>
  <div :class="{ 'ui-select': true, 'invalid': !isValid, 'selected': (showDropDown || selectedItem) }"
    v-click-outside="closeDropDown" @click="openDropDown">

    <input v-if="showDropDown" v-focus type="text" v-model="searchValue">
    <div v-else class="value">{{ selectedItem ? selectedItem[field] : '' }}</div>

    <span v-if="!isValid" class="error-text">{{errorText}}</span>
    <label :class="{ 'toggled': showDropDown }">{{ title }}</label>

    <ui-toggle-arrow class="arrow" :value="showDropDown"/>

    <transition name="fade">
      <div v-if="showDropDown" :class=" { 'drop-down': true, 'fix-height': filteredItems.length > 5 }">
        <vue-scroll :ops="ops">
          <div v-if="filteredItems.length">
            <div v-for="item in filteredItems" :key="item.id"
              @click="selectItem(item)" class="item">
                {{ item[field] }}</div>
          </div>
          <div v-else class="no-options">Нет подходящих элементов</div>
        </vue-scroll>
      </div>
    </transition>

  </div>
</template>

<script>
import UiToggleArrow from '@/components/ui/ui-toggle-arrow/UiToggleArrow.vue'

const focus = {
  inserted (el) {
    el.focus()
  }
}

export default {
  name: 'UiSelect',

  props: {
    field: String,
    title: String,
    options: Array,
    value: Object,
    rules: [Array, Object]
  },

  directives: { focus },

  components: {
    UiToggleArrow
  },

  mounted () {
    this.selectedItem = this.value
    this.filteredItems = this.options ? this.options : []
  },

  data: () => ({
    searchValue: '',
    selectedItem: null,
    showDropDown: false,
    filteredItems: [],
    isValid: true,
    errorText: '',
    ops: {
      bar: {
        size: '3px',
        background: '#006344',
        opacity: 0.8
      }
    }
  }),

  methods: {
    selectItem (item) {
      this.selectedItem = item
      this.$emit('input', this.selectedItem)
      this.searchValue = ''
    },

    // add required as rule (add error text to this rule)
    validate () {
      this.isValid = true
      const result = []
      if (this.rules) {
        this.rules.forEach(element => {
          switch (element.name) {
            case 'required':
              if (!this.value) {
                result.push({
                  result: false,
                  text: element.text
                    ? this.errorText = element.text
                    : this.errorText = 'Это поле не должно быть пустым'
                })
              } else {
                result.push({
                  result: true
                })
                this.isValid = true
              }
              break
            default:
              this.isValid = false
              this.errorText = 'чото пішло не так'
              break
          }
        })
      }
      for (let element of result) {
        if (!element.result) {
          this.isValid = false
          this.errorText = element.text
        }
      }
      return result.every(res => {
        return res.result
      })
    },

    openDropDown () {
      this.showDropDown = !this.showDropDown
    },

    closeDropDown () {
      if (this.showDropDown) {
        this.showDropDown = false
      }
    }
  },

  watch: {
    options (value) {
      this.filteredItems = value
    },

    value (value) {
      this.selectedItem = value
    },

    searchValue (value) {
      this.filteredItems = this.options.filter((item) => {
        return item[this.field].toLowerCase().includes(value.toLowerCase())
      })
    }
  }
}
</script>

<style scoped>
  .ui-select {
    position: relative;
    height: 50px;
    border-radius: 8px;
    border: 1px solid #DFDFDF;
    margin-bottom: 30px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: normal;
    font-family: 'Montserrat';
    cursor: pointer;
  }

  .ui-select .value {
    font-family: 'Montserrat';
  }

  .ui-select .drop-down {
    overflow: hidden;
    width: 100%;
    z-index: 100;
    top: 50px;
    left: 0;
    padding: 7px 0;
    position: absolute;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  }

  .ui-select .drop-down.fix-height {
    height: 175px;
  }

  .ui-select .drop-down .item {
    cursor: pointer;
    padding: 6px 20px;
    font-size: 14px;
    font-weight: 600;
  }

  .ui-select .drop-down .item:hover {
    color: #006344;
    background: rgba(0, 0, 0, 0.02);
  }

  .ui-select.selected {
    border: 1px solid #006344;
  }

  .ui-select .drop-down .no-options {
    padding: 6px 20px;
    font-size: 14px;
    font-weight: 600;
    opacity: 0.5;
  }

  .ui-select .arrow {
    position: absolute;
    right: 20px;
  }

  .ui-select.invalid {
    border-color: red;
  }

  .error-text{
    font-size: 11px;
    color: red;
    position: absolute;
    top: 50px;
    left: 0;
  }

  label {
    color: #000;
    font-size: 14px;
    background: #fff;
    font-family: 'Montserrat';
    position: absolute;
    pointer-events: none;
    left: 16px;
    padding: 0 6px;
    top: 15px;
    opacity: 0.5;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  .invalid label{
    color: red;
  }

  .ui-select.selected label,
  label.toggled {
    top: -10px;
    opacity: 1;
    color: #006344;
    font-weight: 600;
  }

  input {
    font-size: 14px;
  }
</style>
