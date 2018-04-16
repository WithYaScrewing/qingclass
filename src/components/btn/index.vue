<template>
  <div class="btn">
    <button :style="style" @touchstart="Starts" @touchend="Ends" :disabled="dis" @click="to">{{text}}</button>
  </div>
</template>

<script>
  import '../../assets/css/components/btn/index.css'

  export default {
    name: 'btn',
    data: function () {
      return {
        dis: false
      }
    },
    props: ['obj', 'text'],
    computed: {
      style: {
        get: function () {
          return this.obj
        },
        set: function (v) {
          this.obj.opacity = v
        }
      }
    },
    mounted: function () {
      // this.obj.opacity = 1
    },
    methods: {
      to: function () {
        this.$emit('statr')
      },
      Starts: function (e) {
        this.style = .8
      },
      Ends: function (e) {
        this.style = 1
      }
    },
    components: {}
  }
</script>

<style scoped>

</style>
