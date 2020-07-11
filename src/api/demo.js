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

// - - - - - - - - - - demo接口 - - -

const prefix_tb = '/table' // 模块api前缀

/**
 * GET | 获取表格 - 非分页
 *
 */
export const getTable = () => http({ url: `${prefix_tb}/list` })

/**
 * GET | 获取表格 - 分页
 *
 */
export const getTableP = ({ current, size, ...params }) =>
  http({
    url: `${prefix_tb}/listP`,
    params: {
      current,
      size,
      ...params
    }
  })

/**
 * DELETE | 单个删除
 *
 * @param id
 */
export const delRow = id =>
  http({ url: `${prefix_tb}/single/${id}`, method: 'DELETE' })

/**
 * GET | 获取下拉框项
 *
 */
export const getOptions = () => http({ url: `${prefix_tb}/options` })
