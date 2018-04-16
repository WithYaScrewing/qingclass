<template>
  <div class="modify" :class="{'blacks':modecolor ===1,'Coffees':modecolor ===2}">
    <div class="modify-bg" @click="hideModify" v-show="isModify">
      <div class="modify-content" @click="stopPropagation">
        <div class="modify-body">
          <div class="first-div" v-if="isios">
            <div class="div">
              <i class="iconfont icon-houtaibofang"></i>后台播放
            </div>
            <div class="div">
              <span class="span">查看设置方法</span>
            </div>
          </div>
          <div class="first-div" ref="firstDiv">
            <div class="div"><i class="iconfont icon-zitidaxiao-icon"></i>字体大小</div>
            <div class="div Sizi">
              <div class="min" @click.stop="Siziclick(0)">A</div>
              <div class="Sizi-bg" ref="SiziBg" @touchstart="SiziStart" @touchmove="SiziMove">
                <div class="spans" :style="{ 'left': fontSizeval+'%'}"></div>
                <div class="ruler">
                </div>
                <div class="rulers">
                  <div class="cm"><i @click.stop="Siziclick(0)"></i></div>
                  <div class="cm"><i @click.stop="Siziclick(1)"></i></div>
                  <div class="cm"><i @click.stop="Siziclick(2)"></i></div>
                  <div class="cm"><i @click.stop="Siziclick(3)"></i></div>
                </div>
              </div>
              <div class="max" @click.stop="Siziclick(5)">A</div>
            </div>
          </div>
          <div class="first-div">
            <div class="div"><i class="iconfont icon-yuedubeijing-icon"></i>阅读背景</div>
            <div class="div colornth">
              <p class="icons iconscolor1 " @click.stop="modecolor=0"></p>
              <p class="icons iconscolor2 " @click.stop="modecolor=2"></p>
              <div class="icons iconscolor3" @click.stop="modecolor=1">
                <i class="iconfont icon-yejianmoshi"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data: function () {
      return {
        modecolor: 0,
        fontSizeval: 25,
        fontSize: 18,
        isios: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        Sizetouch: {
          x: 0,
          startProgress: 0
        }
      }
    },
    mounted: function () {
      var Playing = localStorage.getItem('PlayingStyle')
      if (Playing !== null && Playing !== '{}') {
        var parse = JSON.parse(Playing)
        this.fontSize = parse.fontSize
        this.fontSizeval = parse.fontSizeval
        this.modecolor = parse.modecolor
        // this.Btnsyte(parse.modecolor)
      }
      // this.fontSizeval = this.fontval
    },
    watch: {
      'modecolor': 'Switchingcolor',
      'fontSize': 'SwitchingfontSize',
      'isModify': function (val) {
      }
    },
    props: ['isModify', 'fontval'],
    methods: {
      Switchingcolor: function (num) {
        var obj = {
          fontSize: this.fontSize,
          fontSizeval: this.fontSizeval,
          modecolor: this.modecolor
        }
        this.PlayStyle(obj)
        this.$emit('color', num)
      },
      SwitchingfontSize: function (num) {
        this.$emit('size', num)
      },
      hideModify: function () {
        this.$emit('hide')
      },
      stopPropagation: function (e) {
        if (e && e.stopPropagation) {
          e.stopPropagation()
        } else {
          window.event.cancelBubble = true
        }
      },
      SiziStart: function (e) {
        this.Sizetouch.x = e.changedTouches[0].clientX
        this.Sizetouch.startProgress = this.fontSizeval
      },
      SiziMove: function (e) {
        e && e.preventDefault()
        let touch = e.changedTouches[0]
        let offsetX = touch.clientX - this.Sizetouch.x
        let targetWidth = this.$refs.SiziBg.offsetWidth
        var fontSize = (Number((offsetX / targetWidth * 100).toFixed(2))) + this.Sizetouch.startProgress
        if (fontSize >= 100 || fontSize >= 90 && fontSize <= 100) {
          this.fontSizeval = 100
          this.fontSize = 30
        } else if (fontSize >= 20 && fontSize < 40) {
          this.fontSizeval = 25
          this.fontSize = 18
        } else if (fontSize >= 40 && fontSize < 70) {
          this.fontSizeval = 50
          this.fontSize = 21
        } else if (fontSize >= 70 && fontSize < 90) {
          this.fontSizeval = 75
          this.fontSize = 24
        } else if (fontSize <= 0 || fontSize >= 0 && fontSize < 20) {
          this.fontSizeval = 0
          this.fontSize = 15
        }
        var obj = {
          fontSize: this.fontSize,
          fontSizeval: this.fontSizeval,
          modecolor: this.modecolor
        }
        this.PlayStyle(obj)
        // var bg = {
        //   mode: this.mode,
        //   Sizivalue: this.Sizivalue,
        //   Size: this.fontSizemax
        // }
        // localStorage.setItem('PlayStyle', JSON.stringify(bg))
      },
      Siziclick: function (num) {
        this.fontSizeval = num * 25 > 100 ? 100 : num * 25
        this.fontSize = (30 + (6 * num)) / 2
        var obj = {
          fontSize: this.fontSize,
          fontSizeval: this.fontSizeval,
          modecolor: this.modecolor
        }
        this.PlayStyle(obj)
      },
      PlayStyle: function (obj) {
        localStorage.setItem('PlayingStyle', JSON.stringify(obj))
      }
    },
    components: {}
  }
</script>

<style scoped>
  @import "../../assets/css/components/modify/index.css";
</style>
