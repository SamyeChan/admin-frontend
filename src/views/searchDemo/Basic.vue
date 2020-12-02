<template>
  <CSearch
    :options="searchConfig.options"
    :propset="searchConfig.props"
    @res="resSearch"
  />
</template>

<script>
import CSearch from '@/components/content/search'
// import { getOptions } from '@/api/demo'

export default {
  name: 'SearchDemo', // 搜索组件使用demo
  components: { CSearch },
  data() {
    return {
      // 请求参数
      params: {},
      // - - - - - - - - - - - - search - - - - -
      searchConfig: {
        options: {
          size: 'mini', // 大小 - large/medium/small/mini
          round: false, // 是否圆角
          labelPosition: 'left', // 标签位置 - right/left
          labelWidth: 70, // 标签宽度(px)
          inputWidth: 200, // 输入宽度(px)
          hasResetBtn: true, // 是否有重置按钮
          buttonStyle: 'margin-left: 10px;'
        },
        props: [
          {
            type: 'input',
            prop: 'propInput1', // 搜索字段名【必须】
            label: '输入框', // 搜索项名称（不设置则不显示）
            placeholder: '' // 搜索提示语（不设置则默认显示：请输入xxx）
          },
          {
            type: 'input',
            prop: 'propInput2', // 搜索字段名【必须】
            label: '输入框', // 搜索项名称（不设置则不显示）
            placeholder: '' // 搜索提示语（不设置则默认显示：请输入xxx）
          },
          {
            type: 'select',
            prop: 'propSelect1', // 搜索字段名【必须】
            label: '选择框', // 搜索项名称（不设置则不显示）
            placeholder: '', // 搜索提示语（不设置则默认显示：请输入xxx）
            optionArr: () => {
              return [
                {
                  val: 0,
                  label: '不是的'
                },
                {
                  val: 1,
                  label: '是的'
                }
              ]
            }
          },
          {
            type: 'select',
            prop: 'propSelect2', // 搜索字段名【必须】
            label: '选择框', // 搜索项名称（不设置则不显示）
            placeholder: '', // 搜索提示语（不设置则默认显示：请输入xxx）
            optionArr: () => {
              // const data = await getOptions()
              // let arr = []
              // data.forEach(item => {
              //   arr.push({
              //     val: item.id,
              //     label: item.label
              //   })
              // })
              // return arr
              return []
            }
          }
        ]
      }
    }
  },
  methods: {
    // RES - 响应搜索变化
    resSearch(params) {
      // 重置分页值
      this.params.current = 1
      this.params.size = 10
      // 赋予搜索值
      this.params = Object.assign(this.params, params)
      //TODO - 表格请求
    }
  }
}
</script>
