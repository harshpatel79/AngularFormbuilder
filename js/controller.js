myapp.controller('myformbuilder',['$scope','$timeout',function($scope,$timeout){
	$scope.form=[];
    $scope.textbox="textbox";
    $scope.textArea="textArea";
    $scope.checkbox="checkbox";
    $scope.radiobutton="radiobutton";
    $scope.uniqueId = 0 ;
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
       //  // $scope.$apply(function(){
       //      for(var i =0 ;i<$scope.form.length;i++){
       //          if($scope.form[i].id == deleteId){
       //              $scope.form.splice(i, 1);
       //              break
       //          }
       //      }
       // // },true);
       // $scope.$apply();         

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
