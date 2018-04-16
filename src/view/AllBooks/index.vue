<template>
  <div class="AllBooks">
    <div class="content">
      <div class="booksbodyer">
        <div class="head">
          <div class="left">
            <i class="iconfont icon-wodeshujia"></i>
            <span>我的书架</span>
          </div>
          <div class="right" @click="Edit">
            <span>{{edittext}}</span>
            <i class="iconfont icon-jinru" v-if="false"></i>
          </div>
        </div>
        <ul>
          <li class="body" v-for="(item,i) in Books" :key="i" v-if="Books.length>0">
            <div class="books" v-infinite-scroll="update"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-distance="total">
              <div @click="setarr(book)" v-for="(book,j) in item " :key="book.book_id">
                <img :src="book.book_cover">
                <div class="icon" :class="{'active':book.is_true===1}" v-if="edit!==0&&book.is_true!==-1">
                  <i class="iconfont icon-xuanzhong" v-if="book.is_true===0"></i>
                  <img src="../../assets/img/Master/true.gif" v-if="book.is_true===1" alt="">
                </div>
              </div>
            </div>
            <div class="bottom"></div>
          </li>
        </ul>
      </div>
    </div>
    <transition
      name="fadeIn"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown">
      <div class="foot" v-show="edit!==0">
        <div class="btn">
          <btn :obj="btnstyle" :text="btntext" v-on:statr="Delete"></btn>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import btn from '../../components/btn/index'

  export default {
    name: 'index',
    data: function () {
      return {
        edit: 0,
        Browsing: 0,
        edittext: '编辑',
        items: {},
        loading: true,
        data: {
          page_index: 0
        },
        books_data: [],
        // books: [],
        btnstyle:
          {
            backgroundColor: '#ccc',
            color:
              '#fff',
            width:
              '100%',
            height:
              '3.5rem',
            fontSize:
              '1.5rem',
            fontWeight:
              'normal',
            opacity:
              1,
            boxShadow:
              '0 10px 24px 0 rgba(0, 0, 0, 0.08)'
          }
        ,
        btntext: '删除书籍',
        ids: [],
        Books: [],
        listboss: []
      }
    },
    created: function () {
    },
    computed: {
      Bookss: {
        get: function () {
          return this.tojson(this.books_data)
        },
        set: function (obj) {
          this.books_data = obj
        }
      }
    },
    mounted: function () {
      this.update()
      // this.booklist = this.tojson(this.data)
    },
    watch: {
      'ids': 'activefun'
    },
    methods: {
      format: function () {

      },
      update: function () {
        this.data.page_index += 1
        console.log(this.data.page_index)
        this.$axios.books_shelf_list(this.data).then(res => {
          if (res.data.qing_code === 303) {
            this.loading = true
            return
          }
          if (res.data.qing_data.total > this.data.page_index) {
            this.loading = true
          } else {
            this.loading = false
          }
          if (res.data.qing_data.last_book) {
            this.total = res.data.qing_data.total + 2
            this.items = res.data.qing_data
          }
          this.books_data.push.apply(this.books_data, res.data.qing_data.book_shelf)
          this.books_data.forEach((item, i) => {
            item.is_true = 0
            item.index = i
          })
          console.log(this.books_data)
          this.Books = this.tojson(this.books_data)
        })
      },
      Edit: function () {
        if (this.edit === 0) {
          this.edit = 1
          this.edittext = '取消'
        } else {
          this.edit = 0
          this.edittext = '编辑'
        }
      },
      activefun: function (val) {
        if (val.length > 0) {
          this.btnstyle.boxShadow = '0 10px 24px 0 rgba(46, 185, 255, 0.4)'
          this.btnstyle.backgroundColor = '#2eb9ff'
        } else {
          this.btnstyle.boxShadow = '0 10px 24px 0 rgba(0, 0, 0, 0.08)'
          this.btnstyle.backgroundColor = '#ccc'
        }
      },
      tojson: function (arr) {
        var arrs = [{book_cover: require('../../assets/img/BookShelf/chang1.png'), is_true: -1, index: -1, book_id: -1}]
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
      setarr: function (obj) {
        var _this = this
        if (obj.index === -1) {
          this.go('Collection')
          return false
        }
        var arr = []
        arr = arr.concat(this.books_data)
        if (this.edit === 0) {
          this.goChapters(obj.book_id)
        } else if (this.edit = 1) {
          if (arr[obj.index].is_true === 0) {
            arr[obj.index].is_true = 1
          } else if (arr[obj.index].is_true === 1) {
            arr[obj.index].is_true = 0
          }
          this.Books = this.tojson(arr)
          _this.ids = []
          arr.forEach((item) => {
            if (item.is_true === 1) {
              _this.ids.push(item.user_books_read_record_id)
            }
          })
        }
      },
      Delete: function () {
        if (this.ids.length === 0) {
          return
        }
        this.$axios.book_delete({user_books_read_record_ids: this.ids}).then(res => {
          if (res.data.qing_code === 100) {
            this.data.page_index = 0
            this.books_data = []
            this.update()
          }
        })
      }
    },
    components: {btn}
  }
</script>

<style scoped>
  @import "../../assets/css/views/AllBooks/index.css";
</style>
