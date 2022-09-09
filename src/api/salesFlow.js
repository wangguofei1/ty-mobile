import api from './index'
import request from '@/utils/request'

export function queryHospitalSales(data) {
  return request({
    url: api.queryHospitalSales,
    method: 'post',
    params: data,
    hideloading: true
  })
}
export function queryHospitalOfficeSales(data) {
  return request({
    url: api.queryHospitalOfficeSales,
    method: 'post',
    params: data,
    hideloading: true
  })
}
export function queryShopInfo(data) {
  return request({
    url: api.queryShopInfo,
    method: 'get',
    params: data,
    hideloading: true
  })
}
export function getPatientStructure(data) {
  return request({
    url: api.queryPatientStructure,
    method: 'get',
    params: data
  })
}
export function queryShopSaleAnalysis(data) {
  return request({
      url: api.queryShopSaleAnalysis,
      method: 'get',
      params:data,
  })
}
