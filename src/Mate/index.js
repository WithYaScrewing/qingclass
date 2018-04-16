export default {
  Pagetouch: {
    y: 0,
    X: 0
  },
  scheduleTouch: {
    Progress: 0,
    x: 0
  },
  offsetWidth: 0,
  lastscheduleTouch: {
    x: 0
  },
  qingReadTextRetuen: function (str) {
    str = str.replace(/&amp;/g, '&')
    str = str.replace(/&lt;/g, '<')
    str = str.replace(/&gt;/g, '>')
    str = str.replace(/color: rgb\([0-255], [0-255], [0-255]\);/g, '')
    str = str.replace(/font-size: 16px;/g, '')
    return str
  },
  qingReads: function (str) {
    str = str.replace(/&amp;/g, '&')
    str = str.replace(/&lt;/g, '<')
    str = str.replace(/&gt;/g, '>')
    str = str.replace(/&quot;/g, '"')
    return str
  },
  fetch: function (lrc) {
    var list = []
    var lines = lrc.split('[')
    for (var k in lines) {
      var timeMatch = lines[k].match(/(\d+:\d+\.\d+)\]/)
      list.push({
        time: timeMatch ? timeMatch.pop() : '',
        text: lines[k].replace(/^.+?\]/, '')
      })
    }
    return list
  },
  Playtime: function (val) {
    var startTime = new Date(val * 1000)
    return `${(startTime.getMinutes() < 10) ? ('0' + startTime.getMinutes()) : startTime.getMinutes()}:${(startTime.getSeconds() < 10) ? ('0' + startTime.getSeconds()) : startTime.getSeconds()}.${(parseInt(startTime.getMilliseconds() / 10) < 10) ? ('0' + parseInt(startTime.getMilliseconds() / 10)) : parseInt(startTime.getMilliseconds() / 10)}`
  },
  PageStart: function (e) {
    this.Pagetouch.y = e.changedTouches[0].clientY
    this.Pagetouch.x = e.changedTouches[0].clientX
  },
  PageMove: function (e, callak) {
    let touch = e.changedTouches[0]
    let offsetY = touch.clientY - this.Pagetouch.y
    let offsetX = touch.clientX - this.Pagetouch.x
    if (offsetY >= 80 || offsetY <= -200) {
      callak({
        direction: 'y',
        is: true
      })
    } else {
      callak({
        direction: 'y',
        is: false
      })
    }
    if (offsetX >= 180 || offsetX <= -120) {
      callak({
        direction: 'x',
        is: true
      })
    } else {
      callak({
        direction: 'x',
        is: false
      })
    }
  },
  scheduleStart: function (e, val, targetWidth) {
    this.scheduleTouch.x = e.changedTouches[0].clientX
    this.scheduleTouch.Progress = val
    this.offsetWidth = targetWidth
  },
  scheduleMove: function (e) {
    e && e.preventDefault()
    let touch = e.changedTouches[0]
    this.lastscheduleTouch.x = touch.clientX
    let offsetX = touch.clientX - this.scheduleTouch.x
    var num = parseFloat((offsetX / this.offsetWidth * 100).toFixed(2)) + this.scheduleTouch.Progress
    if (num >= 100) {
      num = 100
    }
    if (num <= 0) {
      num = 0
    }
    return num
  },
  scheduleEnd: function (duration) {
    let offsetX = this.lastscheduleTouch.x - this.scheduleTouch.x
    var endTime = parseInt(duration)
    var progress = Number((offsetX / this.offsetWidth * 100).toFixed(2))
    var curPlayTime = parseInt((endTime * progress / 100).toFixed(2))
    return curPlayTime
  }
}
