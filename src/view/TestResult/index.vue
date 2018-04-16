<template>
  <div class="TestResult">
    <div class="content">
      <div class="body">
        <div class="img">
          <img
            :src="items.userInfo.avatar"
            alt="">
        </div>
        <div class="name">
          {{items.userInfo.nickname}}
        </div>
        <div class="text">
          <div class="fasr-div">
            <p>阅读等级</p>
            <p>{{items.userInfo.read_level}}</p>
          </div>
          <div class="nth-div">
            <p>词汇量</p>
            <p>{{items.userInfo.vocabulary}}</p>
          </div>
          <div class="last-div">
            <p>超过人数</p>
            <p>{{parseFloat(items.userInfo.percentage_ranking)}}<span>%</span></p>
          </div>
        </div>
        <div class="btns" v-if="true">
          <btn :obj="btnstyles" :text="btntexts" v-on:statr="carry(1)"></btn>
          <btn :obj="btnstyle" :text="btntext" v-on:statr="carry(2)"></btn>
        </div>
        <div class="cten" v-if="false">
          <div class="title">【来和我PK一下】</div>
          <div class="texts">
            <div class="erwim">
              <img src="https://readingh5.qingclass.com/images/logo_min.jpg" alt="">
            </div>
            <div class="imgs">
              <img src="../../assets/img/TestResult/en.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <Shares v-if="shares" :show="1" :ishide="shares" v-on:hide="hideshares"></Shares>
  </div>
</template>

<script>
  import btn from '../../components/btn/index'
  import Shares from '../../components/Share/index'
  import {Toast} from 'mint-ui'

  export default {
    name: 'index',
    data: function () {
      return {
        btnstyle: {
          backgroundColor: '#ffd000',
          width: '60%',
          color: '#66440a',
          opacity: 1,
          boxShadow: '0 10px 24px 0 rgba(255, 208, 0, 0.4)'
        },
        testing: JSON.parse(sessionStorage.getItem('testing')),
        btntext: '分享炫耀一下 >',
        btnstyles: {
          opacity: 1,
          border: 'none',
          color: '#ff8800',
          width: '60%',
          height: '2rem',
          fontSize: '1.2rem',
          backgroundColor: '#fff',
        },
        btntexts: '返回首页 》',
        shares: false,
        items: {}
      }
    },
    mounted: function () {
      this.updata(this.testing)
      var date = {
        share_type: 1,
        user_token: this.testing.user_token,
        oauth_token: this.testing.oauth_token,
        post_id: this.testing.chapter_id,
        share_mode: -1
      }
      this.share(date)
    },
    methods: {
      carry: function (str) {
        if (str === 1) {
          return this.$router.push({
            name: 'Home'
          })
        }
        if (str === 2) {
          this.shares = true
        }
      },
      updata: function (data) {
        this.$axios.exam_result(data).then(res => {
          console.log(res)
          this.items = res.data.qing_data
        })
      },
      hideshares: function () {
        this.shares = false
      },
      share: function (data) {
        this.$axios.share(data).then(res => {
          var json = {
            share_id: data.we_share_parameter.share_id,
            share_token: data.we_share_parameter.share_token
          }
          var data = {
            title: res.data.qing_data.we_share_parameter.title,
            desc: res.data.qing_data.we_share_parameter.desc,
            link: res.data.qing_data.we_share_parameter.link,
            imgUrl: res.data.qing_data.we_share_parameter.imgUrl
          }
          this.$wx.ShareTimeline(data, res => {
            if (res.share_mode === 3) {
              json.share_mode = 1
              json.share_state = 1
            } else {
              json.share_mode = 1
              json.share_state = 0
            }
            this.share_done(json)
          })
          this.$wx.ShareAppMessage(data, res => {
            if (res.share_mode === 3) {
              json.share_mode = 2
              json.share_state = 1
            } else {
              json.share_mode = 2
              json.share_state = 0
            }
            this.share_done(json)
          })
        })
      },
      share_done: function (data) {
        this.$axios.share_dones(data).then(res => {
          this.shares = false
          Toast({
            message: res.data.qing_text,
            iconClass: 'iconfont icon-tianjiachenggong',
            duration: 3000
          })
        })
      }
    },
    components: {btn, Shares}
  }
</script>

<style scoped>
  @import "../../assets/css/views/TestResult/index.css";
</style>
