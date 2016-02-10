module.exports = function(grunt) {

	grunt.config.init({
    'babel': {
      options: {
        sourceMap: false,
        presets: ['react']
      },
      dist: {
        files: {
          "js/app.js": "js/app.jsx"
        }
      }
    }
	});
	grunt.loadNpmTasks('grunt-babel');

	grunt.registerTask('default', ['babel']);
};
