var Alternate = function ($ct) { //容器
    this.$ct = $ct
    this.init()
    this.bind()
}

Alternate.prototype.init = function () {
    this.$imgAll = this.$ct.find('.content li')
    this.$content = this.$ct.find('.content')
    this.$imglength = this.$imgAll.children().length
    this.$pre = this.$ct.find('.pre')
    this.$next = this.$ct.find('.next')
    this.isOver = false
    this.$icon = this.$ct.find('.icon')
    this.$view = this.$ct.find('.view')
    this.$btn = this.$ct.find('.btn')
    this.$btndiv = this.$ct.find('.btn div')
    this.index = 0
    this.$btn.hide()
    this.$imgAll.first().clone().appendTo(this.$content)
    this.$imgAll.eq(this.$imglength - 1).clone().prependTo(this.$content)
    this.$content.css('left', '-300px')   //展示第一个
    var _this = this
    setInterval(function () { //自动轮播
        _this.playNext()
    }, 2700)
}

Alternate.prototype.bind = function () {
    var _this = this
    this.$pre.on('click', function () {
        _this.playPre()
    })
    this.$next.on('click', function () {
        _this.playNext()
    })
    this.$icon.on('click', 'li', function (e) {
        _this.icon(e)
    }) //点击缩略图，显示目标图片

    this.$view.on('mousemove', function (e) {
        var xPosition = e.pageX - _this.$view.offset().left
        if (xPosition > 100 && 200 > xPosition) {
            _this.$btn.fadeOut()
        } else {
            _this.$btn.fadeIn()
        }
    })
    this.$btndiv.on('mouseenter', function () {
        _this.enterPlay()
    })
    this.$view.on('mouseleave', function () {
        _this.leavePlay()
    })
}

Alternate.prototype.enterPlay = function () {
    this.$btn.fadeIn()
}
Alternate.prototype.leavePlay = function () {
    this.$btn.fadeOut()
}

Alternate.prototype.icon = function (e) {
    var _this = this
    if (this.isOver) {
        return
    }
    this.isOver = true
    this.index = this.$icon.children().index(e.target)
    this.$content.animate({ left: -(_this.index * 300 + 300) }, 700, function () {
        _this.isOver = false
    })
    this.$icon.children().removeClass('active').eq(this.index).addClass('active')
}

Alternate.prototype.playNext = function () {
    var _this = this
    if (this.isOver) {
        return
    }
    this.isOver = true
    this.$content.animate({ left: '+=-300' }, 700, function () {
        _this.index++
        if (_this.index === _this.$imglength) {
            _this.$content.css('left', '-300px')
            _this.index = 0
        }
        _this.isOver = false
        _this.$icon.children().removeClass('active').eq(_this.index).addClass('active')
    })
}

Alternate.prototype.playPre = function () {
    var _this = this
    if (this.isOver) {
        return
    }
    this.isOver = true
    this.$content.animate({ left: '+=300' }, 700, function () {
        if (_this.index === 0) {
            _this.$content.css('left', `-${_this.$imglength * 300}px`)
            _this.index = _this.$imglength
        }
        _this.index--
        _this.isOver = false
        _this.$icon.children().removeClass('active').eq(_this.index).addClass('active')
    })
}

//new Alternate($('#carousel')) id选择器只会匹配一个，class可以是多个