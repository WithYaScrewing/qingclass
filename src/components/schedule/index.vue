<template>
  <div class="Reading">
    <div class="Calendar">
      <div class="head">
        <div class="left"><i
          class="iconfont icon-jinru icon-rili"></i></div>
        <div class="center">
          {{Schedule.year}}年&nbsp;&nbsp;&nbsp;&nbsp;{{Schedule.month}}月
        </div>
        <div class="right">
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
          <li v-for="(a,i) in calender">
            <div v-if="a!==-1">
              {{i+1}}
            </div>
            <!--<div v-else>-->
            <!--<div-->
            <!--class="content"-->
            <!--@click="goDetails(Date.state,Date.obj)"-->
            <!--v-if="sysTemTime!==-1&&Date.day.getFullYear() ===parseInt(sysTemTime.split('-')[0]) && (Date.day.getMonth()+1) ===parseInt(sysTemTime.split('-')[1]) && Date.day.getDate() ===parseInt(sysTemTime.split('-')[2])">-->
            <!--<span-->
            <!--:class="{'class-a':Date.state===0,'class-c':Date.state===1,'class-b':Date.state===2,'active':Date.state===-1}">今</span>-->
            <!--<span class="icon" v-if="Date.state!==3"><i class="iconfont icon-daqia"></i></span>-->
            <!--</div>-->
            <!--<div v-else-->
            <!--class="content">-->
            <!--<span :class="{'class-a':Date.state===0,'class-c':Date.state===1,'class-b':Date.state===2}">{{Date.day.getDate()}}</span>-->
            <!--<span class="icon" v-if="Date.state===3"><i class="iconfont icon-daqia"></i></span>-->
            <!--</div>-->
            <!--</div>-->
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
      return {}
    },
    props: ['Schedule'],
    computed: {
      calender: {
        get: function () {
          var arr = []
          for (var i = 0; i < this.Schedule.day_of_week; i++) {
            arr[i] = -2
          }
          return arr.concat(this.Schedule.calender)
        }
      }
    },
    mounted: function () {
    },
    methods: {},
    components: {}
  }
</script>

<style scoped>
  @import "../../assets/css/components/schedule/index.css";
</style>
