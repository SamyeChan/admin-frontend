/**
 * 权限相关接口集合
 */
import http from '@/http'

const prefix = '/auth' // 模块api前缀

// - - - - - - - - - - - - - - - Md 相关 - - -

/**
 * GET | 用户信息 --> 登录后拿到用户【个人信息】，未登录则返回登陆页面地址（Md重定向）
 */
export const getUserInfo = () => http({ url: `${prefix}/me` })

/**
 * GET | 用户权限路由 --> 登录后拿到用户【权限路由】，未登录则返回登陆页面地址（Md重定向）
 */
export const getUserMenu = () => http({ url: `${prefix}/menu0` })

/**
 * GET | 获取登录或登出成功后的重定向地址 //! 这是个啥子
 */
export const getLoginUrl = () => http({ url: `${prefix}/sign_in` })

/**
 * POST | 退出系统
 */
export const logout = () => http({ url: `${prefix}/logout`, method: 'POST' })

// - - - - - - - - - - - - - - - 其它 - - -

/**
 * GET | 获取OSS临时凭证
 */
export const getToken = () => http({ url: `${prefix}/getToken` })
