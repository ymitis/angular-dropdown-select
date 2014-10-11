/**
 * @license MIT http://jseppi.mit-license.org/license.html
 */
'use strict';
var dd = angular.module('bwDropdownSelect', []);

dd.directive('bwDropdownSelect', ['bwDropdownService', '$window',
    function (bwDropdownService, $window) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                selectOptions: '=',
                model: '=ngModel',
                onChange: '&'
            },

            controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                $scope.keyField = $attrs.selectOptionKey || 'id';
                $scope.labelField = $attrs.selectOptionLabel || 'text';
                $scope.orderByField = $attrs.selectOrderBy || $scope.labelField;

                // We don't know if selectOptions will be populated before the controller code executes
                // so watch for a change then set default
                $scope.$watch('selectOptions', function() {
                    var itm = getSelectedItem();

                    if (itm && itm[$scope.labelField]) {
                        $scope.selectedLabel = itm[$scope.labelField];
                    }
                });

                bwDropdownService.register($element);

                this.select = function (selected) {
                    if (selected[$scope.keyField] != $scope.model) {
                        $scope.model = selected[$scope.keyField];

                        var itm = getSelectedItem();

                        $scope.selectedLabel = itm[$scope.labelField];
                    }
                    $scope.onChange({
                        selected: selected
                    });
                };

                var $clickEvent = ('ontouchstart' in $window ? 'touchend' : 'click');
                $element.bind($clickEvent, function (event) {
                    event.stopPropagation();
                    bwDropdownService.toggleActive($element);
                });

                $scope.$on('$destroy', function () {
                    bwDropdownService.unregister($element);
                });

                function getSelectedItem() {
                    for(var i = 0; i < $scope.selectOptions.length; i++) {
                        if ($scope.selectOptions[i][$scope.keyField] == $scope.model){
                            return $scope.selectOptions[i];
                        }
                    }
                };
            }],

            template: [
                '<div class="wrap-dd-select">',
                '<span class="selected">{{selectedLabel}}</span>',
                '<ul class="dropdown">',
                '<li ng-repeat="item in selectOptions | orderBy:orderByField"',
                ' class="dropdown-item"',
                ' bw-dropdown-select-item',
                ' item ="item"',
                ' item-key="keyField"',
                ' item-label="labelField">',
                '</li>',
                '</ul>',
                '</div>'
            ].join('')
        };
    }
]);

dd.directive('bwDropdownSelectItem', [
    function () {
        return {
            require: '^bwDropdownSelect',
            replace: true,
            scope: {
                itemLabel: '=',
                itemKey: '=',
                item: '='
            },

            link: function (scope, element, attrs, dropdownSelectCtrl) {
                scope.selectItem = function () {
                    dropdownSelectCtrl.select(scope.item);
                };
            },

            template: [
                '<li>',
                '<a href="" class="dropdown-item"',
                ' ng-click="selectItem()">',
                '{{item[itemLabel]}}',
                '</a>',
                '</li>'
            ].join('')
        };
    }
]);

dd.factory('bwDropdownService', ['$document',
    function ($document) {
        var body = $document.find('body'),
            service = {},
            _dropdowns = [];

        body.bind('click', function () {
            angular.forEach(_dropdowns, function (el) {
                el.removeClass('active');
            });
        });

        service.register = function (ddEl) {
            _dropdowns.push(ddEl);
        };

        service.unregister = function (ddEl) {
            var index;
            index = _dropdowns.indexOf(ddEl);
            if (index > -1) {
                _dropdowns.splice(index, 1);
            }
        };

        service.toggleActive = function (ddEl) {
            angular.forEach(_dropdowns, function (el) {
                if (el !== ddEl) {
                    el.removeClass('active');
                }
            });

            ddEl.toggleClass('active');
        };

        return service;
    }
]);