<template>
  <div class="Answer" id="Answer">
    <div ref="Answer">
      <div class="Question">
        <div class="num">
          <span>{{Id==0?1:Id}}</span><span>/{{Answer.length}}</span>
        </div>
        <div class="topic">
          {{question_options.question_stem}}
        </div>
      </div>
      <div class="Options">
        <div
          v-for="(item,i) in question_options.question_options"
          :class="{'true-active': item.is_true=== 1, 'false-active animated shake':item.is_true===2 }"
          @click="options(item,i)">
          {{item.op_name}}
          <p>
            <i class="iconfont icon-xuanzhong" v-if="item.is_true=== 1"></i>
            <i class="iconfont icon-guanbi" v-if="item.is_true=== 2"></i>
          </p>
        </div>
      </div>
    </div>
    <div v-show="IsAnswer" class="Answerdoc">
      <div class="title">
        <i></i>
        本题解析
        <i></i>
      </div>
      <div class="doc">
        {{question_options.answer_desc}}
      </div>
      <div class="btn">
        <btn :obj="btnstyle" :text="btntext" v-on:statr="carry"></btn>
      </div>
    </div>
    <AnswerExam v-if="isAnswerExam" v-on:Continue="Continue" v-on:Punch="Punch" v-on:closed="closed"
                :obj="exam"></AnswerExam>
  </div>
</template>

<script>
  import btn from '../../components/btn/index'
  import $ from 'jquery'
  import AnswerExam from '../../components/AnswerExam/index'

  export default {
    name: 'index',
    data: function () {
      return {
        btnstyle: {
          opacity: 1,
          boxShadow: '0 10px 24px 0 rgba(46, 185, 255, 0.4)'
        },
        btntext: '下一题',
        data: this.$route.query,
        itmes: {},
        Answer: [],
        Id: 0,
        IsAnswer: false,
        question_options: {},
        bank_id: [],
        Options: [],
        exam: {},
        isAnswerExam: false
      }
    },
    mounted: function () {
      this.updata(this.data)
    },
    methods: {
      updata: function (data) {
        this.$axios.exam_questions(data).then(res => {
          res.data.qing_data.questions.forEach((item, i) => {
            item.question_options = JSON.parse(item.question_options)
            item.question_options.forEach((a, j) => {
              a.is_true = 0
            })
          })
          this.itmes = res.data.qing_data
          this.Answer = res.data.qing_data.questions
          this.question_options = res.data.qing_data.questions[this.Id]
          ++this.Id
        })
      },
      options: function (a, i) {
        if (this.IsAnswer) {
          return
        }
        this.IsAnswer = true
        if (this.Id === this.Answer.length && this.$store.state.reading_vip_state === 1) {
          this.btntext = '完成本章阅读'
        } else if (this.Id === this.Answer.length && this.$store.state.reading_vip_state === 0) {
          this.btnstyle = {
            backgroundColor: '#ffd000',
            width: '80%',
            color: '#66440a',
            opacity: 1
          }
          this.btntext = '立即购买'
        }
        this.$nextTick(() => {
          var obj = this.question_options
          this.bank_id.push(obj.question_bank_id)
          this.Options.push(obj.question_options[i].options_id)
          if (obj.correct_options_id === a.options_id) {
            obj.question_options[i].is_true = 1
          } else {
            obj.question_options[i].is_true = 2
          }
          this.question_options = obj
          if (obj.question_options[i].is_true === 2) {
            var _this = this
            setTimeout(() => {
              $('#Answer').animate({
                scrollTop: _this.$refs.Answer.offsetHeight + 30
              }, 500)
            }, 300)
          } else {
            $('#Answer').animate({
              scrollTop: this.$refs.Answer.offsetHeight + 30
            }, 500)
          }
        })
        // Vue.set(this.question_options)
      },
      carry: function () {
        if (this.Answer.length === this.Id) {
          this.submit()
          return
        }
        this.question_options = {}
        this.IsAnswer = false
        this.question_options = this.Answer[this.Id]
        $('#Answer').animate({
          scrollTop: 0
        })
        ++this.Id
      },
      submit: function () {
        if (this.$store.state.reading_vip_state === 0) {
          this.go('BuyVip')
          return
        }
        var obj = {
          test_info_id: this.itmes.test_info_id,
          question_bank_id: this.bank_id,
          question_options: this.Options
        }
        this.$axios.exam(obj).then(res => {
          this.exam = res.data.qing_data
          this.isAnswerExam = true
        })
      },
      Continue: function () {
        this.isAnswerExam = false
        this.goPlaying()
      },
      Punch: function () {
        this.isAnswerExam = false
        this.goCard()
      },
      closed: function () {
        this.isAnswerExam = false
      },
      goPlaying: function () {
        if (this.exam.is_complete === 1) {
          this.$router.push({
            name: 'Chapter',
            query: {
              book_id: this.exam.book_id,
              is_complete: this.exam.is_complete
            }
          })
        } else {
          this.$router.push({
            name: 'Playing',
            query: {
              book_id: this.exam.book_id
            }
          })
        }
      },
      goCard: function () {
        this.$router.push({
          name: 'VipCard',
          query: {
            chapter_id: this.exam.chapter_id,
            book_id: this.exam.book_id
          }
        })
      },
      go: function (str) {
        this.$router.push({
          name: str
        })
      }
    },
    components: {btn, AnswerExam}
  }
</script>

<style scoped>
  @import "../../assets/css/views/Answer/index.css";
</style>
