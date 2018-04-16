<template>
  <div class="VipCard">
    <div class="card" :style="not">
      <div class="img">
        <!--<img src="../../assets/img/PunchCard/invalid-name@2x.png" alt="">-->
        <img :src="img" alt="">
      </div>
      <div class="div"><p>长按图片保存发送给好友</p></div>
    </div>
    <canvas ref="canvas"></canvas>
    <SharePopup v-on:statr="carry" v-if="shrepopup" v-on:hide="hideSharePopup"></SharePopup>
    <Shares v-if="shares" :show="1" :ishide="shares" v-on:hide="hideshares"></Shares>
    <OutPopup v-if="outpopup" v-on:Continue="Continue" v-on:Punch="Punch" v-on:closed="closed"></OutPopup>
    <!--<img src="'data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg'>-->
    <!--<foreignObject width='590px' height='210px'>-->
    <!--<body xmlns='http://www.w3.org/1999/xhtml' style='margin:0;font-size:30px;color:#fff; text-align: justify;'></body>-->
    <!--</foreignObject></svg>'" alt="">-->
    <!--<svg xmlns="http://www.w3.org/2000/svg">-->
    <!--<foreignObject :width="590" height="210">-->
    <!--<body xmlns="http://www.w3.org/1999/xhtml" style="margin:0;font-size:30px;color:#000; text-align: justify;">-->
    <!--{{items.chapters.chapter_soundbite}}-->
    <!--</body>-->
    <!--</foreignObject>-->
    <!--</svg>-->
  </div>
</template>

