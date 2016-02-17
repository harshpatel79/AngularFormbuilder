myapp.directive('formcomponents',['mySharedService',function (mySharedService) {
    return {
      template:'<div class="myclass draggable col-lg-1 col-offset-6" > {{data}}</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope: {
              component: "="
          },
      link:function(scope, element, attr){
          scope.input=[];
          scope.data = attr.component;
          var sentdata= scope.data;
          scope.myhelper = function(){
            return '<div id="draggableHelper">I am a helper - drag me!</div>';
            
          }
          // element.on('click',function(){
          //   //console.log("sentdata :L ", scope.addField);
          //   //scope.addField(sentdata);
          //   mySharedService.prepForBroadcast(sentdata);
          // });
          element.draggable({
            revert:'invalid',
            containment: '.row',
            cursor: "move",
            cursorAt: { top: 15, left: 25 },
            helper: "clone",
            start: function() {
             
            },
            drag: function() {
             
            },
            stop: function() {
              
            }
          }); 
      }
    };
  }]);
myapp.directive('formbuilder',['mySharedService',function (mySharedService) {
    return {
      template:'<div class="mydroppable " id="droppable" ></div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope: {
              accepts: "="
          },
      link:function(scope, element, attr){
          scope.dropedFunction = function(event, ui){
            $(this).append($(ui.draggable).clone());
            mySharedService.prepForBroadcast($(ui.draggable).attr('component'));
          }
          element.droppable({
            accept: ".draggable",
            drop:scope.dropedFunction
          });
      }
    };
  }]);