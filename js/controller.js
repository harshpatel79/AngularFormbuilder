myapp.controller('myformbuilder',['$scope','$rootScope','mySharedService',function($scope,$rootScope,mySharedService){
	$scope.form=[];
    $rootScope.inputText={};
    var El = angular.element( document.querySelector( '#formbuilt' ) );
    $rootScope.$on('handleBroadcast', function() {
        $scope.message = 'Directive: ' + mySharedService.message;
        $scope.form.push($scope.message);
      // $scope.appending(mySharedService.message);
        $scope.$apply();
    });

    // $scope.addField = function (field) {
    //     console.log(field);
    //     $scope.form.push(field);
    // }

    $scope.appending =function(data){
        console.log(data)
        if(data="textbox"){
            El.append('<div>textbox</div><br/>');   
        }
        else if(data="textArea"){
            El.append('<div>textArea</div><br/>');   
        }
        else if(data="checkbox"){
            El.append('<div>checkbox</div><br/>');   
        }
        else if(data="radiobutton"){
            El.append('<div>radiobutton</div><br/>');   
        }
        else{

        }
    }

}]);
