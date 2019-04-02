<template>
  <div>
    <ui-input
      type="phone"
      title="Phone"
      v-model="currentPhone">

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
          title="Enter the code from the phone"
          v-model="code"
          :rules="[{ name: 'required' }]"/>
          <a href="#" @click="noAccess" class="no-access">No access to phone?</a>
      </template>

    </ui-modal>
  </div>
</template>

<script>
import api from '@/api'

import UiModal from '@/components/ui/ui-modal/UiModal.vue'
import UiInput from '@/components/ui/ui-input/UiInput.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'

export default {
  name: 'Phone',

  components: {
    UiModal,
    UiInput,
    UiButton
  },

  props: {
    phone: String
  },

  created () {
    this.currentPhone = this.phone
  },

  data: () => ({
    password: '',
    currentPhone: '',
    code: '',
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
        console.log(res)
        this.showMessage(res, 'Телефон был изменен')
      } else {
        let res = await api.confirmPhone(data)
        console.log(res)
        this.showMessage(res, 'Телефон был привязан')
      }
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
      let filters = {
        way: { value: '0' }
      }
      let res = await api.resetPhone(filters)
      console.log(res)
      if (!res.error) {
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
    },

    async setPhone () {
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
    },

    async openChangePhoneModal () {
      let res = await api.resetPhone()
      console.log(res)
      this.showChangePhoneModal = true
    },

    closeChangePhoneModal () {
      this.showChangePhoneModal = false
    }
  }
}
</script>
