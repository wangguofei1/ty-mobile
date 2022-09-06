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