import wx from 'weixin-js-sdk'
// import login from '../login/index'

export default {
  audiolocalId: '',
  imglocalId: '',
  imgserverId: '',
  serverId: '',
  isaudio: false,
  config: function (obj) {
    wx.config({
      debug: false,
      appId: obj.appId,
      timestamp: obj.timestamp,
      nonceStr: obj.nonStr,
      signature: obj.signature,
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'onVoicePlayEnd',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'translateVoice',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
    if (window.localStorage.getItem('Vip_share_data')) {
      var data = JSON.parse(window.localStorage.getItem('Vip_share_data'))
      this.onMenuShareTimeline(data)
      this.onMenuShareAppMessage(data)
      this.onMenu(data)
    }
  },
  Author: function (data) {
    this.onMenuShareTimeline(data)
    this.onMenuShareAppMessage(data)
    this.onMenu(data)
  },
  onMenuShareTimeline: function (data) {
    wx.ready(function () {
      wx.onMenuShareTimeline({
        title: data.title, // 分享标题
        link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: data.imgUrl, // 分享图标
        success: function (res) {
          // self.text = res.errMsg
          return 'asdasd'
        },
        cancel: function (res) {
          // 用户取消分享后执行的回调函数
          // self.text = res.errMsg
        }
      })
    })
  },
  onMenuShareAppMessage: function (data) {
    wx.ready(function () {
      wx.onMenuShareAppMessage({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: data.imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function (res) {
          // self.text = res.errMsg
        },
        cancel: function (res) {
          // self.text = res.errMsg
        }
      })
    })
  },
  ShareTimeline: function (data, callback) {
    wx.ready(function () {
      wx.onMenuShareTimeline({
        title: data.title, // 分享标题
        link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: data.imgUrl, // 分享图标
        success: function (res) {
          // self.text = res.errMsg
          callback(
            {share_mode: 3}
          )
          return false
        },
        cancel: function (res) {
          // 用户取消分享后执行的回调函数
          // self.text = res.errMsg
          callback(
            {share_mode: 2}
          )
        }
      })
    })
  },
  ShareAppMessage: function (data, callback) {
    wx.ready(function () {
      wx.onMenuShareAppMessage({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: data.imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function (res) {
          // self.text = res.errMsg
          callback(
            {share_mode: 3}
          )
        },
        cancel: function (res) {
          callback(
            {share_mode: 2}
          )
          // self.text = res.errMsg
        }
      })
    })
  },
  onMenu: function (data) {
    wx.ready(function () {
      wx.onMenuShareQQ({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接
        imgUrl: data.imgUrl, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
      wx.onMenuShareWeibo({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接
        imgUrl: data.imgUrl, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
      wx.onMenuShareQZone({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接
        imgUrl: data.imgUrl, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
    })
  },
  Upimg: function (callback) {
    var _this = this
    wx.ready(function () {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (id) {
          _this.imglocalId = id.localIds[0]
          wx.uploadImage({
            localId: id.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
              _this.imgserverId = res.serverId; // 返回图片的服务器端ID
              callback(id.localIds[0], res.serverId)
            }
          })
        }
      })
    })
  },
  getbaseimg: function (id, callback) {
    wx.ready(function () {
      wx.getLocalImgData({
        localId: id, // 图片的localID
        success: function (res) {
          callback(res.localData)
        }
      })
    })
  },
  upimg: function (id) {
    wx.ready(function () {
      wx.uploadImage({
        localId: id, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          _this.imgserverId = res.serverId; // 返回图片的服务器端ID
        }
      });
    })
  },
  startRecord: function () {
    wx.ready(function () {
      wx.startRecord()
    })
  },
  stopRecord: function () {
    var _this = this
    wx.ready(function () {
      wx.stopRecord({
        success: function (res) {
          var localId = res.localId
          _this.audiolocalId = res.localId
          _this.uploadVoice(localId)
        }
      })
    })
  },
  playVoic: function (id) {
    var _this = this
    wx.ready(function () {
      wx.playVoice({
        localId: id // 需要播放的音频的本地ID，由stopRecord接口获得
      })
      _this.onVoicePlayEnd()
    })
  },
  pauseVoice: function (id) {
    wx.ready(function () {
      wx.pauseVoice({
        localId: id// 需要暂停的音频的本地ID，由stopRecord接口获得
      })
    })
  },
  stopVoice: function (id) {
    wx.ready(function () {
      wx.stopVoice({
        localId: id // 需要停止的音频的本地ID，由stopRecord接口获得
      });
    })
  },
  onVoicePlayEnd: function (callback) {
    wx.ready(function () {
      wx.onVoicePlayEnd({
        success: function (res) {
          // var localId = res.localId; // 返回音频的本地ID
          // // _this.isaudio = true
          callback(res.localId)
        }
      })
    })
  },
  uploadVoice: function (id) {
    var _this = this
    wx.ready(function () {
      wx.uploadVoice({
        localId: id, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          _this.serverId = res.serverId // 返回音频的服务器端ID
        }
      })
    })
  },
  downloadVoice: function (id) {
    var _this = this
    wx.ready(function () {
      wx.downloadVoice({
        serverId: id, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          var localId = res.localId; // 返回音频的本地ID
          _this.audiolocalId = res.localId
          _this.playVoic(res.localId)
        }
      })
    })
  },
  chooseWXPay: function (obj, callback) {
    wx.chooseWXPay({
      timestamp: obj.timeStamp,
      appId: obj.appId,
      nonceStr: obj.nonceStr,
      package: obj.package,
      signType: obj.signType,
      paySign: obj.paySign,
      success: function (res) {
        callback(res.errMsg)
      }
    });
  }
}
