<template>
  <div class="Read">
    <Banner :ImgObj="ImgObj"></Banner>
    <div class="Readtitle">
      <div class="content">
        <div class="left">
          <!--<img src="../../../../assets/logo.png" alt="">-->
          <img :src="user_info.avatar" alt="">
          <span>{{user_info.nickname}}</span>
        </div>
        <div class="right">
          <span>已阅读{{user_info.read_days}}天 | 未阅读{{user_info.absence_read_days}}天</span>
        </div>
      </div>
    </div>
    <div class="Readnav">
      <p v-if="$Login.Vip_token.reading_vip_state===1">会员截止:{{user_info.reading_vip_period_validity}}</p>
    </div>
    <Reading :daylist="daylist" :now="now"></Reading>
    <!--<schedule :Schedule="schedule"></schedule>-->
  </div>
</template>

<script>
  import Banner from '../../../../components/Banner/index'
  import Reading from '../../../../components/Reading/index'
  import Schedule from '../../../../components/schedule/index'

  export default {
    name: 'index',
    data: function () {
      return {
        daylist: [],
        ImgObj: [],
        user_info: {},
        schedule: {},
        now: null
      }
    },
    mounted: function () {
      this.Upimg()
      this.Dateup({year: -1, month: -1})
    },
    methods: {
      Upimg: function () {
        this.$axios.adver_list({
          adver_type: 4
        }).then(res => {
          this.ImgObj = res.data.qing_data.adver_info
          this.user_info = res.data.qing_data.user_info
        })
      },
      Dateup: function (data) {
        this.$axios.schedule(data).then(res => {
          if (res.data.qing_code !== 100) {
            return
          }
          this.daylist = res.data.qing_data.calender
          this.now = res.data.qing_data.now
        })
      }
    },
    components: {Banner, Reading, Schedule}
  }
</script>

<style scoped>
  @import "../../../../assets/css/components/Home/Read/index.css";
</style>
