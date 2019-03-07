'use strict';

angular.module('fdApp')
    .filter('jsonfile', function () {
        return function (data) {
            if(!data.error) {
                var font = [],
                    fontFileName = data.fontName.split('/').reverse()[0];
                    fontFileName = fontFileName.replace(/\.\w+$/,'');

                data.fontSize = Math.round(data.fontSize/1024) + 'kb';

                data.fontDataURL = 'data:application/octet-stream;base64,' + data.fontDataURL;

                font.push({
                    name: fontFileName,
                    size: data.fontSize,
                    license: data.fontLicense,
                    licenseurl: data.fontLicenseUrl,
                    author: data.fontAuthor,
                    authorurl: data.fontAuthorUrl,
                    result: data.fontDataURL
                });

                return font;
            } else {
                alert(data.error);
            }
        };
});
