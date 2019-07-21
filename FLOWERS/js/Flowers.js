"use strict"
function Flowers(){
		var cylinder, torus,cone,OpacitySet=0.7
	    this.mesh = new THREE.Object3D()
        var that = this
		init()
		function init(){
			cylinder = new THREE.Mesh( new THREE.CylinderBufferGeometry( 1, 1, 30, 32 ), new THREE.MeshBasicMaterial( {color: 0x84c67b} ))
			    cylinder.receiveShadow = true
			    cylinder.position.set(-5,0,0)
		    torus = new THREE.Mesh( new THREE.TorusBufferGeometry( 5, 1, 16, 100,Math.PI * 0.5 ), new THREE.MeshBasicMaterial( { color: 0x84c67b} ))
			    torus.position.set(-5,15,0)
			    torus.receiveShadow = true
				cylinder.add( torus )
		    cone = new THREE.Mesh( new THREE.ConeBufferGeometry( 3, 2, 8 ),new THREE.MeshBasicMaterial( {color: 0xffff00} ))
				 cone.rotation.z= -Math.PI*0.5
				 cone.position.set(-5,20,0)
				 cone.receiveShadow = true
			for(var i=1;i