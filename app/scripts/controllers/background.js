// // SUGGESTION: I put a bunch of "SUGGESTION" comments below. However, don't just
// //   limit yourself to modifying based only on the "SUGGESTION"s below. Feel
// //   free to change the contents of this entire file.
// //
// //   And also, feel free to ignore any of the suggestions. They're not a
// //   requirement, neither are they actively recommended. They're just something
// //   that are nice to experiment around with, and, if you really like what the
// //   results of your experiment, to keep the changes.
// //
// //   Get creative, and run wild.

// // SUGGESTION: Have this be changing dynamically, if you want, in order to
// // "set the mood", for your app.
// var sceneColor = 0xDDEFFF;

// var Width = window.innerWidth;
// var Height = 350;

// ////////////////////////////////////////////////////////////////////////////////
// // R E N D E R E R

// var renderer = new THREE.WebGLRenderer({ alpha: true });

// // SUGGESTION: also call this function when the dom element's size changes.
// renderer.setSize( Width, Height );
// renderer.domElement.style.position = 'absolute';
// renderer.domElement.style.zIndex = '-9999';
// renderer.domElement.style.bottom = '0px';

// ////////////////////////////////////////////////////////////////////////////////
// // S C E N E

// var scene = new THREE.Scene();

// ////////////////////////////////////////////////////////////////////////////////
// // C A M E R A

// // SUGGESTION: have the "camera's" projection matrix update in order to best
// //   suite your application's need (e.g. the renderer's viewport size changing
// //   in order to fit the window).
// //
// //   The most commmon reason why you would want to change the projection matrix
// //   is when the renderer's viewport size changes (e.g. after calling
// //   `renderer.setSize( w, h )`). And so, when that happens, you simply have to
// //   update the `aspect` property of an instance of the `PerspectiveCamera`
// //   class
// //
// //     camera.aspect = newWidth / newHeight;
// //
// //   Then, you have to call `updateProjectionMatrix` in order for that change to
// //   take effect.
// //
// //     camera.updateProjectionMatrix()
// var camera = new THREE.PerspectiveCamera(
// 	// Field of view (fov).
// 	// SUGGESTION: set the fov to suite your needs.
// 	75,
// 	// Aspect ratio
// 	Width/Height,
// 	// Near frustrum
// 	1,
// 	// Far frustrum
// 	// SUGGESTION: Depending on the physical size of your scene, you may need to
// 	//   increase this value.
// 	1000
// );

// // SUGGESTION: set the position to whatever you like.
// camera.position.z = 15;
// camera.position.y = 7;

// scene.add( camera );

// // This is just to get the camera looking at a specific location. The default is
// // none, but I set it to the (x, y, z) value, below.
// //
// // SUGGESTION: set the "look-at" to whatever you like
// camera.lookAt( new THREE.Vector3( 0, 5, 0 ) );

// // SUGGESTION: use your own DOM element to append the renderer's DOM element to
// //   (e.g. a DIV or something). Or, if you're fine putting the element in a BODY
// //   tag then keep the following line as is.
// document.body.appendChild( renderer.domElement );


// ///////////////////////////////////////////////////////////////////////////////

// // SUGGESTION: below, there are three variables related to our terrain that are
// //   being initialized: geometry, material, and mesh. Consider containerizing
// //   them inside a class, such that if you want to add more meshes, you won't
// //   get confused, as you're adding them.

// ////////////////////////////////////////////////////////////////////////////////
// // G E O M E T R Y

// // This is the geometry data that we will be using to represent our terrain.
// var geometry = new THREE.PlaneGeometry(
// 	// SUGGESTION: change any of the following to best suite your needs. But be
// 	//   careful with the segmentations: the more you add, the more expensive it
// 	//   gets to render to the screen.

// 	// Width
// 	80,
// 	// Height
// 	80,
// 	// Horziontal segmentation
// 	20,
// 	// Vertical segmentation
// 	20
// );

// // Below, are a bunch of variables in CamelCase, indicating they are constants.
// // These constants are used as meta information regarding on how the mountains
// // would look.

// // Represents the range that the mountains will be randomly placed, on the x
// // coordinate.
// // SUGGESTION: set this to suite your needs. It can be just about any number.
// var XRange = 80;

// // Represents a placed mountain's offset on the x-coordinate.
// // SUGGESTION: set this to suite your needs. It can be just about any number.
// var XOffset = 0;

