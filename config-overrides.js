const {override,fixBabelImports,addLessLoader} =require('customize-cra');

module.exports = override(
    // 按需打包
    fixBabelImports('import',{
        libraryName:'antd',
        libraryDirectory:'es',
        style:true,//自动打包相关的样式 默认为 style:'css'
    }),
    // 设置antd自定义主题
    addLessLoader({
        javascriptEnabled: true,
        modifyVars:{'@primary-color':'#1DA57A'},
    })
);

