import UtilChecks from './index'

/**
 * element-ui表单校验类 - 检查数据规则（String）
 */
export class ElFormChecks {
  /**
   * 待校验数据处理：
   *   1- 类型转换 --> String；
   *   2- 非空；
   *   3- 前后去空； 
   * @param {*} value 
   */
  val_trim(value) {
    return String(value).trim()
  }

  //
  nameErr() {}
}