// // Represents the range that the mountains will be randomly placed on the y
// // coordinate.
// // SUGGESTION: set this to suite your needs. It can be just about any number.
// var YRange = 30;

// // Represents a placed moutain's offset on the y-coordinate.
// // SUGGESTION: set this to suite your needs. It can be just about any number.
// var YOffset = 30;

// // Represents the range of possible values that the sigma of the Gaussian
// // function will have.
// // SUGGESTION: set this to suite your needs. It can be just about any number.
// var SigmaRange = 1.5

// // Represents the amount by which to offset the sigma value.
// // SUGGESTION: set this to suite your needs. It can be just about any number.
// var SigmaOffset = 0.7;

// // Represents the range of possible values that will represent a mountain's
// // height.
// // SUGGESTION: set this to suite your needs. It can be just about any number.
// var HeightRange = 10;

// // Represents 
// var HeightOffset = 4;

// // This is the number of mountains that we will be generating onto our terrain.
// // SUGGESTION: change this number to suite your needs. It MUST be an integer.
// var MountainCount = 12;

// // Initialize a set of metadata regarding our mountains' construction. Again,
// // the number of mountains that are generated are contingent upon the
// // `MountainCount` constant.
// var mountains = [];
// for ( var i = 0; i < MountainCount; i++ ) {

// 	mountains.push( {
// 		position: new THREE.Vector2(
// 			(Math.random() - 0.5)*XRange + XOffset,
// 			(Math.random() - 0.5)*YRange + YOffset
// 		),
// 		sigma: Math.random()*SigmaRange + SigmaOffset,
// 		height: Math.random()*HeightRange + HeightOffset
// 	} );

// }

// updateTerrain(mountains, geometry);

// // Height-based terrain face colouring. Used as metadata by the
// // MeshPhongMaterial to override the default texturing and use the face's
// // colour, instead.
// for ( var i = 0; i < geometry.faces.length; i++ ) {

// 	var avg = new THREE.Vector3();
// 	avg.add( geometry.vertices[geometry.faces[i].a] );
// 	avg.add( geometry.vertices[geometry.faces[i].b] );
// 	avg.add( geometry.vertices[geometry.faces[i].c] );
// 	avg.divideScalar(3);

// 	var relative = scene.localToWorld( avg );

// 	// SUGGESTION: feel free to change the possible different heights, below. Use
// 	//   any height scale you want; add some, or remove some, or change the
// 	//   colour, or change the height cutoff. Anything. It's up to you.

// 	if ( relative.z < 2.9 ) {

// 		geometry.faces[i].color.setHex( 0x00aa55 );
	
// 	} else if ( relative.z >= 2.9 && relative.z < 6.5 ) {

// 		geometry.faces[i].color.setHex( 0x909090 );

// 	} else if ( relative.z >= 6.5 ) {

// 		geometry.faces[i].color.setHex( 0xffffff );
	
// 	}

// }


// // N.B. Modification of vertices, and refreshing the geometry is computationally
// // expensive. Don't do it often.

// ////////////////////////////////////////////////////////////////////////////////
// // M A T E R I A L

// // var planes = []
// // for (var i = 0; i < 3; i++) {
// // 	var material = new THREE.MeshPhongMaterial( {
// // 		// fill these in

// // 	} );
// // 	var geometry = new THREE.PlaneGeometry( {
// // 		// fill these in

// // 	} );
// // 	planes.push({
// // 		material: material,
// // 		geometry: geometry,

// // 		mesh: new THREE.Mesh( material, geometry )
// // 	})
// // }

// // This is the material that you inject into the mesh constructor. Here, we are
// // using a class that represents phong, and I believe that this is the best
// // one for the effect that you want to achieve (flat, Google KitKat look).
// var material = new THREE.MeshPhongMaterial( {
// 	shading: THREE.FlatShading,

// 	// Don't draw any texture: just use the geometry's face colour metadata for
// 	// applying the "texture" to the faces. This has been set for artistic
// 	// reasons. Nothing really technical.
// 	vertexColors: THREE.FaceColors,

// 	// An attempt at removing the Phong specular reflection.
// 	shininess: -2
// } );


// ////////////////////////////////////////////////////////////////////////////////
// // T E R R A I N   M E S H

// // This actually represents our terrain.
// var terrain = new THREE.Mesh( geometry, material );



// // Rotate the terrain by 90 degrees, clockwise, on the x-axis.
// terrain.rotation.x = -Math.PI/2;

