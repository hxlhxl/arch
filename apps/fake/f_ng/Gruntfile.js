module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    'dist/app.js': 'src/app.js'
                }
            }
        },
        jshint: {
            all: ['src/**/*.js'],
            options: {
                globals: {
                    _: false,
                    $: false,
                    jasmine: false,
                    describe: false,
                    it: false,
                    expect: false,
                    beforeEach: false,
                    afterEach: false,
                    sinon: false,
                },
                browser: true,
                devel: true,
                esversion: 6,
            }
        },
        testem: {
            unit: {
                src_files: [
                    'src/**/*.js',
                    'test/**/*.js'
                ],
                options: {
                    debug: true,
                    framework: 'jasmine2',
                    launch_in_dev: ['PhantomJS'],
                    // before_tests: 'grunt jshint',
                    serve_files: [
                        'node_modules/lodash/lodash.min.js',
                        'node_modules/jquery/dist/jquery.js',
                        'node_modules/sinon/pkg/sinon.js',
                        'src/**/*.js',
                        'test/**/*.js'
                    ],
                    watch_files: [
                        'src/**/*.js',
                        "test/**/*.js"
                    ]

                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-testem');
    grunt.registerTask('babel', ['babel']);
    grunt.registerTask('default', ['testem:run:unit']);
}
