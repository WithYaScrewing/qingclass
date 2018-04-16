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
              打卡成功
            </div>
            <div class="content">
              恭喜你打卡成功！我们一起，做精神独立的终身学习者！
            </div>
            <div class="btns">
              <btn :obj="btnstyles" :text="btntexts" v-on:statr="carry('Continue')"></btn>
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
        btntext: '返回章节',
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
  @import "../../assets/css/components/outPopup/index.css";
</style>
