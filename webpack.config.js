const {resolve}=require('path')

const HtmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
    entry:'./app/client/src/js/main.js',
    output:{
        filename:"build.js",
        path:resolve(__dirname,'./app/client/dist')
    },
    module:{},
    plugins:[
        new HtmlWebpackPlugin({
            template:'./app/client/src/index.html'
        })
    ],
    mode:"development",
    devServer:{
        contentBase:resolve(__dirname,'./app/client/dist'),
        compress:true,
        port:8080,
        proxy:{
            '/':{
                target:"http://localhost:8200",
                changeOrigin:true
            }
        }
    }
}