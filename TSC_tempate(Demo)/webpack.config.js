console.log("--------------------------------------------------------------------------");
var webpack = require('webpack');
var path = require('path')
// var VersionFile = require('webpack-version-file');
// var catchInfo = require('child_process');
// var webpackConfig_profile = require('./webpack.profile.config.js');
// var config = webpackConfig_profile(process);

var config = {
    /* for customer class */
    copyright: 'Copyright © 2019 TSC Co., Ltd. All Rights Reserved.',
    version: '1.0.0',
    frontendVersion: '1.0.0.0',

    /* for product type */
    src_productPath: 'js/index.js',
    localStorageName: '',
    cookieName: '',
    api_domain: 'https://54.169.219.137/api/',/* http://192.168.10.71:8680/',*/
    api_port: '',
    storage_domain: '',
    storage_port: '',
    name: 'TSC Dashboard'
};

// config.is_demomode = ('true' == process.env['DEMOMODE']);
// config.gitCommitId = catchInfo.execSync("git log -1 --format=format:'%h'");
// config.gitCommitDate = catchInfo.execSync("git log -1 --format=format:'%ci'");

module.exports = {
    entry: './src/'+config.src_productPath,
    output: {
        path: __dirname + '/dist',
        filename: 'index.js'
    },
    /*
    
        options: {
                    presets: ['@babel/preset-env']
                  },       
    */
    module: {
        loaders: [
            {
                test: /\.js|jsx$/, 
                loaders: 'babel-loader', 
            
                query: {
                    babelrc: false,
                    presets: ['latest','react','stage-0'],
                  //presets: ['es2015', 'stage-0', 'react'],
                    plugins: ["transform-runtime"]
                },
               
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV:       JSON.stringify('production'),
                PRODUCT:        JSON.stringify(process.env['PRODUCT']),
                VERSION:        JSON.stringify(config.version),
                COPYRIGHT:      JSON.stringify(config.copyright),
                IS_DEMOMODE:    false,
                NAME:           JSON.stringify(config.name),
                LSNAME:         JSON.stringify(config.localStorageName),
                COOKIENAME:     JSON.stringify(config.cookieName),
                APIDOMAIN:      JSON.stringify(config.api_domain),
                APIPORT:        JSON.stringify(config.api_port),
                STORAGEDOMAIN:  JSON.stringify(config.storage_domain),
                STORAGEPORT:    JSON.stringify(config.storage_port)
            }
        }),
        //new webpack.optimize.UglifyJsPlugin()
        /*,
        new VersionFile({
            output: __dirname + '/dist/frontendInfo.json',
            package: './package.json',
            template: './frontendInfo.ejs',
            data: {
                isDemoMode: config.is_demomode,
                buildCustomer: process.env['CUSTOMER'],
                buildProduct: process.env['PRODUCT'],
                buildversion: config.frontendVersion,
                commitId: config.gitCommitId,
                commitDate: config.gitCommitDate
            }
        })*/
    ]
    ,
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        //publicPath: path.join('/dist/'),
        compress: true,
        port: 9000,
        // 在编译过程中有错误，给予窗口提示
      overlay:{
        errors:true
        },
        after: function(app, server) {
            console.log("------->devServer build");
          }
      }
}

const rrr= {'process.env': {
    NODE_ENV:       JSON.stringify('production'),
    PRODUCT:        JSON.stringify(process.env['PRODUCT']),
    VERSION:        JSON.stringify(config.version),
    COPYRIGHT:      JSON.stringify(config.copyright),
    IS_DEMOMODE:    false,
    NAME:           JSON.stringify(config.name),
    LSNAME:         JSON.stringify(config.localStorageName),
    COOKIENAME:     JSON.stringify(config.cookieName),
    APIDOMAIN:      JSON.stringify(config.api_domain),
    APIPORT:        JSON.stringify(config.api_port),
    STORAGEDOMAIN:  JSON.stringify(config.storage_domain),
    STORAGEPORT:    JSON.stringify(config.storage_port)
}};
//console.log(rrr);
//console.log("webpack.config process.env.NODE_ENV 的值是(webpack.config.js)："+ process.env.NODE_ENV)
