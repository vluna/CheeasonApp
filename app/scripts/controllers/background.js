"use strict"

var sceneColor = 0xDDEFFF;
var rotation
var Width = window.innerWidth;
var Height = 350;

var lastTime = 0;
var angularSpeed = 0.2; 
var counter = 0;
var vertexCount  = 0;

////////////////////////////////////////////////////////////////////////////////
// R E N D E R E R

var renderer = new THREE.WebGLRenderer({alpha: true});

renderer.setSize( Width, Height );
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.zIndex = '-9999';
renderer.domElement.style.bottom = '0px';

////////////////////////////////////////////////////////////////////////////////
// S C E N E 

var scene = new THREE.Scene();

////////////////////////////////////////////////////////////////////////////////
// C A M E R A

var camera = new THREE.PerspectiveCamera(
	75,
	Width/Height,
	1,
	1000
);

camera.position.z = 45;
camera.position.y = 15;
camera.position.x = 0;

scene.add( camera );

camera.lookAt( new THREE.Vector3( 0, -1, 0 ) );

document.body.appendChild( renderer.domElement );

////////////////////////////////////////////////////////////////////////////////
// G E O M E T R Y

for (var i = 0; i < 2; i++) {
	// This is the geometry data that we will be using to represent our terrain.
	var geometry = new THREE.PlaneGeometry(
		// Width
		80,
		// Height
		80,
		// Horziontal segmentation
		40,
		// Vertical segmentation
		40
	);
}

//Variables for the Mountains 

// Represents the range that the mountains will be randomly placed, on the x
// coordinate.
var XRange = 80;

// Represents a placed mountain's offset on the x-coordinate.
var XOffset =0;

// Represents the range that the mountains will be randomly placed on the y
// coordinate.
var YRange = 60;

// Represents a placed mountain's offset on the y-coordinate.
var YOffset = 0;

// Represents the range of possible values that the sigma of the Gaussian
// function will have.
var SigmaRange = 1.5

// Represents the amount by which to offset the sigma value.
var SigmaOffset = 0.7;

// Represents the range of possible values that will represent a mountain's
// height.
var HeightRange = 8;

var HeightOffset = 4;

//number of Mountains in the plane
var MountainCount = 20;

//mountains array
var mountains = [];
for ( var i = 0; i < MountainCount; i++ ) {

	mountains.push( {
		position: new THREE.Vector2(
			(Math.random() - 0.5)*XRange + XOffset,
			(Math.random() - 0.5)*YRange + YOffset
		),
		sigma: Math.random()*SigmaRange + SigmaOffset,
		height: Math.random()*HeightRange + HeightOffset
	} );

}

updateTerrain(mountains, geometry);

	//Colors for the layers on terrain
	for ( var i = 0; i < geometry.faces.length; i++ ) {

	var avg = new THREE.Vector3();
	avg.add( geometry.vertices[geometry.faces[i].a] );
	avg.add( geometry.vertices[geometry.faces[i].b] );
	avg.add( geometry.vertices[geometry.faces[i].c] );
	avg.divideScalar(3);

	var relative = scene.localToWorld( avg );


	if ( relative.z < 2.9 ) {

		geometry.faces[i].color.setHex( 0x00db0f );
	
	} else if ( relative.z >= 2.9 && relative.z < 6.5 ) {

		geometry.faces[i].color.setHex( 0x853900 );

	} else if ( relative.z >= 6.5 ) {

		geometry.faces[i].color.setHex( 0x00f587);
	
	}

}

////////////////////////////////////////////////////////////////////////////////
// M A T E R I A L

//Flat texture on planes
for (var i = 0; i < 3; i++) {
	var material = new THREE.MeshPhongMaterial( {
		shading: THREE.FlatShading,
		vertexColors: THREE.FaceColors,
		shininess: -2
	} );
}

////////////////////////////////////////////////////////////////////////////////
// T E R R A I N   M E S H

// 3 layered terrain
for (var i = 0; i < 3; i++) {
	var terrain = new THREE.Mesh( geometry, material );
}


// Rotate the terrain by 90 degrees, clockwise, on the x-axis.
terrain.rotation.x = -Math.PI/2;
//terrain.position.set( 0, -1, 0 );

//So plane doesnt disappear
terrain.frustumCulled = false;

scene.add( terrain );

////////////////////////////////////////////////////////////////////////////////
// P O I N T   L I G H T

// And this is the light that that will be giving the flat look.
var pointLight = new THREE.PointLight( 0xFFFFFF, 1 );
pointLight.position.set( 0, 20, 0 );
scene.add( pointLight );

var dLight = new THREE.DirectionalLight( 0xffffff ,.5);
dLight.position.set( 0, 15, 45 );
dLight.target.position.set( 0, 15, 45);
scene.add(dLight);	

////////////////////////////////////////////////////////////////////////////////
// A M B I E N T   L I G H T

var ambientLight = new THREE.AmbientLight( 0x303030 );
scene.add( ambientLight );

////////////////////////////////////////////////////////////////////////////////
// L O G I C   L O O P

//Animate function to call itself
(function animate() {

	requestAnimationFrame( animate );

	renderer.setClearColor( sceneColor, 0 );

	terrain.rotation.z += .006;

	scene.fog = new THREE.FogExp2( sceneColor, 0.02 );

	renderer.render( scene, camera );

}());

function updateTerrain(mountains, geometry) {

	// Condition to change vertices 
	geometry.__dirtyVertices = true;
	geometry.verticesNeedUpdate = true;
	geometry.normalsNeedUpdate = true;

	var TerrainBumpHeight = 1;
	
	for ( var i = 0; i < geometry.vertices.length; i++ ) {
	
		//extrude vertices in the plane
		geometry.vertices[i].z +=
			(Math.random() - 0.5) * TerrainBumpHeight;

		var relative = scene.localToWorld( geometry.vertices[i].clone() );

		for ( var j = 0; j < mountains.length; j++ ) {

			var mountain = mountains[j];
			var dist = Math.sqrt(
				Math.pow( relative.x-mountain.position.x, 2 ) +
				Math.pow( relative.y-mountain.position.y, 2 )
			);

			// Create a mountain-like structure.
			geometry.vertices[i].z +=
				Math.exp( -dist / (2*Math.pow( mountain.sigma, 2 )) ) * mountain.height;

		}
	}
	
}

 $(function() {
    var terrainChange = setInterval(function() {

	geometry.__dirtyVertices = true;
	geometry.verticesNeedUpdate = true;
	geometry.normalsNeedUpdate = true;

	// Modify the terrain
	for ( var i = 0; i < geometry.vertices.length; i++ ) {

		var relative = scene.localToWorld( geometry.vertices[i].clone() );

			//Create a moving tree planes
			if(geometry.vertices[i].z > 2.9){
				geometry.vertices[i].z += .001;
				
			}
			else{
				geometry.vertices[i].z += (Math.random() - 0.5) * 3 ;
			}
	
		} 

     }, 2000);}); 

	 //end of whitePeak function
	

