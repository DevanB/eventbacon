var adminApp = angular.module('adminApp',['ngResource', 'ngRoute', 'ui.bootstrap']);

adminApp.config(function ($routeProvider) {
  $routeProvider.when('/', { templateUrl: "templates/admin/index.html", controller: "DashboardController" } );
  $routeProvider.when('/events', { templateUrl: "templates/admin/events.html", controller: "EventsController" } );
  $routeProvider.when('/event/:id', {templateUrl: "templates/admin/event.html", controller: "EventController" } );
  $routeProvider.when('/groups', { templateUrl: "templates/admin/groups.html", controller: "GroupsController" } );
  $routeProvider.when('/group/:id', {templateUrl: "templates/admin/group.html", controller: "GroupController" } );
});

adminApp.controller('NavbarCtrl', function($scope, $location){
  $scope.isActive = function (viewLocation) { 
    return viewLocation === $location.path();
  };
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

adminApp.controller('EventsController', function($scope, Event){
  $scope.test = "Events Page";
});

adminApp.controller('EventController', function($scope, $routeParams, Event, Group, alertService){
  var handleErrors = function(errors){
    $scope.errors = errors;
  };
  Event.find($routeParams.id).then(function(event){
    $scope.event = event;
    $scope.event.cost_levels = event.cost_levels.length > 0 ? event.cost_levels : [{}];
  });
  $scope.addLevel = function(){
    $scope.event.cost_levels.push({});
  };
  $scope.removeLevel = function(index){
    $scope.event.cost_levels.splice(index,1);
  };
  $scope.saveLevels = function(){
    Event.create($scope.event).then(alertService.addAlert('success','Event successfully saved.'),handleErrors);
  };
});

adminApp.controller('GroupsController', function($scope, Group){
  $scope.test = "Groups Page";
});

adminApp.controller('GroupController', function($scope, $routeParams, Group, Event){
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

adminApp.factory('Event', function($resource, $q){
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

adminApp.factory('alertService', function($rootScope, $timeout) {
  var alertService = {};
  $rootScope.alerts = [];
  alertService.addAlert = function(type, msg, timeout) {
    $rootScope.alerts.push({type: type, msg: msg,
      close: function() {
        alertService.closeAlert(this);
      }
    });
    if (timeout) { 
      $timeout(function(){ 
        alertService.closeAlert(this)
      }, timeout); 
    }
  };
  alertService.closeAlert = function(alert) {
    return this.closeAlertIdx($rootScope.alerts.indexOf(alert));
  };
  alertService.closeAlertIdx = function(index) {
    return $rootScope.alerts.splice(index, 1);
  };
  return alertService;
});

adminApp.directive('eventTile', function eventTile(){
  'use strict';
  return {
    restrict: 'E',
    replace: true,
    scope: true,
    templateUrl: 'templates/admin/eventTile.tmpl.html',
    controller: function($scope){
      $scope.colors = [["255, 0, 0, 0.75","255,255, 255,100"],["0, 128, 0, 0.75","255,255,255,100"],["255, 165, 0, 0.75","255,255,255,100"],["173, 216, 230, 0.75","0,0,0,0.75"],["128, 0, 128, 0.75","255,255,255,100"]];
      $scope.setColor = function(){
        return $scope.colors[Math.floor(Math.random()*$scope.colors.length)];
      };
    },
    link: function(){}
  }
});