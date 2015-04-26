"use strict";function foggy(a){fogValue=a}function updateTerrain(a,b){b.__dirtyVertices=!0,b.verticesNeedUpdate=!0,b.normalsNeedUpdate=!0;for(var c=1,d=0;d<b.vertices.length;d++){b.vertices[d].z+=(Math.random()-.5)*c;for(var e=scene.localToWorld(b.vertices[d].clone()),f=0;f<a.length;f++){var g=a[f],h=Math.sqrt(Math.pow(e.x-g.position.x,2)+Math.pow(e.y-g.position.y,2));b.vertices[d].z+=Math.exp(-h/(2*Math.pow(g.sigma,2)))*g.height}}}function getCurrentTime(){var a=moment().format("HH:mm");return a}function snow(){initSnow(),animateSnow()}function initSnow(){for(geometryFog2=new THREE.Geometry,sprite2=THREE.ImageUtils.loadTexture("images/snowflake.png"),i=0;1e3>i;i++){var a=new THREE.Vector3;a.x=2e3*Math.random()-1e3,a.y=2e3*Math.random()-1e3,a.z=2e3*Math.random()-1e3,geometryFog2.vertices.push(a)}for(parameters2=[[[1,.2,.5],sprite2,20],[[.95,.1,.5],sprite2,15],[[.9,.05,.5],sprite2,10],[[.85,0,.5],sprite2,8],[[.8,0,.5],sprite2,5]],i=0;i<parameters2.length;i++)color2=parameters2[i][0],sprite2=parameters2[i][1],size2=parameters2[i][2],materials2[i]=new THREE.PointCloudMaterial({size:size2,map:sprite2,blending:THREE.AdditiveBlending,depthTest:!1,transparent:!0}),materials2[i].color.setHSL(color2[10],color2[0],color2[0]),particles2=new THREE.PointCloud(geometryFog2,materials2[i]),particles2.position.x=600*Math.random(),particles2.position.y=600*Math.random(),particles2.position.z=600*Math.random(),scene2.add(particles2);renderer2=new THREE.WebGLRenderer({alpha:!0}),renderer2.setSize(width2,height2),$snow.append(renderer2.domElement)}function animateSnow(){requestAnimationFrame(animateSnow),renderSnow()}function renderSnow(){5e-5*Date.now();for(camera2.position.z=15,camera2.position.y=300,i=0;i<scene2.children.length;i++){var a=scene2.children[i];a instanceof THREE.PointCloud&&(a.position.y-=5,a.position.y<=-750&&(a.position.y=950))}renderer2.setClearColor(sceneColor2,0),renderer2.render(scene2,camera2)}function rain(){initRain(),animateRain()}function initRain(){var a=new THREE.Geometry;for(sprite3=THREE.ImageUtils.loadTexture("images/drop.png"),i=0;1e3>i;i++){var b=new THREE.Vector3;b.x=2e3*Math.random()-1e3,b.y=2e3*Math.random()-1e3,b.z=2e3*Math.random()-1e3,a.vertices.push(b)}for(parameters3=[[[1,.2,.5],sprite3,20],[[.95,.1,.5],sprite3,15],[[.9,.05,.5],sprite3,10],[[.85,0,.5],sprite3,8],[[.8,0,.5],sprite3,5]],i=0;i<parameters3.length;i++){color3=parameters3[i][0],sprite3=parameters3[i][1],size3=parameters3[i][2],materials3[i]=new THREE.PointCloudMaterial({size:size3,map:sprite3,blending:THREE.AdditiveBlending,depthTest:!1,transparent:!0}),materials3[i].color.setHSL(color3[5],color3[0],color3[0]);var c=new THREE.PointCloud(a,materials3[i]);c.position.x=600*Math.random(),c.position.y=600*Math.random(),c.position.z=600*Math.random(),scene3.add(c)}renderer3=new THREE.WebGLRenderer({alpha:!0}),renderer3.setSize(width3,height3),$rain.append(renderer3.domElement)}function animateRain(){requestAnimationFrame(animateRain),renderRain()}function renderRain(){5e-5*Date.now();for(camera3.position.z=15,camera3.position.y=300,i=0;i<scene3.children.length;i++){var a=scene3.children[i];a instanceof THREE.PointCloud&&(a.position.y-=5,a.position.y<=-750&&(a.position.y=950))}renderer3.setClearColor(sceneColor3,0),renderer3.render(scene3,camera3)}function cloudy(){initClouds(),animateClouds()}function initClouds(){var a=new THREE.Geometry;for(sprite4=THREE.ImageUtils.loadTexture("images/clouds.png"),i=0;1e3>i;i++){var b=new THREE.Vector4;b.x=2e3*Math.random()-1e3,b.y=2e3*Math.random()-1e3,b.z=2e3*Math.random()-1e3,a.vertices.push(b)}for(parameters4=[[[1,.2,.5],sprite4,20],[[.95,.1,.5],sprite4,15],[[.9,.05,.5],sprite4,10],[[.85,0,.5],sprite4,8],[[.8,0,.5],sprite4,5]],i=0;i<parameters4.length;i++){color4=parameters4[i][0],sprite4=parameters4[i][1],size4=parameters4[i][2],materials4[i]=new THREE.PointCloudMaterial({size:size4,map:sprite4,blending:THREE.AdditiveBlending,depthTest:!1,transparent:!0}),materials4[i].color.setHSL(color4[5],color4[0],color4[0]);var c=new THREE.PointCloud(a,materials4[i]);c.position.x=600*Math.random(),c.position.z=500*Math.random(),scene4.add(c)}renderer4=new THREE.WebGLRenderer({alpha:!0}),renderer4.setSize(width4,height4),$clouds.append(renderer4.domElement)}function animateClouds(){requestAnimationFrame(animateClouds),renderClouds()}function renderClouds(){5e-5*Date.now();for(camera4.position.z=-10,camera4.position.x=300,i=0;i<scene4.children.length;i++){var a=scene4.children[i];a instanceof THREE.PointCloud&&(a.position.x-=1,a.position.x<=-750&&(a.position.x=950))}renderer4.setClearColor(sceneColor4,0),renderer4.render(scene4,camera4)}angular.module("iat381FinalProjectCheeasonApp",["ngAnimate","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngAside","ui.bootstrap","indexedDB"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/weather.html",controller:"WeatherCtrl"}).otherwise({redirectTo:"/"})}]);var sceneColor=14544895,rotation,Width=window.innerWidth,Height=350,lastTime=0,angularSpeed=.2,counter=0,vertexCount=0,fogValue=.02,renderer=new THREE.WebGLRenderer({alpha:!0});renderer.setSize(Width,Height),renderer.domElement.style.position="absolute",renderer.domElement.style.zIndex="-9999",renderer.domElement.style.bottom="0px";var scene=new THREE.Scene,camera=new THREE.PerspectiveCamera(75,Width/Height,1,1e3);camera.position.z=45,camera.position.y=15,camera.position.x=0,scene.add(camera),camera.lookAt(new THREE.Vector3(0,-1,0)),document.body.appendChild(renderer.domElement);for(var i=0;2>i;i++)var geometry=new THREE.PlaneGeometry(80,80,40,40);for(var XRange=80,XOffset=0,YRange=60,YOffset=0,SigmaRange=1.5,SigmaOffset=.7,HeightRange=8,HeightOffset=4,MountainCount=20,mountains=[],i=0;MountainCount>i;i++)mountains.push({position:new THREE.Vector2((Math.random()-.5)*XRange+XOffset,(Math.random()-.5)*YRange+YOffset),sigma:Math.random()*SigmaRange+SigmaOffset,height:Math.random()*HeightRange+HeightOffset});updateTerrain(mountains,geometry);for(var i=0;i<geometry.faces.length;i++){var avg=new THREE.Vector3;avg.add(geometry.vertices[geometry.faces[i].a]),avg.add(geometry.vertices[geometry.faces[i].b]),avg.add(geometry.vertices[geometry.faces[i].c]),avg.divideScalar(3);var relative=scene.localToWorld(avg);relative.z<2.9?geometry.faces[i].color.setHex(56079):relative.z>=2.9&&relative.z<6.5?geometry.faces[i].color.setHex(8730880):relative.z>=6.5&&geometry.faces[i].color.setHex(62855)}for(var i=0;3>i;i++)var material=new THREE.MeshPhongMaterial({shading:THREE.FlatShading,vertexColors:THREE.FaceColors,shininess:-2});for(var i=0;3>i;i++)var terrain=new THREE.Mesh(geometry,material);terrain.rotation.x=-Math.PI/2,terrain.frustumCulled=!1,scene.add(terrain);var pointLight=new THREE.PointLight(16777215,1);pointLight.position.set(0,20,0),scene.add(pointLight);var dLight=new THREE.DirectionalLight(16777215,.5);dLight.position.set(0,15,45),dLight.target.position.set(0,15,45),scene.add(dLight);var ambientLight=new THREE.AmbientLight(3158064);scene.add(ambientLight),function a(){requestAnimationFrame(a),renderer.setClearColor(sceneColor,0),terrain.rotation.z+=.006,scene.fog=new THREE.FogExp2(sceneColor,fogValue),renderer.render(scene,camera)}(),$(function(){setInterval(function(){geometry.__dirtyVertices=!0,geometry.verticesNeedUpdate=!0,geometry.normalsNeedUpdate=!0;for(var a=0;a<geometry.vertices.length;a++){{scene.localToWorld(geometry.vertices[a].clone())}geometry.vertices[a].z>2.9?geometry.vertices[a].z+=.001:geometry.vertices[a].z+=3*(Math.random()-.5)}},2e3)}),angular.module("iat381FinalProjectCheeasonApp").controller("WeatherCtrl",["$scope","weatherService",function(a,b){function c(c){b.getWeather(c).then(function(b){switch(a.place=b,a.sunset=moment(a.place.channel.astronomy.sunset,["h:mm A"]).format("HH:mm"),a.sunrise=moment(a.place.channel.astronomy.sunrise,["h:mm A"]).format("HH:mm"),a.currentTime>=a.sunrise&&a.currentTime<=a.sunset?document.getElementById("dynamicBackground").style.background="#DDEFFF":document.getElementById("dynamicBackground").style.background="#282828",a.dayCondition=a.place.channel.item.condition.code,a.dayCondition){case"0":break;case"1":break;case"2":break;case"3":case"4":case"37":case"38":case"39":case"45":case"47":break;case"5":case"6":case"8":case"9":case"10":case"11":case"12":case"35":case"40":document.getElementById("dynamicBackground").style.background="#B8B8B8",document.getElementById("rain").style.visibility="visible",document.getElementById("snow").style.visibility="hidden",foggy(.02);break;case"7":case"13":case"14":case"15":case"16":case"17":case"18":case"41":case"42":case"43":case"46":document.getElementById("dynamicBackground").style.background="#F0F0F0",document.getElementById("rain").style.visibility="hidden",document.getElementById("snow").style.visibility="visible",foggy(.02);break;case"19":break;case"20":case"21":foggy(.04);break;case"19":break;case"23":case"24":case"43":case"46":break;case"25":case"26":case"27":case"28":case"29":case"30":case"44":document.getElementById("clouds").style.visibility="visible";break;case"31":case"32":case"33":case"34":case"36":break;default:document.getElementById("rain").style.visibility="hidden",document.getElementById("snow").style.visibility="hidden"}})}a.items="";var d=function(){h()},e=new IDBStore("cities",d),f=function(b){a.items=b,a.$apply()},g=function(){console.log("error")},h=function(){e.getAll(f,g),console.log("getItems")};a.deleteItem=function(a){e.remove(a,h,g)},a.addItem=function(){e.put({text:a.itemname},h,g),a.itemname=""};var i=function(b){a.test=b,console.log(a.test.text),a.$apply(),c(a.test.text)};a.use=function(a){e.get(a,i,g)},a.currentTime=getCurrentTime(),snow(),rain(),cloudy(),document.getElementById("rain").style.visibility="hidden",document.getElementById("snow").style.visibility="hidden",document.getElementById("clouds").style.visibility="hidden",navigator.geolocation.getCurrentPosition(function(d){a.lat=d.coords.latitude,a.lng=d.coords.longitude,b.getLocation(a.lat,a.lng).then(function(b){a.currentLocation=b,c(a.currentLocation)})}),a.openMenu=function(){document.getElementById("swipeMenu").style.right="0px",document.getElementById("swipeMenuBackground").style.right="0%",document.getElementById("swipeMenu").style.transition=".5s"},a.closeMenu=function(){document.getElementById("swipeMenu").style.right="-75%",document.getElementById("swipeMenu").style.transition=".5s",document.getElementById("swipeMenuBackground").style.right="-100%"},a.findWeather=function(a){document.getElementById("dataLoaded").style.display="none",document.getElementById("showMe").style.display="inline",c(a)}}]).factory("weatherService",["$http","$q",function(a,b){function c(c,d){var e=b.defer();return a.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+c+","+d+"&sensor=true").success(function(a){e.resolve(a.results[0].address_components[2].long_name+" "+a.results[0].address_components[5].long_name),document.getElementById("dataLoaded").style.display="none",document.getElementById("showMe").style.display="inline"}).error(function(a){e.reject(a)}),e.promise}function d(c){var d=b.defer();return a.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20u%3D%22c%22%20AND%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text=%22"+c+"%22)&format=json&callback=").success(function(a){d.resolve(a.query.results)}).error(function(a){d.reject(a)}),d.promise}return{getWeather:d,getLocation:c}}]);var camera2,scene2,renderer2,particles2,geometryFog2,materials2=[],parameters2,color2,sprite2,size2;scene2=new THREE.Scene;var width2=window.innerWidth,height2=window.innerHeight-5;camera2=new THREE.PerspectiveCamera(75,width2/height2,1,1e3);var $snow=$("#snow"),$clouds=$("#clouds"),$rain=$("#rain"),sceneColor2=16777215,camera3,scene3,renderer3,materials3=[],parameters3,color3,sprite3,size3;scene3=new THREE.Scene;var width3=window.innerWidth,height3=window.innerHeight-5;camera3=new THREE.PerspectiveCamera(75,width3/height3,1,1e3);var sceneColor3=16777215,camera4,scene4,renderer4,materials4=[],parameters4,color4,sprite4,size4;scene4=new THREE.Scene;var width4=window.innerWidth,height4=(window.innerHeight+200)/2;camera4=new THREE.PerspectiveCamera(75,width4/height4,1,500);var sceneColor4=16777215;