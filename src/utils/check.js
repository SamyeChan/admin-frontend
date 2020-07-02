import { Message } from 'element-ui'
/**
 * 公共方法类 - 检查数据规则
 */
export class UtilChecks {
  /**
   * --------------------- 数据校验 ---------------------
   *
   * @return isPass --> 是否通过
   */

  /**
   * 特殊字符
   * @param {*} value
   */
  spc_char(value) {
    let isMatch = false // 是否通过校验
    const val = !value ? '' : value.trim() // 去除首尾空格
    const regFormat = /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im
    if (val.length > 0 && regFormat.test(val)) {
      isMatch = true
      Message.error('搜索项不含特殊字符')
    }
    return isMatch
  }
  /**
   * 中文 + 英文大小写 + 数字
   * @param {*} value
   */
  zh_en_num(value) {
    let isPass = false // 是否通过校验
    const val = !value ? '' : value // 去除首尾空格
    const regFormat = /^[a-zA-Z0-9\u4E00-\u9FA5]+$/ // 格式校验
    if (val.length > 0 && regFormat.test(val)) {
      isPass = true
    }
    return isPass
  }
  /**
   * 整数
   * @param {*} value
   */
  num_int(value) {
    let isPass = false // 是否通过校验
    const val = !value ? '' : value.trim() // 去除首尾空格
    const regFormat = /^[1-9]\d*$/ // 格式校验
    if (val.length > 0 && regFormat.test(val)) {
      isPass = true
    }
    return isPass
  }
  /**
   * 手机号码（国内）
   * @param {*} value
   */
  tel_zh_mb(value) {
    let isPass = false // 是否通过校验
    const val = !value ? '' : value.trim() // 去除首尾空格
    const regFormat = /^1[3456789]\d{9}$/ // 格式校验
    if (val.length > 0 && regFormat.test(val)) {
      isPass = true
    }
    return isPass
  }
  /**
   * 固定电话（国内）--> 3-4位区号 + 7-8位号码
   * @param {*} value
   */
  tel_zh_fixed(value) {
    let isPass = false // 是否通过校验
    const val = !value ? '' : value.trim() // 去除首尾空格
    const regFormat = /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/ // 格式校验
    if (val.length > 0 && regFormat.test(val)) {
      isPass = true
    }
    return isPass
  }
  /**
   * 中文姓名 --> 1. 2-16位；
   *             2. 汉字、·、•组成（即支持如“迪丽热巴·迪力木拉提”这样的名字）；
   * @param {*} value
   */
  name_zh(value) {
    let isPass = false // 是否通过校验
    const val = !value ? '' : value.trim() // 去除首尾空格
    const regFormat = /^[\u4E00-\u9FA5\uf900-\ufa2d·•s]{2,16}$/ // 格式校验
    if (val.length > 0 && regFormat.test(val)) {
      isPass = true
    }
    return isPass
  }
  /**
   * 统一社会信用代码（18位）
   *
   * --> 数字或者大写字母组成，但是字母不包括 I、O、Z、S、V，五部分组成：
   *     1. 登记管理部门代码1位 (数字或大写英文字母)
   *     2. 机构类别代码1位 (数字或大写英文字母)
   *     3. 登记管理机关行政区划码6位 (数字)
   *     4. 主体标识码（组织机构代码）9位 (数字或大写英文字母)
   *     5. 校验码1位 (数字或大写英文字母)
   * @param {*} value
   */
  unified_social_credit_code_18(value) {
    let isPass = false // 是否通过校验
    const val = !value ? '' : value.trim() // 去除首尾空格
    const regFormat = /[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/ // 格式校验
    if (val.length > 0 && regFormat.test(val)) {
      isPass = true
    }
    return isPass
  }
  /**
   * 统一社会信用代码（15位）--> 旧工商注册代码
   * @param {*} value
   */
  unified_social_credit_code_15(value) {
    let isPass = false // 是否通过校验
    const val = !value ? '' : value.trim() // 去除首尾空格
    const regFormat = /[1-9]\d{15}/ // 格式校验
    if (val.length > 0 && regFormat.test(val)) {
      isPass = true
    }
    return isPass
  }
  /**
   * 统一社会信用代码（18位+15位）
   * @param {*} value
   */
  unified_social_credit_code(value) {
    let isPass = false // 是否通过校验
    const val = !value ? '' : value.trim() // 去除首尾空格
    const regFormat = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/ // 格式校验
    if (val.length > 0 && regFormat.test(val)) {
      isPass = true
    }
    return isPass
  }

  /**
   * --------------------- 数据校验（element-ui：form） ---------------------
   *
   * @return null / 错误信息 --> 均为去空检查
   */

  /**
   * 单独判空
   */
  checkNullErr(value, label) {
    let errText = null // 错误信息
    // const val = !value ? '' : value.trim() // 去除首尾空格
    const val = value
    if (val === '') {
      errText = `${label}为必填项`
    }
    return errText
  }
  /**
   * 名称 --> 中文 + 英文 + 数字
   */
  checkNameErr(value, label, min, max) {
    let errText = null // 错误信息
    const val = !value ? '' : value // 去除首尾空格
    const len = val.length
    if (val === '') {
      errText = `请输入${label}`
    } else if (!this.zh_en_num(val)) {
      errText = `${label}仅由中英文、数字组成`
    } else if (len < min) {
      errText = `最少 ${min} 位`
    } else if (len > max) {
      errText = `最大限制为 ${max} 位`
    }
    return errText
  }
  /**
   * 名称 --> 仅限制长度
   */
  checkNameLengthErr(value, label, min, max) {
    let errText = null // 错误信息
    const val = !value ? '' : value.trim() // 去除首尾空格
    const len = val.length
    if (val === '') {
      errText = `请输入${label}`
    } else if (len < min) {
      errText = `最少 ${min} 位`
    } else if (len > max) {
      errText = `最大限制为 ${max} 位`
    }
    return errText
  }
  /**
   * 名称 --> 中文 + 英文 + 数字 + (:);-
   */
  checkZhEnIntSpcErr(value, label) {
    let errText = null // 错误信息
    const val = !value ? '' : value.trim() // 去除首尾空格
    const regFormat = /^[():\-——；;（）：a-zA-Z0-9\u4E00-\u9FA5 ]+$/
    if (val === '') {
      errText = `请输入${label}`
    } else if (!regFormat.test(val)) {
      errText = `${label}仅由中英文、数字以及(、)、：、;、-等字符组成`
    }
    return errText
  }
  /**
   * 中文姓名 --> 1. 2-5位；
   *             2. 汉字、·、•组成（即支持如“迪丽热巴·迪力木拉提”这样的名字）；
   */
  checkChineseNameErr(value, label) {
    let errText = null // 错误信息
    const val = !value ? '' : value.trim() // 去除首尾空格
    if (val === '') {
      errText = `请输入${label}`
    } else if (!this.name_zh(val)) {
      errText = '请输入正确的中文名称'
    }
    return errText
  }
  /**
   * 手机号码 + 固定电话
   */
  checkTelErr(value, label) {
    let errText = null // 错误信息
    const val = !value ? '' : value.trim() // 去除首尾空格
    if (val === '') {
      errText = `请输入${label}`
    } else if (!this.tel_zh_mb(val) && !this.tel_zh_fixed(val)) {
      errText = '请输入正确的手机号码或固定电话'
    }
    return errText
  }
  /**
   * 数字校验 --> 整数
   */
  checkIntegerErr(value, label) {
    let errText = null // 错误信息
    const val = value.toString().trim() // 去除首尾空格
    if (val === '') {
      errText = `请输入${label}`
    } else if (!this.num_int(val)) {
      errText = '请输入整数数据'
    }
    return errText
  }
  /**
   * 统一社会信用代码（18位+15位）
   */
  checkUSCCErr(value) {
    let errText = null // 错误信息
    const val = !value ? '' : value.trim() // 去除首尾空格
    if (!this.unified_social_credit_code(val)) {
      errText = '请输入正确的15位或18位统一社会信用代码'
    }
    return errText
  }
  /**
   * 长文本（仅限制长度）
   */
  checkTextAreaErr(value, min, max) {
    let errText = null // 错误信息
    const val = !value ? '' : value.trim()
    const len = val.length // 去除首尾空格
    if (val === '') {
      errText = `该项为必填项`
    } else if (len > 0 && len < min) {
      errText = `至少输入 ${min} 个字符`
    } else if (len > max) {
      errText = '输入超过最大限制'
    }
    return errText
  }
}

// ----- 名称 -----

/**
 * 用户名 --> 1. 字母开头；
 *           2. 5-20位；
 *           3. 字母、数字、下划线组成；
 *
 * @description isAdd --> 是否为添加（添加时不验证空值）
 */
export const checkNameErr = (value, isAdd) => {
  let errText = null // 错误信息
  const val = !value ? '' : value.trim() // 去除首尾空格
  const regStart = /[a-z,A-Z]/i // 首位校验
  const regFormat = /^[A-Za-z0-9_]*$/ // 格式校验
  if (val === '') {
    isAdd && (errText = '请输入用户名')
  } else if (!regStart.test(val[0])) {
    errText = '用户名要以字母开头'
  } else if (val.indexOf(' ') !== -1) {
    errText = '用户名不能含有空格'
  } else if (!regFormat.test(val)) {
    errText = '用户名仅由字母、数字、下划线组成'
  } else if (val.length < 5) {
    errText = '用户名不能少于5位'
  } else if (val.length > 20) {
    errText = '用户名不能超过20位'
  }
  return errText
}

// ----- 常见规则 -----
/**
 * 车牌（普通+新能源）
 */
export const checkLicense = value => {
  let errText = null // 错误信息
  const val = !value ? '' : value.trim() // 去除首尾空格
  const regFormat = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/ // 车牌校验
  if (val === '') {
    errText = '请输入车牌号'
  } else if (val.length < 7) {
    errText = true
    // 1-7位不做校验 --> 填写完整再进行校验
  } else if (val.length > 8) {
    errText = '请正确输入7位或8位的车牌号'
  } else if (!regFormat.test(val)) {
    errText = '请输入正确的车牌号'
  }
  return errText
}
/**
 * 特殊字符校验 --> 键盘上所有特殊字符： 全/半角
 *
 * @description 应用于搜索框（单个）
 */
export const checkSpecialCharErr = value => {
  let errText = null // 错误信息
  const val = !value ? '' : value.trim() // 去除首尾空格
  const regFormat = /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im
  if (val.length > 0 && regFormat.test(val)) {
    errText = '特殊字符'
  }
  return errText
}
/**
 * 特殊字符集合（obj）校验
 *
 * @description 应用于搜索框（多个并列）
 */
export const checkSpecialCharSetErr = obj => {
  let err = null
  for (let key in obj) {
    const str = obj[key]
    if (str) {
      // 校验
      !err && (err = checkSpecialCharErr(str))
    }
  }
  return err
}
