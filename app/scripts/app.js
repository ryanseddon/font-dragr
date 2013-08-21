/*!
 * font dragr
 * https://github.com/ryanseddon/font-dragr
 * Copyright (c) 2009 - 2013 Ryan Seddon
 * released under the MIT License
 * http://ryanseddon.mit-license.org
*/
'use strict';

angular.module('fdApp', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html'
            })
            .when('/editor', {
                templateUrl: 'views/editor.html'
            })
            .when('/gallery', {
                templateUrl: 'views/gallery.html',
                controller: 'GalleryCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
}]);
