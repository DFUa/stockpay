<template>
  <div>
    <h1>Введите код который пришел вам на почту</h1>

    <div class="fields">
      <ui-input title="Код" v-model="code"/>
    </div>

    <div class="btns">
      <ui-button accent title="Подтвердить" @click="confirmEmail"/>
    </div>
  </div>
</template>

<script>
import api from '@/api'

import UiInput from '@/components/ui/ui-input/UiInput.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'

export default {
  name: 'ActivationCode',

  components: {
    UiInput,
    UiButton
  },

  data: () => ({
    code: ''
  }),

  methods: {
    async confirmEmail () {
      let data = {
        code: this.code
      }
      let res = await api.confirmEmail(data)
      if (!res.error) {
        this.openSignIn()
      } else {
        this.code = ''
      }
    },

    openSignIn () {
      this.$router.push('/auth/sign-in')
    }
  }
}
</script>
