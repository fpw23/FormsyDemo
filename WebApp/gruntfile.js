module.exports = function (grunt) {
    'use strict';
    // Project configuration
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! &lt%= pkg.name %> - v&lt;%= pkg.version %> - ' +
            '&lt;%= grunt.template.today("yyyy-mm-dd") %> */\n',
        concat: {
            options: {
                stripBanners: true
            },
            corejs: {
                src: ['./node_modules/jquery/dist/jquery.js',
                      './node_modules/bootstrap/dist/js/bootstrap.js',
                      './node_modules/summernote/dist/summernote.js'
                      ],
                dest: '../WebServer/content/js/app.core.js'
            },
            corecss: {
                src: ['./Other/font-awesome.css',
                      './node_modules/bootstrap/dist/css/bootstrap.css',
                      './node_modules/react-notifications/lib/notifications.css',
                      './node_modules/summernote/dist/summernote.css',
                      './node_modules/react-datepicker/dist/react-datepicker.css',
                      './node_modules/react-datetime/css/react-datetime.css'
                ],
                dest: '../WebServer/content/css/app.core.css'
            },
            themecss: {
                src: ['./Other/themes/bootstrap.theme.unitied.css',
                      './Other/extra.css'
                ],
                dest: '../WebServer/content/css/app.theme.css'
            },
            
        },
        uglify: {
            options: {
                banner: '<%= banner %>',
                sourceMap: true,
                compress: {
                    drop_console: true
                }
            },
            corejs: {
                src: ['<%= concat.corejs.dest %>'],
                dest: '../WebServer/content/js/app.core.min.js'
            }
        },
        cssmin: {
            corecss: {
                src: ['<%= concat.corecss.dest %>'],
                dest: '../WebServer/content/css/app.core.min.css'
            },
            themecss: {
                src: ['<%= concat.themecss.dest %>'],
                dest: '../WebServer/content/css/app.theme.min.css'
            }
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Tasks
    grunt.registerTask('core', ['concat:corejs', 'concat:corecss', 'concat:themecss', 'uglify:corejs', 'cssmin:corecss', 'cssmin:themecss']);
};