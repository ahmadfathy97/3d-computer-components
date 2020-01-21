
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({alpha: true});
controls = new THREE.OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
let objContainer = document.getElementById('obj-container');
let obj;
function loadobject (mtlFile, objFile){
  objContainer.appendChild( renderer.domElement );
  loading(mtlFile, objFile);
}


function loading(mtlFile, objFile){
  let mtl = new THREE.MTLLoader()
  mtl.setPath( '../components/models/' );
  mtl.load( mtlFile, function ( materials ) {
      materials.preload();
      new THREE.OBJLoader()
      .setMaterials( materials )
      .setPath( '../components/models/' )
      .load(objFile, function ( object ) {
          // object.position.y = -2;
          // object.scale.x = .02;
          // object.scale.y = .02;
          // object.scale.z = .02;
          obj = object
          scene.add( object );
          objControl(object);
          animate();
          document.querySelector('.container').style.display = "none";
          document.getElementById('comp-load').style.display = "none";
        },
        function ( xhr ) {
          let percent = Math.ceil( ( xhr.loaded / xhr.total * 100 ) ) + '%'
      		console.log( percent);
          document.getElementById('load-percent').textContent = percent;
          document.querySelector('.fill').style.width = percent;

      	},
      	function ( error ) {
      		console.log( 'An error happened' );
        }
      );
  } );
}

let objProperties = {
  color: 0x0080aa,
  bg: '#ddd',
  autoRotation: true,
  title: 'Iron Man',
  lightColor: 0xffffff,
  lightHelper: false
};
let ambientLight = new THREE.AmbientLight( objProperties.lightColor, 0.4 );
scene.add( ambientLight );
//scene background
document.body.style.background = objProperties.bg;
camera.position.z = 5;
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
  if(objProperties.autoRotation){
    obj.rotation.y += .01;
  }
}

window.addEventListener('resize', onResize);

  //controls
function objControl(obj){

    const gui = new dat.GUI({ autoPlace: false });
    let f1 = gui.addFolder('position');
    f1.add(obj.position, 'x', obj.position.x - 25, obj.position.x + 25).onChange = function(e){
      obj.position.x = e;
    };
    f1.add(obj.position, 'y', obj.position.y - 25, obj.position.y + 25).onChange = function(e){
      obj.position.y = e;
    };
    f1.add(obj.position, 'z', obj.position.z - 25, obj.position.z + 25).onChange = function(e){
      obj.position.z = e;
    };
    let f2 = gui.addFolder('rotation');
    f2.add(obj.rotation, 'x', obj.rotation.x - 5, obj.rotation.x + 5).onChange = function(e){
      obj.rottion.x = e;
    };
    f2.add(obj.rotation, 'y', obj.rotation.y - 5, obj.rotation.y + 5).onChange = function(e){
      obj.rotation.y = e;
    };
    f2.add(obj.rotation, 'z', obj.rotation.z - 5, obj.rotation.z + 5).onChange = function(e){
      obj.rotation.z = e;
    };

    let f3 = gui.addFolder('scene');
    // f3.add(objProperties, 'title').onChange(
    //   function (e){
    //     document.querySelector('h1').textContent = e;
    //   }
    // )
    // f3.addColor(objProperties, 'color').onChange(
    //   function(e){
    //     obj.material.color.set( objProperties.color );
    //   }
    // )
    f3.addColor(objProperties, 'bg').onChange(
      function(e){
        document.body.style.background = objProperties.bg;
      }
    )
    f3.add(objProperties, 'autoRotation')

    let f4 = gui.addFolder('light');
    f4.addColor( objProperties, 'lightColor').onChange(
      function(e){
        ambientLight.color.setHex( objProperties.lightColor );
      }
    );
    f1.open();
    f2.open();
    f3.open();
    f4.open();

    //gui.close();
    let customContainer = document.getElementById('my-gui-container');
    customContainer.appendChild(gui.domElement);
}

function onResize(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
};
