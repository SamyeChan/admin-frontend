const COS = require('cos-js-sdk-v5')
const md5 = require('js-md5')

export function createUpload(
  file,
  {
    progress,
    success,
    error,
    pause,
    resume,
    del,
    complete,
    fileInfo,
    adapter,
    baseObjectKey
  }
) {
  let client = null // COS实例
  let taskId = null // 任务ID，用于暂停/重传
  let sts = createStsToken(adapter)
  let isSuccess = false // 是否上传成功
  let fileBackup = file instanceof File ? file : base64ToFile(file) // 判断是否File对象 --> 否，则转为File对象
  const { fileId, objectKey } = generateObjectKey(fileBackup.name) // 生成fileId和objectKey
  //! c --> 上传前的
  const uid = fileBackup.uid
  // 最终上传完成后，返回完整数据
  const fileObj = {
    fileId,
    name: fileBackup.name,
    size: fileBackup.size,
    type: fileBackup.type
  }

  /**
   * 处理成功函数
   */
  function handleSuccess(result) {
    const protocol = 'https://'
    //! c
    success && success({ uid, url: protocol + result.Location })
    isSuccess = true
    if (fileObj.width && fileObj.height) {
      complete && complete(fileObj)
    }
  }
  /**
   * 处理失败函数
   */
  function handleError(err) {
    //! c
    error && error({ uid, err })
    console.error(err)
  }

  function randomStr(length, chars) {
    var result = ''
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)]
    return result
  }
  /**
   * base64转化成file对象
   * @param {*} base64
   */
  function base64ToFile(base64) {
    const isBase64 = /base64/.test(base64)
    if (!isBase64) {
      console.error('base64ToFile error: file format error')
      return
    }
    const type = base64.split(';base64')[0].split('image/')[1]
    const name = randomStr(
      8,
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    )
    let arr = base64.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], `${name}.${type}`, { type: mime })
  }
  /**
   * 根据文件id，仅供前端使用
   * @param {String} filename 文件名称，可选。如不填，则以随机字符串代替
   * @returns {String} id
   */
  function generateFileId(filename) {
    const timestamp = new Date().getTime()
    if (filename) {
      let name = filename.replace(' ', '')
      const fileType = name.split('.').pop()
      let name1 = name.replace(`.${fileType}`, '')
      const idMd5 = md5(`${name1}_${timestamp}`)
      let id = `${idMd5}.${fileType}`
      return id
    } else {
      console.error('generateFileId error: filename is not empty')
    }
  }

  /**
   * 文件存放策略, 生成Object-key
   * @param {Object} fileName 文件名称
   * @param {String} baseKey object-key前缀
   * @returns {Object} fileId, objectKey
   */
  function generateObjectKey(fileName, baseKey = baseObjectKey) {
    const date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    const currentdate = year + '-' + month + '-' + strDate // 当前日期
    const id = generateFileId(fileName)
    const key = baseKey + currentdate + '/' + id
    return {
      fileId: id,
      objectKey: key
    }
  }

  /**
   * 获取文件信息 --> 仅图片（宽高）
   */
  function generateFileInfo(file) {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      // 读取中
      fileReader.onload = e => {
        const url = e.target.result
        if (/image/.test(url)) {
          const img = new Image()
          img.src = url
          img.onload = () => {
            const imgWidth = img.width
            const imgHeight = img.height
            resolve({
              width: imgWidth,
              height: imgHeight
            })
          }
          img.onerror = () => {
            reject(new Error('generateLocalFileInfo error: image fail'))
          }
        }
      }
      // 读取失败
      fileReader.onerror = () => {
        reject(new Error('generateLocalFileInfo error: fileReader fail'))
      }
    })
  }

  async function upload() {
    // 创建实例
    const res = await sts.getStsToken()
    client = new COS({
      SecretId: res.accessKeyId,
      SecretKey: res.accessKeySecret,
      XCosSecurityToken: res.securityToken,
      StartTime: res.startTime, // 时间戳，单位秒
      ExpiredTime: res.expiration // 时间戳，单位秒
    })

    client.sliceUploadFile(
      {
        Bucket: res.bucket,
        Region: res.endpoint,
        Key: objectKey,
        Body: fileBackup,
        onTaskReady: function(id) {
          taskId = id
        },
        onProgress: function(progressData) {
          progress &&
            progress({
              fileId,
              percentage: Math.ceil(progressData.percent * 100)
            })
        }
      },
      function(err, data) {
        if (err) {
          console.log(err)
          handleError(err)
          return false
        }
        if (data) {
          handleSuccess(data)
        }
      }
    )
  }

  /**
   * 实例化时，会自动生成fileId
   * 开始上传必须调用start方法
   */
  class Upload {
    constructor(fileId) {
      this.fileId = fileId
      this.name = fileBackup.name
      this.size = fileBackup.size
      this.type = fileBackup.type
    }
    /**
     * 开始上传
     */
    async start() {
      upload()
      // 获取图片宽高
      generateFileInfo(fileBackup)
        .then(res => {
          fileObj.width = res.width
          fileObj.height = res.height
          fileInfo && fileInfo({ fileId, ...res })
          if (isSuccess) {
            complete && complete(fileObj)
          }
        })
        .catch(e => {
          console.error('generateFileInfo error:', e)
        })
    }
    /**
     * 暂停上传
     */
    pause() {
      client.pauseTask(taskId)
      pause && pause({ fileId })
    }
    /**
     * 继续上传
     */
    async resume() {
      client.restartTask(taskId)
      resume && resume({ fileId })
    }
    /**
     * 删除上传
     */
    delete() {
      del && del({ fileId })
      client.cancelTask(taskId)
    }

    /**
     * 重新上传
     */
    async restart() {
      const isValid = sts.checkIsValid()
      if (isValid) {
        client.restartTask(this.taskId)
      } else {
        upload()
      }
    }
  }
  return new Upload(fileId)
}

