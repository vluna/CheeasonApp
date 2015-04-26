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
    
    $scope.items = '';
    
    var initCallback = function(){
        getItems();
    };
 
    var dataStore = new IDBStore('cities', initCallback);
 
    var getItemsSuccess = function(data){
        $scope.items = data;
        $scope.$apply(); 
    };
 
    var errorCallback = function(){
        console.log('error'); 
    };
 
    var getItems = function(){
        dataStore.getAll(getItemsSuccess,errorCallback);
        console.log('getItems'); 
    };
 
    $scope.deleteItem = function(item){
        dataStore.remove(item,getItems,errorCallback);
    }
 
    $scope.addItem = function(){
        dataStore.put({'text' : $scope.itemname},getItems,errorCallback); 
        $scope.itemname = ''; 
    };

    var onSuccess = function(data){
      $scope.test = data;
      console.log($scope.test.text); 
      $scope.$apply(); 
      fetchWeather($scope.test.text);

    }

    $scope.use = function(item){
      dataStore.get(item, onSuccess, errorCallback); 
    };

  // Get current time
  $scope.currentTime = getCurrentTime();

  // Call the condition renders
  snow();
  rain();
  cloudy();

  // Make the conditions hidden at the begining
  document.getElementById("rain").style.visibility="hidden";
  document.getElementById("snow").style.visibility="hidden";
  document.getElementById("clouds").style.visibility="hidden";

  // Get users current location
  navigator.geolocation.getCurrentPosition(function(pos){
    
    // Store the latitude and longitud in variables
    $scope.lat = pos.coords.latitude;
    $scope.lng = pos.coords.longitude;

    // Pass lat and long to converted to a City name
    weatherService.getLocation($scope.lat, $scope.lng).then(function(data) {
        $scope.currentLocation = data;
        fetchWeather($scope.currentLocation);
    });
  })

  $scope.openMenu = function() {
    document.getElementById('swipeMenu').style.right="0px";
    document.getElementById('swipeMenuBackground').style.right="0%";
    document.getElementById('swipeMenu').style.transition=".5s";
  }
  $scope.closeMenu = function() {
    document.getElementById('swipeMenu').style.right="-75%";
    document.getElementById('swipeMenu').style.transition=".5s";
    document.getElementById('swipeMenuBackground').style.right="-100%";
  }

  // Function to fetch the weather
  function fetchWeather(location) {

    // Pass the locstion to retrieve the weather
    weatherService.getWeather(location).then(function(data) {
      // Loads the data to place so it si readable by the html
      $scope.place = data;

      // Gets the current time, sunset and sunrise info and formats it in 24hts 
      $scope.sunset = moment($scope.place.channel.astronomy.sunset, ["h:mm A"]).format("HH:mm");
      $scope.sunrise = moment($scope.place.channel.astronomy.sunrise, ["h:mm A"]).format("HH:mm");

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
          break;

        // If it is a tropical storm
        case "1":
          break;

        // If if is a hurricane
        case "2":
          break;

        // If it is a thunderstorm
        case "3":
        case "4":
        case "37":
        case "38":
        case "39":
        case "45":
        case "47":
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
          document.getElementById('dynamicBackground').style.background="#B8B8B8";
          document.getElementById("rain").style.visibility="visible";
          document.getElementById("snow").style.visibility="hidden";
          foggy(.02);
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
          document.getElementById('dynamicBackground').style.background="#F0F0F0";
          document.getElementById("rain").style.visibility="hidden";
          document.getElementById("snow").style.visibility="visible";
          foggy(.02);
          break;

        // If it is dusty
        case "19":
          break;

        // If it is foggy
        case "20":
        case "21":
          foggy(.04);
          break;

        // If it is smokey
        case "19":
          break;

        // If it is windy
        case "23":
        case "24":
        case "43":
        case "46":
          break;

        // If it is cold
        case "25":

        // If it is clouudy
        case "26":
        case "27":
        case "28":
        case "29":
        case "30":
        case "44":
          document.getElementById("clouds").style.visibility="visible";
          break;

        // If it is clear
        case "31":
        case "32":
        case "33":
        case "34":
        case "36":
          break;

        // If condition is not available
        default:
          document.getElementById("rain").style.visibility="hidden";
          document.getElementById("snow").style.visibility="hidden";
          break;
      }
    }); 
  }
  // Function to find the location and fetch it
  $scope.findWeather = function(location) {
    // If user does not allow to use current location allow them to search anyways
    document.getElementById('dataLoaded').style.display="none";
    document.getElementById('showMe').style.display="inline";
    fetchWeather(location);
  };
}])

