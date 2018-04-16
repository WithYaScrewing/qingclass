<template>
  <div class="Mine">
    <div class="mine">
      <div class="mine-head">
        <!--<img src="../../../../assets/img/banner/bgsa.png" class="bg-1" alt="">-->
        <div class="mine-head-content">
          <div class="img">
            <img :src="items.user_info.avatar" alt="">
          </div>
          <div class="name">
            {{items.user_info.nickname}}
          </div>
          <div class="state">
            <div class="state-du">
              <p>阅读等级</p>
              <p>{{items.user_info.read_level}}</p>
            </div>
            <div class="state-du">
              <p>阅读文字</p>
              <p>{{items.user_info.read_words}}</p>
            </div>
            <div class="state-du">
              <p>阅读天数</p>
              <p>{{items.user_info.read_days}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="mine-newcontent">
        <ul class="mine-newcontent-ul">
          <li class="mine-newcontent-li" @click="go('wallet')">
            <div>
              <img src="../../../../assets/img/icon/mine/icon@4.png" alt="">
              <span>我的钱包</span>
            </div>
            <div>
              <i class="iconfont icon-jinru"></i>
            </div>
          </li>
          <li class="mine-newcontent-li" v-if="false">
            <div>
              <img src="../../../../assets/img/icon/mine/icon@8.png" alt="">
              <span>我的勋章<i></i></span>
            </div>
            <div>
              <i class="iconfont icon-jinru"></i>
            </div>
          </li>
          <li class="mine-newcontent-li" @click="go('Address')">
            <div>
              <img src="../../../../assets/img/icon/mine/Address.svg" alt="">
              <span>我的地址</span>
            </div>
            <div>
              <i class="iconfont icon-jinru"></i>
            </div>
          </li>
        </ul>
        <ul class="mine-newcontent-ul" v-if="false">
          <li class="mine-newcontent-li" v-if="false">
            <div>
              <img src="../../../../assets/img/icon/mine/icon@2.png" alt="">
              <span>我的阅读计划</span>
            </div>
            <div>
              <i class="iconfont icon-jinru"></i>
            </div>
          </li>
          <li class="mine-newcontent-li" v-if="false">
            <div>
              <img src="../../../../assets/img/icon/mine/icon@5.png" alt="">
              <span>推荐有奖</span>
            </div>
            <div>
              <i class="iconfont icon-jinru"></i>
            </div>
          </li>
          <li class="mine-newcontent-li" v-if="false">
            <div>
              <img src="../../../../assets/img/icon/mine/icon@3.png" alt="">
              <span>学习排行</span>
            </div>
            <div>
              <i class="iconfont icon-jinru"></i>
            </div>
          </li>
        </ul>
        <ul class="mine-newcontent-ul">
          <li class="mine-newcontent-li" @click="go('Promotion')">
            <div>
              <img src="../../../../assets/img/icon/mine/icon@5.png" alt="">
              <span>推荐有奖</span>
            </div>
            <div>
              <i class="iconfont icon-jinru"></i>
            </div>
          </li>
          <li class="mine-newcontent-li" @click="go('testing')">
            <div>
              <img src="../../../../assets/img/icon/mine/icon@7.png" alt="">
              <span>词汇量测试</span>
            </div>
            <div>
              <i class="iconfont icon-jinru"></i>
            </div>
          </li>
          <li class="mine-newcontent-li" @click="go('Remind')">
            <div>
              <img src="../../../../assets/img/icon/mine/icon@6.png" alt="">
              <span>阅读提醒设置</span>
            </div>
            <div>
              <i class="iconfont icon-jinru"></i>
            </div>
          </li>
          <li class="mine-newcontent-li" @click="golink(items.feedback)">
            <div>
              <img src="../../../../assets/img/icon/mine/icon@10.png" alt="">
              <span>用户反馈</span>
            </div>
            <div>
              <i class="iconfont icon-jinru"></i>
            </div>
          </li>
          <li class="mine-newcontent-li" @click="golink(items.manual)">
            <div>
              <img src="../../../../assets/img/icon/mine/icon@1.png" alt="">
              <span>常见问题</span>
            </div>
            <div>
              <i class="iconfont icon-jinru"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data: function () {
      return {
        items: {
          user_info: {}
        }
      }
    },
    mounted: function () {
      this.updata(this.$Login.Vip_token)
    },
    methods: {
      updata: function (data) {
        this.$axios.get_user(data).then(res => {
          console.log(res.data)
          this.items = res.data.qing_data
        })
      },
      go: function (str) {
        this.$router.push({
          name: str,
          query: {}
        })
      },
      golink: function (link) {
        window.location.href = link
      }
    },
    components: {}
  }
</script>

<style scoped>
  @import "../../../../assets/css/components/Home/Mine/index.css";
</style>
