/* 获取父组件中的this环境 */
let vm = null
const sendThis = _this => {
  vm = _this
}

/* 按钮配置 - 非必须 */
const options = {
  // TODO - 详细配置在组件内
}
/* 数据配置 */
const sets = [
  {
    label: '按钮1'
  },
  {
    label: '按钮2'
  },
  {
    label: '按钮3'
  },
  {
    label: '按钮4'
  },
  {
    label: '按钮5'
  },
  {
    label: '按钮6'
  }
]

/**
 * 常用操作 - 此处定义逻辑，若含请求均定义于父组件中
 */

export default { sendThis, sets, options }
