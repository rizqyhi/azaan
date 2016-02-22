var SettingsCtrl = function($scope, $localStorage, $state, $ionicModal, $ionicActionSheet) {
  $scope.$storage = $localStorage;

  $scope.settingDefaultLocation = function() {
    var locations = [];
    $localStorage.locations.forEach(function(item) {
      locations.push({text:item})
    });

    $ionicActionSheet.show({
      buttons: locations,
      titleText: 'Select your default locations',
      cancelText: 'Cancel',
      cancel: function() {},
      buttonClicked: function(index) {
        $localStorage.settingDefaultLocation = $localStorage.locations[index];
        console.log($localStorage.settingDefaultLocation);
        return true;
      }
    });
  };

  $ionicModal.fromTemplateUrl('templates/modal-about.html', {
    scope: $scope
  }).then(function(modal){
    $scope.aboutModal = modal;
  });

  $scope.aboutClicked = function() {
    $scope.aboutModal.show();
  };

  $scope.aboutClose = function() {
    $scope.aboutModal.hide();
  };

  $ionicModal.fromTemplateUrl('templates/modal-osl.html', {
    scope: $scope
  }).then(function(modal){
    $scope.oslModal = modal;
  });

  $scope.oslClicked = function() {
    $scope.oslModal.show();
  };

  $scope.oslClose = function() {
    $scope.oslModal.hide();
  };
}

angular.module('azaanApp.controllers').controller('SettingsCtrl', [
  '$scope',
  '$localStorage',
  '$state',
  '$ionicModal',
  '$ionicActionSheet',
  SettingsCtrl
]);
