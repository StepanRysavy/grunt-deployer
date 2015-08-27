// Generated on 2014-07-11 using generator-durandal 0.1.5
'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); // Load grunt tasks automatically
    require('time-grunt')(grunt); // Time how long tasks take. Can help when optimizing build times

    var path = require('path');
    var pathObject = path.resolve().split(path.sep);
    var options = {
        dev: grunt.option('dev')
    };

    // Define the configuration for all the tasks
    grunt.initConfig({
        // Configurable paths
        paths: {
            dev: 'Code',
            base: 'Base',
            deploy: 'Richload',
            build: '.build',
            img: 'img',
            css: 'css',
            fonts: 'css/fonts',
            js: 'js',
            lib: 'lib',
            zip: 'ZIP',
            bower: 'bower_components',
            temp: '.temp',
            test: 'test/spec',
            root: pathObject[pathObject.length - 1]
        },

        pkg: grunt.file.readJSON('package.json'),

        zip: {
            base: {
                cwd: '<%= paths.base %>',
                src: ['<%= paths.base %>/**/*.*'],
                dest: '<%= paths.zip %>/<%= paths.root %>.zip',
                compression: 'DEFLATE'
            },
            richload: {
                cwd: '<%= paths.deploy %>',
                src: ['<%= paths.deploy %>/**/*.*'],
                dest: '<%= paths.zip %>/<%= paths.root %>_Richload.zip',
                compression: 'DEFLATE'
            }
        },

        replace: {
          less: {
            options: {
              patterns: [
                {
                  match: '{{width}}',
                  replacement: '<%= pkg.width %>px'
                },
                {
                  match: '{{height}}',
                  replacement: '<%= pkg.height %>px'
                }
              ],
              usePrefix: false
            },
            files: [
                {expand: true, flatten: true, src: ['<%= paths.dev %>/<%= paths.css %>/build/vars.less'], dest: '<%= paths.dev %>/<%= paths.css %>'}
            ]
          },
          dist: {
            options: {
              patterns: [
                {
                  match: '{{width}}',
                  replacement: '<%= pkg.width %>'
                },
                {
                  match: '{{height}}',
                  replacement: '<%= pkg.height %>'
                },
                {
                  match: '{{api}}',
                  replacement: '<%= pkg.api %>'
                }
              ],
              usePrefix: false
            },
            files: [
              {expand: true, flatten: true, src: ['<%= paths.dev %>/*.*'], dest: '<%= paths.build %>/'}
            ]
          },
          serve: {
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
              {expand: true, flatten: true, src: ['<%= paths.build %>/*.*'], dest: '<%= paths.build %>/'}
            ]
          },
          deploy: {
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
              {expand: true, flatten: true, src: ['<%= paths.build %>/*.*'], dest: '<%= paths.build %>/'}
            ]
          }
        },

        rename: {
            base: {
                src: '<%= paths.base %>/base.html',
                dest: '<%= paths.base %>/index.html'
            }
        },

        // Build less files into css ones
        less: {
            full: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: "<%= paths.build %>/<%= paths.css %>/main.css.map",
                    sourceMapURL: 'main.css.map',
                    outputSourceFiles: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.dev %>/<%= paths.css %>/',
                        src: 'main.less',
                        dest: '<%= paths.build %>/<%= paths.css %>/',
                        ext: '.css'
                    }
                ]
            }

        },

        cssmin: {
            main: {
                options: {
                    banner: '<%= pkg.banner %>',
                    'processImport': false
                },
                files: {
                    '<%= paths.build %>/<%= paths.css %>/main.css': ['<%= paths.build %>/<%= paths.css %>/main.css']
                }
            }
        },

        // Concatenate files to reduce requests count
        concat: {
            options: {
                stripBanners: true
            },
            scripts: {
                src: [
                    '<%= paths.dev %>/<%= paths.js %>/define.js',
                    '<%= paths.dev %>/<%= paths.js %>/lib/*.js',
                    '<%= paths.dev %>/<%= paths.js %>/modules/*.js',
                    '<%= paths.dev %>/<%= paths.js %>/app.js'
                ],
                dest: '<%= paths.build %>/<%= paths.js %>/app.js'
            },
            styles: {
                src: [
                    '<%= paths.dev %>/<%= paths.css %>/*.css',
                    '<%= paths.build %>/<%= paths.css %>/*.css'
                ],
                dest: '<%= paths.build %>/<%= paths.css %>/main.css'
            }
        },

        uglify: {
            options: {
                banner: '<%= pkg.banner %>'
            },
            full: {
                files: {
                    '<%= paths.build %>/<%= paths.js %>/app.js': ['<%= paths.build %>/<%= paths.js %>/app.js']
                }
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            full: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.dev %>/<%= paths.lib %>/',
                        src: '**/*.*',
                        dest: '<%= paths.deploy %>/<%= paths.lib %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= paths.dev %>/<%= paths.fonts %>/',
                        src: '**/*.*',
                        dest: '<%= paths.deploy %>/<%= paths.fonts %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= paths.build %>/<%= paths.css %>/',
                        src: '**/*.*',
                        dest: '<%= paths.deploy %>/<%= paths.css %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= paths.build %>/<%= paths.img %>/',
                        src: '**/*.*',
                        dest: '<%= paths.deploy %>/<%= paths.img %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= paths.build %>/<%= paths.js %>/',
                        src: '**/*.*',
                        dest: '<%= paths.deploy %>/<%= paths.js %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= paths.build %>',
                        src: 'index.html',
                        dest: '<%= paths.deploy %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= paths.build %>',
                        src: 'base.html',
                        dest: '<%= paths.base %>'
                    },
                    {
                        expand: true,
                        cwd: '<%= paths.build %>',
                        src: 'manifest.js',
                        dest: '<%= paths.base %>/'
                    }
                ]
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.build %>',
                        src: '**/*.*',
                        dest: '<%= paths.deploy %>/'
                    }
                ]
            },
            styles: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.build %>/<%= paths.css %>/',
                        src: '*.css',
                        dest: '<%= paths.deploy %>/<%= paths.css %>/'
                    }
                ]
            },
            rootfiles: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.build %>/',
                        src: '*.*',
                        dest: '<%= paths.deploy %>/'
                    }
                ]
            },
            scripts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.build %>/<%= paths.js %>/',
                        src: '**/*.*',
                        dest: '<%= paths.deploy %>/<%= paths.js %>/'
                    }
                ]
            },
            lib: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.dev %>/<%= paths.lib %>/',
                        src: '**/*.*',
                        dest: '<%= paths.deploy %>/<%= paths.lib %>/'
                    }
                ]
            },
            img: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.dev %>/<%= paths.img %>/',
                        src: '**/*.*',
                        dest: '<%= paths.deploy %>/<%= paths.img %>/'
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.dev %>/<%= paths.fonts %>/',
                        src: '**/*.*',
                        dest: '<%= paths.deploy %>/<%= paths.fonts %>/'
                    }
                ]
            },
            manifest: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.base %>',
                        src: 'manifest.js',
                        dest: '<%= paths.deploy %>/'
                    }
                ]
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie >= 9']
            },
            full: {
                options: {
                    map: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= paths.build %>/<%= paths.css %>/',
                    src: '*.css',
                    dest: '<%= paths.build %>/<%= paths.css %>/'
                }]
            },
            deploy: {
                options: {
                    map: false
                },
                files: [{
                    expand: true,
                    cwd: '<%= paths.build %>/<%= paths.css %>/',
                    src: '*.css',
                    dest: '<%= paths.build %>/<%= paths.css %>/'
                }]
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            release: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.dev %>/<%= paths.img %>/',
                    src: '**/*.{gif,jpeg,jpg,png}',
                    dest: '<%= paths.build %>/<%= paths.img %>/'
                }]
            }
        },
        svgmin: {
            release: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.dev %>/<%= paths.img %>/',
                    src: '*.svg',
                    dest: '<%= paths.build %>/<%= paths.img %>/'
                }]
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            less: {
                files: [
                    '<%= paths.dev %>/<%= paths.css %>/**/*.less',
                ],
                tasks: ['less', 'concat:styles', 'autoprefixer', 'copy:styles']
            },

            css: {
                files: [
                    '<%= paths.dev %>/<%= paths.css %>/**/*.css',
                ],
                tasks: ['concat:styles', 'autoprefixer', 'copy:styles']
            },

            rootfiles: {
                files: [
                    '<%= paths.dev %>/*.*',
                ], 
                tasks: [
                    'replace:dist', 'replace:serve', 'copy:rootfiles'
                ]
            },

            scripts: {
                files: [
                    '<%= paths.dev %>/<%= paths.js %>/**/*.js',
                ],
                tasks: ['concat:scripts', 'copy:scripts']
            },

            lib: {
                files: [
                    '<%= paths.dev %>/<%= paths.lib %>/**/*.*',
                ],
                tasks: ['copy:lib']
            },

            img: {
                files: [
                    '<%= paths.dev %>/<%= paths.img %>/**/*.*',
                ],
                tasks: ['imagemin', 'svgmin', 'copy:img']
            },

            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= paths.dev %>/**/*.*'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: '0.0.0.0' // Change this to '0.0.0.0' to access the server from outside
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= paths.deploy %>/'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '<%= paths.dev %>/<%= paths.temp %>/',
                        '<%= paths.dev %>/<%= paths.test %>/',
                        './'
                        ]
                }
            },
            release: {
                options: {
                    open: true,
                    livereload: false,
                    base: [
                        '<%= paths.deploy %>/'
                    ]
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            release: {
                files: [{
                    dot: true,
                    src: [
                        '<%= paths.deploy %>/**',
                        '<%= paths.base %>/**',
                        '<%= paths.build %>/**',
                        '<%= paths.zip %>/**',
                        '!<%= paths.build %>/.git*'
                    ]
                }]
            },

            server: '<%= paths.deploy %>/'
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'less:watch',
                'copy:watch'
            ],
            release: [
                'less:release',
                'copy:release',
                'imagemin',
                'svgmin'
            ],
            full: [
                'less',
                'concat:scripts',
                'imagemin',
                'svgmin'
            ]
        }
    });

    grunt.registerTask('prepare', ['clean:release', 'replace:less', 'concurrent:full', 'concat:styles', 'concat:scripts', 'replace:dist']);
    grunt.registerTask('serve', ['prepare', 'autoprefixer:full', 'replace:serve', 'copy:full', 'copy:manifest', 'connect:livereload', 'watch']);
    grunt.registerTask('build', ['prepare', 'autoprefixer:deploy', 'replace:deploy', 'uglify', 'cssmin', 'copy:full', 'rename', 'zip']);

    grunt.registerTask('default', ['serve']);
};