angular.module('eventBaconApp', ['ngResource'])

eventBaconApp.config ($httpProvider) ->
  authToken = $("meta[name=\"csrf-token\"]").attr("content")
  $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken

$(document).on 'page:load', ->
  $('[ng-app]').each ->
    module = $(this).attr('ng-app')
    angular.bootstrap(this, [module])

defaults = $http.defaults.headers
defaults.patch = defaults.patch || {}
defaults.patch['Content-Type'] = 'application/json'