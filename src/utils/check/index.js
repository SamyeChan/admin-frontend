/**
 * 公共方法类 - 检查数据规则（输入类型数据）
 * 
 * @return isPass --> true：满足 / false：不满足
 */
export class UtilChecks {
  /**
   * 待校验数据处理：
   *   1- 非空；
   *   2- String类型；
   *   3- 前后去空； 
   * @param {*} value 
   */
  val_trim(value) {
    return String(value).trim()
  }

  /**
   * 特殊字符
   * @param {*} value
   */
  spc_char(value) {
    let isPass = false // 是否通过校验
    const val = !value ? '' : value.trim() // 去除首尾空格
    const regFormat = /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im
    if (val.length > 0 && regFormat.test(val)) {
      isPass = true
    }
    return isPass
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