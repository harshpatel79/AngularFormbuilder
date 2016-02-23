myapp.controller('myformbuilder',['$scope','$compile','$timeout',function($scope,$compile,$timeout){
	  $scope.form=[];
    $scope.textbox="textbox";
    $scope.textArea="textArea";
    $scope.checkbox="checkbox";
    $scope.radiobutton="radiobutton";
    $scope.uniqueId = 0 ;
    var El = angular.element(document.querySelector('.mydroppable'));
    $scope.dropedFunction = function(event, ui){
      var arrayDiv = [];
      var component = $(ui.draggable).attr('component');
      El.append($compile('<customform class="mycustomform" id="customform'+$scope.uniqueId+'" sort-Component="sortComponent" delete-Component="deleteComponent" component="'+component+'" unique-Id ="'+$scope.uniqueId+'"></customform>')($scope));
      $scope.addComponent(component);
    }
    El.droppable({
      accept: ".draggable",
      drop:$scope.dropedFunction
    });
    var arrayDiv = [];
    $("#sortable").sortable({
      start: function(e, ui){
          ui.placeholder.height(ui.item.height());
      },
      stop: function( event, ui ) {
        $('.customform').each(function(){
          arrayDiv.push($(this).attr('id').match(/\d+$/)[0]);
        });
        $scope.sortComponent(arrayDiv)
        arrayDiv = [];
      }
    });
    $scope.addComponent = function(droppedcomponent){
        $scope.$apply(function(){
            var component = {};
            
            component.id = $scope.uniqueId;
            component.message = 'Directive: ' + droppedcomponent;
            $scope.form.push(component);
            $scope.uniqueId++;
        },true);
    };
    $scope.deleteComponent = function(deleteId){
        $timeout(function() {
          for(var i =0 ;i<$scope.form.length;i++){
                if($scope.form[i].id == deleteId){
                    $scope.form.splice(i, 1);
                    break
                }
            }
            $scope.$apply();     
        }, 0);
    };
    $scope.sortComponent = function(arrayDiv){
        var dummy = [];
        $scope.$apply(function(){
            for(var i =0 ;i<arrayDiv.length;i++){
                for(var j = 0; j<$scope.form.length;j++){
                    if($scope.form[j].id == arrayDiv[i]){
                        dummy.push($scope.form[j]);
                    }
                }
            }
            $scope.form = dummy;
        },true);         
    };
}]);
