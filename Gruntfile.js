
module.exports = function(grunt) {

    grunt.initConfig({

        'sass': {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'public/stylesheets/style.css': 'sass/style.scss'
                }
            }
        },

        'babel': {
            options: {
                presets: [
                    ['react'], ['env']
                ]
            },
            dist: './client/*.js'
                // files: {
                //     "public/javascripts/app.js": "clients/App.jsx",
                //     "public/javascripts/links.js": "javascripts/links.jsx"
                // }
        },

        'watch': {
            scripts: {
                files: ['client/*'],
                tasks: ['babel'],
                options: {
                    spawn: false
                }
            },
            style: {
                files: ['sass/style.scss'],
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
};