"use strict";

let scene, camera, renderer;  // Bases pour le rendu Three.js
let controls; // Pour l'interaction avec la souris
let brainMaterial; // Matériau pour la surface du cerveau
let canvas;
/* Création de la scène 3D */
function createScene() {
    // Scene
    scene = new THREE.Scene();

    // TODO: Créer une caméra, sur l'axe des Z positif

    camera = new THREE.PerspectiveCamera(
        45, //FOV
        window.innerWidth / window.innerHeight, //ratio
        0.1, //near
        100 //far
    )
    camera.position.x = -1
    camera.position.y = 2
    camera.position.z = 2

    // TODO: Ajout d'une lumière liée à la caméra

    /* ATTENTION ELLE NE SUIT PAS ENCORE LA CAMERA */
    const color = 0xFFFFFF;
    const intensity = 0.8;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 2);
    light.target.position.set(-1, 2, 2);
    scene.add(light);
    scene.add(light.target);
    const helper = new THREE.DirectionalLightHelper(light);
    scene.add(helper);


    // TODO: Ajout d'une lumière ambiante
    const color2 = 0xFFFFFF;
    const intensity2 = 0.2;
    const light2 = new THREE.SpotLight(color2, intensity2);
    scene.add(light2);
    const helper2 = new THREE.SpotLightHelper(light2);
    scene.add(helper2);


    // Modélisation du cerveau
    // add_brainMesh("./allenMouseBrain.obj") // TODO: Décommenter à l'exercice 1.b
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Modelisation du volume d'injection
    //add_injectionVolumeMesh("./volumeInjection.obj"); // TODO: Décommenter à l'exercice 1.c

    // Modélisation des streamlines
    //add_streamlines("./streamlines_100149109.json") // TODO: Décommenter à l'exercice 1.d
}





// TODO: COMPLÉTEZ CE CODE (exerice 1.b)
function add_brainMesh(url) {
    // Importation de la surface du cerveau
    let brainIFS = loadBrain(url)

    // TODO: Ajout des sommets

    // TODO: Ajout des faces

    // TODO: Calcul des normales

    // TODO: Création du matériau

    // TODO: Création du maillage

    // Rotation pour s'assurer que le dessus du cerveau est vers le haut.
    // cerveau.rotateX(Math.PI) // TODO: Décommentez cette ligne

    // TODO: Ajout du modèle à la scène.
}

// TODO: COMPLÉTEZ CE CODE (exerice 1.c)
function add_injectionVolumeMesh(url) {
    // Importation du volume d'injection
    let injectionIFS = loadInjection(url);

    // TODO: Ajout des sommets

    // TODO: Ajout des faces

    // TODO: Calcul des normales

    // TODO: Création du matériau

    // TODO: Création du maillage

    // Rotation pour s'assurer que le dessus du cerveau est vers le haut.
    // injection.rotateX(Math.PI) // TODO: Décommentez cette ligne

    // TODO: Ajout du modèle à la scène.
}

/* Fonction ajoutant à la scène 3D toutes les streamlines 
   contenues dans le fichier fourni */
function add_streamlines(url) {
    let streamlines = loadStreamlines(url)

    for (let i = 0; i < streamlines.length; i++) {
        add_singleStreamline(streamlines[i]);
    }
}

/* Fonction permettant d'ajouter un seul streamline à la scène 3D */
// TODO: COMPLÉTEZ CE CODE (exerice 1-d)
function add_singleStreamline(line) {
    // line est un array dont chaque élément est un object JavaScript ayant les 
    // propriété x, y et z pour la position d'un point de ce streamline.
    const points = new Float32Array(line.length * 3);
    const colors = new Float32Array(line.length * 3);
    let r, g, b;
    for (let i = 0; i < line.length; i++) {
        //TODO: Ajout d'un point dans l'array points.

        // TODO: Calcul de la couleur du point
    }

    // Pour s'assurer que le 1er et le dernier point du streamline utilisent
    // bonne couleur
    colors[0] = colors[1]
    colors[colors.length - 1] = colors[colors.length - 2]

    // TODO: Création d'une géométrie pour contenir les sommets et les couleurs

    // TODO: Création d'un matériau de type LineBasicMaterial

    // TODO: Création d'un modèle

    // Rotation pour s'assurer que le dessus du cerveau est vers le haut.
    //model.rotateX(Math.PI); // TODO: Décommentez cette ligne

    // TODO: Ajout du modèle à la scène.
}

// Fontion d'initialisation. Elle est appelée lors du chargement du body html.
function init() {
    try {
        canvas = document.getElementById("glcanvas");
        renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    catch (e) {
        document.getElementById("canvas-holder").innerHTML =
            "<h3><b>Sorry, WebGL is required but is not available.</b><h3>";
        return;
    }

    // Création de la scène 3D
    createScene();

    // TODO: Texture cubemap

    // Ajout de l'interactivité avec la souris
    controls = new THREE.TrackballControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.autoRotate = true;

    // Animation de la scène (appelée toute les 30 millisecondes)
    animate();
}

/* Animation de la scène */
function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
