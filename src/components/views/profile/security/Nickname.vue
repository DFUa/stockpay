<template>
  <div>
    <ui-input title="Nickname"
      :disabled="true" v-model="nickname">

      <ui-button @click="openChangeNicknameModal" :accent="true" title="Изменить"/>

    </ui-input>

    <ui-modal v-model="showChangeNicknameModal"
      title="Here you can change your nickname"
      button-title="Change"
      @on-apply="updateChanges"
      @on-close="closeChangeNicknameModal">

      <ui-input type="password" title="Enter current password" v-model="password"/>
      <ui-input title="Enter new nickname" v-model="newnickname"/>

    </ui-modal>
  </div>
</template>

<script>
import UiModal from '@/components/ui/ui-modal/UiModal.vue'
import UiInput from '@/components/ui/ui-input/UiInput.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'

export default {
  name: 'Nickname',

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
    nickname: '',
    newnickname: '',
    showChangeNicknameModal: false
  }),

  methods: {
    loadData () {
      this.nickname = 'justnick'
    },

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
