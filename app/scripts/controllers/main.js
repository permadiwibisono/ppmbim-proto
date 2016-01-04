'use strict';


angular.module('cobagulpApp')
  .controller('MainCtrl', function ($scope) {
    $scope.todos = ['Item 1', 'Item 2', 'Item 3'];
    $scope.addTodo = function () {
		  $scope.todos.push($scope.todo);
		  $scope.todo = '';
		};
	$scope.removeTodo = function (index) {
			$scope.todos.splice(index, 1);
		};

  })
  .controller('CobaCtrl', function ($scope) {
    $scope.judul="Makna kitabussholah";
    $scope.journals=[{
    	id:'1',
    	hal:1,
    	checked:true
    },
    {
    	id:'10',
    	hal:10,
    	checked:true
    },

    ];
    $scope.get=function(n)
    {
    	for (var i = 0; i < $scope.journals.length; i++) {
    		if ($scope.journals[i].hal===n) {
    			return $scope.journals[i];
    		}
    	}
    	var newjournal={
    		id:'',
    		hal:n,
    		checked:false};
    	return newjournal;
    };

  })
  .controller('HeaderController',function ($scope, $location) 
    { 
        $scope.isActive = function (viewLocation) { 
            return viewLocation === $location.path();
        };
    })
  .controller('RegistrationCtrl',function ($scope, Siswas, $location,$window) 
    { 
        $scope.siswa=
        {

        };
        var getLastId=Siswas.getLastId()+1;
        $scope.siswa.id=getLastId;
        $scope.add=function(){
            Siswas.add($scope.siswa);
            $window.alert('insert success');
            $location.path('/');    
        };
    })
  .controller('SiswaListCtrl', function ($scope, Siswas) {
    $scope.judul="Siswa List";
    $scope.siswaList=Siswas.getList();

  })
  .controller('SiswaDetailCtrl', function ($scope,$routeParams,Siswas,MasterKitab,Journals,$window) {
    $scope.judul="Siswa Detail";
    $scope.siswaId=$routeParams.siswaId;
    $scope.siswa=angular.copy(Siswas.getById($scope.siswaId));
    $scope.kitabList=MasterKitab.getList();
    $scope.JournalList=Journals.getByUserId($scope.siswaId);
    $scope.update=function(){
    	Siswas.update($scope.siswa);
    	$window.alert('success update!');   
    };
    $scope.journalListCount=function(userId,kitabId){
    	var count=0;
    	if ($scope.JournalList===null) 
    	{}
    	else{
    	for (var i = 0; i < $scope.JournalList.length; i++) {
    		if ($scope.JournalList[i].kitabId===kitabId&&$scope.JournalList[i].UserId===userId&&$scope.JournalList[i].checked)
    		{
    			count+=1;

    		}
    	}

    	}
    	return count;
    };
  })
  .controller('SiswaDetailKitabCtrl', function ($scope,$routeParams,Siswas,MasterKitab,Journals,$window) {
    
    $scope.siswaId=$routeParams.siswaId;
    $scope.kitabId=$routeParams.kitabId;
    $scope.siswa=Siswas.getById($scope.siswaId);
    $scope.kitab=MasterKitab.getById($scope.kitabId);
    $scope.JournalList=angular.copy(Journals.getByUserIdKitabId($scope.siswaId,$scope.kitabId));
    $scope.saveJournal=function(){
        for (var i = 0; i < $scope.JournalList.length; i++) {
            if ($scope.JournalList[i].id!=='') {
                Journals.update($scope.JournalList[i]);
            }
            else if ($scope.JournalList[i].checked)
            {
                var lastid=Journals.getLastId();
                $scope.JournalList[i].id='J00'+(lastid+1);
                
                Journals.add(angular.copy($scope.JournalList[i]));
            }
        }
    $scope.JournalList=angular.copy(Journals.getByUserIdKitabId($scope.siswaId,$scope.kitabId));
    $window.alert(Journals.getList().length);
    };
  })
  .filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=1; i<total+1; i++)
      input.push(i);
    return input;
  };
})
  .filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    };
});
