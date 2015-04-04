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

  // Function to fetch the weather
  function fetchWeather(location) {
    weatherService.getWeather(location).then(function(data) {
      // Loads the data to place so it si readable by the html
      $scope.place = data;

      // Gets the current time, sunset and sunrise info and formats it in 24hts 
      $scope.sunset = moment($scope.place.channel.astronomy.sunset, ["h:mm A"]).format("HH:mm");
      $scope.sunrise = moment($scope.place.channel.astronomy.sunrise, ["h:mm A"]).format("HH:mm");
      $scope.currentTime = getCurrentTime();

      // If current time is between the sunset and sunrise make the background blue-ish
      // Otherwise make it black
      if($scope.currentTime >= $scope.sunrise && $scope.currentTime <= $scope.sunset) {
        document.getElementById("dynamicBackground").style.background="#DDEFFF";
      }
      else {
        document.getElementById("dynamicBackground").style.background="#282828";
      }

      // Stores day condition
      $scope.dayCondition = $scope.place.channel.item.condition.code;

      // Switch between conditions and call the appropiate function
      switch ($scope.dayCondition) {

        // If it is a tornado
        case "0":
          alert("Tornado");
          break;

        // If it is a tropical storm
        case "1":
          alert("Tropical Storm");
          break;

        // If if is a hurricane
        case "2":
          alert("Hurricane");
          break;

        // If it is a thunderstorm
        case "3":
        case "4":
        case "37":
        case "38":
        case "39":
        case "45":
        case "47":
          alert("Thunderstorm");
          break;

        // If it is raining
        case "5":
        case "6":
        case "8":
        case "9":
        case "10":
        case "11":
        case "12":
        case "35":
        case "40":
          alert("Raining");
          break;

        // If it is snowing
        case "7":
        case "13":
        case "14":
        case "15":
        case "16":
        case "17":
        case "18":
        case "41":
        case "42":
        case "43":
        case "46":
          alert("Snowing");
          break;

        // If it is dusty
        case "19":
          alert("Dust");
          break;

        // If it is foggy
        case "20":
        case "21":
          alert("Foggy");
          break;

        // If it is smokey
        case "19":
          alert("Smokey");
          break;

        // If it is windy
        case "23":
        case "24":
        case "43":
        case "46":
          alert("Windy");
          break;

        // If it is cold
        case "25":
          alert("Cold");

        // If it is clouudy
        case "26":
        case "27":
        case "28":
        case "29":
        case "30":
        case "44":
          snow();
          break;

        // If it is clear
        case "31":
        case "32":
        case "33":
        case "34":
        case "36":
          rain();
          break;

        // If condition is not available
        default:
          alert("Unavailable")
          break;
      }
    }); 
  }

  fetchWeather(); // Call function

  $scope.he = window.navigator.geolocation.getCurrentPosition(function(pos){
    console.log(pos);
  });
  
  // Function to find the location and fetch it
  $scope.findWeather = function(location) {
    fetchWeather(location);
  };
}])

