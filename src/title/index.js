import Vue from 'vue'

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})
Vue.directive('btn', {
  bind: function (e) {
    // console.log(e)
  },
  inserted: function (el, binding) {
    // console.log(binding)
    // console.log(el.dataset)
    // console.log(el)
    document.title = el.dataset.title
  }
})
Vue.filter("capitalize", function (val) {
  return (parseInt(val) / 1000).toFixed(1);
});
Vue.filter("double", function (val) {
  return parseFloat(val).toFixed(2);
});
Vue.filter("Playtime", function (val) {
  var time = val * 1000
  var Minu = new Date(time).getMinutes() < 10 ? '0' + new Date(time).getMinutes() : new Date(time).getMinutes()
  var Ses = new Date(time).getSeconds() < 10 ? '0' + new Date(time).getSeconds() : new Date(time).getSeconds()
  return Minu + ':' + Ses;
});
