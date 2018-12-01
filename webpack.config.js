//este archivo toma la fuente de javascript, lo transforma y lo deposita en el archivo html
module.exports = {
     entry: './src/app/indexclient.js',
     output: {
         path: __dirname + '/src/public',
         filename: 'boundle.js'
    },
    module:{
        rules:[{
            use: 'babel-loader',
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/
        }]
    }
};
    

