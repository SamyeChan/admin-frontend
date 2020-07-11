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
git clone git@github.com:SamyeChan/admin-frontend.git
   or
git clone https://github.com/SamyeChan/admin-frontend.git
#安装依赖
npm install
#启动项目
npm run serve
```

## 代码库 & 接口

1. Gitlab:
```bash
SSH:   git@github.com:SamyeChan/admin-frontend.git
HTTPS: https://github.com/SamyeChan/admin-frontend.git
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
│   │   ├── layout       // 布局类
│   │   │   ├── breadcrumb
│   │   │   └── menu
│   │   └── content      // 内容类
│   │   │   ├── imgPreview
│   │   │   ├── table
│   │   │   └── pagination
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

```
│   ├── components       // 公共组件
│   │   ├── layout       // 布局类
│   │   │   ├── ...
│   │   │   ├── breadcrumb
│   │   │   └── menu
│   │   └── content      // 内容类
│   │   │   ├── ...
│   │   │   ├── imgPreview
│   │   │   ├── table
│   │   │   └── pagination
```


## DONE & TODO

#### 整体模板

- [x] 从Ark中剥离模板；
- [x] 路由配置；
- [x] http配置（全局 + api模块）；
- [ ] 单/多级菜单（折叠菜单选中样式）；
- [x] 无权限处理 --> 判断依据：菜单数量；
- [x] 404处理 --> 需要匹配在最后项，故挂载于权限路由表中；
- [ ] 个人中心下拉框配置；

#### 布局组件

- [ ] 面包屑；
- [ ] 菜单栏；
- [ ] 用户栏；

#### 内容组件

- [ ] 表格；
- [ ] 分页；
- [ ] 搜索（普通/远程）；
- [ ] 下拉框（普通/远程）；
- [ ] 时间选择控件；
- [ ] 表单；
- [ ] 图片显示；
- [ ] 图片上传；
- [ ] 文件上传；
- [ ] 文件下载；
- [ ] 拓展项组件；
- [ ] 图表；
- [ ] 对话框；
- [ ] 标签选择栏；
- [ ] 回到顶部；

#### 方法

- [ ] 表单校验（常用正则）；
- [ ] 常用方法；
- [ ] 异步；


#### DEMO模块

##### 表格

- [ ] 基础表格页；
- [ ] 分页表格页；
- [ ] 搜索表格页；

##### 表单

- [ ] 基础表单页；
- [ ] 含图片上传表单页；

##### 地图


#### 其它

- [ ] iframe引入；
- [ ] 链接复制；
- [ ] 刷新后应保持先前页面位置；
- [x] 静态路由菜单位置先于动态路由；
- [ ] 啥时候用Message，啥时候用Notification