// // Add our terrain to the scene (which is an abstract construct used by
// // Three.js).
// scene.add( terrain );

// ////////////////////////////////////////////////////////////////////////////////
// // P O I N T   L I G H T

// // And this is the light that that will be giving the flat look.
// var pointLight = new THREE.PointLight( 0xFFFFFF, 1 );
// pointLight.position.set( 0, 10, 0 );
// scene.add( pointLight );

// // SUGGESTION: change the parameters on the above point light or add more point
// //   lights, depending on the effects that you want to achieve.
// //
// //   But be careful when adding more point lights. Computing lighting using
// //   point lights is expensive.

// ////////////////////////////////////////////////////////////////////////////////

// // SUGGESTION: You may want to experiment arround with directional light:
// //   http://threejs.org/docs/#Reference/Lights/DirectionalLight
// //
// //   Directional light is great for mimicking the light emitted by the sun onto
// //   a location on earth, unlike point lights.
// //
// //   I used point lights because, for a simple example, they're easier to work
// //   with, but are terrible for mimicking sunlight.

// ////////////////////////////////////////////////////////////////////////////////
// // A M B I E N T   L I G H T

// // This is just an ambient light. I think, but I might be wrong, that only one
// // can be on the scene at once.
// var ambientLight = new THREE.AmbientLight( 0x303030 );
// scene.add( ambientLight );

// ////////////////////////////////////////////////////////////////////////////////
// // L O G I C   L O O P

// // This is our animation loop.
// (function animate() {

// 	requestAnimationFrame( animate );

// 	// SUGGESTION: use any logic you want so that `sceneColor` changes
// 	//   dynamically, depending on what effect you want to achieve.

// 	// SUGGESTION: make some subtle changes to the ambient light.

// 	// SUGGESTION: you can dyamically update the position, intensity, distance,
// 	//   and colour of point lights.

// 	// SUGGESTION: if you end up using directional light, you can update the
// 	//   position, intensity, direction (`target`), and colour of point lights.

// 	// Every time the screen refreshes, Three.js has to choose what colour to set
// 	// the background to, just in case. The default is black. But I decided to set
// 	// it to something other than black.
// 	//
// 	// BEAR IN MIND, that if you have a sky box, this little piece of code is
// 	// redundant. REMOVE IT IF YOU HAVE A SKYBOX.
// 	renderer.setClearColor( 0xDDEFFF, 0 );

// 	// Use a fog, if you like. I'm using it, and it's giving this slight fade in
// 	// the background. You'll notice if you take a closer look.
// 	scene.fog = new THREE.FogExp2( 0xDDEFFF, 0.02 );

// 	// This should always be called towards the end.
// 	renderer.render( scene, camera );

// }());


// function updateTerrain(mountains, geometry) {
// 	// SUGGESTION: the above metadata should also work out just fine for ponds and
// 	//   lakes. Use negative values for heights, and, for lakes, use larger sigma
// 	//   values.

// 	// Always be sure to set this to true whenever you want to modify the vertices.
// 	geometry.__dirtyVertices = true;

// 	// This is going to be used below in order to extrude parts of our terrain to
// 	// give it bumps, and make it look more natural.
// 	// TODO: change this to suite your needs.
// 	var TerrainBumpHeight = 1;

// 	// And this is where we actually modify the vertices of our terrain.
// 	for ( var i = 0; i < geometry.vertices.length; i++ ) {

// 		// Perform some random extrusion on our terrain to give it some bumps to make
// 		// it appear natural when rendered to the screen.
// 		geometry.vertices[i].z +=
// 			(Math.random() - 0.5) * TerrainBumpHeight;

// 		var relative = scene.localToWorld( geometry.vertices[i].clone() );

// 		for ( var j = 0; j < mountains.length; j++ ) {

// 			var mountain = mountains[j];
// 			var dist = Math.sqrt(
// 				Math.pow( relative.x-mountain.position.x, 2 ) +
// 				Math.pow( relative.y-mountain.position.y, 2 )
// 			);

// 			// Gaussian function used on the terrain, to get a mountain-like structure.
// 			geometry.vertices[i].z +=
// 				Math.exp( -dist / (2*Math.pow( mountain.sigma, 2 )) ) * mountain.height

// 		}
// 	}
// }


"use strict"

/* init();

function init(){ */

