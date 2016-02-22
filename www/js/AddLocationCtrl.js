var AddLocationCtrl = function($scope, $ionicPlatform, $localStorage, $state, $ionicLoading, $ionicPopup, $cordovaLocalNotification, API) {
  $scope.$storage = $localStorage;

  /**
   * Search and save the location if its a valid one and not saved yet
   *
   * @param  string   location    Location name
   * @return void
   */
  $scope.saveLocation = function(location) {
    var exists = false;

    if(location == '') {
      console.log('kosong');
      alertPopup = $ionicPopup.alert({
        title: 'Oops!',
        template: "Location name can not be empty"
      });

      return false;
    }

    $localStorage.locations.forEach(function(item, index) {
      if (item === location) {
        exists = true;
      }
    });

    if (exists) {
      var alertPopup = $ionicPopup.alert({
        title: 'Oops!',
        template: "You've already add that location"
      });
      alertPopup.then(function(res) {
        $scope.locationName = '';
      });
    } else {
      $ionicLoading.show({
        template: '<ion-spinner icon="spiral" class="spinner-light"></ion-spinner><br>Searching Location'
      });
      API.prayerTimes.get(location, 'daily', getLocationSuccess, getLocationError);
      $localStorage.locations.push(location);
    }
  }

  /**
   * Callback function when the request is succeded. Then it checks wether the response valid
   * or not
   *
   * @param  object    response    Response object from the request
   * @return void
   */
  function getLocationSuccess(response) {
    $ionicLoading.hide();

    /*$ionicPlatform.ready(function() {
      $cordovaLocalNotification.add({
        id: "1",
        //date: alarmTime,
        title: "This is a title",
        text: "lokasi berhasil ditambahkan",
      }).then(function () {
        console.log("The notification has been set");
      });
    });*/

    if (response.data.status_valid === 0) {
      var alertPopup = $ionicPopup.alert({
        title: 'Oops!',
        template: "We can not found the location you've entered"
      });
    } else {
      $state.go('locations');
    }
  }

  function getLocationError(response) {
    $ionicLoading.hide();
    console.log(response);
  }
}

angular.module('azaanApp.controllers').controller('AddLocationCtrl', [
  '$scope',
  '$ionicPlatform',
  '$localStorage',
  '$state',
  '$ionicLoading',
  '$ionicPopup',
  '$cordovaLocalNotification',
  'API',
  AddLocationCtrl
]);
