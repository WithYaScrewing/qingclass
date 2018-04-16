<template>
  <div class="Reading">
    <div class="Calendar">
      <div class="head">
        <div class="left" @click="pickPre(currentYear,currentMonth-1)"><i
          class="iconfont icon-jinru icon-rili"></i></div>
        <div class="center">
          {{currentYear}}年&nbsp;&nbsp;&nbsp;&nbsp;{{currentMonth<10?'0'+currentMonth:currentMonth}}月
        </div>
        <div class="right" @click="pickNext(currentYear,currentMonth-1)">
          <i class="iconfont icon-jinru"></i>
        </div>
      </div>
      <div class="title">
        <ul>
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
      </div>
      <div class="body">
        <ul>
          <li v-for="Date in days">
            <div v-if="Date.day.getMonth()+1 !== currentMonth"
                 class="other-month">{{ Date.day.getDate()}}
            </div>
            <div v-else>
              <div
                class="content"
                v-if="now!==-1&&Date.day.getFullYear() ===parseInt(now.split('-')[0]) && (Date.day.getMonth()+1) ===parseInt(now.split('-')[1]) && Date.day.getDate() ===parseInt(now.split('-')[2])">
                <span
                  :class="{'class-a':Date.state===0,'class-c':Date.state===1,'class-b':Date.state===2,'active':Date.state===-1}">今</span>
                <span class="icon" v-if="Date.state===2"><i class="iconfont icon-daqia"></i></span>
              </div>
              <div v-else
                   @click="goDetails(Date.state,Date.obj)"
                   class="content">
                <span :class="{'class-a':Date.state===0,'class-c':Date.state===1,'class-b':Date.state===2}">{{Date.day.getDate()}}</span>
                <span class="icon" v-if="Date.state===3"><i class="iconfont icon-daqia"></i></span>
              </div>
            </div>
          </li>
        </ul>
        <div class="footr">
          <div><span class="not"></span>未阅读</div>
          <div><span class="ids"></span>已阅读</div>
          <div><span class="Learn"></span>补打卡</div>
          <div class="daqia"><i class="iconfont icon-daqia"></i>已打卡</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data: function () {
      return {
        currentDay: new Date().getDay(),
        currentMonth: new Date().getMonth() + 1,
        currentYear: new Date().getFullYear(),
        currentWeek: 1,
        sysTemTime: -1,
        days: [],
        calendarList: []
      }
    },
    props: ['daylist', 'now'],
    computed: {
      daylists: {
        get: function () {
          return this.daylist
        }
      }
    },
    mounted: function () {
      this.calendarList = this.daylist
      // console.log(parseInt(this.now.split('-')[0]), parseInt(this.now.split('-')[1]), parseInt(this.now.split('-')[2]))
      this.initData()
    },
    methods: {
      initData: function (cur) {
        var date
        if (cur) {
          date = new Date(cur.FullYear, cur.Month, 1)
        } else {
          var now = new Date()
          var d = new Date(now.getFullYear(), now.getMonth(), 1)
          date = new Date(now.getFullYear(), now.getMonth(), 1)
          d.setDate(36)
        }
        this.currentDay = date.getDate()
        this.currentYear = date.getFullYear()
        this.currentMonth = date.getMonth() + 1
        this.currentWeek = date.getDay()
        if (this.currentWeek === 0) {
          this.currentWeek = 7
        }
        var suns
        if (this.currentWeek === 6) {
          if (date.getTimezoneOffset() <= 0) {
            suns = 41
          } else {
            suns = 42
          }
        } else {
          if (date.getTimezoneOffset() <= 0) {
            suns = 34
          } else {
            suns = 35
          }
        }
        var str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)
        this.days.length = 0
        if (this.currentWeek === 7) {
          d = new Date(str)
          d.setDate(d.getDate())
          var dayobject = {}
          if (date.getTimezoneOffset() <= 0) {
            dayobject.day = d
            dayobject.state = -1
            this.calendarList.forEach(function (ite) {
              if (dayobject.day.getFullYear() == ite.schedule_start_time.split('-')[0] && (dayobject.day.getMonth() + 1) == ite.schedule_start_time.split('-')[1] && dayobject.day.getDate() == ite.schedule_start_time.split('-')[2]) {
                dayobject.state = ite.schedule_status
                dayobject.obj = ite
              }
            })
            this.days.push(dayobject)
          }
          for (var i = 1; i <= suns; i++) {
            d = new Date(str)
            d.setDate(d.getDate() + i)
            dayobject = {}
            dayobject.day = d
            dayobject.state = -1
            this.calendarList.forEach(function (ite) {
              if (dayobject.day.getFullYear() == ite.schedule_start_time.split('-')[0] && (dayobject.day.getMonth() + 1) == ite.schedule_start_time.split('-')[1] && dayobject.day.getDate() == ite.schedule_start_time.split('-')[2]) {
                dayobject.state = ite.schedule_status
                dayobject.obj = ite
              }
            })
            this.days.push(dayobject)
          }
        } else {
          if (date.getTimezoneOffset() > 0) {
            var stej = 2
          } else {
            stej = 1
          }
          for (i = this.currentWeek; i >= stej; i--) {
            d = new Date(str)
            d.setDate(d.getDate() - i)
            dayobject = {}
            dayobject.day = d
            dayobject.state = -1
            this.calendarList.forEach(function (ite) {
              if (dayobject.day.getFullYear() == ite.schedule_start_time.split('-')[0] && (dayobject.day.getMonth() + 1) == ite.schedule_start_time.split('-')[1] && dayobject.day.getDate() == ite.schedule_start_time.split('-')[2]) {
                dayobject.state = ite.schedule_status
                dayobject.obj = ite
              }
            })
            this.days.push(dayobject)
          }
          for (i = 0; i <= suns - this.currentWeek; i++) {
            d = new Date(str)
            d.setDate(d.getDate() + i)
            dayobject = {}
            dayobject.day = d
            dayobject.state = -1
            this.calendarList.forEach(function (ite) {
              if (dayobject.day.getFullYear() == ite.schedule_start_time.split('-')[0] && (dayobject.day.getMonth() + 1) == ite.schedule_start_time.split('-')[1] && dayobject.day.getDate() == ite.schedule_start_time.split('-')[2]) {
                dayobject.state = ite.schedule_status
                dayobject.obj = ite
              }
            })
            this.days.push(dayobject)
          }
        }
      },
      formatDate: function (year, month, day) {
        var y = year
        var m = month
        if (m < 10) m = '0' + m
        var d = day
        if (d < 10) d = '0' + d
        return y + '-' + m + '-' + d
      },
      pickPre: function (year, month) {
        if (month === 12) {
          month = 0
        }
        var d = new Date(year, month, 1)
        d.setDate(0)
        // var data = {
        //   which_year_month: this.formatDate(d.getFullYear(), d.getMonth() + 1, 1),
        //   user_id: 1,
        //   course_order_id: this.course_order_id
        // }
        var str = {
          FullYear: d.getFullYear(),
          Month: d.getMonth()
        }
        this.systemCurrentTime = this.formatDate(d.getFullYear(), d.getMonth() + 1, 1)
        // this.updata(str)
        this.initData(str)
      },
      pickNext: function (year, month) {
        if (month === 12) {
          month = 0
        }
        var d = new Date(year, month, 1)
        d.setDate(35)
        var str = {
          FullYear: d.getFullYear(),
          Month: d.getMonth()
        }
        this.systemCurrentTime = this.formatDate(d.getFullYear(), d.getMonth() + 1, 1)
        // this.updata(str)
        this.initData(str)
      },
      goDetails: function (start, obj) {
        console.log(start, obj)
      }
    },
    components: {}
  }
</script>

<style scoped>
  @import "../../assets/css/components/Reading/index.css";
</style>
