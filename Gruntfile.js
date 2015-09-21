module.exports = function (grunt) {

	'use strict';

	var path = require('path'),
    	pathObject = path.resolve().split(path.sep),
    	pathRoot = pathObject[pathObject.length - 1];

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	var options = {
		pkg: require('./package'), // e.g. <%=pkg.name%>

		/**
		 * Config - Edit this section
		 * ==========================
		 * Choose javascript dist filename
		 * Choose javascript dist location
		 * Choose javascript files to be uglified
		 */
		config : {

			api: "2.8",
			srcDir: 'src', // <%=config.srcDir%>
			distDir: 'dist', // <%=config.distDir%>
            libDir: 'lib', // <%=config.libDir%>
            zipDir: 'zip', // <%=config.zipDir%>
            buildDir: 'build', // <%=config.zipDir%>

			less : {
				cssFile : 'initial' // <%=config.less.cssFile%>
			},

			plugins : {
				// <%=config.js.distDir%>
				distDir  : '<%=config.distDir%>/<%=config.libDir%>/',

				// <%=config.js.distFile%>
				distFile : 'plugins.min.js',
 
				// <%=config.js.fileList%>
				fileList : [
					'assets/js/move.js',

				]
			}
		}
	};

	// Load grunt configurations automatically
	var configs = require('load-grunt-configs')(grunt, options);

	grunt.registerTask("prepareBanners", "Uglifies local JS and LIB", function() {

	    // get all module directories
	    grunt.file.expand("src/*").forEach(function (dir) {

	        // get the module name from the directory name
	        var dirName = dir.substr(dir.lastIndexOf('/')+1),
	        	dimension = dirName.split("x");

	        // get the current concat object from initConfig
	        var uglify 	= grunt.config.get('uglify') 	|| {},
	        	concat 	= grunt.config.get('concat') 	|| {},
	        	rename 	= grunt.config.get('rename') 	|| {},
	        	replace = grunt.config.get('replace') 	|| {},
	        	copy 	= grunt.config.get('copy') 		|| {},
	        	zip 	= grunt.config.get('zip') 		|| {};

	        copy[dirName + "_Dist"] = {
				files: [{
					expand: true,
					cwd : dir,
					// Copies all css, ttf and map files but not anything in the lib directory
					src: ['**/index.html', '**/manifest.js', '**/*.css', '**/*.png', '**/*.jpg', '**/*.gif', '**/*.woff'],
					dest: '<%=config.distDir%>/' + dirName
				}]
	        };

	        copy[dirName + "_Richload"] = {
				files: [{
					expand: true,
					cwd : dir,
					// Copies all css, ttf and map files but not anything in the lib directory
					src: ['**/index.html', '**/*.css', '**/*.png', '**/*.jpg', '**/*.gif', '**/*.woff'],
					dest: '<%=config.buildDir%>/' + dirName + "_Richload"
				}]
	        };

	        copy[dirName + "_Base"] = {
				files: [{
					expand: true,
					cwd : dir,
					// Copies all css, ttf and map files but not anything in the lib directory
					src: ['**/base.html', 'manifest.js'],
					dest: '<%=config.buildDir%>/' + dirName + "_Base"
				}]
	        };

	        // create a subtask for each module, find all src files
	        // and combine into a single js file per module
	        uglify[dirName] = {
	            src: [dir + '/js/**/*.js', '!' + dir + '/manifest.js', '!' + dir + '/js/app.js'],
	            dest: dir + '/js/app.js'
	        };

	        concat[dirName + "_Dist"] = {
	            src: ['dev-only/**/*.js', 'lib/**/*.js', dir + '/js/app.js'],
	            dest: '<%=config.distDir%>/' + dirName + '/js/app.js'
	        };

	        concat[dirName + "_Richload"] = {
	            src: ['lib/**/*.js', dir + '/js/app.js'],
	            dest: '<%=config.buildDir%>/' + dirName + "_Richload/js/app.js"
	        };

	        replace[dirName] = {
	            options: {
	              patterns: [
	                {
	                  match: '{{width}}',
	                  replacement: dimension[0]
	                },
	                {
	                  match: '{{height}}',
	                  replacement: dimension[1]
	                },
	                {
	                  match: '{{api}}',
	                  replacement: '<%=config.api%>'
	                }
	              ],
	              usePrefix: false
	            },
	            files: [
	              {expand: true, flatten: true, src: ['<%=config.distDir%>/' + dirName + '/*.*'], 			dest: '<%=config.distDir%>/' + dirName},
	              {expand: true, flatten: true, src: ['<%=config.buildDir%>/' + dirName + '_Richload/*.*'], dest: '<%=config.buildDir%>/' + dirName + '_Richload'},
	              {expand: true, flatten: true, src: ['<%=config.buildDir%>/' + dirName + '_Base/*.*'], 	dest: '<%=config.buildDir%>/' + dirName + '_Base'}
	            ]
	        };

	        replace[dirName + "_Dist"] = {
	            options: {
	              patterns: [
	                {
	                  match: '{{test}}',
	                  replacement: ''
	                }
	              ],
	              usePrefix: false
	            },
	            files: [
	              {expand: true, flatten: true, src: ['<%=config.distDir%>/' + dirName + '/*.*'], dest: '<%=config.distDir%>/' + dirName}
	            ]
	        };

	        replace[dirName + "_Richload"] = {
	            options: {
	              patterns: [
	                {
	                  match: '{{test}}',
	                  replacement: ' '
	                }
	              ],
	              usePrefix: false
	            },
	            files: [
	              {expand: true, flatten: true, src: ['<%=config.buildDir%>/' + dirName + '_Richload/*.*'], dest: '<%=config.buildDir%>/' + dirName + '_Richload'}
	            ]
	        };

	        rename[dirName] = {
	        	src:  '<%=config.buildDir%>/' + dirName + '_Base/base.html',
                dest: '<%=config.buildDir%>/' + dirName + '_Base/index.html'
	        };

	        zip[dirName + "_Base"] = {
                cwd: '<%=config.buildDir%>',
                src: ['<%=config.buildDir%>/' + dirName + '_Base/**/*.*'],
                dest: '<%=config.zipDir%>/' + pathRoot + '_' + dirName + '.zip',
                compression: 'DEFLATE'
	        };

	        zip[dirName + "_Richload"] = {
                cwd: '<%=config.buildDir%>',
                src: ['<%=config.buildDir%>/' + dirName + '_Richload/**/*.*'],
                dest: '<%=config.zipDir%>/' + pathRoot + '_' + dirName + '_Richload.zip',
                compression: 'DEFLATE'
	        };

	        // add module subtasks to the concat task in initConfig
	        grunt.config.set('uglify', uglify);
	        grunt.config.set('concat', concat);
	        grunt.config.set('rename', rename);
	        grunt.config.set('replace', replace);
	        grunt.config.set('zip', zip);
	        grunt.config.set('copy', copy);

	        grunt.log.ok("Prepared directory: " + dir);
	    });
	});

	// Define the configuration for all the tasks
	grunt.initConfig(configs);

	/* ==========================================================================
	 * Available tasks:
	 * grunt            : run jshint, uglify and sass:banners
	 * grunt watch      : run sass:banners, uglify and livereload
	 * grunt dev        : run sass:banners & autoprefixer:banners
	 * grunt deploy     : run jshint, sass:banners and csso
	 * grunt serve      : watch js & scss and run a local server
		 ========================================================================== */

	/**
	* GRUNT * Default task
	* run sass:banners and autoprefixer:banners & sass:initial & autoprefixer:initial
	*/
	grunt.registerTask('default', [
		'newer:less:banners',
		'autoprefixer:banners',
		'includes',
		'browserify:dev',
		'prepareBanners',
		'uglify',
		'htmlbuild',
		'copy'
	]);


	/**
	 * GRUNT DEV * A task for development
	 * run sass:banners & autoprefixer:banners & sass:initial & autoprefixer:initial
	 */
	grunt.registerTask('dev', [
		//'clean',
		'newer:less:banners',
		'autoprefixer:banners',
		'includes',
		'browserify:dev',
		'uglify',
		'htmlbuild',
		'copy'
	]); 


	/**
	* GRUNT DEPLOY * A task for your production environment
	* run sass:banners, autoprefixer:banners & sass:initial & autoprefixer:initial and csso
	*/
	grunt.registerTask('deploy', [
		'newer:less:banners',
		'autoprefixer:banners',
		// 'csso',
		'includes',
		'browserify:deploy',
		'uglify',
		'htmlbuild',
		'copy'
	]);

	/**
	 * GRUNT SERVE * A task for for a static server with a watch
	 * run connect and watch
	 */
	grunt.registerTask('serve', [
		'newer:less:banners',
		'autoprefixer:banners',
		'browserify:dev',
		'prepareBanners',
		'uglify',
		'concat',
		'copy',
		'replace',
		'rename',
		'zip',
		'connect:site',
		'watch'
	]);
};