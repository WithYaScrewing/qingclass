import axios from 'axios'
import qs from 'qs'
import login from '../login/index'
import {Toast} from 'mint-ui'

var readurl = 'http://reading.qingclass.com/'
var api1 = readurl + 'qingread-vip/api/v1.0.0/'
var readapi1 = readurl + 'api/v1.2/'
var readapi = readurl + 'api/v1.0/'
var readapi1_1 = readurl + 'api/v1.1/'
var readapi2 = readurl + 'api/v1.2/'
// axios.defaults.headers.post['content-Type'] = 'appliction/json'
axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
axios.defaults.timeout = 10000
axios.interceptors.response.use((res) => {
  if (res.data.qing_code === 401) {
    Toast({
      message: '正在登陆',
      iconClass: 'iconfont iicon-bangdingshibai',
      duration: 3000
    })
    window.localStorage.removeItem('oauth_token')
    login.wx_auth_inspec()
    return
  }
  if (res.data.qing_code === 717) {
    window.location.href = window.location.href.split('#')[0] + '#/BuyVip'
    return
  }
  if (res.data.qing_code !== 100 && res.data.qing_code !== 203 && res.data.qing_code !== 431 && res.data.qing_code !== 303 && res.data.qing_code !== 601) {
    return Toast({
      message: res.data.qing_text + res.data.qing_code,
      iconClass: 'iconfont icon-bangdingshibai',
      duration: 3000
    })
  }
  if (!res.data.success) {
    return Promise.reject(res)
  }
  return res
}, (err) => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break

      case 401:
        err.message = '未授权，请登录'
        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break

      case 408:
        err.message = '请求超时'
        break

      case 500:
        err.message = '服务器内部错误'
        break

      case 501:
        err.message = '服务未实现'
        break

      case 502:
        err.message = '网关错误'
        break

      case 503:
        err.message = '服务不可用'
        break

      case 504:
        err.message = '网关超时'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break

      default:
    }
  }
  return Promise.reject(err)
})
axios.interceptors.request.use((config) => {
  // config.headers.themeToken
  if (config.method === 'post') {
    // config.data = qs.stringify(config.data)
    // console.log(config.data)
  }
  if (config.method === 'get') {
  }
  return config
}, error => {
  Toast({
    message: '网络异常',
    iconClass: 'iconfont icon-bangdingshibai',
    duration: 5000
  })
  return Promise.reject(error)
})

export function fetch(url, params) {
  params.platform_id = 3
  params.user_id = login.oauth_token.user_id
  params.vip_user_id = login.Vip_token.vip_user_id
  params.vip_token1 = login.Vip_token.vip_token1
  params.vip_token2 = login.Vip_token.vip_token2
  // params = qs.stringify(params)
  return axios.post(url, params)
    .then(function (res) {
      return res.data
    }).catch(function (err) {
      return err
    })
}

export function putfetch(url, params) {
  params.platform_id = 3
  params.user_id = login.oauth_token.user_id
  params.vip_user_id = login.Vip_token.vip_user_id
  params.vip_token1 = login.Vip_token.vip_token1
  params.vip_token2 = login.Vip_token.vip_token2
  return axios.put(url, params)
    .then(function (res) {
      return res.data
    }).catch(function (err) {
      return err
    })
}

export function getfetch(url, params) {
  params.params.platform_id = 3
  params.params.user_id = login.oauth_token.user_id
  params.params.vip_user_id = login.Vip_token.vip_user_id
  params.params.vip_token1 = login.Vip_token.vip_token1
  params.params.vip_token2 = login.Vip_token.vip_token2
  return axios.get(url, params)
    .then(function (res) {
      return res.data
    }).catch(function (err) {
      return err
    })
}

