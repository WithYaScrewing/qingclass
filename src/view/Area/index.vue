<template>
  <div class="Area" @touchmove="Moves" ref="Area">
    <div class="Area-content">
      <ul class="Area-ul" ref="ul" id='ul'>
        <li class="Area-selected" v-for=" (item,index) in items" :id="index">
          <p class="Area-blue">{{item.name}}</p>
          <ul v-for=" a in item.list">
            <li @click="gocode(a.country_name,a.areacode)">
              <p>{{a.country_name}}</p>
              <p>+{{a.areacode}}</p>
            </li>
          </ul>
        </li>
      </ul>
      <div class="Area-nav">
        <ul v-for="(item,index) in items">
          <li @touchstart="goindex(index)">{{item.name.substring(0, 1) }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Json from '../../Json/Area.json'
  import $ from 'jquery'

  export default {
    name: 'index',
    data: function () {
      return {
        msg: 0,
        items: Json,
      }
    },
    mounted: function () {
      // console.log(this.$Login.oauth_token)
      this.updata(this.$Login.oauth_token)
    },
    methods: {
      Moves: function () {
        this.msg = this.$refs.Area.scrollTop()
      },
      goindex: function (i) {
        $('.Area').animate({
          scrollTop: this.$refs.ul.childNodes[i].offsetTop
        })
      },
      updata: function (data) {
        this.$axios.country_code(data).then((res) => {
          this.items[0].list.push.apply(this.items[0].list, res.data.qing_data)
        })
      },
      gocode: function (name, Area) {
        this.$router.push({name: 'Binding', query: {name: name, Area: Area}})
      },
    },
    components: {}
  }
</script>

<style scoped>
  @import "../../assets/css/views/Area/index.css";
</style>
