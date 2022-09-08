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