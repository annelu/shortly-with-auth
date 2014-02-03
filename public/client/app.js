angular.module('Shortlyapp', ['ngRoute'])
.controller('MainController', function($scope, $http, $filter){
  $http({
    method: 'GET',
    url: '/links'    
  }).then(function(data){
    $scope.links = data.data;
  })

})
.controller('ShortenController', function($scope, $http){
  $scope.postit = function(){
    $http({
      method: 'POST',
      url: '/links',
      data: $scope.link
    }).success(function(data){
      delete $scope.link.url;
    })
  }
})
.controller('LinkStatController', function($scope, $routeParams, $http){
  $scope.url = $routeParams.url;

  $http({
    method: 'GET',
    url: '/api/' + $scope.url,
  }).then(function(data){
    $scope.links = data.data;
  })

})
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    controller: 'MainController',
    templateUrl: 'client/views/main.html'
  })
  .when('/shorten', {
    controller: 'ShortenController',
    templateUrl: 'client/views/shorten.html'
  })
  .when('/linkstats/:url', {
    controller: 'LinkStatController',
    templateUrl: 'client/views/linkstats.html'
  })
}])
