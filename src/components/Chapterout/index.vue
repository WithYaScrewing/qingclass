<template>
  <div class="OutPopup">
    <div class="popups" @click="hides">
      <div class="content" @click="stopPropagation">
        <div class="popup-content">
          <div class="head">
            <!--<img src="../../../assets/img/answer/img/invalid-name@3x.png" alt="">-->
            <div class="bgd">
            </div>
            <div class="Yellowbg">
              <span></span>
            </div>
          </div>
          <div class="body">
            <div class="closed" @click.stop="closed">
              <i class="iconfont icon-guanbi"></i>
            </div>
            <div class="title">
              完成书籍
            </div>
            <div class="content">
              恭喜您成功阅读完成本书，坚持英文阅读，点亮终身学习之旅！
            </div>
            <div class="btns">
              <btn :obj="btnstyle" :text="btntext" v-on:statr="carry('Punch')"></btn>
            </div>
          </div>
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
          height: '4rem',
          backgroundColor: '#ffd000',
          color: '#66440a',
          boxShadow: '0 10px 24px 0 rgba(255, 208, 0, 0.4)'
        },
        btntext: '分享成就卡',
      }
    },
    mounted: function () {
    },
    methods: {
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
      },
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
  @import "../../assets/css/components/Chapterout/index.css";
</style>
