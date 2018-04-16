<template>
  <div class="Promotion">
    <div class="content" :style="bg">
      <div class="header">
        <div class="text-head">
          <p>邀请好友得返现红包</p>
          <p>好友报名费还可减免{{items.discount}}</p>
        </div>
        <div class="RedEnvelope"
             :style="redbg"
        >
          <div class="img">
            <img
              :src="items.user_info.headimgurl"
              alt="">
          </div>
          <div class="text">
            <p>会员专属特权</p>
            <p>成功邀请好友可返现</p>
            <div class="red">{{items.discount}}</div>
          </div>
          <div class="btntest" @click="go('PromCard')">
            我的专属邀请卡 <i class="iconfont icon-jinruwodezhuanshu"></i>
          </div>
          <div class="btns">
            <btn :obj='btnstyle' :text="textbtn" v-on:statr="showshare()"></btn>
          </div>
        </div>
      </div>
      <div class="bodyer">
        <div class="head">
          <div class="img">
            <img
              :src="items.user_info.headimgurl"
              alt="">
            <span>{{items.user_info.nickname}}</span>
          </div>
          <div>邀请{{items.user_info.buy_num}}人</div>
          <div @click="go('wallet')">累积奖励{{items.user_info.cash_reward}}元 <i
            class="iconfont icon-jinruwodezhuanshu"></i></div>
        </div>
        <div class="body">
          <div class="title">
            邀请排行榜
          </div>
          <ul>
            <li>
              <div>排名</div>
              <div>昵称</div>
              <div>邀请人数</div>
              <div>现金奖励(￥)</div>
            </li>
            <li v-for="(a,i) in items.list">
              <div>
                <img src="../../assets/img/Promotion/gold.png" alt="" v-if="i===0">
                <img src="../../assets/img/Promotion/silver.png" alt="" v-if="i===1">
                <img src="../../assets/img/Promotion/copper.png" alt="" v-if="i===2">
                <div class="icon" v-if="i>=3">
                  {{i+1}}
                </div>
              </div>
              <div>{{a.nickname}}</div>
              <div>{{a.buy_num}}</div>
              <div>{{a.cash_reward}}</div>
            </li>
          </ul>
        </div>
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
        bg: {
          background: 'url(' + require('../../assets/img/Promotion/bg.png') + ') no-repeat',
          backgroundSize: '100%'
        },
        redbg: {
          background: 'url(' + require('../../assets/img/Promotion/RedEnvelope.png') + ') no-repeat',
          backgroundSize: '100%'
        },
        textbtn: '立即邀请',
        items: {
          user_info: {},
          list: []
        },
        btnstyle: {
          opacity: 1,
          width: '80%',
          backgroundColor: '#ffd000',
          color: '#66440a',
          boxShadow: '0 8px 24px 0 rgba(0, 0, 0, 0.18)',
        },
      }
    },
    mounted: function () {
      this.updata({vip_user_id: 1})
      var data = {
        post_id: -1,
        share_type: 22,
        share_page: 'BuyVip'
      }
      console.log(data)
      this.$Login.share(data)
    },
    methods: {
      updata: function (data) {
        this.$axios.rank(data).then(res => {
          this.items = res.data.qing_data
        })
      },
      showshare: function () {

      },
      go: function (str) {
        this.$router.push({
          name: str,
        })
      }
    },
    components: {btn}
  }
</script>

<style scoped>
  @import "../../assets/css/views/Promotion/index.css";
</style>
