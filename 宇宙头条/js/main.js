/*
用ajax懒加载
*/
//懒加载
var eTouch;
var tipLoad = $('.tipLoad'),
    recommon = $('.tipLoad+span')
var curPage = 0
var perPageCount = 9
var isArrive = true  //判断数据是否到来，防止慢网速重复请求
isVisible($('.loadmore'))

$(window).on('scroll', function () {
    isVisible($('.loadmore'))
})
function isVisible($node) {
    var distance = $node.offset().top
    var winTop = $(window).scrollTop()
    if (winTop + $(window).height() > distance && winTop < distance + $node.innerHeight()) {
        if(!isArrive){
            return
        }
        isArrive = false
        Ajax()
    }
}
function Ajax(){
    $.ajax({
        url: 'https://platform.sina.com.cn/slide/album_tech',
        type: 'get',
        dataType: 'jsonp',
        jsonp: "jsoncallback",
        data: {
            app_key: '1271687855',
            num: perPageCount,
            page: curPage
        }
    }).done(function (ret) {
        if (ret && ret.status && ret.status.code === "0") {
            if(eTouch){
                isTip()
                appendHead(ret.data) //刷新时，把新得到的内容放到页面的前面
            }else{
                callback(ret.data);   //如果数据没问题，那么生成节点并摆放好位置
            }
            curPage +=9
            isArrive = true
            //isVisible($('.loadmore'))  //当节点还是出现在视口内，就会再发出一条ajax请求，由58行判断是否发出请求
        } else {
            alert('服务器出错')
        }
    }).fail(function () {
        alert('请求出错了')
    })
}
function callback(nodeList) {
    $.each(nodeList, function (index, news) {
        var $node = getNode(news)
        $node.find('img').on('load',()=>{
            $('#pic-ct').append($node)
            //console.log($('#pic-ct li').length) //当li大于5时调用这个函数
            if($('#pic-ct li').length === 5){ 
                DownLoad()
                console.log('进入页面，执行一次DownLoad()就够了')
            }
        })
    })
    
    // DownLoad()
    // 
}

function isTip(){  //是否出现提示加载，第一次进入页面不提示
    if(curPage!==0){
        tipLoad.slideDown(800,()=>{
            tipLoad.slideUp(600,()=>{
                recommon.fadeIn(800, ()=>{
                    setTimeout(()=>{
                        recommon.fadeOut(800)
                    },800)
                })
            })                  
        })
    }
}
function appendHead(nodeList){
    $('#pic-ct li').remove()
    callback(nodeList)
    eTouch = null
}

function getNode(item) {
    let tpl = `<li class="item clearfix">
    <a href="${item.url}" class="link">
        <img src="${item.img_url}" alt="">
        <h5 class="header">${item.short_name}</h5>
        <p class="desp">${item.short_intro}</p>
    </a>
    </li>
    `
    return $(tpl)
}