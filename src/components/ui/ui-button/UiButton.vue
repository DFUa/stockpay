<template>
  <div class="button-wrapper">
    <button :class="{ 'ui-button': true, 'accent': accent, 'air': air, 'submit': submit }"
      @click="onClick"
      :type="submit ? 'submit': 'button'"
      :form="form ? form : ''">
      {{ title }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'UiButton',

  props: {
    title: String,
    accent: Boolean,
    air: Boolean,
    submit: Boolean,
    form: String
  },

  methods: {
    onClick (event) {
      event.preventDefault()
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
    padding: 0 10px;
    min-width: 140px;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: #006344;
    transition: .5s;
    font-size: 14px;
    font-weight: 600;
  }

  .ui-button:hover {
    background: #005138;
  }

  .ui-button.accent {
    color: #000;
    background: #FFDB00;
  }

  .ui-button.accent:hover {
    background: #EECD00;
  }

  .ui-button.air {
    color: #000;
    border: 1px solid #006344;
    background: transparent;
  }

  .ui-button.air:hover {
    border: none;
    background: #EECD00;
  }
</style>
