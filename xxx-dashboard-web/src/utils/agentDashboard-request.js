import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { getCurrentProject } from '@/utils/project'
import qs from 'qs'

import router from '@/router' // 确保导入了Vue路由器实例

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_AGENT_DASHBOARD_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (config.method === 'get') {
      config.paramsSerializer = function(params) {
        return qs.stringify(params, { arrayFormat: 'comma' })
      }
    }
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      config.headers['Authorization'] = getToken()
      config.headers['Accept'] = 'application/json, text/plain, */*'
    }

    const currentProject = getCurrentProject()
    if (currentProject != undefined && currentProject != null && Object.keys(currentProject).length != 0) {
      config.headers['CurrentProjectId'] = currentProject.id
    }
    // console.log(config.headers)
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

  /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      console.log('requset.js err: ' + res.code) // for debug
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    if (error && error.response && error.response.status) {
      switch (error.response.status) {
        case 400:
          Message({
            message: error.response.data.message,
            type: 'error',
            duration: 5 * 1000
          })
          return
        case 401:
          Message({
            message: error.response.data.message,
            type: 'error',
            duration: 5 * 1000
          })
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
          return Promise.reject(error.response.data.message)
        case 404:
          // do something...
          break
        case 403:
          Message({
            message: error.response.data.message,
            type: 'error',
            duration: 5 * 1000
          })
          router.push('/403') // 在这里重定向到403路由
          return Promise.reject(error)
        default:
          // do something...
          break
      }
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
