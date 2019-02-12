<template>
  <div>
    <ui-input title="Никнейм"
      :disabled="true" :value="nickname">

      <ui-button @click="openChangeNicknameModal" :accent="true" title="Изменить"/>

    </ui-input>

    <ui-modal v-model="showChangeNicknameModal"
      title="Здесь вы можете изменить свой никнейм"
      button-title="Изменить"
      @on-apply="updateChanges"
      @on-close="closeChangeNicknameModal">

      <ui-input type="password" title="Введите ваш текущий пароль" v-model="password"/>
      <ui-input title="Введите новый никнейм" v-model="newnickname"/>

    </ui-modal>
  </div>
</template>

<script>
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
    updateChanges () {
      this.closeChangeNicknameModal()
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