<script>
  import MC from 'mcanvas'
  import SharePopup from '../../components/SharePopup/index'
  import Shares from '../../components/Share/index'
  import OutPopup from '../../components/outPopup/index'
  import {Toast} from 'mint-ui'

  export default {
    name: 'index',
    data: function () {
      return {
        not: {
          backgroundImage: 'url(' + require('../../assets/img/PunchCard/bgname@3x.png') + ')'
        },
        showPrompt: false,
        outPopup: false,
        sharePrompt: false,
        img: require('../../assets/img/PromCard/make.gif'),
        multiple: 1,
        items: {
          chapters: {}
        },
        shrepopup: false,
        shares: false,
        outpopup: false
      }
    },
    mounted: function () {
      if (this.$route.query.share_id) {
        this.ShareCard(this.$route.query)
      } else {
        this.updata(this.$route.query)
        // this.shrepopup = true
        var data = {
          post_id: this.$route.query.book_id,
          share_type: 24,
          share_page: 'BookCard'
        }
        this.share(data)
      }
    },
    methods: {
      canvasinit: function () {
        var _this = this
        let mc = new MC({
          width: 750,
          height: 1334,
          // backgroundColor: 'black',
        });
        mc.background(_this.items.chapters.achievement_card_url, {
// mc.background('http://mtapplet.meitudata.com/59e8765b6492c541.jpg',{
          type: 'origin',
          left: '0%',
          top: '0%',
        })
        // mc.add(_this.items.vip_info.avatar, {
        //   width: '100',
        //   pos: {
        //     x: 20,
        //     y: 20,
        //     scale: 1,
        //     rotate: 0,
        //   }
        // })
        var img = new Image()
        img.crossOrigin = '*'
        img.src = _this.items.vip_info.avatar
        img.onload = function () {
          alert('asdasd')
          // console.log(img)
          // mc.ctx.beginPath()
          // mc.ctx.save()
          // mc.ctx.createPattern(img, 'no-repeat')
          // mc.ctx.strokeStyle = '#fff'
          // mc.ctx.lineWidth = '7'
          // mc.ctx.arc(122 * _this.multiple, 135 * _this.multiple, 18 * _this.multiple, 0, 2 * Math.PI, false)
          // mc.ctx.stroke()
          // mc.ctx.arc(122 * _this.multiple, 135 * _this.multiple, 18 * _this.multiple, 0, 2 * Math.PI)
          // mc.ctx.shadowBlur = 40
          // mc.ctx.shadowColor = 'black'
          // mc.ctx.fillStyle = 'blue'
          // mc.ctx.clip()
          mc.ctx.drawImage(img, 100 * _this.multiple, 115 * _this.multiple, 37 * _this.multiple, 37 * _this.multiple)
          // mc.ctx.fillStyle = 'transparent'
          // mc.ctx.fill()
          // mc.ctx.restore()
          mc.text('<b>Stroke</b><br>Gradient<br><s>Shadow</s>',
            {
              width: '600',
              align: 'center',
              largeStyle: {
                color: 'red',
                font: '80px Microsoft YaHei,sans-serif',
                // type: 'stroke',
                lineWidth: 2,
                lineHeight: 100,
              },
              normalStyle: {
                color: 'blue',
                font: '70px Microsoft YaHei,sans-serif',
                // lineHeight: 100,
                // shadow: {
                //   color: 'red',
                //   blur: 4,
                //   offsetX: 2,
                //   offsetY: 2,
                // },
                gradient: {
                  type: 2,  // 1: 横向渐变； 2: 纵向渐变；
                  colorStop: ['red', 'blue'],
                },
              },
              smallStyle: {
                color: 'yellow',
                font: '60px Microsoft YaHei,sans-serif',
                // lineHeight : 100,
                shadow: {
                  color: 'red',
                  blur: 10,
                  offsetX: 5,
                  offsetY: 5,
                },
              },
              pos: {
                x: 'center',
                y: 'bottom:400',
              }
            })
          mc.draw(b64 => {
            _this.img = b64
          });
        }
      },
      updata: function (data) {
        this.$axios.chapter_books(data).then(res => {
          this.items = res.data.qing_data
          // console.log(this.items.chapters.chapter_soundbite)
          // console.log(this.getTrueLength(this.items.chapters.chapter_soundbite))
          // var str = this.items.books.achievementCard_url
          // var length = this.getTrueLength(this.items.chapters.chapter_soundbite)
          // console.log(this.cutString(str, length))
          this.init()
          // this.canvasinit()
        })
      },
      ShareCard: function (data) {
        this.$axios.achievement_book_card(data).then(res => {
          this.items = res.data.qing_data
          this.init()
          // this.canvasinit()
        })
      },
      share: function (data) {
        var obj = {}
        var _this = this
        this.$axios.share_link_info(data).then(res => {
          var data = {
            title: res.data.qing_data.title,
            desc: res.data.qing_data.desc,
            link: res.data.qing_data.link,
            imgUrl: res.data.qing_data.img
          }
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
          // window.localStorage.setItem('Punch_share_data', JSON.stringify(data))
          // wx.Author(data)
        })
      },
      share_done: function (obj) {
        this.$axios.share_done(obj).then(res => {
          if (res.data.qing_code !== 100 || obj.share_mode === 2) {
            Toast({
              message: '打卡失败',
              iconClass: 'iconfont icon-bangdingshibai',
              duration: 3000
            })
          } else {
            this.shares = false
            Toast({
              message: '分享成功',
              iconClass: 'iconfont icon-bangdingshibai',
              duration: 3000
            })
            // this.outpopup = true
          }
        })
      },
      init: function () {
        var canvas = this.$refs.canvas
        var ctx = canvas.getContext('2d')
        var width = 750 * this.multiple
        var heigth = 1334 * this.multiple
        this.$refs.canvas.width = width
        this.$refs.canvas.height = heigth
        var obj = {
          x: 0,
          y: 0,
          width: width,
          heigth: heigth
        }

        this.newimg(ctx, this.items.books.achievement_card_url, obj)
      },
      newimg: function (ctx, url, obj) {
        var textobj
        var _this = this
        var img = new Image()
        img.crossOrigin = '*'
        img.src = url
        img.onload = function () {
          ctx.drawImage(img, obj.x, obj.y, obj.width, obj.heigth)
          img = new Image()
          img.crossOrigin = '*'
          img.src = _this.items.vip_info.avatar
          img.onload = function () {
            ctx.beginPath()
            ctx.save()
            ctx.createPattern(img, 'no-repeat')
            ctx.strokeStyle = '#fff'
            ctx.lineWidth = '7'
            ctx.arc(122 * _this.multiple, 135 * _this.multiple, 18 * _this.multiple, 0, 2 * Math.PI, false)
            ctx.stroke()
            ctx.arc(122 * _this.multiple, 135 * _this.multiple, 18 * _this.multiple, 0, 2 * Math.PI)
            ctx.shadowBlur = 40
            ctx.shadowColor = 'black'
            ctx.fillStyle = 'blue'
            ctx.clip()
            ctx.drawImage(img, 100 * _this.multiple, 115 * _this.multiple, 37 * _this.multiple, 37 * _this.multiple)
            ctx.fillStyle = 'transparent'
            ctx.fill()
            ctx.restore()
            img = new Image()
            img.crossOrigin = '*'
            img.src = _this.items.qr_code
            img.onload = function () {
              ctx.drawImage(img, 139 * _this.multiple, 1052 * _this.multiple, 194 * _this.multiple, 198 * _this.multiple)
              // img = new Image()
              // img.src = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="590" height="210" viewBox="0 0 590 210"><foreignObject width = "' + 590 + 'px" height = "' + 210 + 'px" > ' +
              //   '<body xmlns="http://www.w3.org/1999/xhtml" style="margin:0;font-size:' + 30 + 'px;color:#fff; text-align: justify;">' + _this.items.chapters.chapter_soundbite + '</body>' +
              //   '</foreignObject></svg>';
              // img.onload = function () {
              //   ctx.drawImage(img, 80 * _this.multiple, 810 * _this.multiple)
              var str = _this.items.desc
              var stopnum = 0
              var engnum = 17
              var y = 810
              for (var i = 0; i < str.length / 17; i++) {
                textobj = {
                  x: 80 * _this.multiple,
                  y: y * _this.multiple,
                  color: '#fff',
                  content: str.substring(stopnum, engnum).replace(/^\s*/g, ""),
                  Baseline: 'top',
                  globala: 1,
                  font: '400 ' + 36 * _this.multiple + 'px Arial'
                }
                _this.newtext(ctx, textobj)
                stopnum = engnum
                engnum += 17
                y += 52
              }
              textobj = {
                x: 144 * _this.multiple,
                y: 120 * _this.multiple,
                color: '#fff',
                content: (_this.items.vip_info.nickname).substring(0, 5) + '...',
                Baseline: 'top',
                Align: 'left',
                globala: 1,
                font: '400 ' + 30 * _this.multiple + 'px Arial'
              }
              _this.newtext(ctx, textobj)
              var str = '已阅读' + _this.items.vip_info.read_days + '天 | 阅读'
              var stras = _this.items.vip_info.read_words >= 1000 ? (_this.items.vip_info.read_words / 1000).toFixed(1) + '万字' : _this.items.vip_info.read_words + '字'
              textobj = {
                x: 442 * _this.multiple,
                y: 120 * _this.multiple,
                color: '#fff',
                content: str + stras,
                Baseline: 'top',
                Align: 'center',
                globala: 1,
                font: '400 ' + 30 * _this.multiple + 'px Arial'
              }
              _this.newtext(ctx, textobj)
              _this.saveImageInfo()
              // }
            }
          }
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
        // Indicator.close()
      },
      hidePrompt: function (str) {
        if (str == 0) {
          this.showPrompt = false
        } else if (str == 1) {
          this.showPrompt = false
          this.sharePrompt = true
        } else if (str == 2) {
          this.sharePrompt = false
          this.showPrompt = false
        }

      },
      carry: function () {
        this.shrepopup = false
        this.shares = true
      },
      hideshares: function () {
        this.shares = false
      },
      hideSharePopup: function () {
        this.shrepopup = false
      },
      Continue: function () {
        this.outpopup = false
        this.goPlaying()
      },
      Punch: function () {
        this.outpopup = false
        this.goChapter()
      },
      goPlaying: function () {
        this.$router.push({
          name: 'Playing',
          query: {
            book_id: this.$route.query.book_id
          }
        })
      },
      goChapter: function () {
        this.$router.push({
          name: 'Chapter',
          query: {
            book_id: this.$route.query.book_id
          }
        })
      },
      closed: function () {
        this.outpopup = false
      },
    },
    components: {SharePopup, Shares, OutPopup}
  }
</script>

<style scoped>
  @import "../../assets/css/views/VipCard/index.css";
</style>
