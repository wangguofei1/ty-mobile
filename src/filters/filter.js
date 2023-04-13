/**
 *格式化时间
 *yyyy-MM-dd hh:mm:ss
 */
export function formatDate(time, fmt) {
  if (time === undefined || '') {
    return
  }
  const date = new Date(time)
  fmt = fmt || 'yyyy-MM-dd hh:mm:ss'
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
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
/*
 * 隐藏用户手机号中间四位
 */
export function hidePhone(phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

export function statusName(value) {
  if (value.status == 0) return '待接单'
  if (value.status == 1) return '已取消'
  if (value.status == 2 && value.deliverType == 0) return '配送'
  if (value.status == 2 && value.deliverType == 1) return '上门'
  if (value.status == 2 && value.deliverType == 2) return '自提'
  if (value.status == 3) return '已完成'
}

export function deliverStatus(value) {
  if (value.deliverStatus == 1) return '配送成功'
  if (value.deliverStatus == 2) return '配送失败'
  if (value.deliverStatus == 3) return '作废'
}

export function failedReason(value) {
  if (value.failedReason == 1) return '客户拒收'
  if (value.failedReason == 2) return '无法联系客户'
  if (value.failedReason == 3) return '预约下次配送'
}

export function formatDateHM(value) {
  if (!value) return ''
  let date = ''
  if(isNaN(Date.parse(value))){
    date = new Date(Date.parse(value.replace(/-/g, '/').replace(/T/, ' ')))
  } else {
    date = new Date(value)
  }
  const y = date.getFullYear()
  let MM = date.getMonth() + 1
  MM = MM < 10 ? '0' + MM : MM
  let d = date.getDate()
  d = d < 10 ? '0' + d : d
  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  let m = date.getMinutes()
  m = m < 10 ? '0' + m : m
  return y + '-' + MM + '-' + d + ' ' + h + ':' + m
}
