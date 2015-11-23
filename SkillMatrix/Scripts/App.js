requirejs.config({
    baseUrl: '../Scripts',
    paths: {
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery',
        angular: '//ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular',
        'angular-route': '//ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular-route',
        'angular-sanitize': '//ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular-sanitize',
        'angular-resource': '//ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular-resource',
        'ngStorage': '//raw.githubusercontent.com/gsklee/ngStorage/master/ngStorage',
        'ui-grid': 'include/ui-grid'
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
        'ui-grid': ['angular']
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
], function () {
    var appModule = angular.module('SkillMatrix', ['ngRoute', 'ui.grid']);
    appModule.controller('DefaultController', ['$scope', 'dataRepository', function ($scope, repo) { return new SkillMatrix.Controllers.DefaultController($scope, repo); }]);
    appModule.factory('dataRepository', ['$http', function ($http) { return new SkillMatrix.Services.DataRepositoryService($http); }]);
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
});
var SkillMatrix;
(function (SkillMatrix) {
    var Controllers;
    (function (Controllers) {
        var DefaultController = (function () {
            function DefaultController($scope, repositoryService) {
                var _this = this;
                this.$scope = $scope;
                this.repositoryService = repositoryService;
                this.$scope.submit = function () {
                    _this.repositoryService.CreateContact(_this.$scope.newFreelancer);
                };
                this.$scope.reset = function (form) {
                    if (null != form) {
                        form.$setPristine();
                        form.$setUntouched();
                    }
                };
                this.$scope.gridOptions = {
                    useExternalFilter: true,
                    enableSorting: true,
                    enableColumnResizing: true,
                    useExternalSorting: false,
                    columnDefs: [
                        { name: 'Id', field: SkillMatrix.Data.Lists.Freelancers.Columns.Id },
                        {
                            name: 'First name',
                            field: SkillMatrix.Data.Lists.Freelancers.Columns.FirstName,
                        },
                        { name: 'Last name', field: SkillMatrix.Data.Lists.Freelancers.Columns.LastName },
                        { name: 'Email', field: SkillMatrix.Data.Lists.Freelancers.Columns.Email },
                        { name: 'Phone', field: SkillMatrix.Data.Lists.Freelancers.Columns.Phone },
                    ],
                    onRegisterApi: function (gridApi) {
                        $scope.gridApi = gridApi;
                        $scope.gridApi.core.on.sortChanged($scope, $scope.sortChanged);
                        $scope.sortChanged($scope.gridApi.grid, [$scope.gridOptions.columnDefs[1]]);
                    }
                };
                //todos
                /*
    
                1. add navigation to grid item details form
                    or
                2. expand grid for editing
                3. implement custom sorting -> pass $scope-bound sorting context to RequestBuilder
    
                */
                this.$scope.sortChanged = function (grid, sortColumns) {
                    //TODO: custom sorting
                    console.log('sort changed event');
                };
                repositoryService.GetFreelancers().
                    success(function (response, status, headers, config) {
                    _this.$scope.freelancersData = response.d.results;
                    _this.$scope.gridOptions.data = response.d.results;
                }).
                    error(function (response, status, headers, config) {
                    console.log("Failed to resolve freelancers list " + response);
                });
            }
            DefaultController.prototype.Reset = function (form) {
                if (null != form) {
                    form.$setPristine();
                    form.$setUntouched();
                }
            };
            DefaultController.prototype.canSave = function () {
                return this.$scope.newFreelancer.$valid;
            };
            return DefaultController;
        })();
        Controllers.DefaultController = DefaultController;
    })(Controllers = SkillMatrix.Controllers || (SkillMatrix.Controllers = {}));
})(SkillMatrix || (SkillMatrix = {}));
var SkillMatrix;
(function (SkillMatrix) {
    var Data;
    (function (Data) {
        var Lists;
        (function (Lists) {
            var Freelancers = (function () {
                function Freelancers() {
                }
                Freelancers.ListTitle = "Freelancers";
                Freelancers.Columns = {
                    LastName: "Title",
                    FirstName: "FirstName",
                    Phone: "WorkPhone",
                    Email: "Email",
                    Id: "Id"
                };
                return Freelancers;
            })();
            Lists.Freelancers = Freelancers;
        })(Lists = Data.Lists || (Data.Lists = {}));
    })(Data = SkillMatrix.Data || (SkillMatrix.Data = {}));
})(SkillMatrix || (SkillMatrix = {}));
var SkillMatrix;
(function (SkillMatrix) {
    var Services;
    (function (Services) {
        var DataRepositoryService = (function () {
            function DataRepositoryService($http) {
                this.$http = $http;
                this.freelancerColumns = [
                    SkillMatrix.Data.Lists.Freelancers.Columns.Id,
                    SkillMatrix.Data.Lists.Freelancers.Columns.LastName,
                    SkillMatrix.Data.Lists.Freelancers.Columns.FirstName,
                    SkillMatrix.Data.Lists.Freelancers.Columns.Phone,
                    SkillMatrix.Data.Lists.Freelancers.Columns.Email
                ];
            }
            DataRepositoryService.prototype.CreateContact = function (userData) {
                var _this = this;
                var requestBody = null;
                this.$http({
                    method: 'POST',
                    url: "../_api/contextinfo",
                    headers: { "Accept": "application/json; odata=verbose" }
                }).
                    success(function (data) {
                    _this.requestDigest = data.d.GetContextWebInformation.FormDigestValue;
                })
                    .then(function () {
                    var restQueryUrl = "../_api/web/lists/getByTitle('Freelancers')/items";
                    var customerData = {
                        __metadata: { "type": "SP.Data.FreelancersListItem" },
                        Title: userData.Title,
                        FirstName: userData.FirstName,
                        Company: userData.Company,
                        WorkPhone: userData.WorkPhone,
                        HomePhone: userData.HomePhone,
                        Email: userData.Email,
                        CellPhone: userData.CellPhone,
                        Comments: userData.Comments
                    };
                    requestBody = JSON.stringify(customerData);
                    return _this.$http.post(restQueryUrl, requestBody, _this.createRequestParams(restQueryUrl, requestBody));
                })
                    .catch(function (err) {
                    console.error("Failed to create new contact: " + requestBody);
                    console.log(err);
                    throw err;
                });
            };
            DataRepositoryService.prototype.createRequestParams = function (url, data) {
                return {
                    method: 'POST',
                    url: url,
                    contentType: "application/json;odata=verbose",
                    data: data,
                    headers: {
                        "Accept": "application/json; odata=verbose",
                        "X-RequestDigest": this.requestDigest,
                        "content-type": "application/json;odata=verbose",
                    }
                };
            };
            DataRepositoryService.prototype.GetFreelancers = function () {
                return this.GetData(SkillMatrix.RequestBuilder.GetListByTitle('Freelancers', this.freelancerColumns));
            };
            DataRepositoryService.prototype.GetFreelancer = function (id) {
                return this.GetData(SkillMatrix.RequestBuilder.GetListByTitleListItemById('Freelancers', id, this.freelancerColumns));
            };
            DataRepositoryService.prototype.GetData = function (query) {
                var restQueryUrl = "../_api/" + query;
                return this.$http({
                    method: 'GET',
                    url: restQueryUrl,
                    headers: { "Accept": "application/json; odata=verbose" }
                });
            };
            return DataRepositoryService;
        })();
        Services.DataRepositoryService = DataRepositoryService;
    })(Services = SkillMatrix.Services || (SkillMatrix.Services = {}));
})(SkillMatrix || (SkillMatrix = {}));
var SkillMatrix;
(function (SkillMatrix) {
    var RequestBuilder = (function () {
        function RequestBuilder() {
        }
        RequestBuilder.GetListByTitle = function (title, columns) {
            var res = RequestBuilder.baseUri.replace('{list}', title);
            res += RequestBuilder.appendFields(columns);
            return res;
        };
        RequestBuilder.GetListByTitleListItemById = function (title, id, columns) {
            var res = RequestBuilder.baseUri.replace('{list}', title);
            res += "(" + id + ")";
            res += RequestBuilder.appendFields(columns);
            return res;
        };
        RequestBuilder.appendFields = function (columns) {
            var res = "?" + RequestBuilder.selector;
            if (null == columns || columns.length == 0)
                res += "*";
            for (var i = 0; i < columns.length; i++) {
                res += columns[i] + ',';
            }
            if (res.endsWith(',')) {
                res = res.substr(0, res.length - 1);
            }
            return res;
        };
        RequestBuilder.baseUri = "web/lists/getByTitle('{list}')/items";
        RequestBuilder.selector = "$select=";
        return RequestBuilder;
    })();
    SkillMatrix.RequestBuilder = RequestBuilder;
})(SkillMatrix || (SkillMatrix = {}));
//# sourceMappingURL=App.js.map