/**
 * @description 系统配置
 * @author samyechan
 */

/**
 * - - - - - - - - - 基础信息 - - -
 */
const TITLE_CN = 'CC' // 系统中文名称
// const TITLE_SUB = '' // 系统副标题（）
const TITLE_ABBR = 'CC' // 系统名称代号or缩写（loading标识）
const TITLE_LOGO = require('@/assets/default-avatar.png') // 系统logo
const LYENTECH = require('@/assets/lyentech.png') // 联云logo（必须）
/**
 * - - - - - - - - - 功能启用 - - -
 */
const HAS_BREADCRUMB = false // 是否开启面包屑
const HAS_AVATAR = true // 是否含有用户头像

export default {
  TITLE_CN,
  // TITLE_SUB,
  TITLE_ABBR,
  TITLE_LOGO,
  LYENTECH,
  HAS_BREADCRUMB,
  HAS_AVATAR
}
