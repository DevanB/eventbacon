var adminApp = angular.module('adminApp',['ngResource', 'ngRoute']);

adminApp.config(function ($routeProvider) {
  $routeProvider.when('/', { templateUrl: "templates/admin/index.html", controller: "DashboardController" } );
  $routeProvider.when('/event/:id', {templateUrl: "templates/admin/event.html", controller: "EventController" } );
});

adminApp.controller('DashboardController', function($scope, Event){
  $scope.event = {};
  $scope.events = [];
  $scope.addEvent = function(){
    Event.create($scope.event).then(function(event){
      $scope.event.id = event.id;
      $scope.events.push($scope.event);
      $scope.event = {};
    }, function(errors){
      $scope.errors = errors;
    });
  };
  Event.all().then(function(events){
    $scope.events = events;
    $scope.eventCount = events.length;
  }, function(errors){
    $scope.errors = errors;
  });
});

adminApp.controller('EventController', function($scope, Event, $routeParams, CostLevel){
  $scope.test = "Hello Event Page";
  $scope.levels = [{event_id: $routeParams.id, name: "", cost: "", deposit: ""}];
  Event.find($routeParams.id).then(function(event){
    $scope.event = event;
  });
  $scope.addLevel = function(){
    $scope.levels.push({event_id: $routeParams.id})
  };
  $scope.removeLevel = function(index){
    $scope.levels.splice(index,1);
  };
  $scope.saveLevels = function(){
    CostLevel.create($scope.levels).then(function(){
      console.log("levels saved");
    }, function(errors){
      $scope.errors = errors;
    });
  }
});

adminApp.factory('CostLevel',function($resource, $q){
  var exports = {};
  var resource = $resource('/api/cost_levels/:id', {event_id: '@id'});
  exports.create = function(cost_level){
    var deferred = $q.defer();
    var newCostLevel = new resource({cost_level: cost_level});
    newCostLevel.$save(function(data){
      deferred.resolve(data.cost_level);
    }, function(errors){
      deferred.reject(errors);
    });
    return deferred.promise;
  }
  return exports;
});

adminApp.factory('Event',function($resource, $q){
  var exports = {};
  var resource = $resource('/api/events/:id', {id: '@id'});
  exports.create = function(event){
    var deferred = $q.defer();
    var newEvent = new resource({event: event});
    newEvent.$save(function(data){
      deferred.resolve(data.event);
    }, function(errors){
      deferred.reject(errors);
    });
    return deferred.promise;
  };
  exports.all = function(){
    var deferred = $q.defer();
    resource.get(function(data){
      deferred.resolve(data.events);
    }, function(errors){
      deferred.reject(errors);
    });
    return deferred.promise;
  };
  exports.find = function(id){
    var deferred = $q.defer();
    resource.get({id: id}, function(data){
      deferred.resolve(data.event);
    });
    return deferred.promise;
  };
  return exports;
});