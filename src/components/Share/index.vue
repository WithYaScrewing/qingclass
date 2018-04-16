<template>
  <div class="Share">
    <div class="positive" @click="hides($event,2)">
      <div class="content" @click="stopPropagation">
        <img src="../../assets/img/Share/card.png" class="img" v-if="show===1" alt="">
        <img src="../../assets/img/Share/ceshi.png" class="img" v-if="show===2" alt="">
        <img src="../../assets/img/Share/yaoqing.png" class="img" v-if="show===3" alt="">
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
    props: ['show', 'shares'],
    mounted: function () {
    },
    methods: {
      hides: function (e, num) {
        if (e && e.stopPropagation) {
          e.stopPropagation();
        } else {
          window.event.cancelBubble = true
        }
        this.$emit('hide')
      },
      stopPropagation: function (e) {
        if (e && e.stopPropagation) {
          e.stopPropagation();
        } else {
          window.event.cancelBubble = true
        }
        return false
      }
    },
    components: {}
  }
</script>

<style scoped>
  @import "../../assets/css/components/Share/index.css";
</style>
