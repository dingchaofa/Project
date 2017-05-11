## resumer
> A Vue.js project
#### 项目目标  
    做一个工具，用户可以用这个工具来写简历

#### 功能列表
1. 添加简历内容，包括个人信息、工作经历、学习经历、获奖情况、项目经历和联系方式。
2. 更新简历内容
3. 选择简历模板
4. 预览简历
5. 发布简历

#### 初始化项目
项目使用 vue-cli 工具

> mkdir resumer  
> cd resumer  
> npm init # 使用 npm init 来生成一个 package.json，方便我们添加依赖

然后全局安装 vue-cli（安装在当前目录也可以），并用 vue-cli 来初始化一个 vue 项目

> npm install -g vue-cli  
> vue init webpack .   # 注意这里的 . 字符。 https://github.com/vuejs-templates/webpack

>? Vue build standalone # 注意一定要是standalone  
>? Install vue-router? Yes  
>? Use ESLint to lint your code? Yes  
>? Pick an ESLint preset Standard   
>? Setup unit tests with Karma + Mocha? Yes  
>? Setup e2e tests with Nightwatch? No  

> npm i #安装依赖  注意，init之后可能并不会退出到命令行，如果这样，就Ctrl+c  
> npm run dev #运行完 npm run dev 你就会发现浏览器自动弹出，并访问了 http://localhost:8080/#/ 。  
webpack 已经在命令行持续运行着，不要关掉它，打开编辑器即可编辑。

#### 目录结构
```
.
├── README.md
├── build                # build 目录用于存放构建脚本，比如 webpack 配置文件
├── config               # config 目录用于存放一些配置信息，比如配置打包后的 bundle 文件存放在哪里
├── index.html           # 首页
├── node_modules         # 依赖，模块
├── package.json         # 配置文件
├── src                  # 除了首页，其他的源代码都在 src 目录里
├── static               # static 目录用于放置静态资源，比如 favicon.ico 文件等
└── test                 # 单元测试等代码放在 test 目录里
```


#### 注意事项：  

1. 为了让 node-sass 顺利安装，请在先在命令运行  
    >export SASS_BINARY_SITE="https://npm.taobao.org/mirrors/node-sass"
  
    然后  
    >npm install --save  sass-loader node-sass

2. ESLint 插件会让语法变的严格，例如哪里需要空格，哪里不需要空格，不遵循规范就会报错，我们可以去 build/webpack.base.conf.js 里，把 ESLint 给注释掉。

3. 我们需要把所有svg拼接成一个整体插入到html中，svg是一种XML规范的文档，是计算机能够理解的一种数据信息符号。http://javascript.ruanyifeng.com/htmlapi/svg.html

4. 本项目是在两个文件内import vue，从打包后的源码来看， webpack类似对引入的构造函数进行编号，例如：__webpack__require__(0)、__webpack_require__(1)、···，只是多次调用这些打包后对应的函数，并没有重复打包。  

    另外，在同一文件多次引入同一个文件，会报错“Duplicate declaration "filename"”。

5. input输入一大段文字，显示在对应的p标签。p标签默认样式是不换行的，但是如果用户强制换行，只会产生空格，故而修改p标签默认样式(white-space:pre-line;连续的空白符会被合并。保留换行符。)，在用户需要换行时换行。