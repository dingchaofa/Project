//这是Node.js脚本
const path = require('path') 
const fs = require('fs')

let svgFolder = path.join(__dirname,'../static/svg_icons/') //文件目录的绝对路径
let jsPath= path.join(__dirname,'../src/assets/icons.js') //文件的绝对路径

let svgFiles = fs.readdirSync(svgFolder) //同步方式读取目录下的文件 [ 'add.svg', 'book.svg', 'cup.svg', 'heart.svg', 'id.svg', 'phone.svg', 'work.svg' ]

let symbols = svgFiles.map(function(filename){ 
    let absolutePath = path.join(svgFolder,filename) //获得文件的绝对路径
    let fileContent = fs.readFileSync(absolutePath).toString('utf-8') //如果第二个参数不指定编码（encoding），readFileSync方法返回一个Buffer实例，否则返回的是一个字符串。
    //Buffer实例是Node.js一种处理二进制文件的接口
    let name = path.basename(filename,'.svg') //返回指定的文件名，返回结果去除'.svg'后缀字符串 
    return fileContent
        .replace(/<\?.+?\?>/g,'') //去掉<?xml version="1.0" standalone="none"?>
        .replace(/<!.+?>/g,'') // 去掉 <!DOCTYPE svg PUBLIC ...>
        .replace(/version=".+?"/g,'')
        .replace(/xmlns=".+?"/g,'')
        .replace(/class=".+?"/g, '')
        .replace(/fill=".+?"/g, '')
        .replace(/stroke=".+?"/g, '')
        .replace(/<svg /,`<svg id="icon-${name}" `)
        .replace(/\bsvg\b/g,'symbol') //改svg为symbol
        .replace(/\s{2,}/g,' ')

}).join('\n')

let js = `export default \`<svg style="display:none">\n${symbols}\n</svg>\`\n`
fs.writeFileSync(jsPath,js,{flag:'w'})