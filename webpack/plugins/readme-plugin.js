let path = require('path');
let fs = require('fs');
let template = require('art-template');

class ReadmePlugin {
    constructor(options) {
        this.options = options
    }

    apply(compiler) {

        compiler.hooks.emit.tapAsync('ReadmePlugin' ,(compilation, callback) => {
            console.log(this.options);
            let date = fs.readFileSync(this.options.template);
            date = date.toString();
            date = JSON.parse(date);
            console.log(date);
            console.log(date.version);
            //建立和依赖相关的数组
            let dev_keys = Object.keys(date.devDependencies);
            let dev_values = Object.values(date.devDependencies);

            let p =
                `# 版权信息
+ 名称: ${date.name}
+ 版本号: ${date.version}
+ 入口文件: ${date.main}
+ 依赖: 
  `;
            dev_keys.forEach((value, index) => {
                p = p + `- ${value}: ${dev_values[index]}
  `;

            });

            console.log(Object.keys(date.devDependencies));
            console.log(Object.values(date.devDependencies));


            console.log(p);
            compilation.assets['readme.md'] = {
                source: function () {
                    return p;
                },
                size: function () {
                    return 1024*1024;
                }
            };
            callback();
        })
    }
}

module.exports = ReadmePlugin;