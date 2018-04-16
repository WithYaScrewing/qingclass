<template>
  <div class="Playing" id="play" :class="{'black':modecolor===1,'Coffee':modecolor===2}">
    <transition
      name="fade"
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutRight">
      <div class="head" v-show="isfooer" @click="go('/Handouts')">本章讲义</div>
    </transition>
    <div class="content" @touchstart="PageStart" @touchmove="PageMove" @touchend="PageEnd">
      <div class="title" @click="isfooer=!isfooer">{{chapter.chapter_name}}</div>
      <div class="body" ref="lrcBox">
        <p v-for=" (a,i) in Chapter" v-html="a.text"
           :class="{'active': i === curLrcIndex,'font':a.time!=='','col':a.time===''}"
           :style="{ 'font-size': fontSize+'px'}"
           @click="_lrcbtn(a.time,i)"
        ></p>
      </div>
      <div class="btn">
        <Btn :obj='btnstyle' :text="textbtn" v-on:statr="goAnswer()"></Btn>
      </div>
    </div>
    <Modify v-show="isModify" :isModify="isModify" :fontval="fontSizeval" v-on:color="Switchingcolor"
            v-on:size="SwitchingfontSize"
            v-on:hide="hideModify"></Modify>
    <audio ref="audio" id="audio" :src="chapter.chapter_voice_url" preload="auto" @timeupdate="state"></audio>
    <transition
      name="fade"
      enter-active-class="animated slideInUp"
      leave-active-class="animated fadeOutDownBig">
      <div class="PlayFoot" v-show="isfooer">
        <div class="schedule">
          <div class="fasr-div">{{startTime|Playtime}}</div>
          <div class="nth-div" ref="progressBar" @touchstart="scheduleStart" @touchmove="scheduleMove"
               @touchend="scheduleEnd">
            <p class="fasr-p"></p>
            <p class="last-p" :style="{ width: Progress + '%'}"></p>
            <span class="schedule-span" :style="{ left: Progress + '%',transform:'scale('+scale+')'}"><i></i></span>
          </div>
          <div class="last-div">{{endTime|Playtime}}</div>
        </div>
        <div class="Features">
          <div class="fasr-div">
            <div @click="slow">{{Slow}}</div>
            <div class="nth-div" @click="isPlay">
              <i class="iconfont icon-zanting" v-if="ispay"></i>
              <i class="iconfont icon-bofang" v-else></i>
            </div>
            <div @click="fast">{{FastRelease}}</div>
          </div>
          <div class="last-div">
            <i class="iconfont icon-gengduo-icon" @click="isModify=!isModify"></i>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import $ from 'jquery'
  import Modify from '../../components/modify/index'
  import Btn from '../../components/btn/index'

  export default {
    name: 'index',
    data: function () {
      return {
        ispay: false,
        isfooer: true,
        startTime: 0,
        endTime: 0,
        Progress: 0,
        fontSize: 18,
        fontSizeval: 25,
        curLrcIndex: 0,
        translateY: 0,
        isTouch: true,
        FastRelease: '快放',
        Slow: '慢放',
        Timeout: null,
        scale: 1,
        isModify: false,
        modecolor: 0,
        btnstyle: {
          backgroundColor: '#2eb9ff',
          width: '85%',
          color: '#fff',
          opacity: 1,
          boxShadow: '0 10px 24px 0 rgba(46, 185, 255, 0.4)'
        },
        textbtn: '读完去做题'
      }
    },
    props: ['chapter','items'],
    computed: {
      Chapter: {
        get: function () {
          this.chapter.chapter_text = this.$Mate.qingReadTextRetuen(this.chapter.chapter_text)
          this.chapter.chapter_text = this.$Mate.fetch(this.chapter.chapter_text)
          return this.chapter.chapter_text
        },
        set: function (v) {
          this.obj.opacity = v
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
        this.Btnsyte(parse.modecolor)
      } else {
        var obj = {
          fontSize: this.fontSize,
          fontSizeval: this.fontSizeval,
          modecolor: this.modecolor
        }
        this.PlayStyle(obj)
      }
    },
    methods: {
      state: function (e) {
        let audio = e.target
        this.startTime = audio.currentTime
        this.endTime = audio.duration
        this.Progress = ((audio.currentTime / audio.duration) * 100)
        this.position()
      },
      isPlay: function () {
        let audio = this.$refs.audio
        if (!audio.paused) {
          audio.pause()
          this.ispay = false
        } else {
          audio.play()
          this.ispay = true
        }
      },
      position: function () {
        var Time = this.$Mate.Playtime(this.startTime)
        this.Chapter.forEach(function (item, index) {
          if (item.time.indexOf(Time.substr(0, 6)) === 0) {
            this.curLrcIndex = index
            var lrBox = this.$refs.lrcBox.childNodes
            var offsetHeight = lrBox[index].offsetHeight
            var body = document.body.clientHeight
            if (offsetHeight >= (body / 1.5)) {
              this.translateY = lrBox[index].offsetTop - 90
            } else {
              this.translateY = lrBox[index].offsetTop - (document.body.clientHeight / 3)
            }
            if (this.isTouch) {
              $('#play').animate({
                scrollTop: this.translateY
              }, 1000)
              // document.getElementById('play').scrollTop = this.translateY
            }
          }
        }.bind(this))
      },
      fast: function () {
        let audio = this.$refs.audio
        if (parseFloat(audio.playbackRate) >= 2) {
          return false
        }
        audio.playbackRate = audio.playbackRate + 0.2
        this.FastRelease = audio.playbackRate.toFixed(1) + 'x'
        this.Slow = '慢放'
        if (parseFloat(audio.playbackRate.toFixed(1)) === 1) {
          this.FastRelease = '快放'
        }
        this.msg = true
      },
      slow: function () {
        let audio = this.$refs.audio
        if (parseFloat(audio.playbackRate.toFixed(1)) <= 0.6) {
          return false
        }
        audio.playbackRate = audio.playbackRate - 0.2
        this.Slow = audio.playbackRate.toFixed(1) + 'x'
        this.FastRelease = '快放'
        if (parseFloat(audio.playbackRate.toFixed(1)) === 1) {
          this.Slow = '慢放'
        }
        this.msg = true
      },
      PageStart: function (e) {
        clearTimeout(this.Timeout)
        this.$Mate.PageStart(e)
        this.isTouch = false
      },
      PageMove: function (e) {
        clearTimeout(this.Timeout)
        this.isTouch = false
        this.$Mate.PageMove(e, res => {
          if (res.direction === 'y') {
            this.isfooer = res.is
          }
          if (res.direction === 'x' && res.is) {
            this.go('/Handouts')
          }
        })
      },
      PageEnd: function (e) {
        var _this = this
        this.Timeout = setTimeout(() => {
          _this.isTouch = true
        }, 3000)
      },
      _lrcbtn: function (tims, i) {
        let audio = this.$refs.audio
        var Time = tims.split(':')
        if (tims === '') {
          return
        }
        if (parseInt(Time[0]) === 0) {
          audio.currentTime = parseInt(Time[1])
        } else {
          audio.currentTime = (parseInt(Time[0]) * 60) + parseInt(Time[1])
        }
        this.Plays(i)
      },
      Plays: function (i) {
        let audio = this.$refs.audio
        audio.play()
        if (this.FastRelease !== '快放') {
          audio.playbackRate = this.FastRelease.split('x')[0]
        }
        if (this.Slow !== '慢放') {
          audio.playbackRate = this.Slow.split('x')[0]
        }
        this.ispay = true
        var lrBox = this.$refs.lrcBox.childNodes
        var offsetHeight = lrBox[i].offsetHeight
        var body = document.body.clientHeight
        if (offsetHeight >= (body / 1.5)) {
          this.translateY = lrBox[i].offsetTop - 90
        } else {
          this.translateY = lrBox[i].offsetTop - (document.body.clientHeight / 3)
        }
        // document.getElementById('play').scrollTop = this.translateY
        $('#play').animate({
          scrollTop: this.translateY
        }, 500)
      },
      go: function (str) {
        this.$router.push({
          path: str
        })
      },
      goAnswer: function () {
        this.$router.push({
          name: 'Answer',
          query: {
            user_read_book_record_id: this.items.user_read_book_record_id,
            user_chapter_read_record_id: this.items.user_chapter_read_record_id,
            testpaper_id: this.chapter.testpaper_id
          }
        })
      },
      scheduleStart: function (e) {
        this.scale = 1.8
        this.$refs.audio.pause()
        let targetWidth = this.$refs.progressBar.offsetWidth
        this.$Mate.scheduleStart(e, this.Progress, targetWidth)
      },
      scheduleMove: function (e) {
        this.scale = 1.8
        this.Progress = this.$Mate.scheduleMove(e,)
      },
      scheduleEnd: function (e) {
        this.scale = 1
        let audio = this.$refs.audio
        audio.currentTime += this.$Mate.scheduleEnd(audio.duration)
        this.Plays()
      },
      Switchingcolor: function (num) {
        this.modecolor = num
      },
      SwitchingfontSize: function (num) {
        this.fontSize = num
      },
      hideModify: function () {
        this.isModify = false
      },
      PlayStyle: function (obj) {
        localStorage.setItem('PlayingStyle', JSON.stringify(obj))
      },
      Btnsyte: function (num) {
        var color
        if (num === 0) {
          color = {
            backgroundColor: '#2eb9ff',
            width: '85%',
            color: '#fff',
            opacity: 1,
            boxShadow: '0 10px 24px 0 rgba(46, 185, 255, 0.4)'
          }
          this.btnstyle = color
        } else if (num === 1) {
          color = {
            backgroundColor: 'rgba(255, 255, 255, .8)',
            width: '85%',
            color: '#25252b',
            opacity: 1,
            boxShadow: '0 10px 24px 0 #25252b'
          }
          this.btnstyle = color
        } else if (num === 2) {
          color = {
            backgroundColor: '#66440a',
            width: '85%',
            color: '#f7f1df',
            opacity: 1,
            boxShadow: '0 10px 24px 0 rgba(102, 68, 10, 0.4)'
          }
          this.btnstyle = color
        }
      }
    },
    components: {Modify, Btn}
  }
</script>

<style scoped>
  @import "../../assets/css/components/Playing/index.css";
</style>
