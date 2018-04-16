<template>
  <div class="HomeVip">
    <div class="bodyer">
      <!--<transition-->
      <!--name="bounce"-->
      <!--enter-active-class="animated fadeInLeft"-->
      <!--leave-active-class="animated fadeOutLeft">-->
      <book v-if="stop ==='Book'"></book>
      <!--</transition>-->
      <!--<transition-->
      <!--name="bounce"-->
      <!--enter-active-class="animated slideInDown"-->
      <!--leave-active-class="animated slideOutDown">-->
      <Read v-if="stop ==='read'"></Read>
      <!--</transition>-->
      <!--<transition-->
      <!--name="bounce"-->
      <!--enter-active-class="animated fadeInRight"-->
      <!--leave-active-class="animated fadeOutRight">-->
      <Mine v-if="stop ==='mine'"></Mine>
      <!--</transition>-->
    </div>
    <div class="footer">
      <div :class="{'active':stop ==='Book'}" v-on:click.stop="Tabbar('Book')">
        <i class="iconfont icon-shujia-zhihui" v-if="stop !=='Book'"></i>
        <i class="iconfont icon-shujia" v-if="stop ==='Book'"></i>
        <span>书架</span>
      </div>
      <div :class="{'active':stop ==='read'}" v-on:click.stop="Tabbar('read')">
        <i class="iconfont icon-rili-zhihui" v-if="stop !=='read'"></i>
        <i class="iconfont icon-rili" v-if="stop ==='read'"></i>
        <span>日历</span>
      </div>
      <div :class="{'active':stop ==='mine'}" v-on:click.stop="Tabbar('mine')">
        <i class="iconfont icon-wode-zhihui" v-if="stop !=='mine'"></i>
        <i class="iconfont icon-wode" v-if="stop ==='mine'"></i>
        <span>我的</span>
      </div>
    </div>
  </div>
</template>

<script>
  import book from './components/Book/index'
  import Read from './components/Read/index'
  import Mine from './components/Mine/index'

  export default {
    name: 'HomeVip',
    data: function () {
      return {
        stop: sessionStorage.getItem('Home') || 'Book'
      }
    },
    mounted: function () {
    },
    methods: {
      Tabbar: function (str) {
        this.stop = str
      }
    },
    components: {
      book,
      Read,
      Mine
    }
  }
</script>

<style scoped>
  @import "../../assets/css/views/HomeVip/index.css";
</style>
