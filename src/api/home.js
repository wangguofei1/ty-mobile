import api from './index'
import request from '@/utils/request'

// 年度DOT
export function queryDot(query) {
  return request({
    url: api.queryDot,
    method: 'post',
    params: query
  })
}
// 销售额
export function querySalesPrice(query) {
  return request({
    url: api.querySalesPrice,
    method: 'post',
    params: query
  })
}
// 销售数量
export function querySalesNum(query) {
  return request({
    url: api.querySalesNum,
    method: 'post',
    params: query
  })
}
// 患者数量
export function querySalesInfo(query) {
  return request({
    url: api.querySalesInfo,
    method: 'post',
    params: query
  })
}
// 每月销售柱状图
export function queryMonthSalesPrice(query) {
  return request({
    url: api.queryMonthSalesPrice,
    method: 'post',
    params: query
  })
}
// 销售排行榜
export function queryShopSale(query) {
  return request({
    url: api.queryShopSale,
    method: 'post',
    params: query
  })
}