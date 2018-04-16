import api from '../request/index'
import wx from '../wx/index'
// import state from '../store/index'
console.log()
let json = {
  Vip_token: JSON.parse(localStorage.getItem('Vip_token')) ||
  {
    vip_user_id: -1,
    vip_token1: -1,
    vip_token2: -1,
    reading_vip_state: ''
  }
  // {
  //   "vip_user_id": 5,
  //   "vip_token1": "d9c2364f99226590d86a1e9e2622ef50",
  //   "vip_token2": "1523846562592",
  //   "reading_vip_state": 1
  // }
  ,
  oauth_token: JSON.parse(localStorage.getItem('oauth_token')) ||
  {
  user_id: -1,
    oauth_token: '',
    user_token: '',
    wx_oauth_quiet: false
}
  // {
  //   "qing_code": "408",
  //   "qing_text": "urlStr",
  //   "oauth_token": "222337e73be3e118105113194e7c90f8",
  //   "user_token": "14a5e354a794e487cc6d8da599fdfd69",
  //   "previous_page": "/BuyVip",
  //   "user_id": "5"
  // }
  ,
  jsapi_sign: function () {
    var date = {
      url: window.location.href.split('#')[0]
    }
    api.wx_request_jsapi_sign(date).then(res => {
      wx.config(res.data.qing_data)
    })
  },
  wx_auth_inspec: function () {
    var data = this.oauth_token
    data.previous_page = window.location.href.split('#')[1]
    data.wx_oauth_quiet = false
    api.wx_auth_inspect(data).then(res => {
      if (res.data.qing_code === 100) {
        window.location.href = res.data.qing_data.requestCodeUrl
      } else {
        this.sign(this.oauth_token, res => {
          this.Vip_token.vip_user_id = res.vip_user_id
          this.Vip_token.reading_vip_state = res.is_vip
          this.Vip_token.vip_token1 = res.vip_token1
          this.Vip_token.vip_token2 = res.vip_token2
          localStorage.setItem('Vip_token', JSON.stringify(this.Vip_token))
          window.location.reload()
          // window.location.href=(window.location.href.split('#')[0] + '#/wx_auth_done' + '?oauth_token=' + this.oauth_token.oauth_token + '&user_token=' + this.oauth_token.user_token + '&user_id=' + this.oauth_token.user_id + '&previous_page=' + window.location.href.split('#')[1])
          // window.location.href = window.location.href + '?id=' + new Date().getTime()
        })
      }
    })
  },
  share: function (data) {
    api.share_link_info(data).then(res => {
      var data = {
        title: res.data.qing_data.title,
        desc: res.data.qing_data.desc,
        link: res.data.qing_data.link,
        imgUrl: res.data.qing_data.img
      }
      window.localStorage.setItem('Vip_share_data', JSON.stringify(data))
      wx.Author(data)
    })
  },
  ordinaryShare: function (data) {
    api.share_link_info(data).then(res => {
      var data = {
        title: res.data.qing_data.title,
        desc: res.data.qing_data.desc,
        link: res.data.qing_data.link,
        imgUrl: res.data.qing_data.img
      }
      wx.Author(data)
    })
  },
  isshare: function () {
    var data
    if (window.localStorage.getItem('Vip_share_data')) {
      data = JSON.parse(window.localStorage.getItem('Vip_share_data'))
      wx.onMenuShareTimeline(data)
      wx.onMenuShareAppMessage(data)
      wx.onMenu(data)
    } else {
      data = {
        themeScheduleUsersId: -1,
        shareType: 13
      }
      this.share(data)
    }
  },
  sign: function (str, callback) {
    api.user(str).then(res => {
      if (res.data.qing_code !== 100) {
        return
      }
      callback(res.data.qing_data)
      // localStorage.setItem('Punch_token', JSON.stringify(res.data.qing_data))
      // this.oauth_token = res.data.qing_data
      // window.location.href = window.location.href.split('#')[0] + '#' + res.data.qing_data.previousPage + '?' + new Date().getTime()
      // this.isshare()
    })
  }
}
export default json
