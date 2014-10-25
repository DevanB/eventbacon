var adminApp = angular.module('adminApp',['ngResource', 'ngRoute']);

adminApp.config(function ($routeProvider) {
  $routeProvider.when('/', { templateUrl: "templates/admin/index.html", controller: "DashboardController" } );
  $routeProvider.when('/event/:id', {templateUrl: "templates/admin/event.html", controller: "EventController" } );
  $routeProvider.when('/group/:id', {templateUrl: "templates/admin/group.html", controller: "GroupController"} );
});

adminApp.controller('DashboardController', function($scope, Event, Group){
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
  Group.all().then(function(groups){
    $scope.groups = groups;
  }, function(errors){
    $scope.errors = errors;
  });
});

adminApp.controller('EventController', function($scope, $routeParams, Event, Group){
  var handleErrors = function(errors){
    $scope.errors = errors;
  };
  Event.find($routeParams.id).then(function(event){
    $scope.event = event;
    $scope.event.cost_levels = event.cost_levels.length > 0 ? event.cost_levels : [{}];
  });
  $scope.addLevel = function(){
    $scope.event.cost_levels.push({})
  };
  $scope.removeLevel = function(index){
    $scope.event.cost_levels.splice(index,1);
  };
  $scope.saveLevels = function(){
    Event.create($scope.event).then(null, handleErrors);
  };
});

adminApp.controller('GroupController', function($scope, $routeParams, Group, Event){
  $scope.test = "hello group page!";
  Group.find($routeParams.id).then(function(group){
    $scope.group = group;
  });
});

adminApp.factory('Group', function($resource, $q){
  var exports = {};
  var resource = $resource('/api/groups/:id', {id: '@id'});
  exports.all = function(){
    var deferred = $q.defer();
    resource.get(function(data){
      deferred.resolve(data.groups);
    }, function(errors){
      deferred.reject(errors);
    });
    return deferred.promise;
  };
  exports.find = function(id){
    var deferred = $q.defer();
    resource.get({id: id}, function(data){
      deferred.resolve(data.group);
    });
    return deferred.promise;
  };
  return exports;
});

adminApp.factory('Event',function($resource, $q){
  var exports = {};
  var resource = $resource('/api/events/:id', {id: '@id'});
  exports.create = function(event){
    event.cost_levels_attributes = event.cost_levels
    var deferred = $q.defer();
    var newEvent = new resource({event: event, id: event.id});
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