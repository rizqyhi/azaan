var ApiFactory = function($http, $q, appConfig) {
  return {
    prayerTimes: {
      get: function(location, time, success, error) {
        var requestUrl = appConfig.BASE_API + '/' + location + '/' + time + '.json';

        $http
          .get(requestUrl, {
            headers: {'X-Mashape-Key': appConfig.API_KEY}
          })
          .then(success, error);
      }
    },
    hadiths: {
      get: function(success, error) {
        $http.get('js/hadith.json').then(success, error);
      }
    }
  }
};

angular.module('azaanApp').factory('API', ['$http', '$q', 'appConfig', ApiFactory]);
