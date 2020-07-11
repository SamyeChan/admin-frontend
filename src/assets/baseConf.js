/**
 * @description 系统配置
 * @author samyechan
 */

/**
 * - - - - - - - - - 基础信息 - - -
 */
const TITLE_CN = 'SEASON' // 系统中文名称
const TITLE_SUB = 'fufufu' // 系统副标题
const TITLE_ABBR = '' // 系统名称代号or缩写
const LYENTECH = require('@/assets/lyentech.png') // 联云logo
/**
 * - - - - - - - - - 功能启用 - - -
 */
const HAS_BREADCRUMB = false // 是否开启面包屑
const HAS_AVATAR = true // 是否含有用户头像

export default {
  TITLE_CN,
  TITLE_SUB,
  TITLE_ABBR,
  LYENTECH,
  HAS_BREADCRUMB,
  HAS_AVATAR
}
