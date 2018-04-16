<template>
  <div v-title data-title="点亮读书会" class="BuyVip">
    <div class="content" v-html="Buys" :style="{'padding-bottom':bottom+'px'}">
    </div>
    <div class="BuyFooter" ref="foot">
      <ul>
        <li v-for="a in paylist">
          <div class="">
            <span>{{a.goods_unit_name}} ¥{{a.actual_price}}</span>
            <s>原价¥{{a.original_price}}</s>
          </div>
          <div class="btnx">
            <btn :obj="btnstyle" :text="btntext" v-on:statr="go(a)"></btn>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import btn from '../../components/btn/index'

  export default {
    name: 'index',
    data: function () {
      return {
        btnstyle: {
          backgroundColor: '#ffd000',
          width: '100%',
          height: '2.3rem',
          padding: '0 1rem',
          fontSize: '1.2rem',
          color: '#66440a',
          opacity: 1
        },
        btntext: this.$Login.Vip_token.reading_vip_state === 0 ? '立即购买' : '立即续费',
        Buys: '',
        paylist: [],
        data: {
          share_id: this.$route.query.share_id || -1,
          share_token: this.$route.query.share_token || -1,
        },
        bottom: 70,
      }
    },
    mounted: function () {
      this.update(this.data)
    },
    methods: {
      update: function (data) {
        this.$axios.goods_list(data).then(res => {
          this.Buys = this.$Mate.qingReads(res.data.qing_data.desc)
          this.paylist = res.data.qing_data.list
          setTimeout(() => {
            this.bottom = this.$refs.foot.offsetHeight + 20
          }, 500).bind(this)
        })
      },
      go: function (a) {
        this.data.goods_unit_id = a.goods_unit_id
        this.data.pay_mode_id = a.pay_mode_id || 1
        sessionStorage.setItem('Details', JSON.stringify(this.data))
        this.$router.push({
          name: 'Details'
        })
      }
    },
    components: {
      btn
    }
  }
</script>

<style scoped>
  @import '../../assets/css/views/BuyVip/index.css';
</style>
