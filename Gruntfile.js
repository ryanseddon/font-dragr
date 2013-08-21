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
    ngtemplates: {
        fdApp: {
          options: {
            base: '<%= yeoman.app %>/views',
            prepend:  'views/'
          },
          src: [ '<%= yeoman.app %>/views/**.html' ],
          dest: '<%= yeoman.dist %>/scripts/templates.js'
        }
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
    qsrev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/scripts.js',
            '<%= yeoman.dist %>/styles/main.css'
          ]
        },
        dest: '<%= yeoman.dist %>/index.html'
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
      // dist: {
      //   files: {
      //     '<%= yeoman.dist %>/styles/main.css': [
      //       '.tmp/styles/{,*/}*.css',
      //       '<%= yeoman.app %>/styles/{,*/}*.css'
      //     ]
      //   }
      // }
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
            '<%= yeoman.app %>/components/angular-route/angular-route.js',
            '<%= yeoman.app %>/scripts/**/*.js',
            '<%= ngtemplates.fdApp.dest %>'
          ]
        },
        options: {
            sourceMap: '<%= yeoman.dist %>/scripts/scripts.js.map',
            sourceMapRoot: '/',
            sourceMapPrefix: 1,
            directive: '\/\/# sourceMappingURL=',
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
            'images/{,*/}*.{gif,webp,png}'
          ]
        }]
      }
    }
  });

// Create qsrev task to append md5 hash query string to css/js resources
  var crypto = require('crypto');

  function md5(filepath, algorithm, encoding) {
    var hash = crypto.createHash(algorithm);
    grunt.log.verbose.write('Hashing ' + filepath + '...');
    hash.update(grunt.file.read(filepath));
    return hash.digest(encoding);
  }

  grunt.registerMultiTask('qsrev', 'Add MD5 hash query string to CSS and JS resources', function() {

    var options = this.options({
      algorithm: 'md5',
      length: 8
    });
    var files =  this.files[0].files.src,
        hashes = {},
        html = this.data.dest;

    files.forEach(function(file) {
        var reExtension = /\.[0-9a-z]+$/i,
            reCSSJS = /^(css|js)$/i,
            expanded = grunt.file.expand(file),
            ext, hash, qs;

        if(expanded.length === 1) {
            ext = reExtension.exec(file)[0].slice(1);
        }

        if(reCSSJS.test(ext)) {
            hash = md5(file, options.algorithm, 'hex');
            qs = hash.slice(0, options.length);

            hashes[ext] = qs;
        }
    });

    var htmlContents = grunt.file.read(html),
        reJS = /src\=\"scripts\/scripts\.js\"\>/,
        reCSS = /href\=\"styles\/main\.css\"\>/;

    htmlContents = htmlContents
      .replace(reJS, ['src="scripts/scripts.js?v=', hashes.js, '">'].join(''))
      .replace(reCSS, ['href="styles/main.css?v=', hashes.css, '">'].join(''));

    grunt.file.write(html, htmlContents);
    grunt.log.writeln('Update the HTML with new hash query strings');
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
    'cssmin',
    'htmlmin',
    'concat',
    'copy',
    'imagemin',
    'usemin',
    'ngmin',
    'ngtemplates',
    'uglify',
    'qsrev',
    'sourcemapdirective'
  ]);

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
