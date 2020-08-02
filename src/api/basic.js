/**
 * xxx相关接口集合
 */
import http from '@/http'

const prefix = '/store-manager/store' // 模块api前缀

/**
 * 获取门店基础信息
 */
export const getStoreBasicInfo = clubId =>
  http({ url: `${prefix}/detail/${clubId}` })

/**
 * 获取用户组织
 */
export const getOrg = () => http({ url: `/venus/ogr` })
