<template>
  <div class="PayResults">
    <div class="header">
      <div class="bg">
        <img src="../../assets/img/PayResults/invalid-name.svg" alt="">
      </div>
      <div class="text">
        <div class="icon"><i class="iconfont icon-wancheng"></i></div>
        <div class="title">恭喜您成功开通</div>
        <div class="doc">“点亮读书会”会员，即刻开启英文阅读之旅</div>
      </div>
    </div>
    <div class="bodyer">
      <img :src="$route.query.img" alt="">
      <div class="btns">
        <btn :obj='btnstyle' :text="textbtn" v-on:statr="post_order()"></btn>
      </div>
    </div>
  </div>
</template>

<script>
  import btn from '../../components/btn/index'

  export default {
    name: 'index',
    data: function () {
      return {
        btnstyle: {
          backgroundColor: '#ffd000',
          width: '90%',
          color: '#66440a',
          boxShadow: '0 10px 24px 0 rgba(255, 208, 0, 0.4)',
          opacity: 1
        },
        textbtn: '返回首页'
      }
    },
    mounted: function () {
      sessionStorage.removeItem('Details')
    },
    methods: {
      post_order: function () {
        sessionStorage.setItem('Home','Book')
        this.$router.push({
          name: 'Home',
        })
      }
    },
    components: {btn}
  }
</script>

<style scoped>
  @import "../../assets/css/views/PayResults/index.css";
</style>
