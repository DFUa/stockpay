<template>
  <div>

    <ui-phone-input
      title="Phone"
      :lock="!!phone"
      v-model="currentPhone"
      :code="phoneCode ? phoneCode.code : '--'"
      :mask="phoneCode ? phoneCode.mask : ''">
      <ui-button accent
        @click="doSomeStaff"
        :title="phone ? 'Отвязать' : 'Привязать'"/>
    </ui-phone-input>

    <ui-modal
      v-model="showChangePhoneModal"
      title="Here you can unbind your phone"
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
import UiPhoneInput from '@/components/ui/ui-phone-input/UiPhoneInput.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'

export default {
  name: 'Phone',

  components: {
    UiModal,
    UiInput,
    UiButton,
    UiPhoneInput
  },

  props: {
    phone: String,
    phoneCode: Object
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
        this.$emit('on-update')
        this.$emit('on-remove')
        this.showMessage(res, 'Телефон был изменен')
      } else {
        let res = await api.confirmPhone(data)
        this.$emit('on-update')
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

    doSomeStaff () {
      if (this.phone) {
        this.openChangePhoneModal()
      } else {
        this.setPhone()
      }
    },

    async setPhone () {
      if (this.currentPhone) {
        let phonePrefix = this.phoneCode.code.replace('+', '')
        let data = {
          number: phonePrefix + this.currentPhone
        }
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
      } else {
        this.$toasted.show('Необходимо ввести номер телефона', {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 5000
        })
      }
    },

    async openChangePhoneModal () {
      await api.resetPhone()
      this.showChangePhoneModal = true
    },

    closeChangePhoneModal () {
      this.showChangePhoneModal = false
    }
  }
}
</script>
