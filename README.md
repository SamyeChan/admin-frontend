# admin-frontend 后台管理系统脚手架

```
@starttime    -> 20201201
@author       -> samyechan
@description  -> 剥离于GR智慧导购系统项目，旨在更便捷地进行后台管理项目搭建，并不断完善中~~~

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

## 代码库 GitHub

```bash
SSH:   git@github.com:SamyeChan/admin-frontend.git
HTTPS: https://github.com/SamyeChan/admin-frontend.git
```

#### 分支

1.  master - 主项目
2.  simple - 简易版
3.  gr - GR 相关版

## 模拟数据 Mock

```bash
YApi：https://yapi.leayun.cn/mock/142/proj/
```

## 基础目录

```
│
├── .vscode              /* = = = TODO - 编辑器规范 = = = */
├── public               /* = = = 静态资源 = = = */
│   ├── ...
│   ├── favicon.ico      // 浏览器Tab页icon
│   └── index.html       // 主页面HTML
├── src                  /* = = = 项目代码 = = = */
│   ├── api              // - - - - - 01 请求接口配置
│   │   ├── auth.js        // 权限相关（如：GR - Md接入模板文件）
│   │   └── ...            // [各模块api配置]
│   ├── assets           // - - - - - 02 公共资源（scss、图片等）
│   │   ├── common.scss
│   │   └── ...
│   ├── components       // - - - - - 03 公共组件
│   │   ├── layout         // A.布局类
│   │   │   ├── breadcrumb
│   │   │   └── menu
│   │   └── content        // B.内容类
│   │   │   ├── imgPreview
│   │   │   ├── table
│   │   │   └── pagination
│   │   ├── service        // C.业务常用类
│   │   │   ├── ...
│   │   │   └── ...
│   ├── http             // - - - - - 04 请求全局封装
│   │   ├── error.js     // 异常状态码
│   │   └── index.js
│   ├── plugins          // - - - - - 05 第三方插件
│   │   └── element.js   // element-ui
│   ├── router           // - - - - - 06 路由配置
│   │   ├── constant.js  // A.静态路由
│   │   ├── dynamic.js   // B.动态路由
│   │   └── index.js
│   ├── store            // - - - - - 07 vuex配置
│   │   ├── module
│   │   │   └── permission.js   // 用户信息 + 权限路由生成
│   │   ├── index.js
│   │   └── types.js
│   ├── utils            // - - - - - 08 公共方法
│   │   ├── check        // 校验相关
│   │   │   ├── el-form.js   // 适用于element表单的校验封装
│   │   │   └── index.js     // 常用校验
│   │   ├── index.js     // 公共方法
│   │   └── util.js      // 工具类方法
│   ├── views            // - - - - - 09 视图
│   │   ├── module01       // 模块页面01
│   │   │   └── ...
│   │   ├── module02       // 模块页面02
│   │   │   └── ...
│   │   ├── module03       // 模块页面03
│   │   │   └── ...
│   │   ├── error        // 异常页面
│   │   │   ├── 403.vue     // 403 - xxx
│   │   │   ├── 404.vue     // 404 - 页面走失
│   │   │   ├── 500.vue     // 500 - 服务器异常
│   │   │   └── NoAuth      // 无权限页面
│   │   ├── ...
│   │   ├── Home.vue     // 系统主页面结构
│   │   └── Login.vue    // 系统登录页
│   ├── App.vue          // - - - - - 10 主页面
│   └── main.js          // - - - - - 11 入口文件
├── .browserslistrc      /* = = = XXX = = = */
├── .eslintrc.js         /* = = = XXX = = = */
├── .gitignore           /* = = = XXX = = = */
├── .prettierrc.js       /* = = = XXX = = = */
├── README.md            /* = = = 项目描述文档 = = = */
├── babel.config.js      /* = = = XXX = = = */
├── package.json         /* = = = 包配置项文件 = = = */
└── vue.config.js        /* = = = webpack配置文件 = = = */
```

## 开发小文档

### 接入 Md

### 路由配置

```
│
├── router             // 路由相关
│   ├── constant.js    // 静态路由配置
│   ├── dynamic.js     // 动态路由配置
│   └── index.js       // 路由守卫、挂载等
```

### 请求转发 + api 模块化配置

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

### 整体模板

- [x] 从 Ark 中剥离模板；
- [x] 路由配置；
- [x] http 配置（全局 + api 模块）；
- [ ] 单/多级菜单（折叠菜单选中样式）；
- [x] 无权限处理 --> 判断依据：菜单数量；
- [x] 404 处理 --> 需要匹配在最后项，故挂载于权限路由表中；
- [ ] 个人中心下拉框配置；

### 布局组件

- [ ] 面包屑；
- [ ] 菜单栏；
- [ ] 用户栏；
- [ ] 切换栏(如：门店、组织等)；

### 内容组件

- [ ] 表格；
- [ ] 分页；
- [ ] 搜索（普通/远程）；
- [ ] 下拉框（普通/远程）；
- [ ] 时间选择控件；
- [ ] 按钮组；
- [ ] 表单；
- [ ] 图片显示；
- [ ] 图片上传；
- [ ] 图片裁剪；
- [ ] 文件上传；
- [ ] 文件下载；
- [ ] 拓展项组件；
- [ ] 图表；
- [ ] 对话框；
- [ ] 标签选择栏；
- [ ] 回到顶部；
- [ ] tag 选择；
- [ ] 穿梭框；
- [ ] 弹框；

### 方法

- [ ] 表单校验（常用正则）；
- [ ] 常用方法；
- [ ] 异步；

## DEMO 模块

### 表格

- [ ] 基础表格页；
- [ ] 分页表格页；
- [ ] 搜索表格页；

### 表单

- [ ] 基础表单页；
- [ ] 含图片上传表单页；

### 地图

### 其它

- [ ] iframe 引入；
- [ ] 链接复制；
- [ ] 刷新后应保持先前页面位置；
- [x] 静态路由菜单位置先于动态路由；
- [ ] 啥时候用 Message，啥时候用 Notification

```
ps: markdown 锚点
```
