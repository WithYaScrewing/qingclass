<template>
  <div class="OrderDetails" id="OrderDetails">
    <div class="bodys">
      <div class="head">
        <div class="budy">
          <div class="img">
            <img :src="items.order_img" alt="">
          </div>
          <div class="text">
            <p>{{items.order_title}}</p>
            <p>已选：<span>{{items.order_desc}}</span></p>
          </div>
        </div>
        <div class="Details">
          <div class="dos">
            <div>商品总价</div>
            <div>¥{{items.original_price|double}}</div>
          </div>
          <div class="dos">
            <div>优惠</div>
            <div>-¥{{items.discount_price|double}}</div>
          </div>
          <div class="dos">
            <div>总计支付</div>
            <div class="ostr">¥{{items.actual_price|double}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="Lower ">
      <div class="">
        <div class="title">支付方式</div>
        <div class="dess">
          <div>微信支付</div>
          <div><i class="iconfont icon-xuanzhong"></i></div>
        </div>
        <div class="title desqw">给卖家留言：</div>
        <div class="textarea">
          <textarea placeholder="在这里说明您的要求哦~" v-model="data.leave_msg" @click="top"></textarea>
        </div>
      </div>
    </div>
    <div class="Vipfooter">
      <div class="btn">
        <btn :obj='btnstyle' :text="textbtn" v-on:statr="post_order()"></btn>
      </div>
    </div>
  </div>
</template>

<script>
  import btn from '../../components/btn/index'
  import $ from 'jquery'
  import {Indicator, Toast} from 'mint-ui'

  export default {
    name: 'index',
    data: function () {
      return {
        items: {
          original_price: 0,
          discount_price: 0,
          actual_price: 0
        },
        data: JSON.parse(sessionStorage.getItem('Details')),
        btnstyle: {
          backgroundColor: '#ffd000',
          width: '80%',
          color: '#66440a',
          opacity: 1
        },
        textbtn: '立即付款'
      }
    },
    mounted: function () {
      if (!this.data) {
         return this.$router.push({
          name: 'BuyVip',
        })
      }
      this.updata(this.data)
    },
    methods: {
      updata: function (data) {
        this.$axios.order(data).then(res => {
          this.items = res.data.qing_data
          this.data.actual_price = res.data.qing_data.actual_price
        })
      },
      post_order: function () {
        if (!this.data.leave_msg) {
          this.data.leave_msg = ''
        }
        var _this = this
        this.$axios.post_order(this.data).then(res => {
          var str = {
            order_id: res.data.qing_data.wx_pay_info.order_id,
            order_type: res.data.qing_data.wx_pay_info.order_type,
            pay_mode_id: res.data.qing_data.wx_pay_info.pay_mode_id
          }
          var obj = {
            timeStamp: res.data.qing_data.wx_pay_info.pay_parameters.timeStamp,
            appId: res.data.qing_data.wx_pay_info.pay_parameters.appId,
            nonceStr: res.data.qing_data.wx_pay_info.pay_parameters.nonceStr,
            package: res.data.qing_data.wx_pay_info.pay_parameters.pkg,
            paySign: res.data.qing_data.wx_pay_info.pay_parameters.paySign,
            pkg: res.data.qing_data.wx_pay_info.pay_parameters.pkg,
            signType: res.data.qing_data.wx_pay_info.pay_parameters.signType,
          }
          this.$wx.chooseWXPay(obj, res => {
            if (res === 'chooseWXPay:ok') {
              Indicator.open({
                text: '正在查询支付结果',
                spinnerType: 'fading-circle'
              })
              setTimeout(() => {
                _this.payment_status(str)
              }, 500)
            } else if (res === 'chooseWXPay:cancel') {
              Toast({
                message: '支付失败',
                iconClass: 'iconfont icon-yichangqingkuang',
                duration: 3000
              })
            } else if (res === 'chooseWXPay:fail') {
              Toast({
                message: '支付失败',
                iconClass: 'iconfont icon-yichangqingkuang',
                duration: 3000
              })
            }
          })
        })
      },
      payment_status: function (data) {
        this.$axios.inspect(data).then(res => {
          Indicator.close()
          if (res.data.qing_code !== 100) {
            return Toast({
              message: res.data.qing_text,
              iconClass: 'iconfont icon-yichangqingkuang',
              duration: 3000
            })
          }
          this.$Login.Vip_token.vip_user_id = res.data.qing_data.vip_user_id
          this.$Login.Vip_token.reading_vip_state = res.data.qing_data.is_vip
          this.$Login.Vip_token.vip_token1 = res.data.qing_data.vip_token1
          this.$Login.Vip_token.vip_token2 = res.data.qing_data.vip_token2
          localStorage.setItem('Vip_token', JSON.stringify(this.$Login.Vip_token))
          this.$router.push({
            name: 'PayResults',
            query: {
              img: res.data.qing_data.pay_success_img || 'img'
            }
          })
        })
      },
      top: function (e) {
        $('#OrderDetails').animate({
          scrollTop: e.target.offsetTop
        }, 1000)
      }
    },
    components: {btn}
  }
</script>

<style scoped>
  @import "../../assets/css/views/OrderDetails/index.css";
</style>
