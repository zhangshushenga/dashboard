import moment from 'moment'

export function getNowTs() {
  return new Date().getTime()
}

export function nowDateString() {
  const date = new Date()
  const dateNumFun = (num) => num < 10 ? `0${num}` : num
  const [Y, M, D] = [
    date.getFullYear(),
    dateNumFun(date.getMonth() + 1),
    dateNumFun(date.getDate()),
    dateNumFun(date.getHours()),
    dateNumFun(date.getMinutes()),
    dateNumFun(date.getSeconds())
  ]
  const weekArr = ['日', '一', '二', '三', '四', '五', '六']
  const weekday = date.getDay()
  return `${Y}年${M}月${D}日  星期${weekArr[weekday]}`
}

export function nowDateString2(hour) {
  const date = new Date()
  var dateArr = moment(date).utcOffset(60 * hour).toString().split(' ')
  return dateArr[1] + ' ' + dateArr[2] + ',' + dateArr[3]
}

export function nowTimeString(hour) {
  const date = new Date() + ''
  return moment(date).utcOffset(60 * hour).format('HH:mm:ss')
}

export function ts2StringWithOffset(ts, hour) {
  const date = new Date(ts)
  var dateArr = moment(date).utcOffset(60 * hour)
  var year_num = dateArr.year()
  var week_num = dateArr.week() - 1
  var weekday_num = dateArr.weekday()
  if (dateArr.weekday() === 0) {
    week_num -= 1
    weekday_num = 7
  }
  if (week_num === 0) {
    week_num = 52
  }
  return [dateArr.format('yyyy-MM-DD'), year_num, week_num, weekday_num]
}

export function dateTransTs2String(ts) {
  if (!ts) {
    return ''
  } else {
    const date = new Date(ts)
    const dateNumFun = (num) => num < 10 ? `0${num}` : num
    const [M, D, h, m] = [
      date.getFullYear(),
      dateNumFun(date.getMonth() + 1),
      dateNumFun(date.getDate()),
      dateNumFun(date.getHours()),
      dateNumFun(date.getMinutes()),
      dateNumFun(date.getSeconds())
    ]
    return `${M}/${D} ${h}:${m}`
  }
}

export function transTs2String(ts) {
  if (!ts) {
    return '0000-00-00 00:00:00'
  } else {
    const date = new Date(ts)
    var dateArr = moment(date)
    return dateArr.format('yyyy-MM-DD HH:mm:ss')
  }
}

export function dateTransToString(date) {
  if (!date) {
    return ''
  } else {
    if (typeof date === 'string') {
      return date
    }
    const dateNumFun = (num) => num < 10 ? `0${num}` : num
    const [Y, M, D, h, m, s] = [
      date.getFullYear(),
      dateNumFun(date.getMonth() + 1),
      dateNumFun(date.getDate()),
      dateNumFun(date.getHours()),
      dateNumFun(date.getMinutes()),
      dateNumFun(date.getSeconds())
    ]
    // yyyy-MM-dd HH:mm:ss
    return `${Y}-${M}-${D} ${h}:${m}:${s}`
  }
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

/**
 * 秒转时分秒
 * @param {*} second 秒
 * @returns 
 */
export function changetime(second) {
  var secondTime = parseInt(second);// 秒
  var minuteTime = 0;// 分
  var hourTime = 0;// 小时
  if (secondTime > 60) {//如果秒数大于60，将秒数转换成整数
    //获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt(secondTime / 60);
    //获取秒数，秒数取佘，得到整数秒数
    secondTime = parseInt(secondTime % 60);
    //如果分钟大于60，将分钟转换成小时
    if (minuteTime > 60) {
      //获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt(minuteTime / 60);
      //获取小时后取佘的分，获取分钟除以60取佘的分
      minuteTime = parseInt(minuteTime % 60);
    }
  }

  var time = "";

  if(secondTime > 0){
    time = parseInt(secondTime) + "s";
  }
  
  if (minuteTime > 0) {
    time = "" + parseInt(minuteTime) + "min" + time;
  }
  if (hourTime > 0) {
    time = "" + parseInt(hourTime) + "h" + time;
  }
  return time;
}
