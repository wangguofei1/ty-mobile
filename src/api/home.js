import api from './index'
import request from '@/utils/request'

export function getCommodityList(data) {
  return request({
    url: api.getCommodityList,
    method: 'post',
    data,
    hideloading: true
  })
}
// 年度DOT
export function queryDot(query) {
  return request({
    url: '/api/index/queryDot',
    method: 'post',
    params: query
  })
}
// 销售额
export function querySalesPrice(query) {
  return request({
    url: '/api/index/querySalesPrice',
    method: 'post',
    params: query
  })
}
// 销售数量
export function querySalesNum(query) {
  return request({
    url: '/api/index/querySalesNum',
    method: 'post',
    params: query
  })
}
// 患者数量
export function querySalesInfo(query) {
  return request({
    url: '/api/index/querySalesInfo',
    method: 'post',
    params: query
  })
}