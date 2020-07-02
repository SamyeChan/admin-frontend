/**
 * xxx相关接口集合
 */
import http from '@/http'

const prefix = '/demo' // 模块api前缀

/**
 * GET | 一般用于获取数据
 *
 * @param xxx
 */
export const getX = () => http({ url: `${prefix}/xxx` })

/**
 * POST | 一般用于写入数据
 *
 * @param data
 */
export const postX = data =>
  http({ url: `${prefix}/xxx`, method: 'POST', data: { data } })

/**
 * PUT | 一般用于更新数据
 *
 * @param data
 */
export const putX = data =>
  http({ url: `${prefix}/xxx`, method: 'PUT', data: { data } })

/**
 * DELETE | 单个删除
 *
 * @param id
 */
export const delX = id => http({ url: `${prefix}/xxx/${id}`, method: 'DELETE' })
