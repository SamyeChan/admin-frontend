/**
 * 公共基础方法类
 *  01. UtilMethods
 */
export class UtilMethods {

  // - - - - - - - - - - - - I. 判断 - - -

   /**
   * 【判断是否为指定的数据类型】
   * 
   * @description 
   * - 数据类型
   *   01.简单/原始数据类型：Undefined、Null、Boolean、Number、String、Symbol
   *   02.复杂数据类型：Object（Array、Function、Data）
   * - 判断方式 --> typeof
   * 
   * @return {Boolean}
   */

  isUndefined(object) {
    return typeof object === 'undefined'
  }
  
  isNull(object) {
    return !object && typeof object === 'object' && object == undefined
  }

  isBoolean(object) {
    return typeof object === 'boolean'
  }

  // isFinite() --> 判断参数是否为一个有限数值
  isNumber(object) {
    return typeof object === 'number' && isFinite(object)
  }

  isString(object) {
    return typeof object === 'string'
  }

  isSymbol(object) {
    return typeof object === 'symbol'
  }

  // 此处Object包含对象、数组、方法，及null
  isObject(object) {
    return typeof object === 'object'
  }

  // 函数在ECMA中被认为是对象，但其不是一种数据类型
  isFunction(object) {
    return typeof object === 'function'
  }

  /**
   * 判断数组的方法: 01. Array.isArray(obj) 
   *                 02. obj instanceof Array
   *                 03. obj.constructor === Array
   */
  isArray(object) {
    return Array.isArray(object)
  }

  /**
   * 【检测参数的数据类型】
   * null|number|object|array|undefined|boolean|string|symbol|function
   * 
   * @return {String}
   */
  checkDataType(d) {
    // null
    if (this.isNull(d)) {
      return 'null'
    }
    // number
    if (this.isNumber(d)) {
      return 'number'
    }
    // object|array
    if (this.isObject(d)) {
      if (this.isArray(d)) {
        return 'array'
      } else {
        return 'object'
      }
    }
    // undefined|boolean|string|symbol|function
    return typeof d
  }

  /**
   * 【检查参数是否为空】
   * 
   * @description 认定为空的数据：null undefined NaN '' {} []
   * 
   * @return {Boolean}
   */
  checkIsEmpty(d) {
    // 过滤Boolean：true/false
    if (this.isBoolean(d)) return false
    // 过滤数字：解决误删0/1设置下的0
    if (this.isNumber(d)) return false
    // 校验：null undefined NaN ''
    if (!d) return true
    // 校验：{} []
    if (JSON.stringify(d) === '{}' || JSON.stringify(d) === '[]') return true
    return false
  }

  // - - - - - - - - - - - - II. 操作 - - -

  /**
   * 深度拷贝，递归实现
   * @param {*} d
   */
  deepCopy(d) {
    let clone
    if (d && typeof d === 'object') {
      // 引用类型(array, object)
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
