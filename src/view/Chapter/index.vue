<template>
  <div class="Chapter">
    <div class="head">
      <div class="body">
        <div class="img">
          <!--<img src="../../assets/img/BookShelf/chang1.png" alt="">-->
          <img :src="items.book_detail.book_cover" alt="">
        </div>
        <div class="text">
          <div class="name">{{items.book_detail.book_name}}</div>
          <div class="span">
            <span>{{items.book_detail.chapter_count}}章节</span>
            <span>共{{items.book_detail.word_number|capitalize}}万字</span>
            <span>词汇量>{{items.book_detail.recommend_word}}</span>
          </div>
          <div class="btn">
            <btn :obj='btnstyle' :text="textbtn" v-on:statr="goPlayings(items.book_detail.book_id)">
            </btn>
          </div>
        </div>
      </div>
      <div class="doc">
        {{items.book_detail.book_desc}}
      </div>
    </div>
    <div class="list" v-infinite-scroll="update"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="total">
      <div class="body" v-for=" a in chapters" @click="goPlaying(a)">
        <div class="name">{{a.chapter_name}}</div>
        <div class="doc">
          <div>
            <span v-if="$store.state.reading_vip_state===1&&a.test_status!==0">{{a.test_fraction}}分</span>
            <span v-if="$store.state.reading_vip_state===1&&a.test_status===0" class="Unread">未阅读</span>
            <span v-if="$store.state.reading_vip_state===0&&a.is_free===0">立即试读</span>
            <span v-if="$store.state.reading_vip_state===0&&a.is_free!==0"><i
              class="iconfont icon-suoding"></i></span>
            <i class="iconfont icon-jinru"></i></div>
        </div>
      </div>
    </div>
    <Chapterout v-if="outpopup" v-on:Punch="Punch" v-on:closed="closed"></Chapterout>
  </div>
</template>

<script>
  import btn from '../../components/btn/index'
  import Chapterout from '../../components/Chapterout/index'
  import {mapState} from 'vuex'

  export default {
    name: 'index',
    data: function () {
      return {
        textbtn: '立即开始阅读',
        btnstyle: {
          backgroundColor: '#ffd000',
          width: '80%',
          height: '4rem',
          color: '#66440a',
          boxShadow: '0 8px 24px 0 rgba(255, 208, 0, 0.4)',
          opacity: 1
        },
        loading: false,
        chapter: {},
        total: 2,
        data: this.$route.query,
        chapters: [],
        outpopup: false,
        items: {
          book_detail: {}
        },
        reading_vip_state: this.$Login.Vip_token.reading_vip_state
      }
    },
    mounted: function () {
      // console.log(mapState)
      console.log()
      if (parseInt(this.data.is_complete) === 1) {
        this.outpopup = true
      }
      this.data.page_index = -1
      this.update()
    },
    methods: {
      update: function () {
        this.data.page_index += 1
        this.$axios.book_detail(this.data).then(res => {
          if (res.data.qing_code === 303) {
            return this.loading = true
          }
          if (res.data.qing_data.book_detail) {
            this.items = res.data.qing_data
          }
          this.chapters.push.apply(this.chapters, res.data.qing_data.chapters)
        })
      },
      goPlayings: function (i) {
        return this.$router.push({
          name: 'Playing',
          query: {book_id: i}
        })
      },
      Continue: function () {
        this.closed()
        // this.goPlaying()
      },
      Punch: function () {
        this.closed()
        this.$router.push({
          name: 'BookCard',
          query: {book_id: this.data.book_id}
        })
        // BookCard
        // this.goChapter()
      },
      closed: function () {
        this.outpopup = false
      },
      goPlaying: function (i) {
        if (i.is_free === 0 && this.reading_vip_state === 0) {
          this.$router.push({
            name: 'BuyVip'
          })
        } else if (i.is_free === 1 && this.reading_vip_state === 0) {
          this.$router.push({
            name: 'Playing',
            query: {book_id: this.$route.query.book_id, chapter_id: i.chapter_id}
          })
        } else {
          this.$router.push({
            name: 'Playing',
            query: {book_id: this.$route.query.book_id, chapter_id: i.chapter_id}
          })
        }
        // return this.$router.push({
        //   name: 'Playing',
        //   query: {book_id: this.$route.query.book_id, chapter_id: i}
        // })
      },
    },
    components: {btn, Chapterout}
  }
</script>

<style scoped>
  @import "../../assets/css/views/Chapter/index.css";
</style>
