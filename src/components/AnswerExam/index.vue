<template>
  <div class="AnswerExam">
    <div class="popup">
      <div class="content animated pulse">
        <div class="closed" @click.stop="closed">
          <i class="iconfont icon-guanbi"></i>
        </div>
        <div class="title">
          <img src="../../assets/img/AnswerExam/icon.svg" alt="">
        </div>
        <div class="text-title">
          本章阅读完成
        </div>
        <div class="doc">
          <p>本章得{{obj.total_fraction}}分</p>
          <p>今日已读{{obj.word_number}}字</p>
        </div>
        <div class="btn">
          <btn :obj="btnstyles" :text="btntexts" v-on:statr="carry('Continue')"></btn>
          <btn :obj="btnstyle" :text="btntext" v-on:statr="carry('Punch')"></btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // import PopupsBg from '../PopupsBg/index'
  import btn from '../btn/index'

  export default {
    name: 'index',
    data: function () {
      return {
        btnstyle: {
          opacity: 1,
          height: '4rem',
          boxShadow: '0 5px 20px 0 rgba(46, 185, 255, 0.4)'
        },
        btnstyles: {
          opacity: 1,
          height: '4rem',
          border: '1px solid rgb(46, 185, 255)',
          backgroundColor: '#fff',
          color: 'rgb(46, 185, 255)'
        },
        btntexts: '继续读',
        btntext: '成就卡',
      }
    },
    props: ['obj'],
    mounted: function () {
    },
    methods: {
      carry: function (str) {
        this.$emit(str)
      },
      closed: function () {
        this.$emit('closed')
      }
    },
    components: {btn}
  }
</script>

<style scoped>
  @import "../../assets/css/components/AnswerExam/index.css";
</style>
