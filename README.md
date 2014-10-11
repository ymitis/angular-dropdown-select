# angular-dropdown-Select

Dropdown-Select directives for AngularJS (1.1.5+, 1.2.x).

This is an implementation of James Seppi's angular-dropdowns (https://github.com/jseppi/angular-dropdowns).  Currently, this version is stripped down to just a select-style dropdown more in line with ng-options.

It allows for ordering based off of an object property, and binds using ng-model typically to an id property.

See examples: fiddler to come soon!

## Usage

Include `bwDropdownSelect` in your module dependencies:

```js
var app = angular.module('app', ['bwDropdownSelect']);
```

In your controller, setup the select options and object to hold the selected value:

```js
app.controller('AppCtrl', function($scope) {

    // By default the 'text' property will be used as the display text in the dropdown entry.
    // Or you can specify a different property name via the select-option-label attribute.
    //
    // By default the 'id' property will be used as the key
    // Or you can specify a different property name via the select-option-key attribute.
    //
    // By default the orderby property will be the same as the display text.
    // Optionally, you can set a differnt property to order by using the select-order-by attribute.

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
          id: 2,
          text: 'Option4'
        }
      ];

      $scope.ddSelectSelected = {
        id: 2,
        text: "Select an Option"
      };
});
```

And in your html, specify the `bw-dropdown-select`, `select-options` and `ng-model` attributes on an element.

You can optionally set `select-option-label` to specify a different label field from the default (which is 'text'):
You can optionally set `select-option-key` to specify a different key field from the default (which is 'id'):
You can optionally set `select-order-by` to specify a different orderby field from the default (which is same as the label):

```html
<div ng-controller="AppCtrl">
    <h1>Dropdown Select</h1>
    <p>You have selected: {{ddSelectSelected}}</p>
      <div bw-dropdown-select
           select-options="ddSelectOptions"
           ng-model="ddSelectSelected.id"
           select-order-by="id"
           select-option-key="id"
           select-option-label="text" >
      </div>
</div>
```


You can specify a function to call upon dropdown value change by specifying the `on-change` attribute. This method will have the selected object passed to it.

```html
 <div bw-dropdown-select
           select-options="ddSelectOptions"
           ng-model="ddSelectSelected.id"
           select-order-by="id"
           select-option-key="id"
           select-option-label="text"
           on-change="someMethod(selected)" >
</div>
```

## Developing

Pull requests are welcome!

Run `npm install` to get all the development dependencies.

Run `gulp` to build the output files.

## License

[MIT](http://jseppi.mit-license.org/license.html)

## Credits

Styling based on http://tympanus.net/codrops/2012/10/04/custom-drop-down-list-styling/
