// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './request/index'
import wx from './wx/index'
import Mate from './Mate/index'
import './title/index'
import store from './store/index'
import login from './login/index'
// import 'vue2-animate/dist/vue2-animate.min.css'
import 'animate.css/animate.min.css'
import './assets/icon/iconfont/iconfont.css'
import './assets/css/MasterStyle/index.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import LazyRender from 'vue-lazy-render'
Vue.use(LazyRender)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$wx = wx
Vue.prototype.$Mate = Mate
Vue.prototype.$Login = login
Vue.use(MintUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  beforeCreate: function () {
    this.$Login.jsapi_sign()
    var data = {
      post_id: -1,
      share_type: 20,
      share_page: 'BuyVip'
    }
    this.$Login.share(data)
    // this.$Login.wx_auth_inspec()
  }
})
