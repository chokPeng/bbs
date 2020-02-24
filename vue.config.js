const webpack = require('webpack');
module.exports = {
	chainWebpack: config => {
		config.plugin('provide').use(webpack.ProvidePlugin, [{
            'window.Quill': 'quill/dist/quill.js',
            'Quill': 'quill/dist/quill.js'
	    }]);
	}
}

// module.exports = {
//     configureWebpack: {
//         module:{
//             rules:[
//                 {
//                     test: /\.js$/,
//                     exclude: /node_modules(?!\/quill-image-drop-module|quill-image-resize-module)/,
//                     loader: 'babel-loader'
//                 }
//             ]},
//         plugins: [
//             new webpack.ProvidePlugin({
//                 'window.Quill': 'quill/dist/quill.js',
//                 'Quill': 'quill/dist/quill.js'
//             })
//         ]
//     }
// }