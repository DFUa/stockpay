<template>
  <div>
    <ui-input title="Никнейм"
      :disabled="true" :value="nickname">

      <ui-button @click="openChangeNicknameModal" :accent="true" title="Изменить"/>

    </ui-input>

    <ui-modal v-model="showChangeNicknameModal"
      title="Здесь вы можете изменить свой никнейм"
      button-title="Изменить"
      form="change-nickname"
      @on-apply="updateChanges"
      @on-close="closeChangeNicknameModal">

      <template slot="form">
        <ui-input type="password"
        title="Введите ваш текущий пароль"
        v-model="password"
        :rules="[{ name: 'min', value: 8 }, { name: 'required' }]"/>
        <ui-input
        title="Введите новый никнейм"
        v-model="newnickname"
        :rules="[{ name: 'min', value: 3 }, { name: 'required' }]"/>
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
  name: 'Nickname',

  props: {
    nickname: String
  },

  components: {
    UiModal,
    UiInput,
    UiButton
  },

  data: () => ({
    password: '',
    newnickname: '',
    showChangeNicknameModal: false
  }),

  methods: {
    async updateChanges () {
      let data = {
        nickname: this.newnickname,
        password: this.password
      }
      let res = await api.changeNickname(data)

      if (!res.error) {
        this.$toasted.show('Никнейм был изменен', {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 5000
        })
        this.showChangeNicknameModal = false
      } else {
        this.$toasted.show(`${this.$store.getters.errorsList[res.message]}`, {
          theme: 'toasted-primary',
          position: 'bottom-center',
          duration: 5000
        })
      }
    },

    openChangeNicknameModal () {
      this.showChangeNicknameModal = true
    },

    closeChangeNicknameModal () {
      this.showChangeNicknameModal = false
    }
  }
}
</script>
