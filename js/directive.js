myapp.directive('formcomponents',['mySharedService',function (mySharedService) {
    return {
      template:'<div class="myclass col-lg-1 col-offset-6"> {{data}}</div>',
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
          // element.on('click',function(){
          //   //console.log("sentdata :L ", scope.addField);
          //   //scope.addField(sentdata);
          //   mySharedService.prepForBroadcast(sentdata);
          // });
          element.draggable({
            revert:true
          }); 
      }
    };
  }]);