module.exports = function(grunt) {

	grunt.config.init({
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
		}
	});
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.registerTask('default', ['watch']);
};
