'use strict';

/**
 * @ngdoc overview
 * @name cobagulpApp
 * @description
 * # cobagulpApp
 *
 * Main module of the application.
 */
angular
  .module('cobagulpApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'services'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/detail/:siswaId', {
        templateUrl: 'views/detail.html',
        controller: 'SiswaDetailCtrl',
        controllerAs: 'detail'
      })
      .when('/detail/:siswaId/:kitabId', {
        templateUrl: 'views/detail-kitab.html',
        controller: 'SiswaDetailKitabCtrl',
        controllerAs: 'detailkitab'
      })
      .when('/registration', {
        templateUrl: 'views/registration.html',
        controller: 'RegistrationCtrl',
        controllerAs: 'registration'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
