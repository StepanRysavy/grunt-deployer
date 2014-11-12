// Generated on 2014-07-11 using generator-durandal 0.1.5
'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); // Load grunt tasks automatically
    require('time-grunt')(grunt); // Time how long tasks take. Can help when optimizing build times

    var options = {
        dev: grunt.option('dev')
    };

    // Define the configuration for all the tasks
    grunt.initConfig({
        // Configurable paths
        paths: {
            dev: 'Code',
            deploy: 'Deploy',
            img: 'img',
            css: 'css',
            js: 'js',
            lib: 'lib',
            build: '.build',
            bower: 'bower_components',
            temp: '.temp',
            test: 'test/spec'
        },

        pkg: grunt.file.readJSON('package.json'),

        // Build less files into css ones
        less: {
            full: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: "<%= paths.dev %>/<%= paths.build %>/<%= paths.css %>/main.css.map",
                    sourceMapURL: 'main.css.map',
                    outputSourceFiles: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.dev %>/<%= paths.css %>/',
                        src: 'main.less',
                        dest: '<%= paths.dev %>/<%= paths.build %>/<%= paths.css %>/',
                        ext: '.css'
                    }
                ]
            }
        },

        cssmin: {
            main: {
                options: {
                    banner: '<%= pkg.banner %>'
                },
                files: {
                    '<%= paths.dev %>/<%= paths.build %>/<%= paths.css %>/main.css': ['<%= paths.dev %>/<%= paths.build %>/<%= paths.css %>/main.css']
                }
            },
            critical: {
                files: {
                    '<%= paths.dev %>/<%= paths.build %>/<%= paths.css %>/critical.css': ['<%= paths.dev %>/<%= paths.build %>/<%= paths.css %>/critical.css']
                }
            }
        },

        // Concatenate files to reduce requests count
        concat: {
            options: {
                stripBanners: true,
                banner: '<%= pkg.banner %>'
            },
            scripts: {
                src: [
                    '<%= paths.dev %>/<%= paths.js %>/define.js',
                    '<%= paths.dev %>/<%= paths.js %>/lib/*.js',
                    '<%= paths.dev %>/<%= paths.js %>/modules/*.js',
                    '<%= paths.dev %>/<%= paths.js %>/app.js'
                ],
                dest: '<%= paths.dev %>/<%= paths.build %>/<%= paths.js %>/app.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= pkg.banner %>'
            },
            full: {
                files: {
                    '<%= paths.dev %>/<%= paths.build %>/<%= paths.js %>/app.js': ['<%= paths.dev %>/<%= paths.build %>/<%= paths.js %>/app.js']
                }
            }
        },

        critical: {
            test: {
                options: {
                    base: './',
                    css: [
                        '<%= paths.dev %>/<%= paths.build %>/<%= paths.css %>/main.css'
                    ],
                    width: 1280,
                    height: 800
                },
                src: '<%= paths.dev %>/index.html',
                dest: '<%= paths.dev %>/<%= paths.build %>/<%= paths.css %>/critical.css'
            }
        },

        inline: {
            dist: {
                src: ['<%= paths.dev %>/index.html'],
                dest: ['<%= paths.dev %>/<%= paths.build %>/']
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
                        cwd: '<%= paths.dev %>/<%= paths.img %>/',
                        src: '**/*.*',
                        dest: '<%= paths.deploy %>/<%= paths.img %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= paths.dev %>/<%= paths.build %>',
                        src: '**/*.*',
                        dest: '<%= paths.deploy %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= paths.bower %>',
                        src: '**/*.*',
                        dest: '<%= paths.deploy %>/<%= paths.lib %>/<%= paths.bower %>'
                    },
                    {
                        expand: true,
                        cwd: '<%= paths.dev %>/',
                        src: '*.html',
                        dest: '<%= paths.deploy %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= paths.dev %>/<%= paths.build %>',
                        src: 'index.html',
                        dest: '<%= paths.deploy %>/'
                    }
                ]
            },
            styles: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.dev %>/<%= paths.build %>/<%= paths.css %>/',
                        src: '**/*.*',
                        dest: '<%= paths.deploy %>/<%= paths.css %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= paths.dev %>/<%= paths.build %>',
                        src: 'index.html',
                        dest: '<%= paths.deploy %>/'
                    }
                ]
            },
            scripts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.dev %>/<%= paths.build %>/<%= paths.js %>/',
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
            html: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.dev %>/',
                        src: '*.html',
                        dest: '<%= paths.deploy %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= paths.dev %>/<%= paths.build %>',
                        src: 'index.html',
                        dest: '<%= paths.deploy %>/'
                    }
                ]
            }

        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 2 version'],
                map: true
            },
            full: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.dev %>/<%= paths.build %>/<%= paths.css %>/',
                    src: '*.css',
                    dest: '<%= paths.dev %>/<%= paths.build %>/<%= paths.css %>/'
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
                    dest: '<%= paths.dev %>/<%= paths.build %>/<%= paths.img %>/'
                }]
            }
        },
        svgmin: {
            release: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.dev %>/<%= paths.img %>/',
                    src: '*.svg',
                    dest: '<%= paths.dev %>/<%= paths.build %>/<%= paths.img %>/'
                }]
            }
        },

        // Test your code with jasmine
        mocha: {
            test: ["<%= paths.dev %>/<%= paths.test %>/index.html"]
        },

        jshint: {
            all: ['<%= paths.dev %>/<%= paths.js %>/*.js', '<%= paths.dev %>/<%= paths.js %>/modules/**/*.js']
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            test: {
                files: ['<%= paths.dev %>/<%= paths.test %>/spec/*.js'], 
                tasks: ['connect:test', 'jasmine']
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['build', 'inline', 'copy:full']
            },

            less: {
                files: [
                    '<%= paths.dev %>/<%= paths.css %>/**/*.less',
                ],
                tasks: ['less', 'autoprefixer', 'critical', 'inline', 'copy:styles']
            },

            scripts: {
                files: [
                    '<%= paths.dev %>/<%= paths.js %>/**/*.js',
                ],
                tasks: ['jshint', 'concat:scripts', 'copy:scripts']
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

            html: {
                files: [
                    '<%= paths.dev %>/*.html', 
                ],
                tasks: ['critical', 'inline', 'copy:html']
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
                        '<%= paths.deploy %>/',
                        '<%= paths.dev %>/<%= paths.build %>/**',
                        '!<%= paths.dev %>/<%= paths.build %>/.git*'
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
                'concat',
                'imagemin',
                'svgmin'
            ]
        },

        'ftp-deploy': {
            build: {
                auth: {
                    host: '<%= pkg.serverHost %>',
                    port: 21,
                    authKey: 'serverLogin',
                    authPath: 'package.json'
                },
                src: '<%= paths.deploy %>/',
                dest: '<%= pkg.serverPath %>',
                exclusions: ['<%= paths.deploy %>/**/.DS_Store', '<%= paths.deploy %>/**/Thumbs.db']
            }
        }
    });

    grunt.registerTask('test', ['clean:server', 'copy:styles', 'autoprefixer', 'connect:test', 'mocha']);
    grunt.registerTask('build', ['clean:release', 'jshint', 'concurrent:full', 'autoprefixer:full', 'critical']);

    grunt.registerTask('serve', ['build', 'inline', 'copy:full', 'connect:livereload', 'watch']);
    grunt.registerTask('deploy', ['build', 'uglify', 'cssmin', 'inline', 'copy:full', 'connect:livereload', 'watch:livereload']);
    grunt.registerTask('upload', ['build', 'uglify', 'cssmin', 'inline', 'copy:full', 'ftp-deploy']);

    grunt.registerTask('default', ['serve']);
};