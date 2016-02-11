module.exports = function(grunt) {

	grunt.config.init({
    'babel': {
      options: {
        sourceMap: false,
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
		    files: ['public/javascripts/*'],
		    tasks: ['babel'],
		    options: {
		      spawn: false,
		    },
		  },
		}
	});
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.registerTask('default', ['babel']);
};