export default {
  books_list: function (param) {
    return getfetch(api1 + 'book/list', {params: param})
  },
  books_shelf_list: function (param) {
    return getfetch(api1 + 'book_shelf/list', {params: param})
  },
  chapter_read: function (param) {
    return getfetch(api1 + 'chapter/read', {params: param})
  },
  exam_questions: function (param) {
    return getfetch(api1 + 'exam/questions', {params: param})
  },
  book_detail: function (param) {
    return getfetch(api1 + 'book/detail', {params: param})
  },
  chapter_detail: function (param) {
    return getfetch(api1 + 'chapter/read/chapter', {params: param})
  },
  achivement_chapter: function (param) {
    return getfetch(api1 + 'achivement/chapter', {params: param})
  },
  adver_list: function (param) {
    return getfetch(api1 + 'adver/list', {params: param})
  },
  goods_list: function (param) {
    return getfetch(api1 + 'goods/list', {params: param})
  },
  books_add: function (param) {
    return fetch(api1 + 'book_shelf/add', param)
  },
  exam: function (param) {
    return fetch(api1 + 'exam', param)
  },
  book_delete: function (param) {
    return fetch(api1 + 'book_shelf/delete', param)
  },
  //微信config
  wx_request_jsapi_sign: function (param) {
    return getfetch(readapi1 + 'user_center/wechat/wx_request_jsapi_sign?' + new Date().getTime(), {params: param})
  },
  wx_auth_inspect: function (param) {
    return getfetch(readapi2 + 'user_center/wechat/wx_auth_inspect', {params: param})
  },
  share_link_info: function (param) {
    return getfetch(api1 + 'share_wechat/share_link_info', {params: param})
  },
  achivement_chapters: function (param) {
    return getfetch(api1 + 'achivement/chapter', {params: param})
  },
  achievement_card: function (param) {
    return getfetch(api1 + 'share_wechat/chapter/achievement_card', {params: param})
  },
  achievement_book_card: function (param) {
    return getfetch(api1 + 'share_wechat/book/achievement_card', {params: param})
  },
  order: function (param) {
    return getfetch(api1 + 'order', {params: param})
  },
  schedule: function (param) {
    return getfetch(api1 + 'schedule', {params: param})
  },
  inspect: function (param) {
    return getfetch(api1 + 'pay/inspect', {params: param})
  },
  location: function (param) {
    return getfetch(api1 + 'location', {params: param})
  },
  address_get: function (param) {
    return getfetch(api1 + 'address', {params: param})
  },
  rank: function (param) {
    return getfetch(api1 + 'rank', {params: param})
  },
  address_post: function (param) {
    return fetch(api1 + 'address', param)
  },
  share_done: function (param) {
    return fetch(api1 + 'share_wechat/share_done', param)
  },
  post_order: function (param) {
    return fetch(api1 + 'order', param)
  },
  country_code: function (param) {
    return getfetch(readapi + 'user_center/sms/country/code', {params: param})
  },
  send_code: function (param) {
    return putfetch(readapi + 'user_center/sms/send_code', param)
  },
  country_code_voice: function (param) {
    return putfetch(readapi + 'user_center/sms/send_code/voice', param)
  },
  bind_phone: function (param) {
    return fetch(readapi + 'user_center/bind_phone', param)
  },
  wallet_info: function (param) {
    return getfetch(readapi + 'user_center/wallet/wallet_info', {params: param})
  },
  inspect_withdraw: function (param) {
    return getfetch(readapi + 'user_center/wallet/inspect_withdraw', {params: param})
  },
  confirm_withdraw: function (param) {
    return fetch(readapi + 'user_center/wallet/confirm_withdraw', param)
  },
  transaction_record: function (param) {
    return getfetch(readapi + 'user_center/wallet/transaction_record', {params: param})
  },
  cashback_record: function (param) {
    return getfetch(readapi + 'user_center/wallet/cashback_record', {params: param})
  },
  chapter_books: function (param) {
    return getfetch(api1 + 'achivement/books', {params: param})
  },
  test_paper_question: function (param) {
    return fetch(readapi + 'exam/ability/test_paper_question', param)
  },
  exam_result: function (param) {
    return fetch(readapi + 'exam/ability/exam_result', param)
  },
  share: function (param) {
    return getfetch(readapi + 'market/share/share_link_info', {params: param})
  },
  share_dones: function (param) {
    return getfetch(readapi + 'market/share/share_done', {params: param})
  },
  user_info: function (param) {
    return getfetch(readapi1_1 + 'user_center/user_info', {params: param})
  },
  user_settings: function (param) {
    return getfetch(readapi + 'user_center/user_settings', {params: param})
  },
  user: function (param) {
    return fetch(api1 + 'user', param)
  },
  get_user: function (param) {
    return getfetch(api1 + 'user', {params: param})
  }
}
