<template>
  <div class="Handouts">
    <div v-html="content" class="Handouts-content"></div>
    <!--<div class="Handouts-content">-->
      <!--&lt;!&ndash;<img src="../../assets/IMG_1465.jpg" alt="">&ndash;&gt;-->
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: 'index',
    data: function () {
      return {
        content: sessionStorage.getItem('handout')
      }
    },
    mounted: function () {
    },
    methods: {},
    components: {}
  }
</script>

<style scoped>
  @import "../../assets/css/views/Handouts/index.css";
</style>
