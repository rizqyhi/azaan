var LocationsCtrl = function($scope, $localStorage, $state, $ionicSlideBoxDelegate, $ionicPopup) {
  $scope.$localStorage = $localStorage;
  $scope.locations = $localStorage.locations;

  $scope.goToSlide = function(index) {
    $localStorage.activeLocation = index;
    $state.go('home');
  };

  $scope.removeLocation = function(loc) {
    $scope.locations.forEach(function(item, index) {
      if (item === loc) {
        if (loc === $localStorage.activeLocation) {
          var alertPopup = $ionicPopup.alert({
            title: 'Oops!',
            template: "This is your home city. Please change your home city before remove it."
          });
        } else {
          $scope.locations.splice(index, 1);
        }
      }
    });

    console.log($scope.locations);
  };
};

angular.module('azaanApp.controllers').controller('LocationsCtrl', [
  '$scope',
  '$localStorage',
  '$state',
  '$ionicSlideBoxDelegate',
  '$ionicPopup',
  LocationsCtrl
]);
