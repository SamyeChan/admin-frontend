/* 初始化下拉框选项 - 有多少项，初始化多少个 */
let optionArr1 = null
const initOptions = data => {
  optionArr1 = data
}

/* 搜索配置 - 非必须 */
const options = {
  // TODO - 详细配置在组件内
}
/* 数据配置 */
const props = [
  {
    prop: 'id',
    label: 'ID',
    type: 'input', // input(默认)/select/date/datetime
    placeholder: 'ss' // 自定义提示语
  },
  {
    prop: 'name',
    label: '名称'
  },
  {
    prop: 'type',
    label: '类型1',
    type: 'select',
    // 前端定义
    optionArr: [
      {
        id: 0,
        label: '选项1'
      }
    ]
  },
  {
    prop: 'type',
    label: '类型',
    type: 'select',
    // 从后台获取
    optionArr: optionArr1
  },
  {
    prop: 'date',
    label: '日期',
    type: 'date',
    format: 'yyyy-MM' // 日期格式
  }
]

/**
 * 常用操作 - 此处定义逻辑，若含请求均定义于父组件中
 */

export default { initOptions, props, options }
