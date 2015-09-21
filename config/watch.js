module.exports.tasks = {

	/**
	* Watch
	* https://github.com/gruntjs/grunt-contrib-watch
	* Watches your scss, js etc for changes and compiles them
	*/

	watch: {
		less: {
			files: ['<%=config.srcDir%>/**/*.less'],
			tasks: [
				'prepareBanners',
				'newer:less:banners',
				'autoprefixer:banners',
				'copy',
				'replace',
				'rename',
				'zip'
			]
		},

		livereload: {
			options: {
				livereload: true
			},
			files: [
				'<%=config.distDir%>/**/*.{css,html,js}' 
			]
		},

		html : {
			files: '<%=config.srcDir%>/**/*.html',
			tasks: [
				'prepareBanners',
				'copy',
				'replace',
				'rename',
				'zip'
			]
		},

		js : {
			files: [
				'<%=config.srcDir%>/**/*.js',
				'!<%=config.srcDir%>/**/*.min.js',
				'<%=config.plugins.fileList%>',
				'Gruntfile.js',
				'config/*.js'
			],
			tasks: [
				'clean',
				'prepareBanners',
				'browserify:dev',
				'uglify',
				'concat',
				'copy',
				'replace',
				'rename',
				'zip'
			]
		},

		images : {
			files: [
				'<%=config.srcDir%>/**/*.{png,jpg,gif}'
			],
			tasks: [
				// 'clean',
				'prepareBanners',
				'copy',
				'replace',
				'rename',
				'zip'
			]
		}
	}
};