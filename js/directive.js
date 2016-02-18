myapp.directive('formcomponents',[function () {
    return {
      template:'<div class="myclass draggable col-lg-1 col-offset-6" > {{data}}</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope: {
              component: "=",
              
          },
      link:function(scope, element, attr){
          scope.input=[];
          scope.data = scope.component;
          var sentdata= scope.data;
          scope.redropedFunction = function(event, ui){
            $(ui.draggable).hide();
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
myapp.directive('formbuilder',[function () {
    return {
      template:'<div class="mydroppable " id="droppable" ></div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope: {
              accepts: "=",
              addComponent: "&"
          },
      link:function(scope, element, attr){
          var reference = scope.addComponent();
          scope.dropedFunction = function(event, ui){
              $(ui.draggable).addClass('redraggable');
              $(this).append($(ui.draggable).clone().draggable());
              $('.mydroppable .draggable').each(function(){
                $(this).removeClass('draggable');
              });
              reference($(ui.draggable).attr('component'));
              $(".redraggable").draggable({
                  revert:'invalid',
                  containment: '.row',
                  cursor: "move",
                   zIndex: 10000,
                  cursorAt: { top: 15, left: 25 },
              });
          }
          element.droppable({
            accept: ".draggable",
            drop:scope.dropedFunction
          });
      }
    };
  }]);