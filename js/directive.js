myapp.directive('formcomponents',[function () {
    return {
      template:'<div class="myclass draggable " > {{data}}</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope: {
              component: "=",
              deleteComponent: "&",
              form: "=",
          },
      link:function(scope, element, attr){
        var reference = scope.deleteComponent();
          scope.input=[];
          scope.data = scope.component;
          var sentdata= scope.data;
          scope.redropedFunction = function(event, ui){
            $(ui.draggable).hide();
            var redraggableId = $(ui.draggable).attr('id').match(/\d+$/)[0];
            reference(redraggableId);
          };
          element.draggable({
            revert:'invalid',
            containment: '.row',
            cursor: "move",
             zIndex: 10000,
            cursorAt: { top: 15, left: 25 },
            helper: "clone",
          }); 
      }
    };
  }]);
myapp.directive('customform',['$compile',function($compile){
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
  return{
      restrict: 'E',
      transclude: true,
      replace:true,
      scope: {
        deleteComponent: "&",
        sortComponent:"&"
            },
      link:function(scope, element, attr){
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
}]);