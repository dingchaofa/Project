/* 
下拉刷新组件
分析：
1. 下拉功能是为了刷新页面，把之前的页面内容替换掉； 
思路：
1. 创建 touchstart,touchend两个个事件；
2.为文档某一区域，绑定这些事件。这篇区域可以是整个client
2. 当触发touchstart事件时，这时得到y1 = e.clientY,绑定touchmove事件；
3. 触发touchmove事件后，绑定touchend事件
4. 触发touchend事件，得到y2 = e.clientY，判断 y2-y1>0，并且scrollY=0，则触发刷新按钮，刷新内容。
组件使用：
1. 本组件是为了适应在整个新闻区域，都能实现下拉刷新功能，所以这个区域大小为整个client；有一个区域大小接口
2. 
注意事项：
1. 数据还没有来，所以let area = $('#pic-ct>li:lt(4)')，页面没有li，是选不中的
2. 注意调用DownLoad()的次数。
3. 注意绑定事件时，触发事件而绑定事件，会造成内存浪费
 */
function DownLoad(){
    //let area = $('#pic-ct>li:lt(4)')
    let area = $('#pic-ct>li').slice(0,5)
    var y1,y2
    area.on('touchstart',(e)=>{
        y1 = e.changedTouches[0].clientY
    })
    area.on('touchend',(e)=>{
        y2 = e.changedTouches[0].clientY
        
        let isRefresh =  scrollY===0 && y2-y1>0
        if(isRefresh){
            refreshNews(e)
        }
        console.log(y2-y1)
        console.log(isRefresh)
    })
}