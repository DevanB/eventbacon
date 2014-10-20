var adminApp = angular.module('adminApp',['ngResource', 'ngRoute']);

adminApp.config(function ($routeProvider) {
  $routeProvider.when('/', { templateUrl: "templates/index.html", controller: "HomeController" } )
  $routeProvider.when('/admin', { templateUrl: "templates/admin/index.html", controller: "DashboardController" } )
});

adminApp.controller('DashboardController', function($scope, Event){
  $scope.event = {};
  $scope.events = [];
  $scope.addEvent = function(){
    Event.create($scope.event);
    $scope.event = "";
  };
  Event.all().then(function(events){
    $scope.events = events;
    $scope.eventCount = events.length;
  });
});

adminApp.factory('Event',function($resource, $q){
  var exports = {};
  var resource = $resource('/api/events/:id', {id: '@id'});
  exports.create = function(event){
    var newEvent = new resource({event: event});
    newEvent.$save();
  };
  exports.all = function(){
    var deferred = $q.defer();
    resource.get(function(data){
      deferred.resolve(data.events);
    });
    return deferred.promise;
  };
  return exports;
});