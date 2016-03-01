(function(){
  'use strict';
  angular
    .module('myapp')
    .directive('formcomponents',formcomponents);
    function formcomponents(){
      var directive = {
        template:'<div class="myclass draggable " data-formcomponent = "{{data}}"> {{data}}</div>',
        restrict: 'E',
        transclude: true,
        replace:true,
        scope: {
                component: "=",
                deleteComponent: "&",
                form: "=",
            },
        link: linkFunc,
        controllerAs: 'vm',
        bindToController: true 
      }
      return directive;
      function linkFunc(scope, element, attr,vm){
        var reference = scope.deleteComponent();
        scope.input=[];
        scope.data = scope.component;
        var sentdata= scope.data;
        element.draggable({
          revert:'invalid',
          containment: '.row',
          cursor: "move",
           zIndex: 10000,
          cursorAt: { top: 15, left: 25 },
          helper: "clone",
        }); 
      }
    }
})();
(function(){
    'use strict';
    angular
      .module('myapp')
      .directive('customform',customform);
      customform.$inject = ['$compile'];
      function customform ($compile){
        var getTemplate = function(component,uniqueId){
        var textbox = '<div class="customform" id="dropped'+uniqueId+'" ><span class="text">textbox</span><span class="close" id="close'+uniqueId+'" ng-click="close('+uniqueId+')">X</span><input type="text" name="fname"></div>';
        var textArea = '<div class="customform" id="dropped'+uniqueId+'"><span class="text">textArea</span><span class="close" id="close'+uniqueId+'" ng-click="close('+uniqueId+')">X</span><textarea rows="4" cols="30"></textarea></div>';
        var checkbox = '<div class="customform" id="dropped'+uniqueId+'"><span class="text">checkbox</span><span class="close" id="close'+uniqueId+'" ng-click="close('+uniqueId+')">X</span><input type="checkbox" name="vehicle" value="Bike"></div>';
        var radiobutton = '<div class="customform" id="dropped'+uniqueId+'"><span class="text">radiobutton</span><span class="close" id="close'+uniqueId+'" ng-click="close('+uniqueId+')">X</span><input type="radio" name="gender" value="male" checked> Male<br><input type="radio" name="gender" value="female"> Female<br><input type="radio" name="gender" value="other"> Other<br/></div>';
        var template = '';
            switch(component) {
                case 'textbox':
                    template = textbox;
                    break;
                case 'textArea':
                    template = textArea;
                    break;
                case 'checkbox':
                    template = checkbox;
                    break;
                case 'radiobutton':
                    template = radiobutton;
                    break;
            }
            return template;
        }
        var directive = {
          restrict: 'E',
              priority: 1001,
              transclude: true,
              replace:true,
              scope: {
                deleteComponent: "&",
                sortComponent:"&"
                    },
              link:linkFunc,
              controllerAs: 'vm',
              bindToController: true 
        }
        return directive;
        function linkFunc(scope, element, attr){
            scope.component = attr.component;
            scope.divuniqueId = attr.uniqueId;
            var deleteReference = scope.deleteComponent();
            var sortComponent =scope.sortComponent();
            scope.close = function(e){
              deleteReference(e);
              angular.element(element[0].querySelector('#dropped'+e)).parent().remove();
            }
            element.append($compile(getTemplate(attr.component,attr.uniqueId))(scope));
        }
      }
})();
 