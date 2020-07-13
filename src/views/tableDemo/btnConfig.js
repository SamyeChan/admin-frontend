/* 获取父组件中的this环境 */
// let vm = null
// const sendThis = _this => {
//   vm = _this
// }
// console.log(vm)

/* 按钮配置 - 非必须 */
const options = {
  // TODO - 详细配置在组件内
  size: 'small',
  position: 'left',
  plain: false,
  round: false
}
/* 数据配置 */
const sets = [
  {
    label: '禁用按钮',
    disabled: true
  },
  {
    label: '普通按钮',
    type: 'warning',
    onClick: () => {
      alert('普通按钮')
    }
  },
  {
    label: '单个新增',
    type: 'primary',
    icon: 'el-icon-plus',
    onClick: () => {
      alert('单个新增')
    }
  },
  {
    label: '文件上传',
    type: 'success',
    icon: 'el-icon-upload',
    onClick: () => {
      alert('文件上传')
    }
  },
  {
    label: '刷新列表',
    type: 'info',
    icon: 'el-icon-refresh',
    onClick: () => {
      alert('刷新列表')
    }
  },
  {
    label: '批量删除',
    type: 'danger',
    icon: 'el-icon-delete-solid',
    onClick: () => {
      alert('批量删除')
    }
  }
]

/**
 * 常用操作 - 此处定义逻辑，若含请求均定义于父组件中
 */

export default { sets, options }
