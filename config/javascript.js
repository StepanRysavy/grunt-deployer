module.exports.tasks = {

	/**
	 * Uglify
	 * https://github.com/gruntjs/grunt-contrib-uglify
	 * Minifies and concatinates your JS
	 * Also creates source maps
	 */
	uglify: {
		options: {
			mangle: false,    // Turn mangling on or off
			beautify: false, // Beautify your code for debugging/troubleshooting purposes
			compress: {},
			report: 'gzip'
		}

		// plugins : {
		// 	options: {
		// 		sourceMap: false
		// 	},
		// 	files : {
		// 		'<%=config.plugins.distDir%><%=config.plugins.distFile%>' : '<%=config.plugins.fileList%>'
		// 	}
		// },

		// polite : {
		// 	options: {
		// 		sourceMap: false,
		// 		banner: 'include "../../lib/plugins.min.js"\n'
		// 	},
		// 	files : [
		// 		{
		// 			expand: true,
		// 			cwd : '<%=config.srcDir%>',
		// 			src: ['**/polite.js'],
		// 			dest: '<%=config.distDir%>'
		// 		}
		// 	]
		// }
	}

};
