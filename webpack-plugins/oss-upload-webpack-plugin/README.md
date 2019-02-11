

### Useages

```
module.exports = {
    output: {
        publicPath: "https://domain.com/p/a/t/h" // 域名或域名+路径
    },
    plugins: [
        // 其他插件
        new WosaiOSSPlugin({
            accessKeyId: '*****',
            accessKeySecret: '*****',
            region: 'oss-cn-hangzhou',
            bucket: '*****',
            beforeUpload: (file,compilation)=>{ // 上传之前dosomething
                const files = {}
                return files
            },
            afterUpload: ()=>{ // 上传之后do something

            }
        })
        // 其他插件
    ]
}
```