requirejs.config({
    baseUrl: '../Scripts',
    paths: {
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery',
        angular: '//ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular',
        'angular-route': '//ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular-route',
        'angular-sanitize': '//ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular-sanitize',
        'angular-resource': '//ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular-resource',
        'ngStorage': '//raw.githubusercontent.com/gsklee/ngStorage/master/ngStorage',
        'ui-grid' : 'include/ui-grid'
    },

    shim: {
        'angular': {
            exports: 'angular',
            deps: ['jquery']
        },

        'angular-route': ['angular'],
        'angular-resource': ['angular'],
        'angular-sanitize': ['angular'],
        'ngStorage': ['angular'],
        'bootstrap': ['jquery'],
        'ui-grid' : ['angular']
    }

});

require([
    'jquery',
    'angular',
    'angular-route',
    'angular-sanitize',
    'angular-resource',
    'ngStorage',
    'ui-grid'
],
    function ()
    {
        var appModule = angular.module('SkillMatrix', ['ngRoute', 'ui.grid']);

        appModule.controller('DefaultController', ['$scope', 'dataRepository', ($scope: SkillMatrix.ISkillMatrixScope, repo: SkillMatrix.Services.IDataRepository) => new SkillMatrix.Controllers.DefaultController($scope, repo)]);
        appModule.factory('dataRepository', ['$http', ($http) => new SkillMatrix.Services.DataRepositoryService($http)]);


        appModule.config(['$routeProvider',
            function ($routeProvider) {
                $routeProvider.

                    when('/home', {
                        templateUrl: '../Pages/views/home/default.html',
                        controller: 'DefaultController'

                    }).
                    when('/contacts/new', {
                        templateUrl: '../Pages/views/contact/create.html',
                        controller: 'DefaultController'
                    }).
                    when('contacts/view/:id', {
                        templateUrl: 'Pages/views/home/default.html',
                        controller: 'DefaultController'
                    }).
                    when('/contacts/list', {
                        templateUrl: '../Pages/views/contact/listGrid.html',
                        controllder: 'DefaultController'
                    }).
                    when('/about', {
                        templateUrl: '../Pages/views/shared/about.html',
                        controller: 'DefaultController'
                    }).
                    otherwise({
                        redirectTo: '/home'
                    });
            }]);

        angular.bootstrap(document, ['SkillMatrix']);
    }
);