/**
 *  后端定义状态码
 *
 *  @description 详见：http://119.23.107.222/department4/atom#response
 */

const CODE = {
  SUCCESS: 1000, // 请求成功 - data（返数据）
  // INVALID_PARAM: 2001, // 无效参数 - data（弹错误）
  ILLEGAL_PARAM: 2002, // 非法参数 - data（弹错误）
  SERVER_ERR: 3000, // 服务器错误
  TONEN_FAIL: 4001, // token失效
  SESSION_FAIL: 4002, // session失效
  NO_AUTH: 4003, // 未授权 - data（弹错误）
  REDIRECT: 5000, // 重定向 - data（url跳转）
  FORWARD: 5001, // 转发
  BUSSINESS_ERR: 6000, // 业务异常 - data（弹错误）
  UNKNOW: 9000 // 未知异常
}
export default { ...CODE }

//! FIXME - 1. 详细错误描述置于data，概括性错误描述置于msg？2. 特殊异常错误描述置于data，非特殊异常错误描述置于msg？
