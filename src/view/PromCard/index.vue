<template>
  <div class="PromCard">
    <div class="card" :style="not" v-if="true">
      <div class="img">
        <!--<img src="../../assets/img/PunchCard/invalid-name@2x.png" alt="">-->
        <img :src="img" alt="">
      </div>
      <div class="div"><p>长按图片保存发送给好友</p></div>
      <div class="foot">
        <div @click="selected(1)">
          <img src="../../assets/img/PromCard/1@3x.png" alt="">
          <span v-if="sele===1"><i class="iconfont icon-xuanzhong"></i></span>
        </div>
        <div @click="selected(2)">
          <img src="../../assets/img/PromCard/2@3x.png" alt="">
          <span v-if="sele===2"><i class="iconfont icon-xuanzhong"></i></span>
        </div>
        <div @click="selected(3)">
          <img src="../../assets/img/PromCard/3@3x.png" alt="">
          <span v-if="sele===3"><i class="iconfont icon-xuanzhong"></i></span>
        </div>
        <div @click="selected(4)">
          <img src="../../assets/img/PromCard/4@3x.png" alt="">
          <span v-if="sele===4"><i class="iconfont icon-xuanzhong"></i></span>
        </div>
        <div @click="selected(5)">
          <img src="../../assets/img/PromCard/5@3x.png" alt="">
          <span v-if="sele===5"><i class="iconfont icon-xuanzhong"></i></span>
        </div>
      </div>
    </div>
    <!--<div class="popup" v-if="showPrompt" @click="hides($event,1)">-->
    <!--<div class="content" @click="stopPropagation">-->
    <!--<PromptPopup v-on:hide="hidePrompt" :num="themeSignDays"></PromptPopup>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="popups" v-if="outPopup" @click="hides($event,3)">-->
    <!--<div class="content" @click="stopPropagation">-->
    <!--<OutPopup v-on:hide="hideOut"></OutPopup>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="positive" v-if="sharePrompt" @click="hides($event,2)">-->
    <!--<div class="content" @click="stopPropagation">-->
    <!--<SharePopup></SharePopup>-->
    <!--</div>-->
    <!--</div>-->
    <canvas ref="canvas" v-show="false"></canvas>
    <canvas ref="QRCode" v-show="false"></canvas>
  </div>
</template>

