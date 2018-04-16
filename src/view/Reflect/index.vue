<template>
  <div class="Reflect">
    <div class="content">
      <div class="title">
        输入提现金额
      </div>
      <div class="dosc">
        {{num.withdraw_desc}}
      </div>
      <div class="poput">{{text}}</div>
      <div class="input-tel">
        <input type="tel" class="VerificationCode-input-tel" placeholder="请输入金额" v-model="data.number" id="tel"
               @keyup="show($event)">
      </div>
      <div class="btns">
        <btn :obj="btnstyle" :text="btntext" v-on:statr="carry"></btn>
      </div>
    </div>
  </div>
</template>

<script>
  import btn from '../../components/btn/index'
  import {Toast} from 'mint-ui'

  export default {
    name: 'index',
    data: function () {
      return {
        btnstyle: {
          opacity: .5,
          width: '80%',
          boxShadow: '0 10px 24px 0 rgba(46, 185, 255, 0.4)'
        },
        btntext: '确认提现',
        num: {},
        text: '',
        isAbsolute: false,
        data: {},
        isbtn: false
      }
    },
    watch: {
      'data.number': 'newnumber'
    },
    mounted: function () {
      this.updata(this.$Login.oauth_token)
    },
    methods: {
      show: function (e) {

      },
      updata: function (data) {
        this.$axios.inspect_withdraw(data).then(res => {
          this.num = res.data.qing_data
        })
      },
      newnumber: function (val) {
        if (val.length === 1) {
          this.isAbsolute = false
          this.btnstyle.opacity = 1
          this.is = false
        } else if (val.length === 0) {
          this.btnstyle.opacity = 0.5
          this.is = true
        }
        if (parseFloat(this.num.withdraw_balance) < parseFloat(val)) {
          this.text = '您输入的金额超出提现金额'
          this.isAbsolute = true
          this.is = true
          this.btnstyle.opacity = 0.5
        } else {
          this.is = false
          this.isAbsolute = false
          this.btnstyle.opacity = 1
        }
      },
      carry: function () {
        if (this.btnstyle.opacity !== 1 && !this.isbtn) {
          return false
        }
        this.isbtn = true
        var data = {
          oauth_token: this.$Login.oauth_token.oauth_token,
          user_token: this.$Login.oauth_token.user_token,
          withdraw_money: this.data.number,
          withdraw_way: 1
        }
        this.$axios.confirm_withdraw(data).then(res => {
          this.isbtn = false
          if (res.data.qing_code === 100) {
            Toast({
              message: res.data.qing_text,
              iconClass: 'iconfont icon-tianjiachenggong',
              duration: 3000
            })
            this.$router.push({path: 'wallet'})
          }
        })
      }
    },
    components: {btn}
  }
</script>

<style scoped>
  @import "../../assets/css/views/Reflect/index.css";
</style>
