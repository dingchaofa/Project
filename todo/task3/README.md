#### 如何运行本demo
1. 下载代码
2. npm i
3. npm run webpack
4. start index.html


##### 预览：https://dingchaofa.github.io/webpack/task3/dist/

待解决问题：
1. 不关闭原来的网页，重新打开网页，是更新后的数据  
解决思路：让数据实时更新，保存在内存中
利用change事件，监听todoList
2. 美化界面

3. 添加创建时间

发现：
1. npm run webserver 命令即开启实时监控更新服务器，更新的数据只是写在内存当中，不会作为最终生成的输出文件。  
    要获取最终的输出文件，必须再执行一次 webpack（全局安装）/ node_modules/.bin/webpack（本地安装）