.factory('weatherService', ['$http', '$q', function ($http, $q){
  
  // Function to get the location by the API
  function getLocation (lat, lng) {
    var currentLocation = $q.defer();

    // Make the API call
    $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&sensor=true')
      .success(function(data){
        currentLocation.resolve(data.results[0].address_components[2].long_name + " " + data.results[0].address_components[5].long_name);
        document.getElementById('dataLoaded').style.display="none";
        document.getElementById('showMe').style.display="inline";

      })
      .error(function(err){
        currentLocation.reject(err);
      });
    return currentLocation.promise;
  }



  // Function to get the weather by the API
  function getWeather (location) {
    var deferred = $q.defer();

    // Make the API call
    $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20u%3D%22c%22%20AND%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text=%22' + location  + '%22)&format=json&callback=')
      .success(function(data){
        deferred.resolve(data.query.results);
      })
      .error(function(err){
        deferred.reject(err);
      });
    return deferred.promise
  }

  // Return the weather and location
  return {
    getWeather: getWeather,
    getLocation: getLocation
  };
}])

// Gets current time and formats it in 24hrs using moment.js
function getCurrentTime() {
  var now = moment().format('HH:mm'); 
  return now;
}

// Variables for threejs
var camera2, 
    scene2, 
    renderer2, 
    particles2, 
    geometryFog2, 
    materials2 = [], 
    parameters2, 
    color2, 
    sprite2, 
    size2;

scene2 = new THREE.Scene();

// Height and width for threejs
var width2 = window.innerWidth;
var height2 = window.innerHeight-5;

camera2 = new THREE.PerspectiveCamera(75, width2/height2, 1, 1000);

// Store html id/div into a variable
var $snow = $('#snow'),
    $clouds = $('#clouds'),
    $rain = $('#rain');

var sceneColor2 = 0xFFFFFF;
      
// Initiate snow  
function snow() {
  // Changes the html and some id
  initSnow();
  animateSnow();
}

// Initialize the snow particles
function initSnow() {
  geometryFog2 = new THREE.Geometry();
  sprite2 = THREE.ImageUtils.loadTexture("images/snowflake.png"); // texture

  // Create particles
  for ( i = 0; i < 1000; i ++ ) {

    var vertex2 = new THREE.Vector3();

    vertex2.x = Math.random() * 2000 - 1000;
    vertex2.y = Math.random() * 2000 - 1000;
    vertex2.z = Math.random() * 2000 - 1000;

    geometryFog2.vertices.push( vertex2 );
  }

  // Parameters for the particles
  parameters2 = [ [ [1.0, 0.2, 0.5], sprite2, 20 ],
           [ [0.95, 0.1, 0.5], sprite2, 15 ],
           [ [0.90, 0.05, 0.5], sprite2, 10 ],
           [ [0.85, 0, 0.5], sprite2, 8 ],
           [ [0.80, 0, 0.5], sprite2, 5 ],
           ];

  // Give attributes to the particles
  for ( i = 0; i < parameters2.length; i ++ ) {

    color2  = parameters2[i][0];
    sprite2 = parameters2[i][1];
    size2   = parameters2[i][2];

    materials2[i] = new THREE.PointCloudMaterial({ size: size2, map: sprite2, blending: THREE.AdditiveBlending, depthTest: false, transparent : true } );
    materials2[i].color.setHSL( color2[10], color2[0], color2[0] );

    particles2 = new THREE.PointCloud( geometryFog2, materials2[i] );

    particles2.position.x = Math.random() * 600;
    particles2.position.y = Math.random() * 600;
    particles2.position.z = Math.random() * 600;
    scene2.add( particles2 );
  }

  // Start the render and append it to the html
  renderer2 = new THREE.WebGLRenderer({ alpha: true });
  renderer2.setSize(width2, height2);
  $snow.append( renderer2.domElement );
}

