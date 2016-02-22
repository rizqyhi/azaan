var HomeCtrl = function($scope, $ionicPlatform, $localStorage, $timeout, $state, $ionicSlideBoxDelegate, $ionicPopup, API, moment, $cordovaLocalNotification) {
  $scope.$localStorage = $localStorage;
  $scope.dates = getDateRange();
  $scope.prayers = [];
  $scope.hadiths = [];

  $scope.$on('$ionicView.enter', function(){
    $scope.location = $localStorage.locations[$localStorage.activeLocation] || $localStorage.settingDefaultLocation;
    if($localStorage.locations.length < 1) return;

    $scope.prayers = [];

    API.prayerTimes.get($scope.location, 'weekly', function(response){
      console.log(response.data);
      if (response.data === 'Could not connect to the database 2002 - DB Error.') {
        var alertPopup = $ionicPopup.alert({
          title: 'Oops!',
          template: "Sorry, but we can not retrieve the data right now. Please try again later."
        });
        angular.element(document.getElementsByClassName('place-loading')).addClass('animated fadeOutUp hide');

        return;
      }

      angular.element(document.getElementsByClassName('place-loading')).addClass('animated fadeOutUp hide');

      response.data.items.forEach(function(item) {
        $scope.prayers.push({
          date: item.date_for,
          prayers: {
            subuh: item.fajr,
            duhr: item.dhuhr,
            ashr: item.asr,
            maghrib: item.maghrib,
            isya: item.isha
          }
        });
      });

      API.hadiths.get(function(response) {
        $scope.hadiths = response.data;
      });

      //$scope.todayIndex = $ionicSlideBoxDelegate.$getByHandle('day-nav').update();
      $ionicSlideBoxDelegate.$getByHandle('days').update();

      if ($scope.location === $localStorage.settingDefaultLocation) {
        setNotifications($scope.prayers[0]);
      }
    },
    function(response) {
      var alertPopup = $ionicPopup.alert({
        title: 'Oops!',
        template: "Sorry, but we can not retrieve the data right now. Please try again later."
      });
      alertPopup.then(function(){
        angular.element(document.getElementsByClassName('place-loading')).addClass('animated fadeOutUp hide');
      });
    });
  });

  $scope.getRandomHadith = function(time) {
    return $scope.hadiths[time][Math.floor(Math.random()*$scope.hadiths[time].length)];
  };

  $scope.changeDay= function(index) {
    $ionicSlideBoxDelegate.$getByHandle('days').slide(index);
    $scope.todayIndex = $ionicSlideBoxDelegate.$getByHandle('day-nav').currentIndex();
  };

  $scope.disableSlide = function() {
    $ionicSlideBoxDelegate.$getByHandle('days').enableSlide(false);
  };

  $scope.todayIndex = 0;

  $scope.prevDay = function() {
    $ionicSlideBoxDelegate.$getByHandle('days').previous();
    $scope.todayIndex = $ionicSlideBoxDelegate.$getByHandle('days').currentIndex();
  };

  $scope.nextDay = function() {
    $ionicSlideBoxDelegate.$getByHandle('days').next();
    $scope.todayIndex = $ionicSlideBoxDelegate.$getByHandle('days').currentIndex();
  };

  function getDateRange() {
    var dateArray = [];
    var currentDate = moment();

    for (var i=0;i<7;i++) {
        dateArray.push({
          raw: moment(currentDate).format('YYYY-MM-DD'),
          formatted: moment(currentDate).format('DD MMM'),
          hijr: moment(currentDate).format('iD iMMMM iYYYY')
        });
        currentDate = moment(currentDate).add(1, 'days');
    }

    return dateArray;
  }

  function setNotifications(times) {
    $ionicPlatform.ready(function() {
      var id = 1;
      for(var key in times.prayers) {
        $cordovaLocalNotification.schedule({
          id: id,
          at: moment(times.date+' '+times.prayers[key], 'YYYY-MM-DD hh:mm a').toDate(),
          title: 'It is now ' + key + ' time',
          text: "Lets pray on time",
        }).then(function () {
          console.log("The notification has been set");
        });

        id++;
      }
   });
  }
}

angular.module('azaanApp.controllers').controller('HomeCtrl', [
  '$scope',
  '$ionicPlatform',
  '$localStorage',
  '$timeout',
  '$state',
  '$ionicSlideBoxDelegate',
  '$ionicPopup',
  'API',
  'moment',
  '$cordovaLocalNotification',
  HomeCtrl
]);
