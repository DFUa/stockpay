<template>
  <div>
    <ui-input title="Password"
      :disabled="true" v-model="password">

      <ui-button @click="openChangePasswordModal"
        class="ui-input-btn" :accent="true" title="Изменить"/>

    </ui-input>

    <ui-modal v-model="showChangePasswordModal"
      title="Here you can change your password"
      button-title="Change"
      @on-apply="updateChanges"
      @on-close="closeChangePasswordModal">

      <ui-input type="password" title="Enter current password" v-model="currpassword"/>
      <ui-input type="password" title="Enter new password" v-model="newpassword_0"/>
      <ui-input type="password" title="Confirm new password" v-model="newpassword_1"/>

    </ui-modal>
  </div>
</template>

<script>
import UiModal from '@/components/ui/ui-modal/UiModal.vue'
import UiInput from '@/components/ui/ui-input/UiInput.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'

export default {
  name: 'password',

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
    currpassword: '',
    newpassword_0: '',
    newpassword_1: '',
    showChangePasswordModal: false
  }),

  methods: {
    loadData () {
      this.password = '*************'
    },

    updateChanges () {
      this.closeChangePasswordModal()
    },

    openChangePasswordModal () {
      this.showChangePasswordModal = true
    },

    closeChangePasswordModal () {
      this.showChangePasswordModal = false
    }
  }
}
</script>
