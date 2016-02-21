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
          $('.redroppable').droppable({
            accept: ".redraggable",
            drop:scope.redropedFunction
          });
      }
    };
  }]);
myapp.directive('formbuilder',['$compile',function ($compile) {
    return {
      template:'<div class="mydroppable " id="sortable"></div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope: {
              accepts: "=",
              addComponent: "&",
              form: "=",
              uniqueId: "=",
              deleteComponent: "&",
              sortComponent:"&"
          },
      link:function(scope, element, attr){
            var reference = scope.addComponent();
            var deleteReference = scope.deleteComponent();
            var sortComponent =scope.sortComponent();
            scope.close = function(e){
              alert(e);
              deleteReference(e);
            }
            scope.dropedFunction = function(event, ui){
              var arrayDiv = [];
              var component = $(ui.draggable).attr('component');
                if(component == "textbox"){
                 element.append($compile('<div class="customform" id="dropped'+scope.uniqueId+'"><span class="text">textbox</span><span class="close" id="close'+scope.uniqueId+'" >X</span><input type="text" name="fname"></div>')(scope));
                }
                else if(component == "textArea"){
                 element.append($compile('<div class="customform" id="dropped'+scope.uniqueId+'"><span class="text">textArea</span><span class="close" id="close'+scope.uniqueId+'" >X</span><textarea rows="4" cols="30"></textarea></div>')(scope));
                }
                else if(component == "checkbox"){
                 element.append($compile('<div class="customform" id="dropped'+scope.uniqueId+'"><span class="text">checkbox</span><span class="close" id="close'+scope.uniqueId+'" >X</span><input type="checkbox" name="vehicle" value="Bike"></div>')(scope));
                }
                else if(component == "radiobutton"){
                 element.append($compile('<div class="customform" id="dropped'+scope.uniqueId+'"><span class="text">radiobutton</span><span class="close" id="close'+scope.uniqueId+'" >X</span><input type="radio" name="gender" value="male" checked> Male<br><input type="radio" name="gender" value="female"> Female<br><input type="radio" name="gender" value="other"> Other<br/></div>')(scope));
                }
                angular.element(element[0].querySelector('#close'+scope.uniqueId)).bind('click',function($event){
                  var Id = $($event.target).attr('id').match(/\d+$/)[0];
                  deleteReference(Id);
                  angular.element(element[0].querySelector('#dropped'+Id)).remove();
                });
                reference(component);
                $("#sortable").sortable({
                  start: function(e, ui){
                      ui.placeholder.height(ui.item.height());
                  },
                  stop: function( event, ui ) {
                    $('.customform').each(function(){
                      arrayDiv.push($(this).attr('id').match(/\d+$/)[0]);
                    });
                    sortComponent(arrayDiv)
                   // console.log(arrayDiv);
                    arrayDiv = [];
                  }
                });
               

            }
            element.droppable({
              accept: ".draggable",
              drop:scope.dropedFunction
            });
      }
    };
  }]);