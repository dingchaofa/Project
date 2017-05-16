##### 本demo效果

2. 添加注册、登录、退出功能

3. bundle.js文件太大，webpack压缩

4. 刷新界面，出现FOUC  
在模块的父容器添加v-cloak   
https://cn.vuejs.org/v2/api/#v-cloak

##### 预览：  
https://dingchaofa.github.io/webpack/task4/dist/

待解决问题：
1. 怎么能一开始就判断用户注册的是否重复呢？

已解决：  
1. 刷新界面，出现FOUC  
在模块的父容器添加v-cloak，解决FOUC     
https://cn.vuejs.org/v2/api/#v-cloak