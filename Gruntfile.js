'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  try {
    yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      livereload: {
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
        ],
        tasks: ['livereload']
      },
      jade: {
        files: 'app/views/*.jade',
        tasks: 'jade'
      }
    },
    connect: {
      livereload: {
        options: {
          port: 9000,
          // Change this to '0.0.0.0' to access the server from outside.
          hostname: 'localhost',
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9000,
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.livereload.options.port %>'
      }
    },
    clean: {
      dist: ['.tmp', '<%= yeoman.dist %>/*'],
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    jade: {
      html: {
        src: ['app/views/*.jade'],
        dest: 'app/views',
        options: {
          client: false
        }
      }
    },
	inlineviews:{
		files:['<%= yeoman.dist %>/views/*.html'],
		output: '<%= yeoman.dist %>/index.html'
	},
    concat: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '.tmp/scripts/{,*/}*.js',
            '<%= yeoman.app %>/scripts/{,*/}*.js'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.app %>/components/angular/angular.js',
            '<%= yeoman.app %>/scripts/**/*.js'
          ]
        },
        options: {
            sourceMap: '<%= yeoman.dist %>/scripts/scripts.js.map',
            sourceMapRoot: '/',
            sourceMapPrefix: 1,
            directive: '\/\/@ sourceMappingURL=',
            script: '<%= yeoman.dist %>/scripts/scripts.js'
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'components/**/*',
            'scripts/**/*',
            'gallery/**/*',
            'images/{,*/}*.{gif,webp}'
          ]
        }]
      }
    }
  });

  grunt.renameTask('regarde', 'watch');
  // remove when mincss task is renamed
  grunt.renameTask('mincss', 'cssmin');

  grunt.registerTask('server', [
    'clean:server',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    'test',
    'jade',
    'useminPrepare',
    'imagemin',
    'cssmin',
    'htmlmin',
    'concat',
    'copy',
    'cdnify',
    'usemin',
    'ngmin',
    'inlineviews',
    'uglify',
    'sourcemapdirective'
  ]);
  
  grunt.registerTask('inlineviews', 'grab views and inline into script tags', function () {
	var config = grunt.config.get('inlineviews'),
		reBuildViews = /<!--\s*inlineviews\s*-->/,
		views = [];

	grunt.file.expand({filter: 'isFile'}, config.files).forEach(function (file) {
		var body = grunt.file.read(file).replace(/\r\n\s*/g, '');
		var wrapFile = '<script type="text/ng-template" id="path">html</script>';
        var path = file.replace('dist/','');

		grunt.log.subhead('inlined view: ' + file);

		wrapFile = wrapFile.replace(/html/, body).replace(/path/, path);

		views.push(wrapFile);
	});

	var output = grunt.file.read(config.output).replace(reBuildViews, views.join('\n\t'));
	grunt.file.write(config.output, output);

  });

  grunt.registerTask('sourcemapdirective', 'grab the concat and minified source and append @sourceMappingURL', function() {
    var config = grunt.config.get('uglify');
    var opts = config.dist.options;
    var script = grunt.file.read(opts.script);
    var source = [
        '\n',
        opts.directive,
        opts.script.replace('dist/scripts/',''),
        '.map'
    ].join('');

    grunt.log.writeln('Appending sourcemap directive: ' + source.replace(/\n/, ''));

    script = script + source;

    grunt.file.write(opts.script, script);
  });

  grunt.registerTask('default', ['build']);
};
