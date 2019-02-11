<template>
  <div>
    <ui-input title="Пароль"
      :disabled="true" v-model="password">

      <ui-button @click="openChangePasswordModal"
        class="ui-input-btn" :accent="true" title="Изменить"/>

    </ui-input>

    <ui-modal v-model="showChangePasswordModal"
      title="Здесь вы можете изменить свой пароль"
      button-title="Изменить"
      @on-apply="updateChanges"
      @on-close="closeChangePasswordModal">

      <ui-input type="password" title="Введите текущий пароль" v-model="currpassword"/>
      <ui-input type="password" title="Введите новый пароль" v-model="newpassword_0"/>
      <ui-input type="password" title="Подтвердите новый пароль" v-model="newpassword_1"/>

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