.factory('weatherService', ['$http', '$q', function ($http, $q){
  // Function to get the weather by the APO
  function getWeather (location) {
    var deferred = $q.defer();
    // Make the call
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

// Gets current time and formats it in 24hrs using moment.js
function getCurrentTime() {
  var now = moment().format('HH:mm'); 
  return now;
}

// Variables for threejs
var camera, 
    scene, 
    renderer, 
    particles, 
    geometryFog, 
    materials = [], 
    parameters, 
    i, 
    h, 
    color, 
    sprite, 
    size;

// Height and width for threejs
var width = window.innerWidth;
var height = window.innerHeight-5;

var geometry,
    material, 
    plane, 
    pointLight, 
    light;

// Store html id/div into a variable
var $snow = $('#snow'),
    $rain = $('#rain');

var sceneColor = 0xFFFFFF;
      
// Initiate snow  
function snow() {
  // Changes the html and some id
  document.getElementById('dynamicBackground').style.background="#F0F0F0";
  document.getElementById('rain').style.visibility="hidden";
  document.getElementById('snow').style.visibility="visible";

  initSnow();
  animateSnow();
}

// Initialize the snow particles
function initSnow() {

  geometryFog = new THREE.Geometry();
  var sprite = THREE.ImageUtils.loadTexture("images/snowflake.png"); // texture

  // Create particles
  for ( i = 0; i < 1000; i ++ ) {

    var vertex = new THREE.Vector3();

    vertex.x = Math.random() * 2000 - 1000;
    vertex.y = Math.random() * 2000 - 1000;
    vertex.z = Math.random() * 2000 - 1000;

    geometryFog.vertices.push( vertex );
  }

  // Parameters for the particles
  parameters = [ [ [1.0, 0.2, 0.5], sprite, 20 ],
           [ [0.95, 0.1, 0.5], sprite, 15 ],
           [ [0.90, 0.05, 0.5], sprite, 10 ],
           [ [0.85, 0, 0.5], sprite, 8 ],
           [ [0.80, 0, 0.5], sprite, 5 ],
           ];

  // Give attributes to the particles
  for ( i = 0; i < parameters.length; i ++ ) {

    color  = parameters[i][0];
    sprite = parameters[i][1];
    size   = parameters[i][2];

    materials[i] = new THREE.PointCloudMaterial({ size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent : true } );
    materials[i].color.setHSL( color[0], color[1], color[2] );

    particles = new THREE.PointCloud( geometryFog, materials[i] );

    particles.position.x = Math.random() * 600;
    particles.position.y = Math.random() * 600;
    particles.position.z = Math.random() * 600;

    scene.add( particles );
  }

  // Start the render and append it to the html
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(width, height);
  $snow.append( renderer.domElement );
}

// Animate the snow
function animateSnow() {
  requestAnimationFrame( animateSnow );
  renderSnow();
}

// Render the snow
function renderSnow() {
  var time = Date.now() * 0.00005;
  
  // Camera position
  camera.position.z = 15;
  camera.position.y = 300;

  // Keep adding particles
  for ( i = 0; i < scene.children.length; i ++ ) {
    var object = scene.children[ i ];
    
    if ( object instanceof THREE.PointCloud ) {
      object.position.y -=5;
      
      if(object.position.y <= -750) {
        object.position.y =  950;
      }
    }
  }
  renderer.setClearColor( sceneColor, 0 );
  renderer.render( scene, camera );
}


// Initiate rain  
function rain() {
  // Changes the html and some id
  document.getElementById('dynamicBackground').style.background="#B8B8B8";
  document.getElementById('snow').style.visibility="hidden";
  document.getElementById('rain').style.visibility="visible";

  initRain();
  animateRain();  
}

// Initialize the snow particles
function initRain() {

  geometryFog = new THREE.Geometry();
  var sprite = THREE.ImageUtils.loadTexture("images/drop.png");

  // Create particles
  for ( i = 0; i < 1000; i ++ ) {

    var vertex = new THREE.Vector3();

    vertex.x = Math.random() * 2000 - 1000;
    vertex.y = Math.random() * 2000 - 1000;
    vertex.z = Math.random() * 2000 - 1000;

    geometryFog.vertices.push( vertex );
  }

  // Parameters for the particles
  parameters = [ [ [1.0, 0.2, 0.5], sprite, 20 ],
           [ [0.95, 0.1, 0.5], sprite, 15 ],
           [ [0.90, 0.05, 0.5], sprite, 10 ],
           [ [0.85, 0, 0.5], sprite, 8 ],
           [ [0.80, 0, 0.5], sprite, 5 ],
           ];

  // Give attributes to the particles
  for ( i = 0; i < parameters.length; i ++ ) {

    color  = parameters[i][0];
    sprite = parameters[i][1];
    size   = parameters[i][2];

    materials[i] = new THREE.PointCloudMaterial({ size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent : true } );
    materials[i].color.setHSL( color[0], color[1], color[2] );

    particles = new THREE.PointCloud( geometryFog, materials[i] );

    particles.position.x = Math.random() * 600;
    particles.position.y = Math.random() * 600;
    particles.position.z = Math.random() * 600;

    scene.add( particles );
  }

  // Start the render and append it to the html
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(width, height);
  $rain.append( renderer.domElement );
}

// Animate the rain
function animateRain() {
  requestAnimationFrame( animateRain );
  renderRain();
}

// Render the rain
function renderRain() {
  var time = Date.now() * 0.00005;
  
  // Camera position
  camera.position.z = 15;
  camera.position.y = 300;

  // Keep adding particles
  for ( i = 0; i < scene.children.length; i ++ ) {
    var object = scene.children[ i ];
    
    if ( object instanceof THREE.PointCloud ) {
      object.position.y -=5;
      
      if(object.position.y <= -750) {
        object.position.y =  950;
      }
    }
  }
  renderer.setClearColor( sceneColor, 0 );
  renderer.render( scene, camera );
}