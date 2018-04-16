<template>
  <div class="Questions">
    <div class="schedule">
      <p :style="{'width':count +'%'}"></p>
    </div>
    <div class="content">
      <div class="doc">
        {{options.question_grade_desc}}
      </div>
      <div class="topic">
        {{options.question_stem}}
      </div>
    </div>
    <div class="options">
      <ul>
        <transition
          name="bounce"
          enter-active-class="animated fadeInUp"
          leave-active-class="animated fadeOutUp"
          v-for="(a,i) in options.question_options"
          :key="a.options_id"
        >
          <li
            v-if="!is_false"
            :class="{'active-false':a.is_true===2,'active-true':a.is_true===1}"
            @click="judgment(a.options_id, options,i)">
            <div class="answer">
              {{a.op_name}}
            </div>
            <div class="icon">
              <i class="iconfont icon-guanbi"></i>
              <i class="iconfont icon-xuanzhong"></i>
            </div>
          </li>
        </transition>
        <!--<li class="active-true"></li>-->
        <!--<li class="active-false">-->
        <!--<div class="answer">桅杆；柱；旗杆</div>-->
        <!--<div class="icon">-->
        <!--<i class="iconfont icon-guanbi"></i>-->
        <!--<i class="iconfont icon-xuanzhong"></i>-->
        <!--</div>-->
        <!--</li>-->
      </ul>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'index',
    data: function () {
      return {
        options: {},
        items: [],
        grade: [],
        data: {},
        num: 0,
        count: 0,
        state: 100,
        is_true: false,
        is_false: false
      }
    },
    mounted: function () {
      var data = this.$Login.oauth_token
      data.testpaper_id = 60
      data.testing_info_id = -1
      data.current_grade = 0
      console.log()
      this.updata(data)
    },
    methods: {
      judgment: function (id, obj, i) {
        if (this.is_true) {
          return
        }
        this.is_true = true
        if (obj.correct_options_id === id) {
          this.options.question_options[i].is_true = 1
        } else {
          this.options.question_options[i].is_true = 2
        }
        this.options.question_options.forEach(function (item, i) {
          if (item.options_id === obj.correct_options_id) {
            item.is_true = 1
          }
        })
        var json = {
          question_bank_id: obj.question_bank_id,
          fraction: obj.fraction,
          ielts_score: obj.ielts_score,
          vocabulary: obj.vocabulary,
          options_id: this.options.question_options[i].options_id,
          is_correct_answer: this.options.question_options[i].is_true
        }
        this.grade.push(json)
        this.num += 1
        this.count = (this.num / this.items.questions_options.length) * 100
        var _this = this
        // _this.options.question_options = []
        setTimeout(() => {
          this.is_false = true
        }, 100)
        setTimeout(() => {
          if (_this.num >= _this.items.questions_options.length) {
            _this.data.user_answers = _this.grade
            if (_this.state === 601) {
              sessionStorage.setItem('testing', JSON.stringify(_this.data))
              return this.$router.push({
                name: 'TestResult'
              })
            } else {
              _this.updata(_this.data)
            }
          } else {
            _this.options = _this.items.questions_options[_this.num]
          }
          _this.is_true = false
          _this.is_false = false
        }, 350)
      },
      updata: function (data) {
        this.$axios.test_paper_question(data).then(res => {
          this.state = res.data.qing_code
          this.num = 0
          res.data.qing_data.questions_options.forEach((item) => {
            item.question_options = $.parseJSON(item.question_options)
            item.question_options.forEach(a => {
              a.is_true = 0
            })
          })
          data.testpaper_id = res.data.qing_data.testing_info.testpaper_id
          data.testing_info_id = res.data.qing_data.testing_info.testing_info_id
          data.chapter_id = res.data.qing_data.testing_info.chapter_id
          data.current_grade += 1
          this.data = data
          this.items = res.data.qing_data
          this.options = res.data.qing_data.questions_options[this.num]
        })
      },
    },
    components: {}
  }
</script>

<style scoped>
  @import "../../assets/css/views/Questions/index.css";
</style>