export default createUpload

/**
 *
 * @param {Function} adapter 适配器，获取后台oss token的方法，必须返回一个promise
 * @returns {Object} 返回StsToken实例
 */
function createStsToken(adapter, sessionKey = 'COS_CONFIG') {
  let timeDifference = 0 // 客户端与服务端时差
  function getToken() {
    return new Promise((resolve, reject) => {
      const token = JSON.parse(sessionStorage.getItem(sessionKey))
      if (!token) {
        if (typeof adapter === 'function') {
          adapter()
            .then(res => {
              const currentTimestamp = Math.round(new Date().getTime() / 1000)
              timeDifference = currentTimestamp - parseInt(res.startTime)
              sessionStorage.setItem(sessionKey, JSON.stringify(res))
              resolve(res)
            })
            .catch(err => {
              reject(err)
              console.error('adapter error:', err)
            })
        } else {
          const msg = 'adapter is not funtion, and return a promise'
          console.error(msg)
          throw new Error(msg)
        }
      } else {
        resolve(token)
      }
    })
  }
  function updateToken() {
    return new Promise((resolve, reject) => {
      sessionStorage.removeItem(sessionKey)
      getToken()
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  class StsToken {
    async getStsToken() {
      // token有效
      let result
      let isValid = this.checkIsValid()
      let isFirst = !sessionStorage.getItem(sessionKey)
      if (isFirst || isValid) {
        try {
          result = await getToken()
        } catch (e) {
          console.error('createUpload start error:getToken', e)
          throw new Error(e)
        }
      } else {
        // token失效
        try {
          result = await updateToken()
        } catch (e) {
          console.error('createUpload start error:updateToken', e)
          throw new Error(e)
        }
      }
      return result
    }
    /**
     * 检测token是否有效（以秒为单位）
     * @return {Boolean} true:有效 false: 失效
     */
    checkIsValid() {
      const o = JSON.parse(sessionStorage.getItem(sessionKey))
      if (o && o.expiration && o.startTime) {
        const expirationTimestamp = parseInt(o.expiration)
        const currentTimestamp = Math.round(new Date().getTime() / 1000)

        const endTime = expirationTimestamp // token 失效时间
        const currentTime = currentTimestamp + timeDifference // 客户端当前时间
        const min = 10 * 60 // 误差10分钟
        if (endTime - currentTime < min) {
          return false
        }
      }
      return true
    }
  }
  return new StsToken()
}
