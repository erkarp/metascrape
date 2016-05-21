module.exports = function(grunt) {

	grunt.config.init({
		sass: {
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
        sourceMap: true,
        presets: ['react']
      },
      dist: {
        files: {
          "public/javascripts/app.js": "public/javascripts/app.jsx"
        }
      }
    },
		watch: {
		  scripts: {
		    files: ['public/javascripts/*.jsx'],
		    tasks: ['babel'],
		    options: {
		      spawn: false,
		    },
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
