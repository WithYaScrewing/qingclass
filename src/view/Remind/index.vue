<template>
  <div class="Remind">
    <div class="Description-content">
      <div>
        <p>设置时间提醒</p>
        <p>今日修改时间提醒，明日生效</p>
      </div>
      <div>
        <mt-switch v-model="value"></mt-switch>
      </div>
    </div>
    <div class="Description-content" @click="openPicker">
      <div>
        <p class="Description-content-p">提醒时间</p>
      </div>
      <div class="Description-content-p1" :style="{'color': color}">{{pickerValue}}<i
        class="iconfont icon-jinru-icon"></i></div>
    </div>
    <mt-datetime-picker
      ref="picker"
      type="time"
      v-model="pickerValue" @confirm="handleConfirm" class="pickerValue-class">
    </mt-datetime-picker>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'

  export default {
    name: 'index',
    data: function () {
      return {
        state: 0,
        value: null,
        picker: true,
        pickerValue: '00:00',
        color: '#a2a0a8',
        is_true: 0
      }
    },
    mounted: function () {
      this.updata(this.$Login.oauth_token)
    },
    watch: {
      // 通过这种语法来watch就行，文档里有。。。看需求，还可以直接watch data，使用deep:true来深度观察
      'value': 'getPicker'
    },
    methods: {
      updata: function (data) {
        this.$axios.user_info(data).then(res => {
          if (res.data.qing_code !== 100) {
            return
          }
//        this.value = res.data.qing_data.reminder_statc !== '1' ? false : true
          if (res.data.qing_data.userInfo.reminder_state === 1) {
            this.color = '#F78E1B'
            this.value = true
          } else {
            this.color = '#a2a0a8'
            this.value = false
          }
          this.is++
          this.pickerValue = res.data.qing_data.userInfo.reminder_time.split(' ')[1].split(':')[0] + ':' + res.data.qing_data.userInfo.reminder_time.split(' ')[1].split(':')[1]
          this.items = res.data.qing_data.userInfo
        })
      },
      getPicker: function (val, old) {
        if (old === null) {
          return
        }
        if (this.is === 0) {
          return
        }
        if (val) {
          this.color = '#F78E1B'
          this.get(1)
        } else {
          this.get(2)
          this.color = '#a2a0a8'
        }
      },
      get: function (str) {
        if (this.is === 0) {
          return
        }
        var data = this.$Login.oauth_token
        data.settingInfo = {
          reminder_state: str
        }
        this.$axios.user_settings(data).then(res => {
          if (res.data.qing_code === 100) {
            if (str === 1) {
              this.value = true
            } else {
              this.value = false
            }
          }
        })
      },
      openPicker: function () {
        if (this.value) {
          this.$refs.picker.open()
        }
      },
      handleConfirm: function () {
        if (this.pickerValue) {
          var data = this.$Login.oauth_token
          data.settingInfo = {
            reminder_time: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + this.pickerValue + ':' + new Date().getSeconds()
          }
          this.$axios.user_settings(data).then(res => {
            Toast({
              message: res.data.qing_text,
              iconClass: 'icon icon-success',
              duration: 3000
            })
          })
        }
      }
    },
    components: {}
  }
</script>

<style scoped>
  @import "../../assets/css/views/Remind/index.css";

  .pickerValue-class .picker .picker-toolbar .mint-datetime-cancel {
    text-align: left !important;
  }
</style>
