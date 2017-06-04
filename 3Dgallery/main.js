"use strict";

(function () {
    // CSS transform变换应用
    var transform = function transform(element, value, key) {
        key = key || "Transform";
        ["Moz", "O", "Ms", "Webkit", ""].forEach(function (prefix) {
            element.style[prefix + key] = value;
        });
        return element;
    },

    // 浏览器选择器API
    $ = function $(selector) {
        return document.querySelector(selector);
    },
        $$ = function $$(selector) {
        return document.querySelectorAll(selector);
    };
    // 显示图片，这里的图片名必须是数字
    var htmlPic = "",
        arrayPic = ['01', '02', '03', '04', '05', '06', '08', '09', '10', '11'],
        rotate = 360 / arrayPic.length;

    arrayPic.forEach(function (i) {
        htmlPic = htmlPic + ("<img id=\"piece" + i + "\" src=\"image/" + i + ".jpg\" class=\"piece\">");
    });
    // 父容器
    var eleContainer = $("#container"),
        indexPiece = 0;
    eleContainer.innerHTML = htmlPic;
    // 子元素
    var elePics = $$(".piece"),
        eleWidth = elePics[0].getBoundingClientRect().width,
        translateZ = 150 / Math.tan(rotate / 2 / 180 * Math.PI //透视的距离，为了让图片刚好围中心位置，排满一圈
    );console.log(eleWidth);
    eleContainer.addEventListener("click", function () {
        transform(this, "rotateY(" + -1 * rotate * ++indexPiece + "deg)");
    });

    arrayPic.forEach(function (ele, index) {
        transform($("#piece" + ele), "rotateY(" + index * rotate + "deg) translateZ(" + (translateZ + 30) + "px)");
    });
})();
