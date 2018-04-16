<template>
  <div class="wallet">
    <div class="head">
      <div class="bg">
        <div @click="golink(items.wallet_qa_link)"><i class="iconfont icon-wenti"></i>提现说明</div>
        <div>
          <p>钱包余额</p>
          <p><i>￥</i>{{items.balance.toFixed(2).split('.')[0]}}<span>.{{items.balance.toFixed(2).split('.')[1]}}</span>
          </p>
          <p>含待结算¥{{items.wait_balance|double}}</p>
        </div>
      </div>
    </div>
    <ul class="Wallet-content">
      <li @click="go('Reflect')">
        <div>
          <img src="../../assets/img/wallet/reflect.svg" class="img1" alt="">
          <span>提现到微信</span>
        </div>
        <div>
          <span class="fonsie">可提现¥{{items.withdraw_balance|double}}</span>
          <i class="iconfont icon-jinru"></i>
        </div>
      </li>
      <li @click="go('Detailed')">
        <div>
          <img src="../../assets/img/wallet/Details.svg" class="img2" alt="">
          <span>收支明细</span>
        </div>
        <div>
          <span class="fonsie" v-if="false">可提现¥367.00</span>
          <i class="iconfont icon-jinru"></i>
        </div>
      </li>
      <li @click="go('CashDetailed')">
        <div>
          <i class="iconfont icon-fanxianjilu"></i>
          <span>返现记录</span>
        </div>
        <div>
          <span class="fonsie" v-if="false">可提现¥367.00</span>
          <i class="iconfont icon-jinru"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data: function () {
      return {
        items: {}
      }
    },
    mounted: function () {
      this.updata(this.$Login.oauth_token)
    },
    methods: {
      updata: function (data) {
        this.$axios.wallet_info(data).then(res => {
          console.log(res.data)
          this.items = res.data.qing_data
        })
      },
      golink: function (str) {
        window.location.href = str
      },
      go: function (str) {
        this.$router.push({
          name: str
        })
      }
    },
    components: {}
  }
</script>

<style scoped>
  @import "../../assets/css/views/wallet/index.css";
</style>
