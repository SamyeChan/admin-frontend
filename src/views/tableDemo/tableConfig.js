/* 获取父组件中的this环境 */
let vm = null
const sendThis = _this => {
  vm = _this
}

/* 表格配置 */
const options = {
  loading: false,
  size: 'mini', // mini、small、medium
  border: true,
  stripe: false
}
/* 数据配置 */
const columns = [
  {
    prop: 'id',
    label: 'ID'
  },
  {
    prop: 'name',
    label: '名称'
  },
  {
    prop: 'image',
    label: '图片',
    type: 'image',
    imgSuffix: '?x-oss-process=image/resize,h_60' // 图片资源后缀 - eg.使用OSS图片裁剪时
  },
  // {
  //   prop: 'isOn',
  //   label: '状态',
  //   type: 'switch',
  //   onSwitch: data => {
  //     switchChange(data)
  //   }
  // },
  {
    label: '操作',
    type: 'button',
    group: [
      {
        name: '查看',
        type: 'success',
        onClick: row => {
          view(row.id)
        }
      },
      {
        name: '编辑',
        type: 'primary',
        onClick: row => {
          edit(row.id)
        }
      },
      {
        name: '删除',
        type: 'danger',
        onClick: row => {
          del(row.id)
        }
      }
    ]
  }
]

/**
 * 常用操作 - 此处定义逻辑，请求均定义于父组件中
 */

/* 查看 */
const view = id => {
  // 一般是页面跳转or弹框
  alert(id)
}
/* 编辑 */
const edit = id => {
  // 一般是页面跳转or弹框
  alert(id)
}
/* 删除 */
const del = id => {
  vm.$confirm(`该操作将删除该条记录，是否继续？`, '提示', { type: 'warning' })
    .then(() => {
      vm._del(id)
      /**
       * 具体请求定义于父组件中，如：
       * 
       * _del(id) {
           console.log(id)
         }
       */
    })
    .catch(() => {
      vm.$message.info('操作已取消')
    })
}

//TODO - 状态开关
/* 状态切换 */
// const switchChange = ({ id, isOn }) => {
//   vm.$confirm(`该操作将切换该条记录状态，是否继续？`, '提示', {
//     type: 'warning'
//   })
//     .then(() => {
//       vm._switch({ id, status: isOn })
//     })
//     .catch(() => {
//       vm.$message.info('操作已取消')
//     })
// }

export default { sendThis, columns, options }
