myapp.controller('myformbuilder',['$scope','$rootScope','mySharedService',function($scope,$rootScope,mySharedService){
	$scope.form=[];
    $scope.textbox="textbox";
    $scope.textArea="textArea";
    $scope.checkbox="checkbox";
    $scope.radiobutton="radiobutton";
    $rootScope.inputText={};
    var El = angular.element( document.querySelector( '#formbuilt' ) );
    $rootScope.$on('handleBroadcast', function() {
        $scope.$apply(function(){
            $scope.message = 'Directive: ' + mySharedService.message;
            $scope.form.push($scope.message);
            $scope.appending(mySharedService.message);
        },true);
        
    });
    $scope.appending =function(data){
        if(data =="textbox"){
            El.append('<div>textbox</div><br/>');   
        }
        else if(data =="textArea"){
            El.append('<div>textArea</div><br/>');   
        }
        else if(data =="checkbox"){
            El.append('<div>checkbox</div><br/>');   
        }
        else if(data =="radiobutton"){
            El.append('<div>radiobutton</div><br/>');   
        }
        else{

        }
    }

}]);
