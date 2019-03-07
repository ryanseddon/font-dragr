'use strict';
angular.module('fdApp', ['ngRoute']).config([
  '$routeProvider',
  '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', { templateUrl: 'views/main.html' }).when('/editor', { templateUrl: 'views/editor.html' }).when('/gallery', {
      templateUrl: 'views/gallery.html',
      controller: 'GalleryCtrl'
    }).otherwise({ redirectTo: '/' });
    $locationProvider.html5Mode(true);
  }
]);