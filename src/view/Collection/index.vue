<template>
  <div class="Collection" :class="{'bottom':$Login.Vip_token.reading_vip_state ===0}">
    <Banner :ImgObj="ImgObj"></Banner>
    <Inform></Inform>
    <transition
      name="fadeIn"
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutLeft">
      <div v-show="recommend_books.length!==0">
        <div class="title">
          <div class="">
            <i class="iconfont icon-zuixinshuji"></i>
            <span>最新书籍</span>
          </div>
        </div>
        <BooksList v-for="item in recommend_books " :obj="item" :key="item.book_id" v-on:add="add"
                   v-on:go="goChapter"></BooksList>
      </div>
    </transition>
    <transition
      name="fadeIn"
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutLeft">
      <div class="" v-show="all_books.length!==0">
        <div class="title">
          <div class="">
            <i class="iconfont icon-quanbushuji"></i>
            <span>全部书籍</span>
          </div>
        </div>
        <div v-infinite-scroll="Update"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="totalPage">
          <BooksList v-for="item2 in all_books" :obj="item2" :key="item2.book_id" v-on:add="add"
                     v-on:go="goChapter"></BooksList>
        </div>
      </div>
    </transition>
    <div class="Vipfooter" v-if="$Login.Vip_token.reading_vip_state ===0">
      <div class="btn">
        <btn :obj='btnstyle' :text="textbtn" v-on:statr="go('BuyVip')"></btn>
      </div>
    </div>
  </div>
</template>

<script>
  import Banner from '../../components/Banner/index'
  import Inform from '../../components/Inform/index'
  import BooksList from '../../components/BooksList/index'
  import {Toast, Indicator} from 'mint-ui'
  import btn from '../../components/btn/index'

  export default {
    name: 'index',
    data: function () {
      return {
        items: {},
        loading: true,
        data: {
          user_id: 1,
          page_index: 0
        },
        totalPage: 2,
        all_books: [],
        ImgObj: [],
        user_info: {},
        recommend_books: [],
        btnstyle: {
          backgroundColor: '#ffd000',
          width: '80%',
          color: '#66440a',
          opacity: 1
        },
        textbtn: '立即购买'
      }
    },
    mounted: function () {
      this.Upimg()
      this.Update()
    },
    methods: {
      Upimg: function () {
        this.$axios.adver_list({
          adver_type: 3
        }).then(res => {
          this.ImgObj = res.data.qing_data.adver_info
          this.user_info = res.data.qing_data.user_info
        })
      },
      Update: function () {
        this.data.page_index += 1
        if (this.data.page_index > 1) {
          Indicator.open({
            text: '正在加载~',
            spinnerType: 'fading-circle'
          });
        }
        this.$axios.books_list(this.data).then(res => {
          Indicator.close()
          if (this.data.page === 1 && res.data.qing_code === 303) {
            Toast({
              message: '加载完毕',
              position: 'bottom',
              duration: 2000
            })
            this.loading = true
            return false
          }
          if (res.data.qing_data.all_books) {
            this.all_books.push.apply(this.all_books, res.data.qing_data.all_books)
            this.all_books.forEach((item, i) => {
              item.index = i
              item.leng = 2
            })
          }
          if (res.data.qing_data.recommend_books) {
            this.totalPage = res.data.qing_data.total
            this.recommend_books = res.data.qing_data.recommend_books
            this.recommend_books.forEach((item, i) => {
              item.index = i
              item.leng = 1
            })
          }

        })
      },
      setdata: function (obj) {
        var list
        if (obj.leng === 1) {
          list = this.recommend_books
        } else if (obj.leng === 2) {
          list = this.all_books
        }
        list[obj.index].collection_state = 1
        if (obj.leng === 1) {
          this.recommend_books = list
        } else if (obj.leng === 2) {
          this.all_books = list
        }
      },
      add: function (obj) {
        this.$axios.books_add(obj).then(res => {
          if (res.data.qing_code !== 100) {
            return
          }
          Toast({
            message: '添加成功',
            iconClass: 'iconfont icon-tianjiachenggong',
            duration: 2000
          })
          this.setdata(obj)
        })
      },
      go: function (str) {
        this.$router.push({
          name: str
        })
      },
      goChapter: function (id) {
        this.$router.push({
          name: 'Chapter',
          query: {
            book_id: id
          }
        })
      }
    },
    components: {
      Banner,
      Inform,
      BooksList,
      btn
    }
  }
</script>

<style scoped>
  @import "../../assets/css/views/Collection/index.css";

  .bottom {
    padding-bottom: 6rem;
  }
</style>
