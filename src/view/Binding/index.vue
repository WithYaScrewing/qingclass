<template>
  <div class="Binding">
    <div class="header">
      <div>
        您还未绑定手机号，为了账户安全，以及我们提供更好的服务，请输入您的常用手机号。
      </div>
    </div>
    <div class="bodyer">
      <div class="content">
        <div class="area" @click="go()">
          <div>{{name}}</div>
          <div>+{{Area}}</div>
        </div>
        <div class="phone">
          <input type="tel" placeholder="请输入手机号码" @keyup="show($event)" v-model="data.tel">
        </div>
        <div class="Code">
          <input type="tel" placeholder="请输入验证码" v-model="data.code">
          <btn :obj="btnstyle" :text="btntext" v-on:statr="carrys"></btn>
        </div>
        <div class="btns">
          <btn :obj="btnstyles" :text="btntexts" v-on:statr="carry"></btn>
        </div>
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
          opacity: 1,
          borderRadius: '.3rem',
          width: '100%',
          fontSize: '1.5rem',
          height: '4rem',
          backgroundColor: '#f0f0f2',
          color: '#2a2a33'
        },
        btntext: '获取验证码',
        btnstyles: {
          backgroundColor: '#ffd000',
          width: '80%',
          color: '#66440a',
          opacity: 1,
          boxShadow: '0 10px 24px 0 rgba(255, 208, 0, 0.4)'
        },
        btntexts: '确定绑定',
        name: this.$route.query.name || '中国大陆',
        Area: this.$route.query.Area || '86',
        data: {}
      }
    },
    watch: {
      'data.tel': 'newtel'
    },
    mounted: function () {
    },
    methods: {
      newtel: function (val, oldval) {
        if (val.length === 3 && oldval.length !== 4 || val.length === 8 && oldval.length !== 9) {
          this.data.tel += '-'
        }
      },
      show: function (ev) {
        if (ev.keyCode === 8 && this.data.tel.length === 0) {
          // this.opacity = 0.5
          // this.isAbsolute = true
        }
        if (ev.keyCode === 8 && this.data.tel.length === 3 || ev.keyCode === 8 && this.data.tel.length === 8) {
          this.data.tel = this.data.tel.substring(0, this.data.tel.length - 1)
        }
      },
      carry: function () {
        var data = {
          phone: this.data.tel.split('-').join(''),
          country_code: this.Area,
          verify_code: this.data.code
        }
        this.binding(data)
      },
      carrys: function () {
        if (this.btntext !== '重新获取验证码' && this.btntext !== '获取验证码') {
          return
        }
        var tel = this.data.tel.split('-').join('')
        if (tel.length !== 11 && this.Area === '86') {
          return Toast({
            message: '手机号输入有误',
            iconClass: 'iconfont icon-bangdingshibai',
            duration: 3000
          })
        }
        var data = {
          phone: tel,
          verify_type: 1,
          country_code: this.Area
        }
        this.$axios.send_code(data).then(res => {
          if (res.data.qing_code !== 100) {
            return Toast({
              message: res.data.qing_text,
              iconClass: 'iconfont icon-bangdingshibai',
              duration: 3000
            })
          }
        })
        this.setTime()
      },
      binding: function (data) {
        this.$axios.bind_phone(data).then(res => {
          console.log(res.data)
          if (res.data.qing_code !== 100) {
            return Toast({
              message: res.data.qing_text + res.data.qing_code,
              iconClass: 'iconfont icon-bangdingshibai',
              duration: 3000
            })
          }
          Toast({
            message: '绑定成功',
            iconClass: 'iconfont icon-duanxin',
            duration: 3000
          })
          sessionStorage.setItem('Home', 'Book')
          this.$router.push({
            name: 'Home'
          })
        })
      },
      setTime: function () {
        var timer
        var sm = 60
        var _this = this
        this.btnstyle.fontSize = '1.2rem'
        timer = setInterval(() => {
          sm--
          if (sm === 0) {
            _this.btntext = '重新获取验证码'
            clearInterval(timer)
          } else {
            _this.btntext = sm + 's后重新获取'
          }
        }, 1000)
      },
      go: function () {
        this.$router.push({
          name: 'Area',
          query: {}
        })
      }
    },
    components: {btn}
  }
</script>

<style scoped>
  @import "../../assets/css/views/Binding/index.css";
</style>
