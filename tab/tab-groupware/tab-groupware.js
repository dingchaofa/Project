var Tab = function ($ct) {  //参数为容器
    this.$ct = $ct
    this.init()
    this.bind()
}

Tab.prototype.init = function () {
    this.navhead = this.$ct.find('.tabnav')
    this.contentlist = this.$ct.find('.tabcontent li')
}

Tab.prototype.bind = function () {
    var _this = this
    this.navhead.on('click', 'li', function () {
        var index = _this.navhead.children().index(this)
        $(this).addClass('active').siblings().removeClass('active')
        _this.contentlist.eq(index).addClass('active').siblings().removeClass('active') //匹配相应的内容
    })
}