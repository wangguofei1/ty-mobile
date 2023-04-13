import request from '@/utils/request'
import { uploadUrl } from '@/config'
import axios from 'axios'
export function queryTaskList(data) {
  return request({
    url: 'api/demo/task/grid',
    method: 'get',
    params: data
  })
}

export function queryTaskDetail(data) {
  return request({
    url: 'api/demo/task/find',
    method: 'get',
    params: data
  })
}

// 图片上传
export function uploadFile(data) {
  const formData = new FormData()
  formData.append('file', data)
  const url = uploadUrl
  return axios.post(url, formData)
}

export function save(data) {
  return request({
    url: 'api/demo/task/save',
    method: 'post',
    data
  })
}

export function queryTaskDeatil(data){
  return request({
    url: 'api/demo/task/check/detail/query',
    method: 'get',
    params:{taskCheckId:data}
  })
}

export function submitTaskDeatil(data){
  return request({
    url: 'api/demo/task/execute',
    method: 'POST',
    data
  })
}

export function sign(data) {
  return request({
    url: 'api/demo/task/sign',
    method: 'post',
    data
  })
}