<template>
  <div class="Detailed">
    <div v-if="state" class="Review-body">
      <ul v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
        <li v-for="a in items">
          <div>
            <p>{{a.tran_title}}</p>
            <p>{{a.create_time}}</p>
          </div>
          <div><span v-if="a.direct == 2 || a.direct == 3">-</span><span v-if="a.direct == 1">+</span>{{a.currency}}
          </div>
        </li>
      </ul>
    </div>
    <div class="Detailed-img" v-if="!state">
      <img src="../../assets/img/Detailed/icon@3x.png" alt="">
      <p>您还没有收支明细哦~</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data: function () {
      return {
        items: [],
        page_index: 0,
        loading: true,
        state: true
      }
    },
    mounted: function () {
      this.loadMore()
    },
    methods: {
      loadMore: function () {
        this.page_index++
        var data = this.$Login.oauth_token
        data.page_index = this.page_index
        this.$axios.cashback_record(data).then(res => {
          if (res.data.qing_code === 303 && this.page_index === 1) {
            this.state = false
            this.loading = true
            return
          }
          if (res.data.qing_code === 303) {
            this.loading = true
            return
          }
          this.loading = false
          this.items.push.apply(this.items, res.data.qing_data.cashbackRecords)
        })
      },
      goReflect: function () {
        this.$router.push({path: 'Reflect'})
      }
    },
    components: {}
  }
</script>

<style scoped>
  @import "../../assets/css/views/Detailed/index.css";
</style>
