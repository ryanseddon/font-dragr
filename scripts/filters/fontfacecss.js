'use strict';

angular.module('fdApp')
    .filter('fontfacecss', function () {
    return function(files) {
        var fonts = [];

        angular.forEach(files, function(file) {
            fonts.push([
                '@font-face{font-family: ',
                file.name,
                '; src:url(',
                file.result,
                ');}'
            ].join(''));
        });

        return fonts;
    };
});