// SUGGESTION: I put a bunch of "SUGGESTION" comments below. However, don't just
//   limit yourself to modifying based only on the "SUGGESTION"s below. Feel
//   free to change the contents of this entire file.
//
//   And also, feel free to ignore any of the suggestions. They're not a
//   requirement, neither are they actively recommended. They're just something
//   that are nice to experiment around with, and, if you really like what the
//   results of your experiment, to keep the changes.
//
//   Get creative, and run wild.

// SUGGESTION: Have this be changing dynamically, if you want, in order to
// "set the mood", for your app.
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

var renderer = new THREE.WebGLRenderer({alpha:true});

// SUGGESTION: also call this function when the dom element's size changes.
renderer.setSize( Width, Height );
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.zIndex = '-9999';
renderer.domElement.style.bottom = '0px';

////////////////////////////////////////////////////////////////////////////////
// S C E N E 

var scene = new THREE.Scene();

////////////////////////////////////////////////////////////////////////////////
// C A M E R A

// SUGGESTION: have the "camera's" projection matrix update in order to best
//   suite your application's need (e.g. the renderer's viewport size changing
//   in order to fit the window).
//
//   The most commmon reason why you would want to change the projection matrix
//   is when the renderer's viewport size changes (e.g. after calling
//   `renderer.setSize( w, h )`). And so, when that happens, you simply have to
//   update the `aspect` property of an instance of the `PerspectiveCamera`
//   class
//
//     camera.aspect = newWidth / newHeight;
//
//   Then, you have to call `updateProjectionMatrix` in order for that change to
//   take effect.
//
//     camera.updateProjectionMatrix()
var camera = new THREE.PerspectiveCamera(
	// Field of view (fov).
	// SUGGESTION: set the fov to suite your needs.
	75,
	// Aspect ratio
	Width/Height,
	// Near frustrum
	1,
	// Far frustrum
	// SUGGESTION: Depending on the physical size of your scene, you may need to
	//   increase this value.
	1000
);

// SUGGESTION: set the position to whatever you like.
camera.position.z = 40;
camera.position.y = 10;
//camera.position.x =0;
camera.position.x = 5;
//camera.position.set(20,40,50);
	//var timer = Date.now() * .0005;
	//rotation = 0.05;
	//moveTerrain(geometry);


scene.add( camera );

// This is just to get the camera looking at a specific location. The default is
// none, but I set it to the (x, y, z) value, below.
//
// SUGGESTION: set the "look-at" to whatever you like
camera.lookAt( new THREE.Vector3( 0, -1, 0 ) );

// SUGGESTION: use your own DOM element to append the renderer's DOM element to
//   (e.g. a DIV or something). Or, if you're fine putting the element in a BODY
//   tag then keep the following line as is.
document.body.appendChild( renderer.domElement );


///////////////////////////////////////////////////////////////////////////////

// SUGGESTION: below, there are three variables related to our terrain that are
//   being initialized: geometry, material, and mesh. Consider containerizing
//   them inside a class, such that if you want to add more meshes, you won't
//   get confused, as you're adding them.

////////////////////////////////////////////////////////////////////////////////
// G E O M E T R Y

