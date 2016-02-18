myapp.controller('myformbuilder',['$scope',function($scope){
	$scope.form=[];
    $scope.textbox="textbox";
    $scope.textArea="textArea";
    $scope.checkbox="checkbox";
    $scope.radiobutton="radiobutton";
    $scope.addComponent = function(component){
        $scope.$apply(function(){
            $scope.message = 'Directive: ' + component;
            $scope.form.push($scope.message);
        },true);
    };
}]);