// Animate the snow
function animateSnow() {
  requestAnimationFrame( animateSnow );
  renderSnow();
}

// Render the snow
function renderSnow() {
  var time2 = Date.now() * 0.00005;
  
  // Camera position
  camera2.position.z = 15;
  camera2.position.y = 300;

  // Keep adding particles
  for ( i = 0; i < scene2.children.length; i ++ ) {
    var object2 = scene2.children[ i ];
    
    if ( object2 instanceof THREE.PointCloud ) {
      object2.position.y -=5;
      
      if(object2.position.y <= -750) {
        object2.position.y =  950;
      }
    }
  }
  renderer2.setClearColor( sceneColor2, 0 );
  renderer2.render( scene2, camera2 );
}

// Variables for threejs
var camera3, 
    scene3, 
    renderer3, 
    materials3 = [], 
    parameters3, 
    color3, 
    sprite3, 
    size3;

scene3 = new THREE.Scene();

// Height and width for threejs
var width3 = window.innerWidth;
var height3 = window.innerHeight-5;

camera3 = new THREE.PerspectiveCamera(75, width3/height3, 1, 1000);

var sceneColor3 = 0xFFFFFF;

// Initiate rain  
function rain() {
  // Changes the html and some id
  initRain();
  animateRain();  
}

// Initialize the snow particles
function initRain() {
  var geometryFog3 = new THREE.Geometry();
  sprite3 = THREE.ImageUtils.loadTexture("images/drop.png");

  // Create particles
  for ( i = 0; i < 1000; i ++ ) {

    var vertex3 = new THREE.Vector3();

    vertex3.x = Math.random() * 2000 - 1000;
    vertex3.y = Math.random() * 2000 - 1000;
    vertex3.z = Math.random() * 2000 - 1000;

    geometryFog3.vertices.push( vertex3 );
  }

  // Parameters for the particles
  parameters3 = [ [ [1.0, 0.2, 0.5], sprite3, 20 ],
           [ [0.95, 0.1, 0.5], sprite3, 15 ],
           [ [0.90, 0.05, 0.5], sprite3, 10 ],
           [ [0.85, 0, 0.5], sprite3, 8 ],
           [ [0.80, 0, 0.5], sprite3, 5 ],
           ];

  // Give attributes to the particles
  for ( i = 0; i < parameters3.length; i ++ ) {

    color3  = parameters3[i][0];
    sprite3 = parameters3[i][1];
    size3   = parameters3[i][2];

    materials3[i] = new THREE.PointCloudMaterial({ size: size3, map: sprite3, blending: THREE.AdditiveBlending, depthTest: false, transparent : true } );
    materials3[i].color.setHSL( color3[5], color3[0], color3[0] );

    var particles3 = new THREE.PointCloud( geometryFog3, materials3[i] );

    particles3.position.x = Math.random() * 600;
    particles3.position.y = Math.random() * 600;
    particles3.position.z = Math.random() * 600;

    scene3.add( particles3 );
  }

  // Start the render and append it to the html
  renderer3 = new THREE.WebGLRenderer({ alpha: true });
  renderer3.setSize(width3, height3);
  $rain.append( renderer3.domElement );
}

