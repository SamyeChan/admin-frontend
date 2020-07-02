# admin-frontend 后台管理系统脚手架

```
@startTime --> 20200701
@author samyechan
@description 剥离于Ark公共资源系统项目，旨在更便捷地进行后台管理项目搭建，并不断完善中~~~

版本：vue|vue-cli|npm|element-ui
```
[点击，开发文档直达~~~]()

## 本地运行

```bash
#拉代码
git clone [-b 分支] git@119.23.107.222:department4/xxx.git
   or
git clone [-b 分支] http://119.23.107.222/department4/xxx.git
#安装依赖
npm install
#启动项目
npm run serve
```

## 代码库 & 接口

1. Gitlab:
```bash
SSH:  git@119.23.107.222:department4/xxx.git
HTTP: http://119.23.107.222/department4/xxx.git
```
2. YApi：https://yapi.leayun.cn/mock/142/proj/

## 基础目录

```
│
├── public               // 静态资源
│   ├── ...
│   ├── template.xlsx    // 批量上传设备模板
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── api
│   │   ├── auth.js      // 权限相关（Md接入模板文件）
│   │   └── ...
│   ├── assets           // 公共资源（scss、图片等）
│   │   ├── common.scss
│   │   └── ...
│   ├── components       // 公共组件
│   │   ├── breadcrumb
│   │   ├── imgPreview
│   │   ├── menu
│   │   ├── pagination
│   │   ├── table
│   │   └── tagInput
│   ├── http
│   │   ├── error.js     // 异常状态码
│   │   └── index.js     // axios封装
│   ├── plugins          // 第三方
│   │   └── element.js   // element-ui
│   ├── router
│   │   ├── constant.js  // 静态路由
│   │   ├── dynamic.js   // 动态路由
│   │   └── index.js
│   ├── store
│   │   ├── module
│   │   │   └── permission.js   // 用户信息 + 权限路由生成
│   │   ├── index.js
│   │   └── types.js
│   ├── utils
│   │   ├── check.js      // 表单校验相关
│   │   ├── index.js      // 公共方法
│   │   └── util.js       // 工具类方法
│   ├── views
│   │   ├── commoditySet      // 商品管理
│   │   │   └── ...
│   │   ├── lotterySet        // 抽奖设置
│   │   │   └── ...
│   │   ├── moduleSet         // 页面模块
│   │   │   └── ...
│   │   ├── Error404.vue         // 404
│   │   ├── Home.vue             // 系统主页面结构
│   │   └── NoAuth.vue           // 无权限页
│   ├── App.vue               // 第一种
│   └── main.js
├── ...
├── package.json
├── README.md
└── vue.config.js
```
## 开发小文档

### 接入Md

### 路由配置

```
│
├── router             // 路由相关
│   ├── constant.js    // 静态路由配置
│   ├── dynamic.js     // 动态路由配置
│   └── index.js       // 路由守卫、挂载等
```

### 请求转发 + api模块化配置

```
│
├── api             // 请求api模块
│   ├── auth.js     // 权限相关
│   └── ...         // [各模块api配置]
├── ...
├── http            // axios封装
│   ├── codeDef.js  // 状态码定义
│   └── index.js    // 请求配置
```

### 多组件引入


## DONE & TODO

##### 整体模板

- [x] 从Ark中剥离模板；
- [ ] 路由配置；
- [x] http配置（全局 + api模块）；
- [ ] 单/多级菜单；
- [ ] 无权限处理 --> 判断依据；
- [ ] 404处理；
- [ ] 个人中心下拉框配置；

##### 组件

- [ ] 表格；
- [ ] 分页；
- [ ] 操作；
- [ ] 搜索；
- [ ] 图片显示；
- [ ] 图片上传；
- [ ] 文件上传；
- [ ] 拓展项组件；
- [ ] 面包屑；
- [ ] 图片预览；


##### 方法

- [ ] 表单校验（常用正则）；
- [ ] 常用方法；
- [ ] 异步；


##### DEMO模块

- [ ] 基础版（List + Detial）；

##### 其它

- [ ] iframe引入；
- [ ] 链接复制；
- [ ] 刷新后应保持先前页面位置；
- [ ] 啥时候用Message，啥时候用Notification