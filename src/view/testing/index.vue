<template>
  <div class="testing">
    <div class="content">
      <div class="img">
        <img src="../../assets/img/testing/1@3x.png" alt="">
      </div>
      <div class="text">
        <p>您的词汇量是多少？适合读什么英文书</p>
        <p>“轻课阅读”为您推荐最合适的英文原著书籍！</p>
      </div>
    </div>
    <div class="Vipfooter">
      <div class="btn">
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
          width: '80%',
          color: '#66440a',
          opacity: 1
        },
        textbtn: '立即测试'
      }
    },
    mounted: function () {
    },
    methods: {
      post_order: function () {
        this.$router.push({
          name: 'Questions'
        })
      }
    },
    components: {btn}
  }
</script>

<style scoped>
  @import "../../assets/css/views/testing/index.css";
</style>
