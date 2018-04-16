<template>
  <div class="BooksList">
    <transition
      name="fadeIn"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown">
      <div class="body" v-show="books">
        <div class="img" @click="go(books.book_id)">
          <!--<img src="../../assets/img/BookShelf/chang1.png" alt="">-->
          <img :src="books.book_cover" alt="">
        </div>
        <div class="text">
          <div class="title">
            <div class="name">
              {{books.book_name}}
            </div>
            <div class="btn">
              <div class="" v-show="books.collection_state==0" @click.stop='to(books)'>
                <i class="iconfont icon-tianjia"></i><span>添加到书架</span>
              </div>

              <div class="already" v-show="books.collection_state!=0">
                <i class="iconfont icon-yitianjia"></i><span>已添加</span>
              </div>
            </div>
          </div>
          <div class="popup-text">
            <span>共{{books.word_number|capitalize}}万字</span>
            <span>词汇量>{{books.recommend_word}}</span>
          </div>
          <div class="doc">
            {{books.book_desc}}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'books-list',
    data: function () {
      return {}
    },
    props: ['obj', 'text'],
    computed: {
      books: {
        get: function () {
          return this.obj
        },
        set: function (v) {
          this.obj = v
        }
      }
    },
    mounted: function () {
    },
    methods: {
      to: function (obj) {
        this.$emit('add', obj)
      },
      go: function (obj) {
        this.$emit('go', obj)
      }
    },
    components: {}
  }
</script>

<style scoped>
  @import "../../assets/css/components/BooksList/index.css";
</style>
