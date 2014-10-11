'use strict';

var app = angular.module('app', ['bwDropdownSelect']);

app.controller('AppCtrl', function($scope) {
  $scope.ddSelectOptions = [
    {
      id: 1,
      text: 'Option1',
      value: 'one',
      iconCls: 'someicon'
    }, {
      text: 'Option2',
      someprop: 'somevalue'
    }, {
      divider: true
    }, {
      id: 2,
      text: 'Option4',
      href: 'http://www.google.com'
    }
  ];

  $scope.ddSelectSelected = {
    id: 2,
    text: "Select an Option"
  };
});
