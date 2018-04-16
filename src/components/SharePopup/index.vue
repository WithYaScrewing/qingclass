<template>
  <div class="SharePopup">
    <div class="popup" @click="hides($event,2)">
      <div class="content" @click="stopPropagation">
        <i class="iconfont icon-guanbi" @click="hides"></i>
        <div class="title">
          打卡提示
        </div>
        <div class="ctn">
          科学验证，有效的监督能够极大帮助我们坚持学习，快去把成就卡分享到朋友圈进行打卡吧～
        </div>
        <div class="btns">
          <btn :obj="btnstyle" :text="btntext" v-on:statr="carry"></btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import btn from '../btn/index'

  export default {
    name: 'index',
    data: function () {
      return {
        btnstyle: {
          opacity: 1,
          width: '80%',
          boxShadow: '0 10px 24px 0 rgba(46, 185, 255, 0.4)'
        },
        btntext: '立即打卡',
      }
    },
    mounted: function () {
    },
    methods: {
      carry: function () {
        this.$emit('statr')
      },
      hides: function (e) {
        if (e && e.stopPropagation) {
          e.stopPropagation();
        } else {
          window.event.cancelBubble = true
        }
        this.$emit('hide')
      },
      stopPropagation: function (e) {
        if (e && e.stopPropagation) {
          e.stopPropagation();
        } else {
          window.event.cancelBubble = true
        }
        return false
      }
    },
    components: {btn}
  }
</script>

<style scoped>
  @import "../../assets/css/components/SharePopup/index.css";
</style>