// Animate the rain
function animateRain() {
  requestAnimationFrame( animateRain );
  renderRain();
}

// Render the rain
function renderRain() {
  var time3 = Date.now() * 0.00005;
  
  // Camera position
  camera3.position.z = 15;
  camera3.position.y = 300;

  // Keep adding particles
  for ( i = 0; i < scene3.children.length; i ++ ) {
    var object3 = scene3.children[ i ];
    
    if ( object3 instanceof THREE.PointCloud ) {
      object3.position.y -=5;
      
      if(object3.position.y <= -750) {
        object3.position.y =  950;
      }
    }
  }
  renderer3.setClearColor( sceneColor3, 0 );
  renderer3.render( scene3, camera3 );
}

// Variables for threejs
var camera4, 
    scene4, 
    renderer4, 
    materials4 = [], 
    parameters4, 
    color4, 
    sprite4, 
    size4;

scene4 = new THREE.Scene();

// Height and width for threejs
var width4 = window.innerWidth;
var height4 = (window.innerHeight+200)/2;

camera4 = new THREE.PerspectiveCamera(75, width4/height4, 1, 500);

var sceneColor4 = 0xFFFFFF;

// Initiate rain  
function cloudy() {
  // Changes the html and some id
  initClouds();
  animateClouds();  
}

// Initialize the snow particles
function initClouds() {
  var geometryFog4 = new THREE.Geometry();
  sprite4 = THREE.ImageUtils.loadTexture("images/clouds.png");

  // Create particles
  for ( i = 0; i < 1000; i ++ ) {

    var vertex4 = new THREE.Vector4();

    vertex4.x = Math.random() * 2000 - 1000;
    vertex4.y = Math.random() * 2000 - 1000;
    vertex4.z = Math.random() * 2000 - 1000;

    geometryFog4.vertices.push( vertex4 );
  }

  // Parameters for the particles
  parameters4 = [ [ [1.0, 0.2, 0.5], sprite4, 20 ],
           [ [0.95, 0.1, 0.5], sprite4, 15 ],
           [ [0.90, 0.05, 0.5], sprite4, 10 ],
           [ [0.85, 0, 0.5], sprite4, 8 ],
           [ [0.80, 0, 0.5], sprite4, 5 ],
           ];

  // Give attributes to the particles
  for ( i = 0; i < parameters4.length; i ++ ) {

    color4  = parameters4[i][0];
    sprite4 = parameters4[i][1];
    size4   = parameters4[i][2];

    materials4[i] = new THREE.PointCloudMaterial({ size: size4, map: sprite4, blending: THREE.AdditiveBlending, depthTest: false, transparent : true } );
    materials4[i].color.setHSL( color4[5], color4[0], color4[0] );

    var particles4 = new THREE.PointCloud( geometryFog4, materials4[i] );

    particles4.position.x = Math.random() * 600;
    particles4.position.z = Math.random() * 500;

    scene4.add( particles4 );
  }

  // Start the render and append it to the html
  renderer4 = new THREE.WebGLRenderer({ alpha: true });
  renderer4.setSize(width4, height4);
  $clouds.append( renderer4.domElement );
}

// Animate the rain
function animateClouds() {
  requestAnimationFrame( animateClouds );
  renderClouds();
}

// Render the rain
function renderClouds() {
  var time4 = Date.now() * 0.00005;
  
  // Camera position
  camera4.position.z = -10;
  camera4.position.x = 300;

  // Keep adding particles
  for ( i = 0; i < scene4.children.length; i ++ ) {
    var object4 = scene4.children[ i ];
    
    if ( object4 instanceof THREE.PointCloud ) {
      object4.position.x -= 1;
      
      if(object4.position.x <= -750) {
        object4.position.x =  950;
      }
    }
  }
  renderer4.setClearColor( sceneColor4, 0 );
  renderer4.render( scene4, camera4 );
}


