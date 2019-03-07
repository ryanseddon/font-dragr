'use strict';

angular.module('fdApp').controller('GalleryCtrl', ['$scope', '$http', function($scope, $http) {

    $http.get('/gallery/gallery.json')
        .success(function(data){
            $scope.gallery = data;
        });

    $scope.loadFont = function(url) {
        $http.get(url + '/index.json')
            .success(function(data) {
                $scope.$emit('addFont', data);
            });
    };

}]);
