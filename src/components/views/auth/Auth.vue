<template>
  <ui-view-preloader class="auth-preloader" :loaded="loaded">
    <div class="auth-wrapper" v-if="loaded">
      <div class="left-part"></div>
      <div class="right-part">
        <!-- <button class="back-to-top" @click="redirectToLanding">
          <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)">
              <path d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 7V8H9V7H7Z" fill="black"></path>
          </svg>
        </button> -->
        <transition name="slide-right" mode="out-in">
          <router-view/>
        </transition>
        
      </div>
    </div>
  </ui-view-preloader>
</template>

<script>
import UiViewPreloader from '@/components/ui/ui-view-preloader/UiViewPreloader.vue'

export default {
  name: 'Auth',
  components: {
    UiViewPreloader
  },

  data: () => ({
    loaded: false
  }),

  created() {
    this.loaded = true
  },

  methods: {
    // redirectToLanding () {
    //   window.location.href = 'http://stockspay.org'
    // }
  }
}
</script>

<style>
  .auth-wrapper {
    width: 100%;
    min-height: 100vh;
    display: flex;
  }

  .auth-wrapper > div {
    width: 50%;
  }

  .auth-wrapper .left-part {
    min-height: 100vh;
    background: url('../../../assets/imgs/bg2.png') no-repeat center center;
    background-size: cover;
  }

  .auth-wrapper .right-part {
    min-width: 675px;
    min-height: 100vh;
    display: flex;
    padding: 30px 90px;
  }

  .auth-wrapper .right-part > div {
    align-self: center;
    width: 100%;
  }

  .auth-wrapper .fields {
    width: 340px;
  }

  .auth-wrapper .fields-col-2 {
    width: 520px;
    display: flex;
    flex-wrap: wrap;
  }

  .auth-wrapper .fields-col-2 .col {
    width: 50%;
    padding-right: 10px;
  }

  .auth-wrapper h1 {
    color: #333;
    font-size: 36px;
    margin-bottom: 70px;
    font-family: "Open Sans";
  }

  .auth-wrapper .tips {
    display: flex;
    justify-content: space-between;
  }

  .auth-wrapper .tips .item {
    cursor: pointer;
    color: #333;
    font-size: 12px;
    font-weight: 500;
    text-decoration: underline;
  }

  .auth-wrapper .tips .item:hover {
    text-decoration: none;
  }

  .auth-wrapper .btns {
    display: flex;
    align-items: center;
    margin-top: 50px;
  }

  .auth-wrapper .btns > div {
    margin-right: 20px;
  }

  .auth-wrapper .btns > div:last-child {
    margin-right: 0;
  }

  .auth-wrapper .spinner-wrapper {
    min-height: auto;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  /* .back-to-top {
    padding: 7px 10px 8px;
    background-color: rgba(0, 0, 0, .1);
    cursor: pointer;
    border: none;
    border-radius: 50%;
    outline: none;
    -webkit-transition: all .5s;
    -o-transition: all .5s;
    transition: all .5s;
    width: 64px;
    height: 64px;
    opacity: .75;
    z-index: 99999;
  }

  .back-to-top:hover {
    opacity: 1;
  } */

  .auth-preloader .preloader-wrapper {
    min-height: 100vh;
    display: flex;
    justify-content: center;
  }

  .preloader > div {
    margin: auto 0;
  }

</style>
