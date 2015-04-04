"use strict";

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

var $weather = $('#snow');

var width = window.innerWidth;
var height = window.innerHeight-5;

var geometry,material, plane, pointLight, light;




snow();
			
	
function snow(){
init();
animate();
}

function init() {

	geometryFog = new THREE.Geometry();

	var sprite1 = THREE.ImageUtils.loadTexture("images/snowflake.png");

	for ( i = 0; i < 1000; i ++ ) {

		var vertex = new THREE.Vector3();
		vertex.x = Math.random() * 2000 - 1000;
		vertex.y = Math.random() * 2000 - 1000;
		vertex.z = Math.random() * 2000 - 1000;

		geometryFog.vertices.push( vertex );

	}

	parameters = [ [ [1.0, 0.2, 0.5], sprite1, 20 ],
				   [ [0.95, 0.1, 0.5], sprite1, 15 ],
				   [ [0.90, 0.05, 0.5], sprite1, 10 ],
				   [ [0.85, 0, 0.5], sprite1, 8 ],
				   [ [0.80, 0, 0.5], sprite1, 5 ],
				   ];

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
	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize(width, height);
	$weather.append( renderer.domElement );

}

function animate() {

	requestAnimationFrame( animate );
	render();
}

function render() {

	var time = Date.now() * 0.00005;
	
	camera.position.z = 15;
	camera.position.y = 300;

	for ( i = 0; i < scene.children.length; i ++ ) {
		
		var object = scene.children[ i ];
		
		if ( object instanceof THREE.PointCloud ) {
			object.position.y -=5;
			
			if(object.position.y <= -750) {
				object.position.y =  950;
			}
		}
	}
	renderer.setClearColor( 0xFFFFFF, 0 );
	renderer.render( scene, camera );
}