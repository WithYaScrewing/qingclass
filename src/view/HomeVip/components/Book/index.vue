<template>
  <div :class="{'Book':state===1,'Books':state===0}">
    <div class="content">
      <div class="header" v-if="items&&items!=={}">
        <div class="img">
          <!--<img src="../../../../assets/img/BookShelf/chang1.png" alt="">-->
          <img :src="items.book_cover" @click="detail(items.book_id)" alt="">
        </div>
        <div class="text">
          <div class="title">{{items.book_name}}</div>
          <div class="doc doc1">阅读至第{{items.chapter_no}}章</div>
          <div class="doc doc2">共{{items.word_number|capitalize}}万字，已读{{items.read_word_number|capitalize}}万字</div>
          <div class="btn">
            <div class="">
              <btn :obj="btnstyle" :text="btntext" v-on:statr="goPlaying(items.book_id)"></btn>
            </div>
          </div>
        </div>
      </div>
      <div class="booksbodyer">
        <div class="head">
          <div class="left">
            <i class="iconfont icon-wodeshujia"></i>
            <span>我的书架</span>
          </div>
          <div class="right" @click="go('AllBooks')">
            <span>全部</span>
            <i class="iconfont icon-jinru"></i>
          </div>
        </div>
        <div class="body" v-for="(item,i) in Books" :key="i">
          <div class="books">
            <div v-for="a in item" :key="a.book_id" @click="detail(a.book_id)">
              <!--<img src="../../../../assets/img/BookShelf/chang1.png" alt="">-->
              <img :src="a.book_cover" alt="">
            </div>
          </div>
          <div class="bottom"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import btn from '../../../../components/btn/index'

  export default {
    name: 'index',
    data: function () {
      return {
        btnstyle: {
          backgroundColor: '#ffd000',
          color: '#66440a',
          width: '100%',
          height: '4rem',
          opacity: 1,
          boxShadow: '0 8px 24px 0 rgba(255, 208, 0, 0.4)'
        },
        btntext: '开始今日阅读',
        books: [],
        state: 0,
        items: {}
      }
    },
    mounted: function () {
      this.update()
    },
    computed: {
      Books: {
        get: function () {
          var book = this.tojson(this.books)
          return book
        },
        set: function (obj) {
          // this.data = obj
        }
      }
    },
    methods: {
      go: function (str) {
        return this.$router.push({
          name: str
        })
      },
      goChapters: function (id) {
        this.$router.push({
          name: 'Chapter',
          query: {
            book_id: id
          }
        })
      },
      tojson: function (arr) {
        var arrs = [{
          book_cover: require('../../../../assets/img/BookShelf/chang1.png'),
          is: -1,
          user_books_read_record_id: -1,
          book_id: -1,
          index: -1,
          id: -1
        }]
        arr.forEach((item, i) => {
          item.is = 0
          item.index = i
        })
        arrs = arrs.concat(arr)
        var num = 3;
        var Arr = new Array(Math.ceil(arrs.length / num));
        for (var i = 0; i < Arr.length; i++) {
          Arr[i] = new Array();
          for (var j = 0; j < num; j++) {
            Arr[i][j] = '';
          }
        }
        for (var i = 0; i < arrs.length; i++) {
          Arr[parseInt(i / num)][i % num] = arrs[i];
        }
        return Arr
      },
      update: function () {
        this.$axios.books_shelf_list({page_index: 1}).then(res => {
          if (res.data.qing_code !== 100) {
            this.state = 0
            return
          }
          this.state = 1
          this.books = res.data.qing_data.book_shelf
          this.items = res.data.qing_data.last_book
        })
      },
      goPlaying: function (i) {
        return this.$router.push({
          name: 'Playing',
          query: {book_id: i}
        })
      },
      detail: function (id) {
        if (id === -1) {
          this.go('Collection')
        } else {
          this.goChapters(id)
        }
      }
    },
    components: {btn}
  }
</script>

<style scoped>
  @import "../../../../assets/css/components/Home/Book/index.css";
</style>
