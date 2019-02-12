<template>
  <div @click="toggle" class="ui-toggle-arrow">
    <div :class="{ 'centered': true, 'toggled': toggled }">
      <span class="i-arrow"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiToggleArrow',

  props: {
    value: Boolean
  },

  mounted () {
    this.toggled = this.value
  },

  data: () => ({
    toggled: false
  }),

  methods: {
    toggle () {
      this.toggled = !this.toggled
      this.$emit('input', this.toggled)
    }
  },

  watch: {
    value (value) {
      this.toggled = value
    }
  }
}
</script>

<style scoped>
  .ui-toggle-arrow {
    cursor: pointer;
    position: relative;
    transform: rotate(180deg);
  }

  .ui-toggle-arrow .centered {
    display: flex;
    align-items: center;
  }

  .ui-toggle-arrow span {
    transition: .3s;
  }

  .ui-toggle-arrow .toggled span {
    transform: rotate(180deg);
  }
</style>
