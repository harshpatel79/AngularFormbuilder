myapp.controller('myformbuilder',['$scope',function($scope){
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
         $scope.$apply(function(){
            for(var i =0 ;i<$scope.form.length;i++){
                if($scope.form[i].id == deleteId){
                    $scope.form.splice(i, 1);
                    break
                }
            }
        },true);
    }
}]);
