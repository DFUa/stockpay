<template>
  <div>
    <div v-if="loaded">
      <h1>Введите код который пришел вам на почту</h1>

      <div class="fields">
        <ui-input title="Код" v-model="code"/>
      </div>

      <div class="btns">
        <ui-button accent title="Подтвердить" @click="confirmEmail"/>
      </div>
    </div>
    <div class="spinner-wrapper" v-else>
      <ui-spinner/>
    </div>
  </div>
</template>

<script>
import api from '@/api'

import UiInput from '@/components/ui/ui-input/UiInput.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'
import UiSpinner from '@/components/ui/ui-spinner/UiSpinner.vue'

export default {
  name: 'ActivationCode',

  components: {
    UiInput,
    UiButton,
    UiSpinner
  },

  data: () => ({
    code: '',
    loaded: true
  }),

  methods: {
    async confirmEmail () {
      this.loaded = false
      let data = {
        code: this.code
      }
      let res = await api.confirmEmail(data)
      if (!res.error) {
        this.openSignIn()
      } else {
        this.$toasted.show(`${this.$store.getters.errorsList[res.message]}`, {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 5000
        })
        this.code = ''
        this.loaded = true
      }
    },

    openSignIn () {
      this.$router.push('/auth/sign-in')
    }
  }
}
</script>
