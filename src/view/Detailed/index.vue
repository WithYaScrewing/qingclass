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
        state: false,
        items: [],
        page_index: 0,
        loading: false
      }
    },
    mounted: function () {
      // this.loadMore()
    },
    methods: {
      loadMore: function () {
        var self = this
        this.page_index++
        var data = this.$Login.oauth_token
        data.page_index = this.page_index
        this.$axios.transaction_record(data).then(res => {
          if (data.page_index === 1 && res.data.qing_code === 303) {
            this.state = false
            this.loading = true
            return
          }
          if (res.data.qing_code === 303) {
            this.loading = true
            return
          }
          res.data.qing_data.forEach(function (item) {
            item.create_time = item.create_time.split(' ')[0].split('-')[0] + '年' + item.create_time.split(' ')[0].split('-')[1] + '月' + item.create_time.split(' ')[0].split('-')[2] + '日'
            item.currency = item.currency.toFixed(2)
          })
          self.items.push.apply(self.items, res.data.qing_data)
          // Vue.set(self.items)
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
