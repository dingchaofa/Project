/* 
@Author Ting
@Date 2019-1-23
@descript 
*/

/* module.exports = {
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
} */

const url = require('url');
const fs = require('fs');
const _ = require('lodash');
const async = require('async');
const createOSS = require('ali-oss');

class OssUploadWebpackPlugin {
    constructor(options) {
        this.options = options;
        if (!options || !options.accessKeyId || !options.accessKeySecret || !options.region || !options.bucket) {
            throw new TypeError('缺少oss上传参数！');
        }
        this.initOss = createOSS({
            region: options.region,
            accessKeyId: options.accessKeyId,
            accessKeySecret: options.accessKeySecret,
            bucket: options.bucket
        });
    }

    apply(compiler) {
        try {
            compiler.plugin('emit', (compilation, callback) => {
                const publicPath = url.parse(compiler.options.output.publicPath);
                if (!publicPath.protocol || !publicPath.hostname) {
                    return callback(new Error('Webpack配置文件中: "output.publicPath"必须设置为域名，例如： https://domain.com/p/a/t/h'));
                }

                async.every(
                    _.filter(_.keysIn(compilation.assets), asset => {
                        return !/\.html$/.test(asset);
                    }),
                    async (file, callback) => {
                        let files = null;
                        if (typeof this.options.beforeUpload === 'function') {
                            files = this.options.beforeUpload(file, publicPath, compilation); // {/im/static/css/app.aabacad5eda36e54be634caf57b3eb3f.css : buffer}
                        }
                        if (!files) {
                            callback(new Error('没有生成可输入output的资源'));
                            return;
                        }
                        for (let key in files) {
                            let name = url.resolve(url.format(publicPath), key);
                              console.log(key + '正在上传\n')
                            await this.initOss
                                .put(key, files[key])
                                .then(result => {
                                    console.log('上传成功 %s \n', name);
                                })
                                .catch(res => {
                                    console.log('上传失败 %s \n', res);
                                });
                        }
                    }
                );
                callback();
            });
        } catch (err) {
            console.log(err);
        }
    }
}
