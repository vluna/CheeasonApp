'use strict';

/**
 * @ngdoc overview
 * @name iat381FinalProjectCheeasonApp
 * @description
 * # iat381FinalProjectCheeasonApp
 *
 * Main module of the application.
 */
angular
  .module('iat381FinalProjectCheeasonApp', [
    'ngAnimate',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/weather.html',
        controller: 'WeatherCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
