'use strict';

/**
 * @ngdoc function
 * @name iat381FinalProjectCheeasonApp.controller:WeatherCtrl
 * @description
 * # WeatherCtrl
 * Controller of the iat381FinalProjectCheeasonApp
 */
angular.module('iat381FinalProjectCheeasonApp')
.controller('WeatherCtrl', ['$scope', 'weatherService', function($scope, weatherService) {

  function fetchWeather(location) {
    weatherService.getWeather(location).then(function(data){
      $scope.place = data;
    }); 
  }
  
  fetchWeather();
  // $scope.location = window.navigator.geolocation.getCurrentPosition(function(pos){
  //   console.log(pos);
  // });

  $scope.findWeather = function(location) {
    $scope.place = "";
    fetchWeather(location);
  };

}])

  .factory('weatherService', ['$http', '$q', function ($http, $q){
    function getWeather (location) {
      var deferred = $q.defer();
      $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20u%3D%22c%22%20AND%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text=%22' + location  + '%22)&format=json&callback=')
        .success(function(data){
          deferred.resolve(data.query.results);
        })
        .error(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
    }
    return {
      getWeather: getWeather
    };
  }])

  // .directive('googlePlaces', function(){
  //   var options = {types: ['(cities)']};
  //     return {
  //         replace:true,
  //         template: '<input id="google_places_ac" name="google_places_ac" type="text" class="input-block-level"/> ',
  //         link: function($scope, elm, attrs){
  //             var autocomplete = new google.maps.places.Autocomplete(elm.get(0), options);
  //             google.maps.event.addListener(autocomplete, 'place_changed', function() {
  //                 var place = autocomplete.getPlace();
  //                 show_submit_data(place.formatted_address);
  //                 $scope.place = place.formatted_address;
  //                 $scope.$apply();
  //             });
  //         }
  //     }
  //     function show_submit_data(data) {
  //       $("#result").html(data);
  //     }
  // })
