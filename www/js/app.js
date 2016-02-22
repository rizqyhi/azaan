angular.module('azaanApp', ['ionic', 'ngCordova', 'ngStorage', 'azaanApp.controllers'])

.run(function($ionicPlatform, $localStorage, $rootScope, $state) {
  $rootScope.$on('$stateChangeSuccess', function (evt, toState) {
    if (toState.name == 'home') {
      $rootScope.changeNavBg = true;
    } else {
      $rootScope.changeNavBg = false;
    }
  });

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $localStorage.locations = $localStorage.locations || [];
  //$localStorage.locations = [];
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
    })
    .state('locations', {
      url: '/locations',
      templateUrl: 'templates/locations.html',
      controller: 'LocationsCtrl'
    })
    .state('add', {
      url: '/add',
      templateUrl: 'templates/locations-add.html',
      controller: 'AddLocationCtrl'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'templates/settings.html',
      controller: 'SettingsCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
})

.constant('moment', moment)

.constant('appConfig', {
    'BASE_API': 'https://muslimsalat.p.mashape.com',
    'API_KEY' : '9qBBbd4zfKmshdMymE4lYSc25lWHp1FOTSzjsnHzfZJvVsfxyh'
});

angular.module('azaanApp.controllers', []);
