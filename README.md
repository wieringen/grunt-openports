[grunt-openports](http://baijs.com/grunt-openports) [![NPM version][npm-image]][npm-url]
==================================================
What?
--------------------------------------
grunt-openports is a wrapper around openport that finds a open port in a given range. When a open port is found it will be set to the grunt config keys specified.
You can use this in combination with grunt watch livereload to always have a unique port for example.

How?
--------------------------------------
For the sake of giving a full example I also included the processhtml task. I love this task. It makes it really easy to manipulate html templates at build time. No more need for regex replaces! So in this example we combine openports, processhtml and watch. openports here is used to provide a unused port for livereload.

```js
module.exports = function (grunt) {
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-processhtml' );
    grunt.loadNpmTasks( 'grunt-openports' );

    grunt.initConfig({
        // Finds a openport that we can use for livereload
        openports: {
            options: {
                startingPort: 35000,
                endingPort: 36000,

                // Set port number to specific point in grunt config.
                config: [
                    'watch.options.livereload',
                    'processhtml.options.data.livereloadPort'
                ]
            }
        },

        // Parses the index.html and sets livereload port.
        processhtml: {
            options: {
                process: true,
                strip: true,
                data : {
                    // Will be replaced with a port number from openports task.
                    livereloadPort: 'placeholder'
                }
            },
            html: {
                files: {
                    'example/index.html': [ 'example/index.html' ]
                }
            }
        },

        // Check for local changes.
        watch: {
            options: {
                spawn: false,

                // Will be replaced with a port number from openports task.
                livereload: true
            },
            html: {
                files: [ 'example/index.html' ],
                tasks: [ 'processhtml' ]
            },
        }
    });

    grunt.registerTask('default', [ 'openports', 'processhtml', 'watch' ]);
};
```

This tag below you will need to insert in your html file. When it gets processed by processhtml the placeholder will be replaced with the livereload port.
```html
  <script src="http://localhost:<%= livereloadPort %>/livereload.js"></script>
```

[npm-image]: https://badge.fury.io/js/grunt-openports.png
[npm-url]: http://badge.fury.io/js/grunt-openports

