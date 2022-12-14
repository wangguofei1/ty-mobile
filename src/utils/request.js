import axios from 'axios'
import store from '@/store'
import router from '@/router'
import {
  Toast,
  Dialog
} from 'vant'
// 根据环境不同引入不同api地址
import {
  baseApi
} from '@/config'
// create an axios instance
const service = axios.create({
  baseURL: baseApi, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    // if (!config.hideloading) {
    //   // loading
    //   Toast.loading({
    //     forbidClick: true
    //   })
    // }
    if (localStorage.getItem('id')) {
      if(config.params && config.url.indexOf('queryShopInfo') === -1) {
        config.params.lander = localStorage.getItem('id')
      }
      if (config.data && config.url.indexOf('queryShopInfo') === -1) {
        config.data.lander = localStorage.getItem('id')
      }
      // config.headers['token'] = localStorage.getItem('id')
    } else {
      router.push({
        path: 'login'
      })
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    Toast.clear()
    const res = response.data
    // console.log(res)
    if (res.code !== 0) {
      // 登录超时,重新登录
      if (res.status === 401) {
        store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
      }
      Dialog.alert({
        title: '提示',
        message: res.msg
      })
      return Promise.reject(res || 'error')
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    Toast.clear()
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
