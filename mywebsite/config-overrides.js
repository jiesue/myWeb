const { injectBabelPlugin } = require('react-app-rewired');
const { override, adjustStyleLoaders } = require("customize-cra");
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
// // console.log(adjustStyleLoaders);
// module.exports = override(
//     // ...其他配置...
//     adjustStyleLoaders(rule => {
//         if (rule.test.toString().includes("scss")) {
//             rule.use.push({
//                 loader: require.resolve("sass-resources-loader"),
//                 options: {
//                     resources: "./src/assets/css/variable.scss" //这里是你自己放公共scss变量的路径
//                 }
//             });
//         }
//     })
//     // ...其他配置...
// );

module.exports = function override(config, env) {

    // do stuff with the webpack config... 按需引入antd-css的配置 react-app-rewired2.x以后，不再支持injectBabelPlugin的方式，需要安装customize-cra
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: 'css' }], config);

    config.resolve.alias = {
        '@': resolve('src')
    }

    return config;
};