<script>
  import QRCode from 'qrcode'
  import {Indicator, Toast} from 'mint-ui'

  export default {
    name: 'index',
    data: function () {
      return {
        not: {
          backgroundImage: 'url(' + require('../../assets/img/PunchCard/bgname@3x.png') + ')'
        },
        multiple: 1,
        items: {},
        Qr: '',
        sele: 1,
        img: require('../../assets/img/PromCard/make.gif'),
        bgimg: require('../../assets/img/PromCard/bg1.jpg')
      }
    },
    mounted: function () {
      var data = {
        post_id: -1,
        share_type: 22,
        share_page: 'BuyVip'
      }
      this.updata(data)
    },
    methods: {
      updata: function (data) {
        var _this = this
        this.$axios.share_link_info(data).then(res => {
          this.items = res.data.qing_data
          var data = {
            title: res.data.qing_data.title,
            desc: res.data.qing_data.desc,
            link: res.data.qing_data.link,
            imgUrl: res.data.qing_data.img
          }
          var obj= {}
          obj.share_id = res.data.qing_data.share_id
          obj.share_token = res.data.qing_data.share_token
          this.$wx.ShareTimeline(data, res => {
            obj.share_mode = res.share_mode
            _this.share_done(obj)
          })
          this.$wx.ShareAppMessage(data, res => {
            obj.share_mode = res.share_mode
            _this.share_done(obj)
          })
          this.init()
        })
      },
      share_done: function (obj) {
        this.$axios.share_done(obj).then(res => {
          Toast({
            message: res.data.qing_text,
            iconClass: 'iconfont icon-bangdingshibai',
            duration: 3000
          })
        })
      },
      init: function () {
        var canvas = this.$refs.canvas
        var ctx = canvas.getContext('2d')
        var width = 1080 * this.multiple
        var heigth = 1921 * this.multiple
        this.$refs.canvas.width = width
        this.$refs.canvas.height = heigth
        var obj = {
          x: 0,
          y: 0,
          width: width,
          heigth: heigth
        }
        this.newimg(ctx, this.bgimg, obj)
        this.Qr = this.$refs.QRCode
        QRCode.toCanvas(this.Qr, window.location.href, function (error) {
          if (error) return
        })
      },
      newimg: function (ctx, url, obj) {
        var textobj
        var _this = this
        var img = new Image()
        img.crossOrigin = '*'
        img.src = url
        img.onload = function () {
          ctx.drawImage(img, obj.x, obj.y, obj.width, obj.heigth)
          ctx.drawImage(_this.Qr, 115.2 * _this.multiple, 1533.6 * _this.multiple, 286.6 * _this.multiple, 286.6 * _this.multiple)
          img = new Image()
          img.crossOrigin = '*'
          img.src = _this.items.user_info.avatar
          img.onload = function () {
            //   // ctx.drawImage(img, obj.x, obj.y, obj.width, obj.heigth)
            ctx.beginPath()
            ctx.save()
            ctx.createPattern(img, 'no-repeat')
            ctx.strokeStyle = '#fff'
            ctx.lineWidth = '7'
            ctx.arc(552 * _this.multiple, 285 * _this.multiple, 135 * _this.multiple, 0, 2 * Math.PI, false)
            ctx.stroke()
            ctx.arc(552 * _this.multiple, 285 * _this.multiple, 135 * _this.multiple, 0, 2 * Math.PI)
            ctx.shadowBlur = 40
            ctx.shadowColor = 'black'
            ctx.fillStyle = 'blue'
            ctx.clip()
            ctx.drawImage(img, 413 * _this.multiple, 149 * _this.multiple, 270 * _this.multiple, 270 * _this.multiple)
            ctx.fillStyle = 'transparent'
            ctx.fill()
            ctx.restore()
            textobj = {
              x: 545,
              y: 520.4,
              color: '#fff',
              content: _this.items.user_info.nickname + '在"点亮读书会"',
              Baseline: 'top',
              Align: 'center',
              globala: 1,
              font: '400 54px Arial'
            }
            _this.newtext(ctx, textobj)
            textobj = {
              x: 545,
              y: 618.4,
              color: '#fff',
              content: '邀请您一起感受英文阅读之美～',
              Baseline: 'top',
              globala: .7,
              font: '400 54px Arial'
            }
            _this.newtext(ctx, textobj)
            textobj = {
              x: 548.5,
              y: 835.2,
              color: '#fff',
              content: '累积阅读',
              Baseline: 'top',
              globala: .7,
              font: '400 54px Arial'
            }
            _this.newtext(ctx, textobj)
            textobj = {
              x: 543.5,
              y: 948.6,
              color: '#fff',
              content: '第 ' + _this.items.user_info.read_days + ' 天',
              Baseline: 'top',
              globala: 1,
              font: '400 90px Arial'
            }
            _this.newtext(ctx, textobj)
            textobj = {
              x: 820,
              y: 1147.7,
              color: '#fff',
              content: '经典英文原著，地道外教领读',
              Baseline: 'top',
              globala: .7,
              Align: 'right',
              font: '400 43.2px Arial'
            }
            _this.newtext(ctx, textobj)
            textobj = {
              x: 820,
              y: 1207.7,
              color: '#fff',
              content: '坚持每天阅读，学费全部返还',
              Baseline: 'top',
              globala: .7,
              Align: 'right',
              font: '400 43.2px Arial'
            }
            _this.newtext(ctx, textobj)
            textobj = {
              x: 820,
              y: 1591.2,
              color: '#000',
              content: _this.items.discount.split('|')[0],
              Baseline: 'top',
              globala: .7,
              Align: 'right',
              font: '400 51.84px Arial'
            }
            _this.newtext(ctx, textobj)
            textobj = {
              x: 880,
              y: 1681.2,
              color: '#000',
              content: _this.items.discount.split('|')[1],
              Baseline: 'top',
              globala: .7,
              Align: 'right',
              font: '400 51.84px Arial'
            }
            _this.newtext(ctx, textobj)
            _this.saveImageInfo()
            //   }
            //   // }
            // }
            // var obj = {
            //   x: 0,
            //   y: 0
          }
          // _this.avatarimg(ctx, _this.Cardimg, obj)
        }
      },
      newtext: function (ctx, textobj) {
        var txet = textobj.content
        ctx.fillStyle = textobj.color
        ctx.textBaseline = textobj.Baseline
        ctx.font = textobj.font
        ctx.textAlign = textobj.Align || ''
        ctx.globalAlpha = textobj.globala
        ctx.fillText(txet, textobj.x, textobj.y)
      },
      saveImageInfo: function () {
        var mycanvas = this.$refs.canvas
        var context = mycanvas.getContext('2d')
        context.scale(2, 2)
        this.img = mycanvas.toDataURL('image/jpg')
        Indicator.close()
      },
      selected: function (num) {
        this.img = require('../../assets/img/PromCard/make.gif')
        this.sele = num
        switch (num) {
          case 1:
            this.bgimg = require('../../assets/img/PromCard/bg1.jpg')
            this.init()
            break;
          case 2:
            this.bgimg = require('../../assets/img/PromCard/bg-2.jpg')
            this.init()
            break;
          case 3:
            this.bgimg = require('../../assets/img/PromCard/bg-3.png')
            this.init()
            break;
          case 4:
            this.bgimg = require('../../assets/img/PromCard/bg-4@3x.jpg')
            this.init()
            break;
          case 5:
            this.bgimg = require('../../assets/img/PromCard/bg-5@2x.png')
            this.init()
            break;
        }
      }
    },
    components: {}
  }
</script>

<style scoped>
  @import "../../assets/css/views/PromCard/index.css";
</style>
