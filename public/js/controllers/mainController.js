angular.module('mainController', [])
    .controller('mainCtrl', function($scope, $http) {
        $scope.data = [];

        function getData() {

            $http({
                method: "get",
                url: "/data"
            }).then(function(result) {
                $scope.data = result.data;
                console.log($scope.data)
            }, function(err) {
                console.log(err.status)
            })
        }

        getData();
        $scope.removeTodo = function(id) {
            $http({
                method: "post",
                url: "/removeTodo",
                data: {
                    id: id
                }
            }).then(function(result) {
                console.log(result.data);
                getData()
            }, function(err) {
                console.log(err.status)
            })
        }


        $scope.addNewTask = function () {
        	$http({
        		method : "post",
        		url : "/addNewTask",
        		data : {message:$scope.newTask}
        	}).then(function (result) {
        		getData();
        	},function (err) {
        		console.log(err.status)
        	})
        }
    })