module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		replace:{
			build: {
				src: ['base.js'],
				dest: 'dist/base.js',
				replacements: [{
					from: '{{VERSION}}',
					to: '<%= pkg.version %>'
				}]
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'dist/base.js',
				dest: 'dist/base.min.js'
			}
		}
	});


grunt.loadNpmTasks('grunt-text-replace');
grunt.loadNpmTasks('grunt-contrib-uglify');

grunt.registerTask('default', ['replace', 'uglify']);

};