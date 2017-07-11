angular.module('detailsCtrl', ['detailService'])


.controller('BookController', function(Details) {


	var vm = this;
    //vm.details=Details.data;
	
	Details.alldetails()
		.success(function(data) {
			vm.details = data;
       console.log(vm.details);
		})
 

})

.controller('IssueBookController', function(Details, $location, $window) {

	var vm = this;

	vm.issueBook = function() {
		vm.message = '';

		Details.create(vm.empData)
			.then(function(response) {
				vm.empData = {};
				vm.message = response.data.message;

				
			})
	}

})