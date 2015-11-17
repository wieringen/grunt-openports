module.exports = function(grunt) {
    var openport = require('openport');

    grunt.registerTask('openports', 'Finds an open port', function() {
        var done = this.async();
        var options = this.options({});

        openport.find(
            options,
            function (err, port) {
                if (err) {
                    grunt.log.error(err);

                } else {
                    grunt.log.writeln('Found port ' + port.toString().cyan);

                    options.config.forEach(function(key) {
                        grunt.config.set(key, port);

                        grunt.log.writeln('Assigning port to ' + key.toString().cyan);
                    });

                    done();
                }
            }
        );
    });
};
