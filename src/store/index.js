import Vue from 'vue'
import Vuex from 'vuex'
// import login from '../login/index'
// import wx from 'weixin-js-sdk'

Vue.use(Vuex)
const state = JSON.parse(localStorage.getItem('Vip_token')) ||
  {
    platform_id: 2,
    userToken: '-1',
    themeUserId: -1,
    oauthToken: '-1',
    userId: -1,
    reading_vip_state: 1,
    count: 1
  }
const mutations = {
  add: function (state, msg) {
    state = JSON.parse(msg)
  },
  reduce: function (state) {
    state.count -= 1
  },
  get: function (state) {
    return state
  }
}
const actions = {
  saveName: function ({commit}, msg) {
    commit('add', msg)
  },
  getobj: function ({commit}) {
    return commit('get')
  }
}
const getter = {
  showState: function (state) {
    // console.log(state)
  },
  count: function (state) {
    return state.count += 100;
  }
}
export default new Vuex.Store({
  state,
  getter,
  mutations,
  actions
})
