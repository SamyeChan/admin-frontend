// 公共类

/**
 * 公共基础方法类
 */
export class UtilMethods {
  /**
   * 深度拷贝,递归实现
   * @param {*} d
   */
  deepCopy(d) {
    let clone
    if (d && typeof d === 'object') {
      // 引用类型(array,object)
      clone = Array.isArray(d) ? [] : {}
      for (let key in d) {
        if (typeof d[key] === 'object' && d[key]) {
          clone[key] = this.deepCopy(d[key])
        } else {
          clone[key] = d[key]
        }
      }
    } else {
      clone = d
    }
    return clone
  }

  /**
   * 检查是否为空
   * null undefined NaN 0 '' {} []
   * @param {*} d
   * @return {Boolean}
   */
  checkIsEmpty(d) {
    if (!d) return true
    if (JSON.stringify(d) === '{}' || JSON.stringify(d) === '[]') return true
    return false
  }

  /**
   * 检测数据类型: string|number|undefined|null|array|function|object
   */
  checkDataType(d) {
    if (typeof d === 'object') {
      if (d) {
        if (Array.isArray(d)) {
          return 'array'
        } else {
          return 'object'
        }
      } else {
        return 'null'
      }
    }
    return typeof d
  }

  /**
   * 删除对象中值为空的属性
   * @param {Object} d 源对象
   * @return {Object} 返回一个新的对象
   */
  delEmptyObjItem(d) {
    let obj = this.deepCopy(d)
    if (this.checkDataType(obj) === 'object') {
      for (let key in obj) {
        if (this.checkIsEmpty(obj[key])) {
          delete obj[key]
        }
      }
      return obj
    } else {
      console.error('delEmptyObjItem error: param is not object')
    }
  }

  /**
   * 该方法用于修改对象数组的属性值,也可以为对象添加新的key/val;根据id可深度匹配修改。
   * @param {Object|Array} sourceData 源数据
   * @param {String|Number} id 数组中每个对象的唯一id
   * @param {String} key 被修改的属性名
   * @param {any} val 被修改的属性值
   * @returns 返回修改后的新对象数组
   */
  setConfigOption(sourceData, { id, key, val }) {
    let newData = this.deepCopy(sourceData)
    let isMatched = false
    if (_isObjectArray(newData)) {
      for (let i in newData) {
        for (let j in newData[i]) {
          if (newData[i].id && newData[i].id.toString() === id.toString()) {
            newData[i] = Object.assign(newData[i], {
              [key]: val
            })
            isMatched = true
          }
          if (!isMatched && _isObjectArray(newData[i][j])) {
            newData[i][j] = this.setConfigOption(newData[i][j], {
              id,
              key,
              val
            })
          }
        }
      }
    }
    return newData
    /**
     * 检测是否为对象数组
     * @param {Array} d
     * @return {Boolean} true/false
     */
    function _isObjectArray(d) {
      if (Array.isArray(d)) {
        let count = 0
        for (let i in d) {
          if (typeof d[i] === 'object' && d[i]) {
            count++
          }
        }
        if (count === d.length) return true
      }
      return false
    }
  }

  /**
   * 为字符串类型的属性去掉空格
   * 支持对象，数组；不支持递归
   */
  trimString(params) {
    if (params) {
      if (typeof params === 'object') {
        for (let key in params) {
          if (typeof params[key] === 'string') {
            params[key] = params[key].trim()
          }
        }
      }
      if (typeof params === 'string') {
        return params.trim()
      }
      return params
    }
    return params
  }
}

/**
 * 公共缓存方法类
 * @param {String} [storageTypes="sessionStorage"] sessionStorage/localStorage
 */
export class Storage extends UtilMethods {
  constructor(type = 'sessionStorage') {
    super() // 子类必须添加
    this.storageTypes = type
  }

  /**
   * 从浏览器缓存中获取数据，支持获取单个或多个key-value
   * @param {String,Array} keys
   * @return {*} 返回对应value或者values
   */
  get(keys) {
    if (this.checkDataType(keys) === 'array') {
      let values = []
      keys.forEach(key => {
        values.push(JSON.parse(window[this.storageTypes].getItem(key)))
      })
      return values
    }
    if (this.checkDataType(keys) === 'string') {
      return JSON.parse(window[this.storageTypes].getItem(keys))
    }
    console.error('get(keys): keys is not String or Array')
  }

  /**
   * 添加到浏览器缓存，同时存储多个key-val
   * @param {Object} obj
   */
  set(obj) {
    Object.keys(obj).forEach(key => {
      window[this.storageTypes].setItem(key, JSON.stringify(obj[key]))
    })
  }

  /**
   * 清空某个Storage全部缓存
   */
  clear() {
    window[this.storageTypes].clear()
  }

  /**
   * 从浏览器缓存中删除数据，支持删除单个或多个key-value
   * @param {String,Array} keys
   * @return 返回对应value或者values
   */
  remove(keys) {
    if (this.checkDataType(keys) === 'array') {
      keys.forEach(key => {
        window[this.storageTypes].removeItem(key)
      })
    } else if (this.checkDataType(keys) === 'string') {
      window[this.storageTypes].removeItem(keys)
    } else {
      console.error('remove(keys): keys is not String or Array')
    }
  }
}
