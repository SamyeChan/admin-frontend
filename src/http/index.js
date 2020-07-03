import axios from 'axios'
import { Message } from 'element-ui'
import CODE from './codeDef'

// 自定义状态码
const { SUCCESS, ILLEGAL_PARAM, NO_AUTH, REDIRECT, BUSSINESS_ERR } = CODE
// 项目请求url基本路径
const PROJ_PREFIX = '/proj'

// - - - - - - - - - - - - - - - - - - - - - - - -

// 创建实例
const http = axios.create({
  baseURL: PROJ_PREFIX, // 配置基本路径
  timeout: 10000, // 超时限定 - 10000ms
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  withCredentials: true, // 跨域携带凭证cookie
  validateStatus: function(status) {
    return status < 500
  }
})

// 请求拦截
http.interceptors.request.use(
  config => {
    const req = { ...config }
    if (!req.method) req.method = 'GET' // 默认GET请求
    return req
  },
  error => Promise.reject(error)
)

// 响应拦截
http.interceptors.response.use(
  res => {
    const {
      status,
      data: { code, data, msg }
    } = res
    if (status === 200) {
      if (code === SUCCESS) {
        // 请求成功
        return Promise.resolve(data)
      } else {
        // 请求错误 --> 报错无规范，按具体开发而定 //! FIXME
        switch (code) {
          case REDIRECT: // 重定向
            window.location.href = data
            return Promise.reject(res)
          case BUSSINESS_ERR: // 业务异常
          case ILLEGAL_PARAM: // 非法参数
          case NO_AUTH: // 未授权
            Message.error(data)
            return Promise.reject(res)
        }
      }
    }
    // 未正常相应的错误，提示报错并返回相应错误信息
    Message.error(msg || '未知')
    return Promise.reject(res)
  },
  err => {
    if (err && err.msg && err.msg.includes('timeout')) {
      Message.error('请求超时')
    } else {
      //! FIXME - 啥情况，文案要不要改一下
      Message.error('服务器异常')
    }
    return Promise.reject(err)
  }
)

export default http
