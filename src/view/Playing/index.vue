<template>
  <div class="Playing">
    <Playing :chapter="chapter" :items="items" v-if="chapter"></Playing>
    <!--<Modify v-show="true"></Modify>-->
  </div>
</template>

<script>
  import Playing from '../../components/Playing/index'

  export default {
    name: 'index',
    data: function () {
      return {
        data: this.$route.query,
        chapter: null,
        items: {}
      }
    },
    mounted: function () {
      if (this.data.chapter_id) {
        this.Chapter()
      } else {
        this.update()
      }
    },
    methods: {
      update: function () {
        this.$axios.chapter_read(this.data).then(res => {
          this.chapter = res.data.qing_data.chapter
          this.items = res.data.qing_data
          sessionStorage.setItem('handout', this.$Mate.qingReadTextRetuen(this.chapter.chapter_handout_text))
        })
      },
      Chapter: function () {
        this.$axios.chapter_detail(this.data).then(res => {
          this.chapter = res.data.qing_data.chapter
          this.items = res.data.qing_data
          sessionStorage.setItem('handout', this.$Mate.qingReadTextRetuen(this.chapter.chapter_handout_text))
        })
      }
    },
    components: {Playing}
  }
</script>

<style scoped>
  @import "../../assets/css/views/Playing/index.css";
</style>
