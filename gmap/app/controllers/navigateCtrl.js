/**
 * @ngdoc controller
 * @name navigateCtrl
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
angular.module('app.navigateCtrl', [
  'app.gmap'
]).controller('navigateCtrl', function($scope){
  console.log('init navigateCtrl');
  $scope.from = 'Chicaho';
  $scope.to = 'Indianopolis';

  var directionsDisplay = new google.maps.DirectionsRenderer({
    map: map
  });



  // Pass the directions request to the directions service.
  var directionsService = new google.maps.DirectionsService();

  $scope.updateMap = function(){
    console.log('updateMap');


    directionsService.route({
      destination: $scope.from,
      origin:  $scope.to,
      travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        // Display the route on the map.
        directionsDisplay.setDirections(response);
      }
    });
  };
  $scope.updateMap();
});
