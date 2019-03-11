<template>
  <div class="auth-wrapper">
    <div class="left-part"></div>
    <div class="right-part">
      <transition name="slide-right" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Auth'
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
    background: url('../../../assets/imgs/bg.jpg') no-repeat center center;
  }

  .auth-wrapper .right-part {
    min-width: 675px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 30px 90px;
  }

  .auth-wrapper .right-part > div {
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
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
