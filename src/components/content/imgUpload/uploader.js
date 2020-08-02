import { createUpload } from './js/upload'
import { getCosToken } from './js/token'

/**
 * 将适配器与核心代码封装打包
 */
function createUploader(
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
    baseObjectKey
  }
) {
  return createUpload(file, {
    progress,
    success,
    error,
    pause,
    resume,
    del,
    complete,
    fileInfo,
    baseObjectKey,
    adapter: getCosToken
  })
}

export default createUploader
