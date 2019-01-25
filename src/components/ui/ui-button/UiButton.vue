<template>
  <div class="button-wrapper">
    <div :class="{ 'ui-button': true, 'accent': accent }"
      @click="onClick">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiButton',

  props: {
    title: String,
    accent: Boolean
  },

  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
  .button-wrapper {
    display: inline-block;
  }

  .ui-button {
    cursor: pointer;
    border-radius: 8px;
    padding: 10px 20px;
    min-width: 150px;
    height: 40px;
    display: flex;
    justify-content: center;
    color: #fff;
    background:  #006344;
    transition: .5s;
  }

  .ui-button:hover {
    opacity: 0.8;
  }

  .ui-button.accent {
    color: #333;
    background: #FFDB00;
  }
</style>
