<template>
  <div>
    <ui-input
      type="phone"
      title="Phone"
      v-model="currentPhone"
      :rules="[{ name: 'required' }]" ref="phone">

      <ui-button v-if="!phone" @click="setPhone" :accent="true" title="Привязать"/>
      <ui-button v-if="phone" @click="openChangePhoneModal" :accent="true" title="Отвязать"/>

    </ui-input>

    <ui-modal v-model="showChangePhoneModal"
      title="Here you can tie your phone"
      button-title="Apply"
      form="change-phone"
      @on-apply="updateChanges"
      @on-close="closeChangePhoneModal">

      <template slot="form">
        <ui-input
          type="password"
          title="Enter current password"
          v-model="password"
          :rules="[{ name: 'min', value: 8 }, { name: 'required' }]"/>
        <ui-input
          :title="accessCodeTitle"
          v-model="code"
          :rules="[{ name: 'required' }]"/>
        <div v-if="phone" class="phone-spinner-wrapper">
          <a href="#" @click="noAccess" class="no-access">No access to phone?</a>
          <ui-spinner v-if="loading" style="float:right" />
        </div>
      </template>

    </ui-modal>
  </div>
</template>

<script>
import api from '@/api'

import UiModal from '@/components/ui/ui-modal/UiModal.vue'
import UiInput from '@/components/ui/ui-input/UiInput.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'
import UiSpinner from '@/components/ui/ui-spinner/UiSpinner.vue'

export default {
  name: 'Phone',

  components: {
    UiModal,
    UiInput,
    UiSpinner,
    UiButton
  },

  props: {
    phone: String
  },

  created () {
    this.currentPhone = this.phone
  },

  data: () => ({
    loading: false,
    password: '',
    currentPhone: '',
    code: '',
    accessCodeTitle: 'Enter the code from the phone',
    showChangePhoneModal: false
  }),

  methods: {

    async updateChanges () {
      let data = {
        password: this.password,
        code: this.code
      }
      if (this.phone) {
        let res = await api.resetPhoneByCode(data)
        this.showMessage(res, 'Телефон был изменен')
      } else {
        let res = await api.confirmPhone(data)
        this.showMessage(res, 'Телефон был привязан')
      }
      this.$emit('updates')
    },

    showMessage (res, errorText) {
      if (!res.error) {
        this.$toasted.show(errorText, {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 5000
        })
        this.closeChangePhoneModal()
      } else {
        this.$toasted.show(`${this.$store.getters.errorsList[res.message]}`, {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 5000
        })
      }
    },

    async noAccess (event) {
      event.preventDefault()
      if (!this.loading) {
        this.loading = true
        let filters = {
          way: { value: '0' }
        }
        let res = await api.resetPhone(filters)
        if (!res.error) {
          this.accessCodeTitle = 'Enter the code from the email'
          this.$toasted.show('Check your email for code', {
            theme: 'toasted-primary',
            position: 'bottom-center',
            duration: 5000
          })
        } else {
          this.$toasted.show(`${this.$store.getters.errorsList[res.message]}`, {
            theme: 'toasted-primary',
            position: 'bottom-center',
            duration: 5000
          })
        }
        this.loading = false
      }
    },

    async setPhone () {
      this.accessCodeTitle = 'Enter the code from the phone'
      if (this.$refs.phone.validate()) {
        let data = { number: this.currentPhone }
        let res = await api.setPhone(data)
        if (!res.error) {
          this.showChangePhoneModal = true
        } else {
          this.$toasted.show(`${this.$store.getters.errorsList[res.message]}`, {
            theme: 'toasted-primary',
            position: 'bottom-center',
            duration: 5000
          })
        }
      }
    },

    async openChangePhoneModal () {
      this.accessCodeTitle = 'Enter the code from the phone'
      await api.resetPhone()
      this.showChangePhoneModal = true
    },

    closeChangePhoneModal () {
      this.showChangePhoneModal = false
    }
  }
}
</script>

<style scoped>
  .phone-spinner-wrapper {
    width: 100;
  }
</style>
