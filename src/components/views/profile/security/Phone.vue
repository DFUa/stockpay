<template>
  <div>
    <ui-input title="Phone"
      :disabled="true" v-model="phone">

      <ui-button @click="openChangePhoneModal" :accent="true" title="Изменить"/>

    </ui-input>

    <ui-modal v-model="showChangePhoneModal"
      title="Here you can tie your phone"
      button-title="Apply"
      @on-apply="updateChanges"
      @on-close="closeChangePhoneModal">

      <ui-input type="password" title="Enter current password" v-model="password"/>
      <ui-input title="Enter the code from the phone" v-model="code"/>

    </ui-modal>
  </div>
</template>

<script>
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

  mounted () {
    this.loadData()
  },

  data: () => ({
    password: '',
    phone: '',
    code: '',
    showChangePhoneModal: false
  }),

  methods: {
    loadData () {
      this.phone = '+79 000 000 7888'
    },

    updateChanges () {
      this.closeChangePhoneModal()
    },

    openChangePhoneModal () {
      this.showChangePhoneModal = true
    },

    closeChangePhoneModal () {
      this.showChangePhoneModal = false
    }
  }
}
</script>
