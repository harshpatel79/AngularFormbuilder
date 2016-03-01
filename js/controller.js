(function(){
  'use strict';
  angular
    .module('myapp')
    .controller('myformbuilder', myformbuilder);
  myformbuilder.$inject = ['$scope','$compile','$timeout'];  
  function myformbuilder($scope,$compile,$timeout){
    var vm = this;
    vm.form=[];
    vm.textbox="textbox";
    vm.textArea="textArea";
    vm.checkbox="checkbox";
    vm.radiobutton="radiobutton";
    vm.uniqueId = 0 ;
    vm.dropedFunction = dropedFunction ;
    vm.addComponent = addComponent ;
    vm.deleteComponent = deleteComponent;
    vm.sortComponent = sortComponent;
    var arrayDiv = [];
    var El = angular.element(document.querySelector('.mydroppable'));
    El.droppable({
      accept: ".draggable",
      drop: vm.dropedFunction
    });
    $("#sortable").sortable({
      start: function(e, ui){
          ui.placeholder.height(ui.item.height());
      },
      stop: function( event, ui ) {
        $('.customform').each(function(){
          arrayDiv.push($(this).attr('id').match(/\d+$/)[0]);
        });
        vm.sortComponent(arrayDiv)
        arrayDiv = [];
      }
    });
    function dropedFunction(event, ui){
      var arrayDiv = [];
      var component = $(ui.draggable).attr('data-formcomponent');
      El.append($compile('<customform class="mycustomform" id="customform'+vm.uniqueId+'" sort-Component="vm.sortComponent" delete-Component="vm.deleteComponent" component="'+component+'" unique-Id ="'+vm.uniqueId+'"></customform>')($scope));
      vm.addComponent(component);
    };
    function addComponent(droppedcomponent){
        $scope.$apply(function(){
            var component = {};
            component.id = vm.uniqueId;
            component.message = 'Directive: ' + droppedcomponent;
            vm.form.push(component);
            vm.uniqueId++;
        },true);
    };
    function deleteComponent(deleteId){
        $timeout(function() {
          for(var i =0 ;i<vm.form.length;i++){
                if(vm.form[i].id == deleteId){
                    vm.form.splice(i, 1);
                    break
                }
            }
            $scope.$apply();     
        }, 0);
    };
    function sortComponent(arrayDiv){
        var dummy = [];
        $scope.$apply(function(){
            for(var i =0 ;i<arrayDiv.length;i++){
                for(var j = 0; j<vm.form.length;j++){
                    if(vm.form[j].id == arrayDiv[i]){
                        dummy.push(vm.form[j]);
                    }
                }
            }
            vm.form = dummy;
        },true);         
    };
  }
})();