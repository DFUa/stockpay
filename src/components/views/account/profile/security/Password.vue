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
      form="change-password"
      @on-apply="updateChanges"
      @on-close="closeChangePasswordModal">

      <template slot="form">
        <ui-input
          type="password"
          title="Введите текущий пароль"
          v-model="currpassword"
          :rules="[{ name: 'min', value: 8 }, { name: 'required' }]"/>
        <ui-input
          type="password"
          title="Введите новый пароль"
          v-model="newpassword_0"
          :rules="[{ name: 'min', value: 8 }, { name: 'required' }]"/>
        <ui-input
          type="password"
          title="Подтвердите новый пароль"
          v-model="newpassword_1"
          :rules="[{ name: 'compare', value: newpassword_0, text: 'Пароли не совпадают' }, { name: 'required' }]"/>
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

    async updateChanges () {
      let data = {
        new_password: this.newpassword_0,
        password: this.currpassword
      }
      let res = await api.changePassword(data)

      if (!res.error) {
        this.$toasted.show('Пароль был изменен', {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 5000
        })
        this.showChangePasswordModal = false
      } else {
        this.$toasted.show(`${this.$store.getters.errorsList[res.message]}`, {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 5000
        })
      }
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
