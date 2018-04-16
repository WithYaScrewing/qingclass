<template>
  <div class="Inform">
    <div class="body" @click="go('testing')">
      词汇量{{num}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data: function () {
      return {}
    },
    props: ['num'],
    mounted: function () {
    },
    methods: {
      go: function (str) {
        this.$router.push({
          name: str
        })
      }
    },
    components: {}
  }
</script>

<style scoped>
  @import "../../assets/css/components/Inform/index.css";
</style>
