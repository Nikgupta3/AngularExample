angular.module('detailService', [])


.factory('Details', function($http) {

	var detailsFactory = {};

	detailsFactory.create = function(empData) {
		return $http.post('/api/issuebook', empData);
	}

	detailsFactory.alldetails = function() {
		return $http.get('/api/all_details');
	}



	return detailsFactory;

});