import Vue from 'vue'
import Router from 'vue-router'
import index from './router'
import login from '../login/index'
// import wx from '../wx/index'

Vue.use(Router)
const router = new Router({
  routes: index
})
router.beforeEach((to, from, next) => {
  if (to.path === '/wx_auth_done') {
    window.localStorage.setItem('oauth_token', JSON.stringify(to.query))
    login.oauth_token = to.query
    login.sign(to.query, res => {
      login.Vip_token.vip_user_id = res.vip_user_id
      login.Vip_token.reading_vip_state = res.is_vip
      login.Vip_token.vip_token1 = res.vip_token1
      login.Vip_token.vip_token2 = res.vip_token2
      localStorage.setItem('Vip_token', JSON.stringify(login.Vip_token))
      next({path: to.query.previous_page})
    })
  } else {
    next()
    // {
    //   "vip_user_id"
    // :
    //   5, "vip_token1"
    // :
    //   "1892be9dd6ed121d3b0882bcf90ef0bc", "vip_token2"
    // :
    //   "1522814697300", "reading_vip_state"
    // :
    //   1
    // }

  }
})
export default router