for (var i = 0; i < 2; i++) {
	// This is the geometry data that we will be using to represent our terrain.
	var geometry = new THREE.PlaneGeometry(
		// SUGGESTION: change any of the following to best suite your needs. But be
		//   careful with the segmentations: the more you add, the more expensive it
		//   gets to render to the screen.

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

// Below, are a bunch of variables in CamelCase, indicating they are constants.
// These constants are used as meta information regarding on how the mountains
// would look.

// Represents the range that the mountains will be randomly placed, on the x
// coordinate.
// SUGGESTION: set this to suite your needs. It can be just about any number.
var XRange = 80;

// Represents a placed mountain's offset on the x-coordinate.
// SUGGESTION: set this to suite your needs. It can be just about any number.
var XOffset =0;

// Represents the range that the mountains will be randomly placed on the y
// coordinate.
// SUGGESTION: set this to suite your needs. It can be just about any number.
var YRange = 60;

// Represents a placed mountain's offset on the y-coordinate.
// SUGGESTION: set this to suite your needs. It can be just about any number.
var YOffset = 0;

// Represents the range of possible values that the sigma of the Gaussian
// function will have.
// SUGGESTION: set this to suite your needs. It can be just about any number.
var SigmaRange = 1.5

// Represents the amount by which to offset the sigma value.
// SUGGESTION: set this to suite your needs. It can be just about any number.
var SigmaOffset = 0.7;

// Represents the range of possible values that will represent a mountain's
// height.
// SUGGESTION: set this to suite your needs. It can be just about any number.
var HeightRange = 5;

// Represents 
var HeightOffset = 4;

// This is the number of mountains that we will be generating onto our terrain.
// SUGGESTION: change this number to suite your needs. It MUST be an integer.
var MountainCount = 20;

// Initialize a set of metadata regarding our mountains' construction. Again,
// the number of mountains that are generated are contingent upon the
// `MountainCount` constant.
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

	var testVar1=(Math.random() - 0.5)*XRange + XOffset;
	var testVar2=(Math.random() - 0.5)*YRange + YOffset;
	console.log(testVar1);
	console.log("Y"+testVar1);
}
/* for (var  i = 0; i < 4; i++ ) {

	mountains.push( {
		position: new THREE.Vector2(
			(Math.random() - 0.5)*20 + 0,
			(Math.random() - 0.5)*60 + 40
		),
		sigma: Math.random()*SigmaRange + SigmaOffset,
		height: Math.random()*HeightRange + HeightOffset
	} );
	console.log(mountains[5].position.x);
} */

updateTerrain(mountains, geometry);

// Height-based terrain face colouring. Used as metadata by the
// MeshPhongMaterial to override the default texturing and use the face's
// colour, instead.
	for ( var i = 0; i < geometry.faces.length; i++ ) {

	var avg = new THREE.Vector3();
	avg.add( geometry.vertices[geometry.faces[i].a] );
	avg.add( geometry.vertices[geometry.faces[i].b] );
	avg.add( geometry.vertices[geometry.faces[i].c] );
	avg.divideScalar(3);

	var relative = scene.localToWorld( avg );

	// SUGGESTION: feel free to change the possible different heights, below. Use
	//   any height scale you want; add some, or remove some, or change the
	//   colour, or change the height cutoff. Anything. It's up to you.

	if ( relative.z < 2.9 ) {

		geometry.faces[i].color.setHex( 0x00aa55 );
	
	} else if ( relative.z >= 2.9 && relative.z < 6.5 ) {

		geometry.faces[i].color.setHex( 0x99aa00 );

	} else if ( relative.z >= 6.5 ) {

		geometry.faces[i].color.setHex( 0x663300);
	
	}

}


// N.B. Modification of vertices, and refreshing the geometry is computationally
// expensive. Don't do it often.

////////////////////////////////////////////////////////////////////////////////
// M A T E R I A L

// This is the material that you inject into the mesh constructor. Here, we are
// using a class that represents phong, and I believe that this is the best
// one for the effect that you want to achieve (flat, Google KitKat look).
for (var i = 0; i < 3; i++) {
	var material = new THREE.MeshPhongMaterial( {
		shading: THREE.FlatShading,

		// Don't draw any texture: just use the geometry's face colour metadata for
		// applying the "texture" to the faces. This has been set for artistic
		// reasons. Nothing really technical.
		vertexColors: THREE.FaceColors,

		// An attempt at removing the Phong specular reflection.
		shininess: -2
	} );
}

////////////////////////////////////////////////////////////////////////////////
// T E R R A I N   M E S H

// This actually represents our terrain.
for (var i = 0; i < 3; i++) {
	var terrain = new THREE.Mesh( geometry, material );
}


// Rotate the terrain by 90 degrees, clockwise, on the x-axis.
terrain.rotation.x = -Math.PI/2;
//terrain.position.set( 0, -1, 0 );

// Add our terrain to the scene (which is an abstract construct used by
// Three.js).

terrain.frustumCulled = false;
scene.add( terrain );

////////////////////////////////////////////////////////////////////////////////
// P O I N T   L I G H T

// And this is the light that that will be giving the flat look.
var pointLight = new THREE.PointLight( 0xFFFFFF, 1 );
pointLight.position.set( 0, 10, 0 );
scene.add( pointLight );

// SUGGESTION: change the parameters on the above point light or add more point
//   lights, depending on the effects that you want to achieve.
//
//   But be careful when adding more point lights. Computing lighting using
//   point lights is expensive.

////////////////////////////////////////////////////////////////////////////////

// SUGGESTION: You may want to experiment arround with directional light:
//   http://threejs.org/docs/#Reference/Lights/DirectionalLight
//
//   Directional light is great for mimicking the light emitted by the sun onto
//   a location on earth, unlike point lights.
//
//   I used point lights because, for a simple example, they're easier to work
//   with, but are terrible for mimicking sunlight.


////////////////////////////////////////////////////////////////////////////////
// A M B I E N T   L I G H T

// This is just an ambient light. I think, but I might be wrong, that only one
// can be on the scene at once.
var ambientLight = new THREE.AmbientLight( 0x303030 );
scene.add( ambientLight );

//}

////////////////////////////////////////////////////////////////////////////////
// L O G I C   L O O P

// This is our animation loop.
(function animate() {

	requestAnimationFrame( animate );

	// SUGGESTION: use any logic you want so that `sceneColor` changes
	//   dynamically, depending on what effect you want to achieve.

	// SUGGESTION: make some subtle changes to the ambient light.

	// SUGGESTION: you can dyamically update the position, intensity, distance,
	//   and colour of point lights.

	// SUGGESTION: if you end up using directional light, you can update the
	//   position, intensity, direction (`target`), and colour of point lights.

	// Every time the screen refreshes, Three.js has to choose what colour to set
	// the background to, just in case. The default is black. But I decided to set
	// it to something other than black.
	//
	// BEAR IN MIND, that if you have a sky box, this little piece of code is
	// redundant. REMOVE IT IF YOU HAVE A SKYBOX.
	renderer.setClearColor( sceneColor, 0 );

	terrain.rotation.z += .006;
	//camera.position.x -= Math.cos(.2)*.1;
	//camera.position.z -= Math.sin(.2)*.1;
	//camera.lookAt(scene.position);
	//console.log(scene.position);
	//updateTerrain(mountains, geometry);
	


	//moveTerrain(geometry);
	
	// Use a fog, if you like. I'm using it, and it's giving this slight fade in
	// the background. You'll notice if you take a closer look.
	scene.fog = new THREE.FogExp2( sceneColor, 0.02 );
	

	
	//console.log(camera.position.z);

	// This should always be called towards the end.
	renderer.render( scene, camera );

}());

function moveTerrain(geometry){
	
	//console.log(camera.position.z);
	
	
	//conditions needed to manipulate the vertices
	geometry.__dirtyVertices = true;
	geometry.verticesNeedUpdate = true;
	geometry.normalsNeedUpdate = true;

		for ( var i = 0; i < geometry.vertices.length ; i++ ) {
		


		}
	

}


function updateTerrain(mountains, geometry) {
	// SUGGESTION: the above metadata should also work out just fine for ponds and
	//   lakes. Use negative values for heights, and, for lakes, use larger sigma
	//   values.

	// Always be sure to set this to true whenever you want to modify the vertices.
	geometry.__dirtyVertices = true;
	geometry.verticesNeedUpdate = true;
	geometry.normalsNeedUpdate = true;

	// This is going to be used below in order to extrude parts of our terrain to
	// give it bumps, and make it look more natural.
	// TODO: change this to suite your needs.
	var TerrainBumpHeight = 1;
	
	// And this is where we actually modify the vertices of our terrain.
	for ( var i = 0; i < geometry.vertices.length; i++ ) {
	
		// Perform some random extrusion on our terrain to give it some bumps to make
		// it appear natural when rendered to the screen.
		geometry.vertices[i].z +=
			(Math.random() - 0.5) * TerrainBumpHeight;

		var relative = scene.localToWorld( geometry.vertices[i].clone() );

		for ( var j = 0; j < mountains.length; j++ ) {

			var mountain = mountains[j];
			var dist = Math.sqrt(
				Math.pow( relative.x-mountain.position.x, 2 ) +
				Math.pow( relative.y-mountain.position.y, 2 )
			);

			// Gaussian function used on the terrain, to get a mountain-like structure.
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
		//console.log(geometry);
				
		
		 var TerrainBumpHeight = 1;
		

					// And this is where we actually modify the vertices of our terrain.
	 	for ( var i = 0; i < geometry.vertices.length; i++ ) {
			//geometry.vertices[i].y += 10;

			var relative = scene.localToWorld( geometry.vertices[i].clone() );

		
				// Gaussian function used on the terrain, to get a mountain-like structure.
				//geometry.vertices[i].z +=.5;
				
				if(geometry.vertices[i].z > 2.9){
					//console.log(geometry.vertices[i].z);
					geometry.vertices[i].z += .001;
					//console.log("upper");
					
				}
				else{
					//console.log("down");
					geometry.vertices[i].z += (Math.random() - 0.5) * 3 ;
				}
				
		

			} 


		
		
		
        
     }, 2000);}); 

