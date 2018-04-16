<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="str in img" @click="imgclick(str.adver_link)">
        <img :src="str.adver_cover" alt="">
      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-white"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  import Json from '../../Json/a.json'

  export default {
    name: 'index',
    data: function () {
      return {
        listImg: Json
      }
    },
    props: ['ImgObj'],
    computed: {
      img: {
        get: function () {
          return this.ImgObj
        }
      }
    },
    mounted: function () {
      var _this = this
      var Timeout = setTimeout(() => {
        if (_this.ImgObj.length === 1) {
          clearTimeout(Timeout)
        } else {
          _this.lubo()
        }
      }, 300)
    },
    methods: {
      lubo: function () {
        var swiper = new Swiper('.swiper-container', {
          // pagination: '.swiper-pagination',
          paginationClickable: false,
          loop: true,
          speed: 600,
          parallax: true,
          autoplay: true,
          delay: 1000,
          pagination: {
            el: '.swiper-pagination',
          },
          onTouchEnd: function () {
            swiper.startAutoplay()
          }
        })
      },
      imgclick: function (href) {
        window.location.href = href
      }
    },
    components: {}
  }
</script>

<style scoped>
  @import "../../assets/css/components/Banner/index.css";
</style>
