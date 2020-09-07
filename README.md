# admin-frontend 后台管理系统脚手架（不接 MD）

```
@startTime --> 20200701
@author samyechan
@description 剥离于Ark公共资源系统项目，旨在更便捷地进行后台管理项目搭建，并不断完善中~~~

** 20200907 - 简化版 **

版本：vue|vue-cli|npm|element-ui
```

## 本地运行

```bash
#拉代码
git clone -b simple git@119.23.107.222:department4/vue-admin.git
   or
git clone -b simple http://119.23.107.222/department4/vue-admin.git
#安装依赖
npm install
#启动项目
npm run serve
```

## 基础目录

```
│
├── public               // 静态资源
│   ├── ...
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
│   │   └── index.js
│   ├── store
│   │   ├── module
│   │   │   └── permission.js   // 用户信息
│   │   ├── index.js
│   │   └── types.js
│   ├── utils
│   │   ├── check.js      // 表单校验相关
│   │   ├── index.js      // 公共方法
│   │   └── util.js       // 工具类方法
│   ├── views
│   │   ├── xxPage        // xx页面
│   │   │   └── ...

│   │   ├── Error404.vue         // 404
│   │   ├── Home.vue             // 系统主页面结构
│   │   └── NoAuth.vue           // 无权限页
│   ├── App.vue               // 入口
│   └── main.js
├── ...
├── package.json
├── README.md
└── vue.config.js
```
