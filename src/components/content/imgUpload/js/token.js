import { getToken } from '@/api/auth'
// import config from './config'

// 适配器
export function getCosToken() {
  return new Promise((resolve, reject) => {
    getToken()
      .then(res => {
        let {
          endpoint,
          accessKeyId,
          accessKeySecret,
          securityToken,
          bucket,
          expiration,
          startTime
        } = res.data.data
        resolve({
          endpoint,
          accessKeyId,
          accessKeySecret,
          securityToken,
          bucket,
          expiration,
          startTime
        })
      })
      .catch(err => {
        reject(err)
      })
  })
}
