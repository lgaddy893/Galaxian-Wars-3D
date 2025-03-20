/* GLOBAL CONSTANTS AND VARIABLES */
/* assignment specific globals */
const BASE_URL = "https://lgaddy893.github.io/CSC561-Final-Assets/"
const INPUT_TIE_FILE = "json/Tie.json"; // triangles file loc
const INPUT_TIE2_FILE = "json/TieAdvanced.json"; // triangles file loc
const INPUT_PLAYER_FILE = "json/Xwing.json"; // triangles file loc
const INPUT_BULLET_FILE = "json/Bullet.json"; // triangles file loc
const INPUT_RETICLE_FILE = "json/Reticle.json"; // triangles file loc
const INPUT_ENEMY_BULLET_FILE = "json/EnemyBullet.json"; // triangles file loc
const INPUT_COCKPIT_FILE = "json/Cockpit.json"; // triangles file loc
const INPUT_BACKGROUND_FILE = "json/Background.json"; // triangles file loc
const INPUT_SKYBOX_FILE = "json/SkyBox.json"; // triangles file loc
const RAINBOW_TEXTURE = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9b243fcb-4d90-493d-bcdb-c6754f46ccd6/dc725w3-b138b84e-8f06-4f79-9744-3b8fe8ceec8a.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzliMjQzZmNiLTRkOTAtNDkzZC1iY2RiLWM2NzU0ZjQ2Y2NkNlwvZGM3MjV3My1iMTM4Yjg0ZS04ZjA2LTRmNzktOTc0NC0zYjhmZThjZWVjOGEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Mh0XvphX7CDXJiDCOz3AYonA1inkHt_Rar0XVMaBGKw"; // triangles file loc
const INPUT_STAR_FILE = "json/Star.json"
const INPUT_SONIC_FILE = "json/Sonic.json"
const COLORTYPE = {TEXTURE: 0, COLOR: 1, RAINBOW: 3}
var defaultEye = vec3.fromValues(0,0,0); // default eye position in world space
var defaultCenter = vec3.fromValues(0,0,0.5); // default view direction in world space
var defaultUp = vec3.fromValues(0,1,0); // default view up vector
var lightAmbient = vec3.fromValues(1,1,1); // default light ambient emission
var lightDiffuse = vec3.fromValues(1,1,1); // default light diffuse emission
var lightSpecular = vec3.fromValues(1,1,1); // default light specular emission
var lightPositionULoc

var rotateTheta = Math.PI/50; // how much to rotate models by with each key press
var colorType = 0; //0 = modulation
var block = "none"
let xrSession = null;
let xrRefSpace = null;

/* webgl and geometry data */
var gl = null; // the all powerful gl object. It's all here folks!
var inputTriangles = []; // the triangle data as loaded from input files
var numTriangleSets = 0; // how many triangle sets in input scene
var inputEllipsoids = []; // the ellipsoid data as loaded from input files
var numEllipsoids = 0; // how many ellipsoids in the input scene
var vertexBuffers = []; // this contains vertex coordinate lists by set, in triples
var uvBuffers = []; // this contains vertex coordinate lists by set, in triples
var normalBuffers = []; // this contains normal component lists by set, in triples
var triSetSizes = []; // this contains the size of each triangle set
var triangleBuffers = []; // lists of indices into vertexBuffers by set, in triples
var viewDelta = 0; // how much to displace view with each key press

/* shader parameter locations */
var vPosAttribLoc; // where to put position for vertex shader
var vUvAttribLoc; // where to put uv for vertex shader
var vNormAttribLoc; // where to put uv for vertex shader  
var mMatrixULoc; // where to put model matrix for vertex shader
var pvmMatrixULoc; // where to put project model view matrix for vertex shader
var ambientULoc; // where to put ambient reflecivity for fragment shader
var diffuseULoc; // where to put diffuse reflecivity for fragment shader
var specularULoc; // where to put specular reflecivity for fragment shader
var shininessULoc; // where to put specular exponent for fragment shader
var colorTypeLocation;
var AlphaLocation;
var TimeLocation;



/* interaction variables */
var Eye = vec3.clone(defaultEye); // eye position in world space
var Center = vec3.clone(defaultCenter); // view direction in world space
var Up = vec3.clone(defaultUp); // view up vector in world space
var globalRotate = 0
var nextLevelTimer = 0


//Game Objects
//translaton, xAxis, yAxis, image, center
var player = {};
var then; //FPS variable
var gltextures = {};
var images = {};
var zplane = 30;
var backgroundImage = {}
let vr = false
let canvas
var lightPosition = vec3.fromValues(0,-10,zplane - 10); // default light position

var keyPressed = {}
var screenEdge = {left: 25, right: -25, top: 30, bottom: -30, forward: 25 + zplane, back: -25 + zplane}
player.rotateTheta = 1.5//Theta per second
var tieTriangles;
var bulletTriangles;
var enemies = [];
var numEnemies = 20
var fps = 60; //Temp value
player.bullet = {}
player.bullet.moveSpeed = 40
player.speed = vec3.fromValues(0,0,0);
player.acceleration = 30;
player.moveSpeed = 15 //per second
player.invincible = false //per second
var score = 0
var scoreDelta = 100
var output = document.getElementById("fps")
var scoreHtml = document.getElementById("score")
var timeHtml = document.getElementById("time")
let controller = null
var enemiesPerRow = 10
var enemiesPerColumn = 5
var enemyOffset = 0
var enemyMaxSpeed = 1
var enemySpeed = enemyMaxSpeed
var enemyAcceleration = 1 
var secondsTilAttack = Math.random() * 5 + 3
var currFrame;
let firstAttack = true
let enemyBulletSpeed = 10
var threeD = false
var time = -1;
var nextPower = Math.random() * 10 + 5
var modelTimer = Math.random() * 10 + 5
let powerUps = []
let enemyMaxSpinSpeed = 5
let modelTimerMax = 7
let enemySpinAcc = 1
let modelSwitched = false
let currentEnemyModel = 0
let difficulty = 1
let headsetOffset = {"right": null, "left": null }
let skyBox = []
let reticles = []

let debug = false
let timer = null
let local = true

//Audio
var tieBlasterAudio = new Audio(BASE_URL + 'tieBlasterAudio.mp3');
tieBlasterAudio.volume = 0.5
var mute = true
var cockpit = {}
let numEnemiesAlive = numEnemies
document.onkeydown = handleKeyPress; // call this when key pressed
document.onkeyup = handleKeyRelease; // call this when key pressed

//Textures
let rainbowTexure = {}
// ASSIGNMENT HELPER FUNCTIONS
function setup() {
    xrSession = null;
    xrRefSpace = null;
    vertexBuffers = []; // this contains vertex coordinate lists by set, in triples
    uvBuffers = []; // this contains vertex coordinate lists by set, in triples
    normalBuffers = []; // this contains normal component lists by set, in triples
    triSetSizes = []; // this contains the size of each triangle set
    triangleBuffers = []; // lists of indices into vertexBuffers by set, in triples
    Eye = vec3.clone(defaultEye); // eye position in world space
    Center = vec3.clone(defaultCenter); // view direction in world space
    Up = vec3.clone(defaultUp); // view up vector in world space
    player = {};
    player.rotateTheta = 1.5
    backgroundImage = {}
    enemies = [];
    numEnemiesAlive = numEnemies
    player.bullet = {}
    player.bullet.moveSpeed = 40
    player.speed = vec3.fromValues(0,0,0);
    player.acceleration = 30;
    player.moveSpeed = 15 //per second
    player.invincible = false //per second
    scoreDelta = 100

    enemiesPerRow = 10
    enemiesPerColumn = 5
    enemyOffset = 0
    // enemyMaxSpeed = 2
    enemySpeed = enemyMaxSpeed
    enemyAcceleration = 1 
    secondsTilAttack = Math.random() * 5 + 3
    firstAttack = true
    enemyBulletSpeed = 10
    time = -1;
    nextPower = Math.random() * 10 + 5
    modelTimer = Math.random() * 10 + 5
    numEnemiesAlive = numEnemies

    powerUps = []
    enemyMaxSpinSpeed = 5
    modelTimerMax = 7
    enemySpinAcc = 1
    modelSwitched = false
    currentEnemyModel = 0
    difficulty = 1
    skyBox = []
    cockpit = {}
}
// get the JSON file from the passed URL
function getJSONFile(url,descr) {
    if (!local) {
        url = BASE_URL + url
    }
    
    try {
        if ((typeof(url) !== "string") || (typeof(descr) !== "string"))
            throw "getJSONFile: parameter not a string";
        else {
            var httpReq = new XMLHttpRequest(); // a new http request
            httpReq.open("GET",url,false); // init the request
            httpReq.send(null); // send the request
            var startTime = Date.now();
            while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
                if ((Date.now()-startTime) > 3000)
                    break;
            } // until its loaded or we time out after three seconds
            if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE))
                throw "Unable to open "+descr+" file!";
            else
                return JSON.parse(httpReq.response); 
        } // end if good params
    } // end try    
    
    catch(e) {
        console.log(e);
        return(String.null);
    }
} // end get input json file

// set up the webGL environment
function setupWebGL() {
    
    // Set up keys
    // document.onkeydown = handleKeyDown; // call this when key pressed

    // Get the canvas and context
    canvas = document.getElementById("myWebGLCanvas"); // create a js canvas
    canvas.width = window.innerHeight  - 50
    canvas.height = window.innerHeight  - 50
    var canvasBackground = document.getElementById("myImageCanvas"); // create a js canvas
    canvasBackground.width = window.innerHeight  - 50
    canvasBackground.height = window.innerHeight  - 50

    if (vr) {
        gl = canvas.getContext("webgl", {xrCompatible: true}); // get a webgl object from it
    } else {
        gl = canvas.getContext("webgl"); // get a webgl object from it
    }
    
    
    try {
      if (gl == null) {
        throw "unable to create gl context -- is your browser gl ready?";
      } else {
        //gl.clearColor(0.0, 0.0, 0.0, 1.0); // use black when we clear the frame buffer
        gl.clearDepth(5.0); // use max when we clear the depth buffer
        gl.enable(gl.DEPTH_TEST); // use hidden surface removal (with zbuffering)
      }
    } // end try
    
    catch(e) {
      console.log(e);
    } // end catch

    
 
} // end setupWebGL

function handleKeyPress(event) {
    // console.log(event.code)
    switch (event.code) {
        
        // model selection
        case "Space": 
            keyPressed.space = true
            break;
        case "ArrowRight": // select next triangle set
            keyPressed.rightPressed = true
            break;
        case "ArrowLeft": // select previous triangle set
            keyPressed.leftPressed = true
            break;
        case "ArrowUp": // select previous triangle set
            keyPressed.upPressed = true
            break;
        case "ArrowDown": // select previous triangle set
            keyPressed.downPressed = true
            break;
        case "ShiftLeft": // select next ellipsoid
            keyPressed.shiftPressed = true
            break;
        case "ControlLeft": // select next ellipsoid
            keyPressed.controlPressed = true
            break;
        case "KeyM": // select next ellipsoid
            toggleMute()
            break;
        case "KeyI": // select next ellipsoid
            keyPressed.iPressed = true
            break;
        case "KeyF": // select next ellipsoid
            keyPressed.fPressed = true
            break;
        case "KeyN": // select next ellipsoid
            finishLevel()
            console.log("SDF")
            break;
    } // end switch
}

function handleKeyRelease(event) {
    switch (event.code) {
        
        // model selection
        case "Space": 
            keyPressed.space = false
            break;
        case "ArrowRight": // select next triangle set
            keyPressed.rightPressed = false
            break;
        case "ArrowLeft": // select previous triangle set
            keyPressed.leftPressed = false
            break;
        case "ArrowUp": // select previous triangle set
            keyPressed.upPressed = false
            break;
        case "ArrowDown": // select previous triangle set
            keyPressed.downPressed  = false
            break;
        case "ShiftLeft": // select next ellipsoid
            keyPressed.shiftPressed = false
            break;
        case "ControlLeft": // select next ellipsoid
            keyPressed.controlPressed = false
            break;
            case "KeyI": // select next ellipsoid
            keyPressed.iPressed = false
            break;
        case "KeyF": // select next ellipsoid
            keyPressed.fPressed = false
            break;
    } // end switch
}

function loadModel (file, colortype) {
    //Set up enemies
    inputTriangles = getJSONFile(file, "triangles")
    inputTriangles.colorType = colortype
    try {
        if (inputTriangles == String.null)
            throw "Unable to load file!";
        else {
            var whichSetVert; // index of vertex in current triangle set
            var whichSetTri; // index of triangle in current triangle set
            var vtxToAdd; // vtx coords to add to the coord array
            var normToAdd; // vtx normal to add to the coord array
            var normToAdd; // uv coords to add to the coord array
            var triToAdd; // tri indices to add to the index array
            var maxCorner = vec3.fromValues(Number.MIN_VALUE,Number.MIN_VALUE,Number.MIN_VALUE); // bbox corner
            var minCorner = vec3.fromValues(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE); // other corner
            inputTriangles.vertexBuffers = []
            inputTriangles.uvBuffers = []
            inputTriangles.normalBuffers = []
            inputTriangles.triSetSizes = []
            inputTriangles.triangleBuffers = []

            inputTriangles.center = vec3.fromValues(0,0,0);  // center point of tri set
            
            let totalVerts = 0;
            // process each triangle set to load webgl vertex and triangle buffers
            numTriangleSets = inputTriangles.length; // remember how many tri sets
            inputTriangles.numTriangleSets = numTriangleSets
            
            for (var whichSet=0; whichSet<numTriangleSets; whichSet++) { // for each tri set
                
                // set up hilighting, modeling translation and rotatio
                // set up the vertex and normal arrays, define model center and axes
                inputTriangles[whichSet].glVertices = []; // flat coord list for webgl
                inputTriangles[whichSet].glNormals = []; // flat normal list for webgl
                inputTriangles[whichSet].glUvs = []; // flat normal list for webgl

                inputTriangles[whichSet].glTextures = []; // flat normal list for webgl
                inputTriangles[whichSet].center = vec3.fromValues(0,0,0) // flat normal list for webgl
                var numVerts = inputTriangles[whichSet].vertices.length; // num vertices in tri set

                totalVerts += numVerts
                for (whichSetVert=0; whichSetVert<numVerts; whichSetVert++) { // verts in set
                    vtxToAdd = inputTriangles[whichSet].vertices[whichSetVert]; // get vertex to add
                    normToAdd = inputTriangles[whichSet].normals[whichSetVert]; // get normal to add
                    uvToAdd = inputTriangles[whichSet].uvs[whichSetVert]; // get normal to add
                    inputTriangles[whichSet].glVertices.push(vtxToAdd[0],vtxToAdd[1],vtxToAdd[2]); // put coords in set coord list
                    inputTriangles[whichSet].glNormals.push(normToAdd[0],normToAdd[1],normToAdd[2]); // put normal in set coord list
                    inputTriangles[whichSet].glUvs.push(uvToAdd[0],uvToAdd[1]); // put normal in set coord list
                    vec3.max(maxCorner,maxCorner,vtxToAdd); // update world bounding box corner maxima
                    vec3.min(minCorner,minCorner,vtxToAdd); // update world bounding box corner minima
                    vec3.add(inputTriangles.center,inputTriangles.center,vtxToAdd); // add to ctr sum
                    vec3.add(inputTriangles[whichSet].center,inputTriangles[whichSet].center,vtxToAdd); // add to ctr sum
                } // end for vertices in set
                
                vec3.scale(inputTriangles[whichSet].center,inputTriangles[whichSet].center,1/numVerts); // avg ctr sum


                // send the vertex coords and normals to webGL
                inputTriangles.vertexBuffers[whichSet] = gl.createBuffer(); // init empty webgl set vertex coord buffer
                gl.bindBuffer(gl.ARRAY_BUFFER,inputTriangles.vertexBuffers[whichSet]); // activate that buffer
                gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(inputTriangles[whichSet].glVertices),gl.STATIC_DRAW); // data in

                if (!gltextures[inputTriangles[whichSet].material.texture]) {
                    gltextures[inputTriangles[whichSet].material.texture] = gl.createTexture();
                }

                //Image textures
                inputTriangles[whichSet].glTexture = gltextures[inputTriangles[whichSet].material.texture];
                
                if (!images[inputTriangles[whichSet].material.texture]) {
                    images[inputTriangles[whichSet].material.texture] = new Image();
                    images[inputTriangles[whichSet].material.texture].loaded = false
                    images[inputTriangles[whichSet].material.texture].textureLoaded = false
                    images[inputTriangles[whichSet].material.texture].crossOrigin = "anonymous"
                    //TODO update image source
                    images[inputTriangles[whichSet].material.texture].src = inputTriangles[whichSet].material.texture;
                    images[inputTriangles[whichSet].material.texture].addEventListener('load', function() {
                        // Now that the image has loaded make copy it to the texture.
                        this.loaded = true;

                    });
                }

                inputTriangles[whichSet].image = images[inputTriangles[whichSet].material.texture]

                
                inputTriangles.uvBuffers[whichSet] = gl.createBuffer(); // init empty webgl set vertex coord buffer
                gl.bindBuffer(gl.ARRAY_BUFFER,inputTriangles.uvBuffers[whichSet]); // activate that buffer
                gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(inputTriangles[whichSet].glUvs),gl.STATIC_DRAW); // data in
                inputTriangles.normalBuffers[whichSet] = gl.createBuffer(); // init empty webgl set normal component buffer
                gl.bindBuffer(gl.ARRAY_BUFFER,inputTriangles.normalBuffers[whichSet]); // activate that buffer
                gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(inputTriangles[whichSet].glNormals),gl.STATIC_DRAW); // data in
            
                // set up the triangle index array, adjusting indices across sets
                inputTriangles[whichSet].glTriangles = []; // flat index list for webgl

                
                inputTriangles.triSetSizes[whichSet] = inputTriangles[whichSet].triangles.length; // number of tris in this set
                for (whichSetTri=0; whichSetTri<inputTriangles.triSetSizes[whichSet]; whichSetTri++) {
                    triToAdd = inputTriangles[whichSet].triangles[whichSetTri]; // get tri to add
                    inputTriangles[whichSet].glTriangles.push(triToAdd[0],triToAdd[1],triToAdd[2]); // put indices in set list
                } // end for triangles in set

                // send the triangle indices to webGL
                inputTriangles.triangleBuffers.push(gl.createBuffer()); // init empty triangle index buffer
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, inputTriangles.triangleBuffers[whichSet]); // activate that buffer
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(inputTriangles[whichSet].glTriangles),gl.STATIC_DRAW); // data in
                
            } // end for each triangle set 
            var temp = vec3.create(); // an intermediate vec3               
            viewDelta = vec3.length(vec3.subtract(temp,maxCorner,minCorner)) / 100; // set global

            vec3.scale(inputTriangles.center,inputTriangles.center,1/totalVerts); // avg ctr sum
        } // end if triangle file loaded
    } catch(e) {
        console.log(e);
    } // end catch
}

async function setUpObjects() {

    //Makes a background image
    var imageCanvas = document.getElementById("myImageCanvas"); // create a 2d canvas
    var cw = imageCanvas.width, ch = imageCanvas.height; 
    imageContext = imageCanvas.getContext("2d");
    var bkgdImage = new Image(); 
    bkgdImage.crossOrigin = "Anonymous";
    bkgdImage.src = "https://ncsucgclass.github.io/prog3/sky.jpg";
    bkgdImage.onload = function(){
        var iw = bkgdImage.width, ih = bkgdImage.height;
        imageContext.drawImage(bkgdImage,0,0,iw,ih,0,0,cw,ch);   
    }
    //Set up background
    loadModel(INPUT_BACKGROUND_FILE, COLORTYPE.TEXTURE)
    // inputTriangles = loadModel(INPUT_BACKGROUND_FILE,"triangles");
    backgroundImage.triangles = inputTriangles
   
    backgroundImage.center = inputTriangles.center  // center point of tri set
    let distance = 435
    let distanceAway = 50
    if (threeD) {
        backgroundImage.translation = vec3.fromValues(10,distanceAway,zplane); // no translation
        backgroundImage.xAxis = vec3.fromValues(-1,0,0); // model X axis
        backgroundImage.yAxis = vec3.fromValues(0,0,-1); // model Y axis 
        backgroundImage.scale = distance
        loadModel(INPUT_RETICLE_FILE, COLORTYPE.TEXTURE)
        let reticle = {}
        reticle.xAxis = vec3.fromValues(-1,0,0); // model X axis
        reticle.yAxis = vec3.fromValues(0,0,-1); // model Y axis 
        reticle.scale = .25
        reticle.triangles = inputTriangles
        reticle.center = inputTriangles.center
        reticle.translation = vec3.fromValues(-.5,-10,zplane); // no translation
        reticle.rotateTheta = player.rotateTheta
        reticles.push(reticle)
        reticle = {}
        reticle.xAxis = reticles[0].xAxis; // model X axis
        reticle.yAxis = reticles[0].yAxis; // model Y axis  
        reticle.scale = .125 
        reticle.triangles = inputTriangles
        reticle.center = inputTriangles.center
        reticle.translation = vec3.fromValues(-.5,-10,zplane); // no translation
        reticles.push(reticle)
        
    } else {
        backgroundImage.translation = vec3.fromValues(0,0,40); // no translation
        backgroundImage.xAxis = vec3.fromValues(1,0,0); // model X axis
        backgroundImage.yAxis = vec3.fromValues(0,1,0); // model Y axis 
        backgroundImage.scale = 200
    }
    if (vr) {

        reticles[0].rotateTheta = player.rotateTheta
        distance = 1600
        distanceAway = 400
        loadModel(INPUT_SKYBOX_FILE, COLORTYPE.TEXTURE)
        let sky = {}
        sky.triangles = inputTriangles
        sky.translation = vec3.fromValues(10,-1 * distanceAway,zplane); // no translation
        sky.xAxis = vec3.fromValues(-1,0,0); // model X axis
        sky.yAxis = vec3.fromValues(0,0,-1); // model Y axis 
        sky.scale = distance
        sky.center = inputTriangles.center
        skyBox.push(sky)

        sky = {}
        sky.triangles = inputTriangles
        sky.translation = vec3.fromValues(distanceAway,0,zplane); // no translation
        sky.xAxis = vec3.fromValues(0,0,-1); // model X axis
        sky.yAxis = vec3.fromValues(0,-1,0); // model Y axis 
        sky.scale = distance
        sky.center = inputTriangles.center
        skyBox.push(sky)

        sky = {}
        sky.triangles = inputTriangles
        sky.translation = vec3.fromValues(-1 * distanceAway,0,zplane); // no translation
        sky.xAxis = vec3.fromValues(0,0,-1); // model X axis
        sky.yAxis = vec3.fromValues(0,-1,0); // model Y axis 
        sky.scale = distance
        sky.center = inputTriangles.center
        skyBox.push(sky)

        sky = {}
        sky.triangles = inputTriangles
        sky.translation = vec3.fromValues(10,0,zplane + distanceAway); // no translation
        sky.xAxis = vec3.fromValues(-1,0,0); // model X axis
        sky.yAxis = vec3.fromValues(0,-1,0); // model Y axis 
        sky.scale = distance
        sky.center = inputTriangles.center
        skyBox.push(sky)

        sky = {}
        sky.triangles = inputTriangles
        sky.translation = vec3.fromValues(10,0,zplane - distanceAway); // no translation
        sky.xAxis = vec3.fromValues(-1,0,0); // model X axis
        sky.yAxis = vec3.fromValues(0,-1,0); // model Y axis 
        sky.scale = distance
        sky.center = inputTriangles.center
        skyBox.push(sky)
    }
    



    // inputTriangles = getJSONFile(INPUT_PLAYER_FILE,"triangles");
    player.translation = vec3.fromValues(0,-15,zplane); // no translation
    player.xAxis = vec3.fromValues(0,0,1); // model X axis
    player.yAxis = vec3.fromValues(-1,0,0); // model Y axis 
    player.dead = false
    
    //Set up player
    loadModel(INPUT_PLAYER_FILE, COLORTYPE.TEXTURE)
    player.center = inputTriangles.center  // center point of tri set
    player.triangles = inputTriangles;
    player.triangles.invincible = false
    player.fast = false
    player.powerUpTimer = 0
    if (threeD) {
        player.rotateTheta = player.rotateTheta / 4
        reticles[0].rotateTheta = player.rotateTheta
        loadModel(INPUT_COCKPIT_FILE, COLORTYPE.TEXTURE)
        cockpit.triangles = inputTriangles
        cockpit.center = inputTriangles.center
        cockpit.xAxis = player.xAxis
        cockpit.yAxis =  player.yAxis
        cockpit.scale = .2
        cockpit.translation = vec3.clone(player.translation)
    }


    //Set up misc Textures
    
    //Rainbow Texture
    rainbowTexure.glTexture = gl.createTexture();
    rainbowTexure.image = new Image();
    rainbowTexure.image.loaded = false
    rainbowTexure.image.textureLoaded = false
    rainbowTexure.image.crossOrigin = "anonymous"
    rainbowTexure.image.src = RAINBOW_TEXTURE;
    rainbowTexure.image.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        this.loaded = true;
    });

    //Set up powerups 0=invincible, 1 = fast
    loadModel(INPUT_STAR_FILE, COLORTYPE.TEXTURE)
    let power = {}
    power.center = vec3.fromValues(0,0,0);  // center point of tri set
    power.translation = vec3.fromValues(0,0,zplane); // no translation
    if (threeD) {
        power.xAxis = vec3.fromValues(-1,0,0); // model X axis
        power.yAxis = vec3.fromValues(0,0,-1); // model Y axis 
    } else {
        power.xAxis = vec3.fromValues(-1,0,0); // model X axis
        power.yAxis = vec3.fromValues(0,1,0); // model Y axis 
    }

    
    power.triangles = inputTriangles

    power.active = false;
    power.scale = 5
    power.speed = 7
    power.sound = new Audio(BASE_URL + "audio/marioInvincible.mp3")
    power.sound.volume = 0.2
    power.sound.loop = true
    power.rotateTheta = 2
    powerUps.push(power)

    loadModel(INPUT_SONIC_FILE, COLORTYPE.TEXTURE)
    power = {}
    power.center = vec3.fromValues(0,0,0);  // center point of tri set
    power.translation = vec3.fromValues(0,0,zplane); // no translation
    if (threeD) {
        power.xAxis = vec3.fromValues(-1,0,0); // model X axis
        power.yAxis = vec3.fromValues(0,0,-1); // model Y axis 
    } else {
        power.xAxis = vec3.fromValues(-1,0,0); // model X axis
        power.yAxis = vec3.fromValues(0,1,0); // model Y axis 
    }
    

    power.triangles = inputTriangles
    power.active = false;
    power.scale = 5
    power.speed = 7
    power.sound = new Audio(BASE_URL + "audio/sonic.mp3")
    power.sound.volume = 0.15
    power.sound.loop = true
    power.rotateTheta = 2
    powerUps.push(power)
        
    let enemy
    for (let i = 0; i < numEnemies; i++) {
        loadModel(INPUT_TIE_FILE, COLORTYPE.TEXTURE)
        enemy= {}
        let offset = enemiesPerRow
        if (numEnemies - numEnemies % enemiesPerRow <=  i) {
            offset = numEnemies % enemiesPerRow
        }
        if (threeD) {
            let heightOffset = 30 / enemiesPerColumn
            enemy.translation = vec3.fromValues(-15 +  (i % offset) * (30 / (offset - 1)), 20 , zplane - heightOffset + Math.floor(i / enemiesPerRow)* 4); // no translation
            enemy.formationPos = vec3.fromValues(-15 +  (i % offset) * (30 / (offset - 1)), 20, zplane - heightOffset + Math.floor(i / enemiesPerRow)* 4); // no translation
        } else {
            enemy.translation = vec3.fromValues(-15 +  (i % offset) * (30 / (offset - 1)), 20 - Math.floor(i / enemiesPerRow) * 4, zplane); // no translation
            enemy.formationPos = vec3.fromValues(-15 +  (i % offset) * (30 / (offset - 1)), 20 - Math.floor(i / enemiesPerRow) * 4, zplane); // no translation
        }
        
        enemy.formY = enemy.translation[1]
        enemy.xAxis = vec3.fromValues(0,0,1); // model X axis
        enemy.yAxis = vec3.fromValues(1,0,0); // model Y axis
        enemy.scale = 0.5; // model Y axis
        enemy.center = inputTriangles.center; 
        enemy.triangles = []
        enemy.triangles.push(inputTriangles)
        loadModel(INPUT_TIE2_FILE, COLORTYPE.TEXTURE)
        enemy.currModel = 0;
        enemy.triangles.push(inputTriangles)
        enemy.active = true
        enemy.formation = true
        enemy.nextShot = 0;
        enemy.returnDistance = 0;
        enemy.tieExplosionSound = new Audio(BASE_URL + "audio/tieExplosionAudio1.mp3")
        enemy.tieExplosionSound.volume = 0.2
        enemies.push(enemy)
    }

    //set up enemy bullets
    loadModel(INPUT_ENEMY_BULLET_FILE, COLORTYPE.COLOR)
    // tieTriangles = inputTriangles;
    for (let i = 0; i < numEnemies; i++) {
        enemies[i].bullets = []
        for (let j = 0; j < 3; j++) {
            let bullet = {}
            bullet.triangles = inputTriangles;
            bullet.active = false;
            bullet.fired = false;
            bullet.tieBlasterAudio = new Audio(BASE_URL + 'audio/tieBlasterAudio.mp3');
            bullet.tieBlasterAudio.volume = 0.03
            bullet.xAxis = vec3.fromValues(0,0,1); // model X axis
            bullet.yAxis = vec3.fromValues(-1,0,0); // model Y axis
            bullet.center = inputTriangles.center; 
            bullet.scale = 1; // model Y axis
            enemies[i].bullets.push(bullet)

        }
    }
    
    

    //set up bullets
    loadModel(INPUT_BULLET_FILE, COLORTYPE.COLOR)
    let bullet = player.bullet
    bullet.translation = vec3.fromValues(0,0,0); // no translation
    bullet.xAxis = vec3.fromValues(0,0,1); // model X axis
    bullet.yAxis = vec3.fromValues(-1,0,0); // model Y axis
    bullet.scale = 1; // model Y axis
    bullet.center = inputTriangles.center; 
    bullet.active = false
    // player.bullet = bullet
    bulletTriangles = inputTriangles;
    loading = false
}

// setup the webGL shaders
function setupShaders() {
    
    // define vertex shader in essl using es6 template strings
    var vShaderCode = `
        attribute vec3 aVertexPosition; // vertex position
        attribute vec3 aVertexNormal; // vertex normal
        attribute vec2 aUvPosition; // vertex normal
        
        uniform mat4 umMatrix; // the model matrix
        uniform mat4 upvmMatrix; // the project view model matrix
        uniform float time; // the project view model matrix
        
        varying vec3 vWorldPos; // interpolated world position of vertex
        varying vec2 vUv; // interpolated world position of vertex
        varying vec2 vUv2; // interpolated world position of vertex
        varying vec3 vVertexNormal; // interpolated normal for frag shader

        void main(void) {
            vUv = vec2(aUvPosition[0],aUvPosition[1]);
            float temp = (aUvPosition[0] + time);
            vUv2 = vec2( temp - (floor(temp)),aUvPosition[1]);
            // vertex position
            vec4 vWorldPos4 = umMatrix * vec4(aVertexPosition, 1.0);
            vWorldPos = vec3(vWorldPos4.x,vWorldPos4.y,vWorldPos4.z);
            gl_Position = upvmMatrix * vec4(aVertexPosition, 1.0);

            // vertex normal (assume no non-uniform scale)
            vec4 vWorldNormal4 = umMatrix * vec4(aVertexNormal, 0.0);
            vVertexNormal = normalize(vec3(vWorldNormal4.x,vWorldNormal4.y,vWorldNormal4.z)); 
        }
    `;
    
    // define fragment shader in essl using es6 template strings
    var fShaderCode = `
        precision mediump float; // set float to medium precision

        // eye location
        uniform vec3 uEyePosition; // the eye's position in world
        
        // light properties
        uniform vec3 uLightAmbient; // the light's ambient color
        uniform vec3 uLightDiffuse; // the light's diffuse color
        uniform vec3 uLightSpecular; // the light's specular color
        uniform vec3 uLightPosition; // the light's position
        
        // material properties
        uniform vec3 uAmbient; // the ambient reflectivity
        uniform vec3 uDiffuse; // the diffuse reflectivity
        uniform vec3 uSpecular; // the specular reflectivity
        uniform float uShininess; // the specular exponent
        uniform sampler2D u_texture0;
        uniform sampler2D u_texture1;
        uniform int uColorType;
        uniform float uAlpha;
        
        
        // geometry properties
        varying vec3 vWorldPos; // world xyz of fragment
        varying vec2 vUv;
        varying vec2 vUv2;
        varying vec3 vVertexNormal; // normal of fragment
            
        void main(void) {
        
            // ambient term
            vec3 ambient = uAmbient*uLightAmbient; 
            
            // diffuse term
            vec3 normal = normalize(vVertexNormal); 
            vec3 light = normalize(uLightPosition - vWorldPos);
            float lambert = max(0.0,dot(normal,light));
            vec3 diffuse = uDiffuse*uLightDiffuse*lambert; // diffuse term
            
            // specular term
            vec3 eye = normalize(uEyePosition - vWorldPos);
            vec3 halfVec = normalize(light+eye);
            float highlight = pow(max(0.0,dot(normal,halfVec)),uShininess);
            vec3 specular = uSpecular*uLightSpecular*highlight; // specular term
            
            // combine to output color
            vec3 colorOut = ambient + diffuse + specular; // no specular yet
            //Replace by default
            if (uColorType == 1) {
                gl_FragColor = vec4(colorOut, uAlpha);
            } else if (uColorType == 3) {
                // gl_FragColor =  vec4(colorOut, uAlpha) * texture2D(u_texture0, vUv);
                // gl_FragColor =  vec4(colorOut, uAlpha) * texture2D(u_texture1, vUv);
                gl_FragColor = texture2D(u_texture0, vUv) * texture2D(u_texture1, vUv2);
            } else {
                gl_FragColor =  vec4(colorOut, uAlpha) * texture2D(u_texture0, vUv);
            }


        }
    `;
    
    try {
        var fShader = gl.createShader(gl.FRAGMENT_SHADER); // create frag shader
        gl.shaderSource(fShader,fShaderCode); // attach code to shader
        gl.compileShader(fShader); // compile the code for gpu execution

        var vShader = gl.createShader(gl.VERTEX_SHADER); // create vertex shader
        gl.shaderSource(vShader,vShaderCode); // attach code to shader
        gl.compileShader(vShader); // compile the code for gpu execution
            
        if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) { // bad frag shader compile
            throw "error during fragment shader compile: " + gl.getShaderInfoLog(fShader);  
            gl.deleteShader(fShader);
        } else if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) { // bad vertex shader compile
            throw "error during vertex shader compile: " + gl.getShaderInfoLog(vShader);  
            gl.deleteShader(vShader);
        } else { // no compile errors
            var shaderProgram = gl.createProgram(); // create the single shader program
            gl.attachShader(shaderProgram, fShader); // put frag shader in program
            gl.attachShader(shaderProgram, vShader); // put vertex shader in program
            gl.linkProgram(shaderProgram); // link program into gl context

            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) { // bad program link
                throw "error during shader program linking: " + gl.getProgramInfoLog(shaderProgram);
            } else { // no shader program link errors
                gl.useProgram(shaderProgram); // activate shader program (frag and vert)
                
                // locate and enable vertex attributes
                vPosAttribLoc = gl.getAttribLocation(shaderProgram, "aVertexPosition"); // ptr to vertex pos attrib
                gl.enableVertexAttribArray(vPosAttribLoc); // connect attrib to array
                vUvAttribLoc = gl.getAttribLocation(shaderProgram, "aUvPosition"); // ptr to vertex pos attrib
                gl.enableVertexAttribArray(vUvAttribLoc); // connect attrib to array
                vNormAttribLoc = gl.getAttribLocation(shaderProgram, "aVertexNormal"); // ptr to vertex normal attrib
                gl.enableVertexAttribArray(vNormAttribLoc); // connect attrib to array

                
                
                // locate vertex uniforms
                mMatrixULoc = gl.getUniformLocation(shaderProgram, "umMatrix"); // ptr to mmat
                pvmMatrixULoc = gl.getUniformLocation(shaderProgram, "upvmMatrix"); // ptr to pvmmat
                
                // locate fragment uniforms
                var eyePositionULoc = gl.getUniformLocation(shaderProgram, "uEyePosition"); // ptr to eye position
                var lightAmbientULoc = gl.getUniformLocation(shaderProgram, "uLightAmbient"); // ptr to light ambient
                var lightDiffuseULoc = gl.getUniformLocation(shaderProgram, "uLightDiffuse"); // ptr to light diffuse
                var lightSpecularULoc = gl.getUniformLocation(shaderProgram, "uLightSpecular"); // ptr to light specular
                lightPositionULoc = gl.getUniformLocation(shaderProgram, "uLightPosition"); // ptr to light position
                var textureLocation0 = gl.getUniformLocation(shaderProgram, "u_texture0");
                var textureLocation1 = gl.getUniformLocation(shaderProgram, "u_texture1");
                
                ambientULoc = gl.getUniformLocation(shaderProgram, "uAmbient"); // ptr to ambient
                diffuseULoc = gl.getUniformLocation(shaderProgram, "uDiffuse"); // ptr to diffuse
                specularULoc = gl.getUniformLocation(shaderProgram, "uSpecular"); // ptr to specular
                shininessULoc = gl.getUniformLocation(shaderProgram, "uShininess"); // ptr to shininess
                colorTypeLocation = gl.getUniformLocation(shaderProgram, "uColorType");
                AlphaLocation = gl.getUniformLocation(shaderProgram, "uAlpha");
                TimeLocation = gl.getUniformLocation(shaderProgram, "time");
                


                // pass global constants   into fragment uniforms
                gl.uniform3fv(eyePositionULoc,Eye); // pass in the eye's position
                gl.uniform3fv(lightAmbientULoc,lightAmbient); // pass in the light's ambient emission
                gl.uniform3fv(lightDiffuseULoc,lightDiffuse); // pass in the light's diffuse emission
                gl.uniform3fv(lightSpecularULoc,lightSpecular); // pass in the light's specular emission
                

                gl.uniform1i(textureLocation0, 0);  // texture unit 0
                gl.uniform1i(textureLocation1, 1);  // texture unit 1
            } // end if no shader program link errors
        } // end if no compile errors
    } // end try 
    
    catch(e) {
        console.log(e);
    } // end catch
} // end setup shaders
let globalFrame
// render the loaded model
function renderModels(t, frame) {
    
    globalFrame = frame
    if (debug) {
        timer = Date.now()
    }
    if (controller) {
        controller = navigator.getGamepads()[0]
    }
    if (!vr) {
        currFrame = window.requestAnimationFrame(renderModels); // set up frame render callback
    } else {
        currFrame = frame.session.requestAnimationFrame(renderModels);
    }
    scoreHtml.textContent = score;  
    if (!then) {
        then = t; 
        return
    }
    if (loading) {
        return
    }

    t *= 0.001;                          // convert to seconds
    const deltaTime = t - then;          // compute time since last frame
    then = t;                            // remember time for next frame
    fps = 1 / deltaTime;             // compute frames per second
    if (fps < 1) {
        return
    }
    if (time < 0) {
        time = 0
    }
    time += deltaTime
    timeHtml.textContent = Math.floor(time);  

    secondsTilAttack -= deltaTime
    nextPower -= deltaTime
    modelTimer -= deltaTime
    let pose = null
    

    if (modelTimer < modelTimerMax * -1 && !modelSwitched) {
        currentEnemyModel = (currentEnemyModel + 1) % 2
        modelSwitched = true
    }

    if (modelTimer < modelTimerMax * -2) {
        modelTimer = Math.random() * 10 + 5
        
        modelSwitched = false
    }

    if (nextLevelTimer > 0) {
        nextLevelTimer -= deltaTime
        if (nextLevelTimer < 0) {
            document.getElementById("NextLevel").style.display = "none"
        }
    }

    if (secondsTilAttack <= 0) {
        let ship = Math.floor(Math.random() * numEnemies)
        for (let i = 0; i < numEnemies; i++) {
            let temp =(ship + i ) % numEnemies
            if (!enemies[temp].active || !enemies[temp].formation) {
                continue
            }
            ship = temp;
            enemies[ship].currModel = currentEnemyModel
            enemies[ship].formation = false;
            enemies[ship].speed = vec3.fromValues(0, -1 * enemyMaxSpeed * 4, 0)
            enemies[ship].amplitude = []
            enemies[ship].amplitude.push((Math.random() * 12 + 2 ) - 6)
            enemies[ship].amplitude.push((Math.random() * 12 + 2) -6 )
            enemies[ship].xAxis = vec3.fromValues(0,0,1)
            break;
        }
        if (firstAttack) {
            secondsTilAttack = Math.random() * .5 + .5
            firstAttack = false
        } else {
            secondsTilAttack = Math.random() * 5 + 3
            firstAttack = true
        }
       
    }


    output.textContent = Math.round(fps)
    // construct the model transform matrix, based on model state
    function makeModelTransform(currModel) {
        
        var zAxis = vec3.create(), sumRotation = mat4.create(), temp = mat4.create(), negCtr = vec3.create();

        // move the model to the origin

        mat4.fromTranslation(mMatrix,vec3.negate(negCtr,currModel.center)); 
        
        // scale for highlighting if needed
        if (currModel.scale)
            mat4.multiply(mMatrix,mat4.fromScaling(temp,vec3.fromValues(currModel.scale,currModel.scale,currModel.scale)),mMatrix); // S(1.2) * T(-ctr)
        
        // rotate the model to current interactive orientation
        vec3.normalize(zAxis,vec3.cross(zAxis,currModel.xAxis,currModel.yAxis)); // get the new model z axis
        mat4.set(sumRotation, // get the composite rotation
            currModel.xAxis[0], currModel.yAxis[0], zAxis[0], 0,
            currModel.xAxis[1], currModel.yAxis[1], zAxis[1], 0,
            currModel.xAxis[2], currModel.yAxis[2], zAxis[2], 0,
            0, 0,  0, 1);
        mat4.multiply(mMatrix,sumRotation,mMatrix); // R(ax) * S(1.2) * T(-ctr)
        
        // translate back to model center
        mat4.multiply(mMatrix,mat4.fromTranslation(temp,currModel.center),mMatrix); // T(ctr) * R(ax) * S(1.2) * T(-ctr)

        // translate model to current interactive orientation
        mat4.multiply(mMatrix,mat4.fromTranslation(temp,currModel.translation),mMatrix); // T(pos)*T(ctr)*R(ax)*S(1.2)*T(-ctr)
        
    } // end make model transform


    // render each triangle set
    var currSet; // the tri set and its material properties

    if (!player.dead) { //Controlls
        if (keyPressed.rightPressed || (controller != null && controller.axes[0] > 0.1)) {
            if ((controller && controller.axes[0] > 0.1)) {
                if (Math.abs(player.speed[0]) < player.moveSpeed * controller.axes[0]|| player.speed[0] > 0) {
                    player.speed[0] -= player.acceleration / fps 
                } else {
                    player.speed[0] += player.acceleration / fps 
                }
            } else {
                if (Math.abs(player.speed[0]) < player.moveSpeed || player.speed[0] > 0) {
                    player.speed[0] -= player.acceleration / fps 
                } 
            }
            if (player.xAxis[2] >.94|| player.xAxis[1] > 0) {
                globalRotate += player.rotateTheta
                rotateObject(player, vec3.fromValues(1,0,0), 1)
                if (threeD) {
                    rotateObject(reticles[0], vec3.fromValues(0,0,1), 1)
                }
                
            }
        } else {
            if (player.xAxis[2] <1 && player.xAxis[1] < 0) {
                globalRotate -= player.rotateTheta
                rotateObject(player, vec3.fromValues(1,0,0), -1)
                if (threeD) {
                    rotateObject(reticles[0], vec3.fromValues(0,0,1), -1)
                }
                
            }

            if (player.speed[0] < 0){
                if ( player.speed[0] + 2 *player.acceleration / fps> 0) {
                    player.speed[0] = 0;
                } else {
                    player.speed[0] += player.acceleration / fps
                }

            }
        }

        if (keyPressed.leftPressed || (controller != null && controller.axes[0] < -0.1)) {
            if ((controller && controller.axes[0] < -0.1)) {
                if (Math.abs(player.speed[0]) < player.moveSpeed * -1* controller.axes[0]|| player.speed[0] < 0) {
                    player.speed[0] += player.acceleration / fps 
                } else {
                    player.speed[0] -= player.acceleration / fps 
                }
            } else {
                if (Math.abs(player.speed[0]) < player.moveSpeed || player.speed[0] < 0) {
                    player.speed[0] += player.acceleration / fps 
                } 
            }

            if (player.xAxis[2] >.94 || player.xAxis[1] < 0) {
                globalRotate -= player.rotateTheta
                rotateObject(player, vec3.fromValues(1,0,0), -1)
                if (threeD) {
                    rotateObject(reticles[0], vec3.fromValues(0,0,1), -1)
                }
            }
            
        } else {
            if (player.xAxis[2] <1 && player.xAxis[1] > 0) {
                globalRotate += player.rotateTheta
                rotateObject(player, vec3.fromValues(1,0,0), 1)
                if (threeD) {
                    rotateObject(reticles[0], vec3.fromValues(0,0,1), 1)
                }
                
            }
            if (player.speed[0] > 0) {
                if (player.speed[0] - 2 * player.acceleration  / fps < 0) {
                    player.speed[0] = 0;
                } else {
                    player.speed[0] -= player.acceleration/ fps
                }
            } 
        }
        //Back (Away from enemies)
        
        if (keyPressed.controlPressed|| (controller != null && controller.axes[2] > 0.1)) {
            if ((controller && controller.axes[2] > 0.1)) {
                if (Math.abs(player.speed[1]) < player.moveSpeed * controller.axes[2]|| player.speed[1] > 0) {
                    player.speed[1] -= player.acceleration / fps 
                } else {
                    player.speed[1] += player.acceleration / fps 
                }
            } else {
                if (Math.abs(player.speed[1]) < player.moveSpeed || player.speed[1] > 0) {
                    player.speed[1] -= player.acceleration / fps 
                } 
            }
            // if (player.xAxis[2] >.94|| player.xAxis[1] > 0) {
            //     rotateObject(player, vec3.fromValues(1,0,0), 1)
            // }
        } else {
            if (player.speed[1] < 0){
                if ( player.speed[1] + 2 *player.acceleration / fps> 0) {
                    player.speed[1] = 0;
                } else {
                    player.speed[1] += player.acceleration / fps
                }

            }
        }
        //Up (closer to enemies)
        if (keyPressed.shiftPressed || (controller != null && controller.axes[2] < -0.1)) {
            if ((controller && controller.axes[2] < -0.1)) {
                if (Math.abs(player.speed[1]) < player.moveSpeed * -1* controller.axes[2]|| player.speed[1] < 0) {
                    player.speed[1] += player.acceleration / fps 
                } else {
                    player.speed[1] -= player.acceleration / fps 
                }
            } else {
                if (Math.abs(player.speed[1]) < player.moveSpeed || player.speed[1] < 0) {
                    player.speed[1] += player.acceleration / fps 
                } 
            }

            // if (player.xAxis[2] >.94 || player.xAxis[1] < 0) {
            //     rotateObject(player, vec3.fromValues(1,0,0), -1)
            // }
            
        } else {
            // if (player.xAxis[2] <1 && player.xAxis[1] > 0) {
            //     rotateObject(player, vec3.fromValues(1,0,0), 1)
            // }
            if (player.speed[1] > 0) {
                if (player.speed[1] - 2 * player.acceleration  / fps < 0) {
                    player.speed[1] = 0;
                } else {
                    player.speed[1] -= player.acceleration/ fps
                }
            } 
        }

        
        if (threeD) {
            //down (Z-)
            if (keyPressed.downPressed|| (controller != null && controller.axes[1] > 0.1)) {
                if ((controller && controller.axes[1] > 0.1)) {
                    if (Math.abs(player.speed[2]) < player.moveSpeed * controller.axes[1]|| player.speed[2] > 0) {
                        player.speed[2] -= player.acceleration / fps 
                    } else {
                        player.speed[2] += player.acceleration / fps 
                    }
                } else {
                    if (Math.abs(player.speed[2]) < player.moveSpeed || player.speed[2] > 0) {
                        player.speed[2] -= player.acceleration / fps 
                    } 
                }

            } else {

                if (player.speed[2] < 0){
                    if ( player.speed[2] + 2 *player.acceleration / fps> 0) {
                        player.speed[2] = 0;
                    } else {
                        player.speed[2] += player.acceleration / fps
                    }

                }
            }
            //Up (Z-)
            if (keyPressed.upPressed || (controller != null && controller.axes[1] < -0.1)) {
                if ((controller && controller.axes[2] < -0.1)) {
                    if (Math.abs(player.speed[2]) < player.moveSpeed * -1* controller.axes[1]|| player.speed[2] < 0) {
                        player.speed[2] += player.acceleration / fps 
                    } else {
                        player.speed[2] -= player.acceleration / fps 
                    }
                } else {
                    if (Math.abs(player.speed[2]) < player.moveSpeed || player.speed[2] < 0) {
                        player.speed[2] += player.acceleration / fps 
                    } 
                }

                // if (player.xAxis[2] >.94 || player.xAxis[1] < 0) {
                //     rotateObject(player, vec3.fromValues(1,0,0), -1)
                // }
                
            } else {
                // if (player.xAxis[2] <1 && player.xAxis[1] > 0) {
                //     rotateObject(player, vec3.fromValues(1,0,0), 1)
                // }
                if (player.speed[2] > 0) {
                    if (player.speed[2] - 2 * player.acceleration  / fps < 0) {
                        player.speed[2] = 0;
                    } else {
                        player.speed[2] -= player.acceleration/ fps
                    }
                } 
            }
        }
    }

    //Move player
    if ((player.translation[0]  >= screenEdge.left && player.speed[0] > 0) || (player.translation[0]  <= screenEdge.right && player.speed[0] < 0)) {
        player.speed[0] = 0;
    }

    if ((player.translation[1]  >= screenEdge.right /2 && player.speed[1] > 0) || (player.translation[1]  <= screenEdge.right && player.speed[1] < 0)) {
        player.speed[1] = 0;
    }

    if ((player.translation[2]  >= screenEdge.forward && player.speed[2] > 0) || (player.translation[2]  <= screenEdge.back && player.speed[2] < 0)) {
        player.speed[2] = 0;
    }
    if (player.fast) {
        vec3.add(player.translation, player.translation, vec3.scale(vec3.create(), player.speed, 2/ fps))
    } else {
        vec3.add(player.translation, player.translation, vec3.scale(vec3.create(), player.speed, 1/ fps))
    }
    

    //Move bullet
    if (player.bullet.active) {
        if (player.fast) {
            vec3.add(player.bullet.translation, player.bullet.translation, vec3.fromValues(0,player.bullet.moveSpeed * 2/ fps,0))
        } else {
            vec3.add(player.bullet.translation, player.bullet.translation, vec3.fromValues(0,player.bullet.moveSpeed / fps,0))
        }
        
        let bulletPos = vec3.add(vec3.create(), player.bullet.translation, bulletTriangles.center);

        if (bulletPos[1] > screenEdge.top) {
            player.bullet.active = false;

        }
        for (let i = 0; i < numEnemies; i++) {
            if (!player.bullet.active) {
                break;
            }
            if (enemies[i].active) {
                let enemyPos = vec3.add(vec3.create(), enemies[i].translation, enemies[i].triangles[currentEnemyModel].center);
                //Check if collistion with enemy
                //Set bullet to not active if collision
                if (vec3.distance(enemyPos, bulletPos)  < 1.3) {
                    numEnemiesAlive--
                    
                    enemies[i].active = false;
                    player.bullet.active = false;
                    score += scoreDelta;
                    let ship = enemies[i]
                    if (ship.formation) {
                        ship.currModel = currentEnemyModel
                    }
                    
                    ship.deathTimer = 2
                    if (!mute) {
                        ship.tieExplosionSound.play()
                    }
                    for (var whichTriSet=0; whichTriSet<ship.triangles[ship.currModel].numTriangleSets; whichTriSet++) {
                        // ship.triangles[whichTriSet].direction = vec3.normalize(vec3.create(),vec3.subtract(vec3.create(), ship.triangles[whichTriSet].center, ship.triangles.center))
                        ship.triangles[ship.currModel][whichTriSet].direction = vec3.normalize(vec3.create(), vec3.fromValues(Math.random(),Math.random(),Math.random()))
                        ship.triangles[ship.currModel][whichTriSet].speed = (Math.random() * 10 - 5 )
                        if (ship.triangles[ship.currModel][whichTriSet].speed > 0) {
                            ship.triangles[ship.currModel][whichTriSet].speed += 5
                        } else {
                            ship.triangles[ship.currModel][whichTriSet].speed -= 5
                        }
                        ship.triangles[ship.currModel][whichTriSet].translation = vec3.clone(ship.translation)
                    }

                    
                    break;
                }
                
            }
        }
    


    } else {
        if ((keyPressed.space || (controller != null && controller.buttons[0].pressed)) && !player.dead) {
            player.bullet.active = true;
            player.bullet.translation = vec3.add(vec3.create(), vec3.clone(player.translation), vec3.fromValues(-.3,1,0))
            keyPressed.space = false
            if (!mute) {
                let temp = new Audio(BASE_URL + "audio/xWingFire1.mp3")
                temp.volume = 0.2
                temp.play()
            }

        }
    }

    //Move enemies
    if (true) {
    if (enemyOffset > 10 && (Math.abs(enemySpeed) < enemyMaxSpeed || enemySpeed > 0)) {
        enemySpeed -= enemyAcceleration / fps
    } else if (enemyOffset < -10 && (Math.abs(enemySpeed) < enemyMaxSpeed || enemySpeed < 0)) {
        enemySpeed += enemyAcceleration / fps
    }
    var newRotation = mat4.create();
    let tempX = vec3.fromValues(0,0,1); // model X axis
    let tempY = vec3.fromValues(1,0,0); // model Y axis
    if (modelTimer < 0) {
        // modelTimer = 50
        // currentEnemyModel = (currentEnemyModel + 1) % 2
        if (modelTimer < -1 * modelTimerMax) {
            //Slowing down
            mat4.fromRotation(newRotation,(enemySpeed*20 + Math.pow(2* modelTimerMax + modelTimer  ,4)  )/144,tempY); // get a rotation matrix around passed axis
        } else {
            //Speeding up
            mat4.fromRotation(newRotation,(enemySpeed*20 + Math.pow(-1 * modelTimer,4)  )/ 144,tempY); // get a rotation matrix around passed axis
        }
        
    } else {
        mat4.fromRotation(newRotation,enemySpeed*20/144,tempY); // get a rotation matrix around passed axis
    }
    
    enemyOffset += enemySpeed /fps
    for (let i = 0; i < numEnemies; i++) {
        if (enemies[i].active) {
            if (enemies[i].offset > 0) {
                enemies[i].offset += enemies[i].speed[1] / fps
                enemies[i].offset += enemies[i].speed[1] / fps
            } else {
                enemies[i].offset = 0
            }
            enemies[i].formationPos[0] += enemySpeed / fps
            enemies[i].formationPos[1] = enemies[i].offset + enemies[i].formY
            if (enemies[i].formation) {
                enemies[i].translation = vec3.clone(enemies[i].formationPos)
                vec3.transformMat4(enemies[i].xAxis,tempX,newRotation); // rotate model x axis tip
            }
        }
    }
    }

    let playerPos = vec3.add(vec3.create(), player.center, player.translation)

    //Move attacking enemies
    for (let i = 0; i < numEnemies; i++) {
        if (!enemies[i].active || enemies[i].formation){
            continue
        }
        let ship = enemies[i]
        if (ship.speed[0] > ship.amplitude[0] && ship.amplitude[0] > 0 || ship.speed[0] < ship.amplitude[0] && ship.amplitude[0] < 0) {
            ship.amplitude[0] *= -1
        }
       
        if (ship.speed[0] < ship.amplitude[0]) {
            ship.speed[0] += enemyAcceleration * 2 / fps
        } else {
            ship.speed[0] -= enemyAcceleration * 2 / fps
        }
        if (threeD) {
            if (ship.speed[2] > ship.amplitude[1] && ship.amplitude[1] > 0 || ship.speed[2] < ship.amplitude[1] && ship.amplitude[1] < 0) {
                ship.amplitude[1] *= -1
            }
            if (ship.speed[2] < ship.amplitude[1]) {
                ship.speed[2] += enemyAcceleration * 2 / fps
            } else {
                ship.speed[2] -= enemyAcceleration * 2 / fps
            }
            ship.translation[2] += ship.speed[2] / fps
        }

        ship.translation[0] += ship.speed[0] / fps
        
        // ship.translation[0] += enemySpeed / fps
        ship.translation[1] += ship.speed[1] / fps
        let shipPos = vec3.add(vec3.create(),ship.translation, ship.center)
        //Check for collision with player
        if (vec3.distance(shipPos, playerPos) < 3 && !player.invincible && !player.dead) {
            gameOver()
                    
            enemies[i].active = false;
            if (ship.formation) {
                ship.currModel = currentEnemyModel
            }
            
            ship.deathTimer = 2
            if (!mute) {
                ship.tieExplosionSound.play()
            }
            for (var whichTriSet=0; whichTriSet<ship.triangles[ship.currModel].numTriangleSets; whichTriSet++) {
                // ship.triangles[whichTriSet].direction = vec3.normalize(vec3.create(),vec3.subtract(vec3.create(), ship.triangles[whichTriSet].center, ship.triangles.center))
                ship.triangles[ship.currModel][whichTriSet].direction = vec3.normalize(vec3.create(), vec3.fromValues(Math.random(),Math.random(),Math.random()))
                ship.triangles[ship.currModel][whichTriSet].speed = (Math.random() * 10 - 5 )
                if (ship.triangles[ship.currModel][whichTriSet].speed > 0) {
                    ship.triangles[ship.currModel][whichTriSet].speed += 5
                } else {
                    ship.triangles[ship.currModel][whichTriSet].speed -= 5
                }
                ship.triangles[ship.currModel][whichTriSet].translation = vec3.clone(ship.translation)
            }
            
        }

        if (shipPos[0]  > screenEdge.left + 5 ||   shipPos[0]  < screenEdge.right -5 || shipPos[1]  < screenEdge.bottom || shipPos[1]  > screenEdge.top) {
            ship.formation = true
            ship.nextShot = .2
            ship.offset = screenEdge.top - ship.formationPos[1]
            for (let j = 0; j < 3; j++) {
                ship.bullets[j].fired = false
            }
        }

        //Fire a shot
        if (ship.nextShot <= 0 && ship.translation[1] < 20 - Math.floor(numEnemies / enemiesPerRow) * 4) {
            //Fire shot
            let j = 0;
            for ( let h = 0; h< 3; h++) {
                
                if (!ship.bullets[h].fired) {
                    j = h
                    break;
                }

            }
            if (j == 2) {
                ship.nextShot = 1000
            } else {
                ship.nextShot = .25
            }
            
            let shot = ship.bullets[j]
            if (!mute) {
                shot.tieBlasterAudio.play()
            }
            
            ship.bullets[j].fired = true;
            shot.translation = vec3.clone(ship.translation)
            shot.direction = vec3.fromValues(0,-1,0)
            let temp = vec3.create()
            vec3.normalize(temp, vec3.subtract(temp, vec3.add(vec3.create(), player.center, player.translation), vec3.add(vec3.create(), shot.center, shot.translation)))
            let temp2 = temp[0] * ((-1 * enemyBulletSpeed) / temp[1])

            temp2 = Math.min( temp2, 1)
            temp2 = Math.max( temp2, -1)
            let temp3 = 0
            if (threeD) {
                temp3 = temp[2] * ((-1 * enemyBulletSpeed) / temp[1])

                temp3 = Math.min( temp3, 1)
                temp3 = Math.max( temp3, -1)

            }
            shot.speed = vec3.fromValues(temp2 , -1*enemyBulletSpeed,temp3)  
            shot.active = true;

        }

        ship.nextShot -= deltaTime
    }
    //Move Enemy Bullets
    for (let i = 0; i < numEnemies; i++) {
        let ship = enemies[i]
        for (let j = 0; j < 3; j++) {
            if (!ship.bullets[j].active) {
                continue
            }
            vec3.add(ship.bullets[j].translation,ship.bullets[j].translation, vec3.fromValues(ship.bullets[j].speed[0] / fps,ship.bullets[j].speed[1]/ fps,ship.bullets[j].speed[2] / fps))
            let shot = ship.bullets[j]
            let bulletPos = vec3.add(vec3.create(),shot.translation, shot.center)
            //Check for collision with player
            if (vec3.distance(bulletPos, playerPos) < 2.5 && !player.invincible && !player.dead) {
                gameOver()
                shot.active = false
            }

            if (bulletPos[0]  > screenEdge.left + 5 ||   bulletPos[0]  < screenEdge.right -5 || bulletPos[1]  < screenEdge.bottom || bulletPos[1]  > screenEdge.top) {
                shot.active = false;
            }
        }
    }

    //Animate dead ships
    for (let i = 0; i < numEnemies; i++) {
        if (enemies[i].active || enemies[i].deathTimer < 0) {
            continue
        }
        enemies[i].deathTimer -= deltaTime
        for (var whichTriSet=0; whichTriSet<enemies[i].triangles[enemies[i].currModel].numTriangleSets; whichTriSet++) {
            let set = enemies[i].triangles[enemies[i].currModel][whichTriSet];

            vec3.add(set.translation, set.translation, vec3.scale(vec3.create(), set.direction, set.speed / fps))
        }
        if (numEnemiesAlive == 0) {
            document.getElementById("NextLevel").style.display = "block"
        }
        if (enemies[i].deathTimer < 0 && numEnemiesAlive == 0) {
            finishLevel()
        }

    }

    if (player.dead && !threeD) {
        player.deathTimer -= deltaTime
        for (var whichTriSet=0; whichTriSet<player.triangles.numTriangleSets; whichTriSet++) {
            let set = player.triangles[whichTriSet];
            vec3.add(set.translation, set.translation, vec3.scale(vec3.create(), set.direction, set.speed / fps))
        }
    }

    if (player.dead && threeD) {
        player.deathTimer -= deltaTime
        for (var whichTriSet=0; whichTriSet<cockpit.triangles.numTriangleSets; whichTriSet++) {
            let set = cockpit.triangles[whichTriSet];
            vec3.add(set.translation, set.translation, vec3.scale(vec3.create(), set.direction, set.speed / fps))
        }
    }


    //Spawn Powerups
    if (nextPower < 0  ) {
        let chosen = Math.floor(Math.random() * powerUps.length)
        let power = powerUps[chosen]
        power.active = true
        
        power.translation[0] = Math.random() * (Math.abs(screenEdge.right) + screenEdge.left - 5) + screenEdge.right
        power.translation[1] = screenEdge.top
        if (threeD) {
            power.translation[2] = Math.random() * (Math.abs(screenEdge.right) + screenEdge.left - 5) + screenEdge.right + zplane
        }
        
        nextPower = Math.random() * 10 + 25
    }
    if ((!powerUps[0].active  && !powerUps[1].active) && ( keyPressed.iPressed|| keyPressed.fPressed)) {
        let chosen
        if (keyPressed.iPressed) {
            chosen = 0
        }
        if (keyPressed.fPressed) {
            chosen = 1
        }
        let power= powerUps[chosen]
        power.active = true
        power.translation[0] = Math.random() * (Math.abs(screenEdge.right) + screenEdge.left - 5) + screenEdge.right
        power.translation[1] = screenEdge.top
        if (threeD) {
            power.translation[2] = Math.random() * (Math.abs(screenEdge.right) + screenEdge.left - 5) + screenEdge.right + zplane
        }
        nextPower = Math.random() * 10 + 25
    }
    //Move powerUps
    //Move invincibility star
    for (let i = 0; i < powerUps.length; i++) {
        if (powerUps[i].active) {
            let power = powerUps[i]
            rotateObject(power, vec3.fromValues(0,1,0), 1)
            
            power.translation[1] -= power.speed/fps;
            let powerPos = vec3.add(vec3.create(), power.center, power.translation)
            //Touch player
            if (vec3.distance(powerPos, playerPos) < 3) {
                power.active = false;
                switch (i) {
                    case 0: //Star power
                        if (!mute) {
                            power.sound.play()
                            backgroundMusic.pause()
                        }
                        
                        player.invincible = true
                        player.powerUpTimer = 10;
                        player.colorType = COLORTYPE.RAINBOW
                        player.triangles.colorType = COLORTYPE.RAINBOW
                        if (threeD) {
                            cockpit.colorType = COLORTYPE.RAINBOW
                            cockpit.triangles.colorType = COLORTYPE.RAINBOW
                        }
                        break;
                    case 1: //Fast
                        if (!mute) {
                            power.sound.currentTime = 0
                            power.sound.play()
                            backgroundMusic.pause()
                        }
                        
                        player.fast = true
                        player.powerUpTimer = 15;
                        break;
                }
                break;                
            }
        }
    }
    
    //Handle effects
    if (player.powerUpTimer > 0) {
        player.powerUpTimer -= deltaTime
        if (player.powerUpTimer < 0) {
            if (player.invincible) {
                player.invincible = false
                powerUps[0].sound.pause()
                if (!mute) {
                    backgroundMusic.play()
                }
                player.triangles.colorType = COLORTYPE.TEXTURE
                if (threeD) {
                    cockpit.colorType = COLORTYPE.TEXTURE
                    cockpit.triangles.colorType = COLORTYPE.TEXTURE
                }
            } else if (player.fast) {
                player.fast = false
                powerUps[1].sound.pause()
                if (!mute) {
                    backgroundMusic.play()
                }
            }

            //TODO Stop music
        }
    }
    // var hMatrix = mat4.create(); // handedness matrix
    var pMatrix = mat4.create(); // projection matrix
    var vMatrix = mat4.create(); // view matrix
    var mMatrix = mat4.create(); // model matrix
    var pvMatrix = mat4.create(); // hand * proj * view matrices
    var pvmMatrix = mat4.create(); // hand * proj * view * model matrices
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // clear frame/depth buffers
    // player.xAxis = vec3.fromValues(0,0,1); // model X axis
    // player.yAxis = vec3.fromValues(-1,0,0); // model Y axis 
    // rotate(player, vec3.fromValues(1,0,0), globalRotate)
    
    // player.xAxis[0] += .1 / fps
    if (threeD) {
        // rotate(player, vec3.fromValues(1,0,0), globalRotate)
        // cockpit.xAxis = player.xAxis
        // cockpit.yAxis =  player.yAxis
        Eye = vec3.add(vec3.create(), player.center, player.translation); // eye position in world space
        Center = vec3.add( vec3.create(), Eye, vec3.fromValues(0,.5,0)); // view direction in world space
        if (!vr) {
            Up[0] = player.xAxis[1]; // view up vector in world space
            Up[1] = player.xAxis[0]; // view up vector in world space
            Up[2] = -1 * player.xAxis[2]; // view up vector in world space
        } else {
            Up = vec3.fromValues(0,0,-1)
        }
        
        lightPosition = vec3.clone(Eye)
        gl.uniform3fv(lightPositionULoc,lightPosition); // pass in the light's position
        cockpit.translation = vec3.clone(player.translation)
        cockpit.translation[0] -= 1.5
        cockpit.translation[1] -= .7
        cockpit.translation[2] += .1

        reticles[0].translation = vec3.clone(Eye)
        reticles[0].translation[0] += 0
        reticles[0].translation[1] += .75

        reticles[1].translation = vec3.clone(Eye)
        reticles[1].translation[0] += 0
        reticles[1].translation[1] += 1
        // reticles[0].translation[2] 
    }
    


        
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.depthMask(true)
    if (vr) {
        cockpit.translation[1] += .1
        // cockpit.translation[2]
        const session = frame.session; // frame is a frame handling object - it's used to get frame sessions, frame WebGL layers and some more things
        // session.requestAnimationFrame(onSessionFrame); // we simply set our animation frame function to be this function again
        pose = frame.getViewerPose(xrRefSpace); // gets the pose of the headset, relative to the previously gotten referance space
    
        if(pose) { // if the pose was possible to get (if the headset responds)
            let glLayer = session.renderState.baseLayer; // get the WebGL layer (it contains some important information we need)
            // let test = gl.createRenderbuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, glLayer.framebuffer); // sets the framebuffer (drawing target of WebGL) to be our WebXR display's framebuffer
            let theta, axis
            if (pose.transform.orientation.w ==1 && pose.transform.orientation.x == 0&& pose.transform.orientation.y == 0 &&pose.transform.orientation.z == 0) {
                theta = 0;
                axis = vec3.fromValues(1,0,0)
            } else {
                theta = 2 * Math.acos(pose.transform.orientation.w)
                axis = vec3.fromValues(
                    -1 *pose.transform.orientation.x / Math.sin(theta/2),
                    -1 * pose.transform.orientation.z / Math.sin(theta/2),
                    -1 *pose.transform.orientation.y / Math.sin(theta/2),
                )
            }
            var newRotation = mat4.create();
            mat4.fromRotation(newRotation,theta,axis); // get a rotation matrix around passed axis
            vec3.transformMat4(Up,Up,newRotation); // rotate model x axis tip
            // axis = vec3.fromValues(
            //     -1 *pose.transform.orientation.x / Math.sin(theta/2),
            //     -1 * pose.transform.orientation.z / Math.sin(theta/2),
            //     -1 *pose.transform.orientation.y / Math.sin(theta/2),
            // )
            // mat4.fromRotation(newRotation,theta,axis);

            // rotate(reticles[0], axis, globalRotate)
            // rotate(reticles[1], axis, globalRotate)
            let forward = vec3.create()
            
            // let forward = vec3.fromValues(0,1,0)
            vec3.transformMat4(forward,vec3.fromValues(0,1,0),newRotation); // rotate model x axis tip

            for(let view of pose.views) { // we go through every single view out of our camera's views
                mat4.perspective(pMatrix,0.5*Math.PI,1,0.1,100); // create projection matrix
                if (headsetOffset["right"] == null) {
                    headsetOffset["right"] = vec3.fromValues(view.transform.position.x, view.transform.position.z,view.transform.position.y)
                }
                let currPos = vec3.add(vec3.create(), vec3.fromValues(-1 * view.transform.position.x, -1 * view.transform.position.z,-1 * view.transform.position.y), headsetOffset["right"])


                Eye = vec3.add(vec3.create(), player.center, player.translation); // eye position in world space
                vec3.add(Eye, Eye, currPos); // eye position in world space
                
                Center = vec3.add( vec3.create(), Eye, forward); // view direction in world space
                // pvMatrix = mat4.fromValues(...view.projectionMatrix)
                mat4.lookAt(vMatrix,Eye,Center,Up); // create view matrix
                // mat4.multiply(pvMatrix,pvMatrix,pMatrix); // projection
                pvMatrix = mat4.fromValues(...view.projectionMatrix)
                mat4.multiply(pvMatrix,pvMatrix,vMatrix); // projection * view
                
            	let viewport = glLayer.getViewport(view); // we get the viewport of our view (the place on the screen where things will be drawn)
            	gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height); // we set our viewport appropriately
                renderBlock(view.eye)
                // gl.framebufferRenderbuffer(  gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, test) 
                
            }
        }
        pMatrix = mat4.create(); // projection matrix
        vMatrix = mat4.create(); // view matrix
        mMatrix = mat4.create(); // model matrix
        pvMatrix = mat4.create(); // hand * proj * view matrices
        pvmMatrix = mat4.create(); // hand * proj * view * model matrices
    } 
            // set up projection and view
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // if (threeD) {
    //     // Eye = vec3.add(vec3.create(), player.center, player.translation); // eye position in world space
    //     // Center = vec3.add( vec3.create(), Eye, vec3.fromValues(0,.5,0)); // view direction in world space
    //     // Up[0] = player.xAxis[1]; // view up vector in world space
    //     // Up[1] = player.xAxis[0]; // view up vector in world space
    //     // Up[2] = -1 * player.xAxis[2]; // view up vector in world space
    //     lightPosition = vec3.clone(Eye)
    //     // gl.uniform3fv(lightPositionULoc,lightPosition); // pass in the light's position
    //     cockpit.translation = vec3.clone(player.translation)
    //     cockpit.translation[0] -= 1.5
    //     cockpit.translation[1] -= .7
    //     cockpit.translation[2] += .1
        
    // }

          // Set the viewport to the whole canvas
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    // mat4.fromScaling(hMatrix,vec3.fromValues(-1,1,1)); // create handedness matrix
    mat4.perspective(pMatrix,0.5*Math.PI,1,0.1,700); // create projection matrix
    mat4.lookAt(vMatrix,Eye,Center,Up); // create view matrix
    mat4.multiply(pvMatrix,pvMatrix,pMatrix); // projection
    mat4.multiply(pvMatrix,pvMatrix,vMatrix); // projection * view
    renderBlock()

    
    
    function renderBlock(eye = null) {
        gl.uniform1f(TimeLocation,time);
                //Render Background
        makeModelTransform(backgroundImage);
        renderObject(backgroundImage.triangles)

        for (let i = 0; i < skyBox.length; i++) {
            makeModelTransform(skyBox[i]);
            renderObject(skyBox[i].triangles)
        }

        //Render player
        if (!threeD) {
            if (player.dead && player.deathTimer > 0) {
                for (var whichTriSet=0; whichTriSet<player.triangles.numTriangleSets; whichTriSet++) {
                    currModel = player.triangles[whichTriSet]
                    currSet = player.triangles[whichTriSet]
                    var zAxis = vec3.create(), sumRotation = mat4.create(), temp = mat4.create(), negCtr = vec3.create();

                    // move the model to the origin

                    mat4.fromTranslation(mMatrix,vec3.negate(negCtr,player.center)); 
                    
                    // rotate the model to current interactive orientation
                    vec3.normalize(zAxis,vec3.cross(zAxis,player.xAxis,player.yAxis)); // get the new model z axis
                    mat4.set(sumRotation, // get the composite rotation
                        player.xAxis[0], player.yAxis[0], zAxis[0], 0,
                        player.xAxis[1], player.yAxis[1], zAxis[1], 0,
                        player.xAxis[2], player.yAxis[2], zAxis[2], 0,
                        0, 0,  0, 1);
                    mat4.multiply(mMatrix,sumRotation,mMatrix); // R(ax) * S(1.2) * T(-ctr)
                    
                    // translate back to model center
                    mat4.multiply(mMatrix,mat4.fromTranslation(temp,player.center),mMatrix); // T(ctr) * R(ax) * S(1.2) * T(-ctr)

                    // translate model to current interactive orientation
                    mat4.multiply(mMatrix,mat4.fromTranslation(temp,currModel.translation),mMatrix); // T(pos)*T(ctr)*R(ax)*S(1.2)*T(-ctr)

            
                    // currSet = triangles[whichTriSet];
                    // make model transform, add to view project
                    mat4.multiply(pvmMatrix,pvMatrix,mMatrix); // project * view * model
                    gl.uniformMatrix4fv(mMatrixULoc, false, mMatrix); // pass in the m matrix
                    gl.uniformMatrix4fv(pvmMatrixULoc, false, pvmMatrix); // pass in the hpvm matrix
                    
                    // reflectivity: feed to the fragment shader
                    gl.uniform3fv(ambientULoc,currSet.material.ambient); // pass in the ambient reflectivity
                    gl.uniform3fv(diffuseULoc,currSet.material.diffuse); // pass in the diffuse reflectivity
                    gl.uniform3fv(specularULoc,currSet.material.specular); // pass in the specular reflectivity
                    gl.uniform1f(shininessULoc,currSet.material.n); // pass in the specular exponent
                    gl.uniform1f(AlphaLocation,currSet.material.alpha);
                    gl.uniform1i(colorTypeLocation, player.triangles.colorType);
                    // vertex buffer: activate and feed into vertex shader
                    gl.bindBuffer(gl.ARRAY_BUFFER,player.triangles.vertexBuffers[whichTriSet]); // activate
                    gl.vertexAttribPointer(vPosAttribLoc,3,gl.FLOAT,false,0,0); // feed
        
                    gl.bindBuffer(gl.ARRAY_BUFFER,uvBuffers[whichTriSet]); // activate 
        
                    gl.vertexAttribPointer(vUvAttribLoc,2,gl.FLOAT,false,0,0); // feed
                    
                    gl.activeTexture(gl.TEXTURE0);
                    gl.bindTexture(gl.TEXTURE_2D, currSet.glTexture);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                    
                    //TODO only make the texture once
                    if (!currSet.image.textureLoaded) {
                        if (!currSet.image.loaded) {
                            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                                new Uint8Array([0, 0, 255, 255]));
                        } else {
                            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, currSet.image);
                            gl.generateMipmap(gl.TEXTURE_2D);
                            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST );
                            currSet.image.textureLoaded = true
                        }
                        
                    }
                    //TODO HERE
                    gl.bindBuffer(gl.ARRAY_BUFFER,player.triangles.uvBuffers[whichTriSet]); // activate that buffer
                    
                    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(player.triangles.glUvs),gl.STATIC_DRAW);
                    gl.vertexAttribPointer(vUvAttribLoc,2,gl.FLOAT,false,0,0); // feed
                    
        
                    gl.bindBuffer(gl.ARRAY_BUFFER,player.triangles.normalBuffers[whichTriSet]); // activate
                    gl.vertexAttribPointer(vNormAttribLoc,3,gl.FLOAT,false,0,0); // feed
                    // triangle buffer: activate and render
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,player.triangles.triangleBuffers[whichTriSet]); // activate
                    gl.drawElements(gl.TRIANGLES,3*player.triangles.triSetSizes[whichTriSet],gl.UNSIGNED_SHORT,0); // render
                    
                } // end for each triangle set
            }else {
                makeModelTransform(player);
                renderObject(player.triangles)
            }
            
        } else {
            if (player.dead && player.deathTimer > 0) {
                for (var whichTriSet=0; whichTriSet<cockpit.triangles.numTriangleSets; whichTriSet++) {
                    currModel = cockpit.triangles[whichTriSet]
                    currSet = cockpit.triangles[whichTriSet]
                    var zAxis = vec3.create(), sumRotation = mat4.create(), temp = mat4.create(), negCtr = vec3.create();

                    // move the model to the origin

                    mat4.fromTranslation(mMatrix,vec3.negate(negCtr,cockpit.center)); 
                    
                    // scale for highlighting if needed
                    mat4.multiply(mMatrix,mat4.fromScaling(temp,vec3.fromValues(cockpit.scale,cockpit.scale,cockpit.scale)),mMatrix); // S(1.2) * T(-ctr)
                    
                    // rotate the model to current interactive orientation
                    vec3.normalize(zAxis,vec3.cross(zAxis,cockpit.xAxis,cockpit.yAxis)); // get the new model z axis
                    mat4.set(sumRotation, // get the composite rotation
                        cockpit.xAxis[0], cockpit.yAxis[0], zAxis[0], 0,
                        cockpit.xAxis[1], cockpit.yAxis[1], zAxis[1], 0,
                        cockpit.xAxis[2], cockpit.yAxis[2], zAxis[2], 0,
                        0, 0,  0, 1);
                    mat4.multiply(mMatrix,sumRotation,mMatrix); // R(ax) * S(1.2) * T(-ctr)
                    
                    // translate back to model center
                    mat4.multiply(mMatrix,mat4.fromTranslation(temp,cockpit.center),mMatrix); // T(ctr) * R(ax) * S(1.2) * T(-ctr)

                    // translate model to current interactive orientation
                    mat4.multiply(mMatrix,mat4.fromTranslation(temp,currModel.translation),mMatrix); // T(pos)*T(ctr)*R(ax)*S(1.2)*T(-ctr)

            
                    // currSet = triangles[whichTriSet];
                    // make model transform, add to view project
                    mat4.multiply(pvmMatrix,pvMatrix,mMatrix); // project * view * model
                    gl.uniformMatrix4fv(mMatrixULoc, false, mMatrix); // pass in the m matrix
                    gl.uniformMatrix4fv(pvmMatrixULoc, false, pvmMatrix); // pass in the hpvm matrix
                    
                    // reflectivity: feed to the fragment shader
                    gl.uniform3fv(ambientULoc,currSet.material.ambient); // pass in the ambient reflectivity
                    gl.uniform3fv(diffuseULoc,currSet.material.diffuse); // pass in the diffuse reflectivity
                    gl.uniform3fv(specularULoc,currSet.material.specular); // pass in the specular reflectivity
                    gl.uniform1f(shininessULoc,currSet.material.n); // pass in the specular exponent
                    gl.uniform1f(AlphaLocation,currSet.material.alpha);
                    gl.uniform1i(colorTypeLocation, cockpit.triangles.colorType);
                    // vertex buffer: activate and feed into vertex shader
                    gl.bindBuffer(gl.ARRAY_BUFFER,cockpit.triangles.vertexBuffers[whichTriSet]); // activate
                    gl.vertexAttribPointer(vPosAttribLoc,3,gl.FLOAT,false,0,0); // feed
        
                    gl.bindBuffer(gl.ARRAY_BUFFER,uvBuffers[whichTriSet]); // activate 
        
                    gl.vertexAttribPointer(vUvAttribLoc,2,gl.FLOAT,false,0,0); // feed
                    
                    gl.activeTexture(gl.TEXTURE0);
                    gl.bindTexture(gl.TEXTURE_2D, currSet.glTexture);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                    
                    //TODO only make the texture once
                    if (!currSet.image.textureLoaded) {
                        if (!currSet.image.loaded) {
                            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                                new Uint8Array([0, 0, 255, 255]));
                        } else {
                            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, currSet.image);
                            gl.generateMipmap(gl.TEXTURE_2D);
                            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST );
                            currSet.image.textureLoaded = true
                        }
                        
                    }
                    //TODO HERE
                    gl.bindBuffer(gl.ARRAY_BUFFER,cockpit.triangles.uvBuffers[whichTriSet]); // activate that buffer
                    
                    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(cockpit.triangles.glUvs),gl.STATIC_DRAW);
                    gl.vertexAttribPointer(vUvAttribLoc,2,gl.FLOAT,false,0,0); // feed
                    
        
                    gl.bindBuffer(gl.ARRAY_BUFFER,cockpit.triangles.normalBuffers[whichTriSet]); // activate
                    gl.vertexAttribPointer(vNormAttribLoc,3,gl.FLOAT,false,0,0); // feed
                    // triangle buffer: activate and render
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,cockpit.triangles.triangleBuffers[whichTriSet]); // activate
                    gl.drawElements(gl.TRIANGLES,3*cockpit.triangles.triSetSizes[whichTriSet],gl.UNSIGNED_SHORT,0); // render
                    
                } // end for each triangle set
            } else {
                makeModelTransform(cockpit);
                renderObject(cockpit.triangles)
            }
            
        }
        

        //Render enemies
        bulkRenderTies()
        for (let i = 0; i < numEnemies; i++) {
            if (enemies[i].active) {
                
                if (enemies[i].formation || enemies[i].currModel == currentEnemyModel) {
                    // renderObject(enemies[i].triangles[currentEnemyModel])
                } else {
                    makeModelTransform(enemies[i]);
                    renderObject(enemies[i].triangles[enemies[i].currModel])
                }
                
            } else if (enemies[i].deathTimer > 0 ) {
                for (var whichTriSet=0; whichTriSet<enemies[i].triangles[enemies[i].currModel].numTriangleSets; whichTriSet++) {
                    currModel = enemies[i].triangles[enemies[i].currModel][whichTriSet]
                    currSet = enemies[i].triangles[enemies[i].currModel][whichTriSet]
                    var zAxis = vec3.create(), sumRotation = mat4.create(), temp = mat4.create(), negCtr = vec3.create();

                    // move the model to the origin

                    mat4.fromTranslation(mMatrix,vec3.negate(negCtr,enemies[i].center)); 
                    
                    // scale for highlighting if needed
                    mat4.multiply(mMatrix,mat4.fromScaling(temp,vec3.fromValues(enemies[i].scale,enemies[i].scale,enemies[i].scale)),mMatrix); // S(1.2) * T(-ctr)
                    
                    // rotate the model to current interactive orientation
                    vec3.normalize(zAxis,vec3.cross(zAxis,enemies[i].xAxis,enemies[i].yAxis)); // get the new model z axis
                    mat4.set(sumRotation, // get the composite rotation
                        enemies[i].xAxis[0], enemies[i].yAxis[0], zAxis[0], 0,
                        enemies[i].xAxis[1], enemies[i].yAxis[1], zAxis[1], 0,
                        enemies[i].xAxis[2], enemies[i].yAxis[2], zAxis[2], 0,
                        0, 0,  0, 1);
                    mat4.multiply(mMatrix,sumRotation,mMatrix); // R(ax) * S(1.2) * T(-ctr)
                    
                    // translate back to model center
                    mat4.multiply(mMatrix,mat4.fromTranslation(temp,enemies[i].center),mMatrix); // T(ctr) * R(ax) * S(1.2) * T(-ctr)

                    // translate model to current interactive orientation
                    mat4.multiply(mMatrix,mat4.fromTranslation(temp,currModel.translation),mMatrix); // T(pos)*T(ctr)*R(ax)*S(1.2)*T(-ctr)

                
                    
                    // currSet = triangles[whichTriSet];
                    // make model transform, add to view project
                    mat4.multiply(pvmMatrix,pvMatrix,mMatrix); // project * view * model
                    gl.uniformMatrix4fv(mMatrixULoc, false, mMatrix); // pass in the m matrix
                    gl.uniformMatrix4fv(pvmMatrixULoc, false, pvmMatrix); // pass in the hpvm matrix
                    
                    // reflectivity: feed to the fragment shader
                    gl.uniform3fv(ambientULoc,currSet.material.ambient); // pass in the ambient reflectivity
                    gl.uniform3fv(diffuseULoc,currSet.material.diffuse); // pass in the diffuse reflectivity
                    gl.uniform3fv(specularULoc,currSet.material.specular); // pass in the specular reflectivity
                    gl.uniform1f(shininessULoc,currSet.material.n); // pass in the specular exponent
                    gl.uniform1f(AlphaLocation,currSet.material.alpha);
                    gl.uniform1i(colorTypeLocation, enemies[i].triangles[enemies[i].currModel].colorType);
                    // vertex buffer: activate and feed into vertex shader
                    gl.bindBuffer(gl.ARRAY_BUFFER,enemies[i].triangles[enemies[i].currModel].vertexBuffers[whichTriSet]); // activate
                    gl.vertexAttribPointer(vPosAttribLoc,3,gl.FLOAT,false,0,0); // feed
        
                    gl.bindBuffer(gl.ARRAY_BUFFER,uvBuffers[whichTriSet]); // activate 
        
                    gl.vertexAttribPointer(vUvAttribLoc,2,gl.FLOAT,false,0,0); // feed
                    
                    gl.activeTexture(gl.TEXTURE0);
                    gl.bindTexture(gl.TEXTURE_2D, currSet.glTexture);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                    
                    //TODO only make the texture once
                    if (!currSet.image.textureLoaded) {
                        if (!currSet.image.loaded) {
                            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                                new Uint8Array([0, 0, 255, 255]));
                        } else {
                            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, currSet.image);
                            gl.generateMipmap(gl.TEXTURE_2D);
                            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST );
                            currSet.image.textureLoaded = true
                        }
                        
                    }
                    //TODO HERE
                    gl.bindBuffer(gl.ARRAY_BUFFER,enemies[i].triangles[enemies[i].currModel].uvBuffers[whichTriSet]); // activate that buffer
                    
                    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(enemies[i].triangles[enemies[i].currModel].glUvs),gl.STATIC_DRAW);
                    gl.vertexAttribPointer(vUvAttribLoc,2,gl.FLOAT,false,0,0); // feed
                    
        
                    gl.bindBuffer(gl.ARRAY_BUFFER,enemies[i].triangles[enemies[i].currModel].normalBuffers[whichTriSet]); // activate
                    gl.vertexAttribPointer(vNormAttribLoc,3,gl.FLOAT,false,0,0); // feed
                    // triangle buffer: activate and render
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,enemies[i].triangles[enemies[i].currModel].triangleBuffers[whichTriSet]); // activate
                    gl.drawElements(gl.TRIANGLES,3*enemies[i].triangles[enemies[i].currModel].triSetSizes[whichTriSet],gl.UNSIGNED_SHORT,0); // render
                    
                } // end for each triangle set
            }
        }

        //Render player Bullet
        
        if (player.bullet.active) {
            makeModelTransform(player.bullet);    
            renderObject(bulletTriangles);
            
        }
        
        //Render enemy bullets
        for (let i = 0; i < numEnemies; i++) {

            for (let j = 0; j < 3; j++) {
                // enemies[i].bullets[i].transform

                if (enemies[i].bullets[j].active) {
                    makeModelTransform(enemies[i].bullets[j]);

                    renderObject(enemies[i].bullets[j].triangles);
                }
            // renderObject(enemyBulletTriangles);
            }
        }

        //Render powerups
        for (let i = 0; i < powerUps.length; i++) {
            if (!powerUps[i].active) {
                continue
            }

            makeModelTransform(powerUps[i]);
            renderObject(powerUps[i].triangles)
        }

        if (threeD && eye != "left" && !player.dead) {
            gl.depthMask(false)
            makeModelTransform(reticles[0]);
            renderObject(reticles[0].triangles)
            makeModelTransform(reticles[1]);
            renderObject(reticles[1].triangles)
            gl.depthMask(true)
        }
    }
    
    function renderObject(triangles) {
        mat4.multiply(pvmMatrix,pvMatrix,mMatrix); // project * view * model
        gl.uniformMatrix4fv(mMatrixULoc, false, mMatrix); // pass in the m matrix
        gl.uniformMatrix4fv(pvmMatrixULoc, false, pvmMatrix); // pass in the hpvm matrix
        
        gl.uniform1i(colorTypeLocation, triangles.colorType);
        for (var whichTriSet=0; whichTriSet<triangles.numTriangleSets; whichTriSet++) {
            currSet = triangles[whichTriSet];
            // reflectivity: feed to the fragment shader
            gl.uniform3fv(ambientULoc,currSet.material.ambient); // pass in the ambient reflectivity
            gl.uniform3fv(diffuseULoc,currSet.material.diffuse); // pass in the diffuse reflectivity
            gl.uniform3fv(specularULoc,currSet.material.specular); // pass in the specular reflectivity
            gl.uniform1f(shininessULoc,currSet.material.n); // pass in the specular exponent
            gl.uniform1f(AlphaLocation,currSet.material.alpha);           

            // vertex buffer: activate and feed into vertex shader
            gl.bindBuffer(gl.ARRAY_BUFFER,triangles.vertexBuffers[whichTriSet]); // activate
            gl.vertexAttribPointer(vPosAttribLoc,3,gl.FLOAT,false,0,0); // feed

            // gl.bindBuffer(gl.ARRAY_BUFFER,uvBuffers[whichTriSet]); // activate 

            gl.vertexAttribPointer(vUvAttribLoc,2,gl.FLOAT,false,0,0); // feed

            if (triangles.colorType == COLORTYPE.TEXTURE || triangles.colorType == COLORTYPE.RAINBOW) {
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, currSet.glTexture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                //TODO only make the texture once
                if (!currSet.image.textureLoaded) {
                    if (!currSet.image.loaded) {
                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                            new Uint8Array([0, 0, 255, 255]));
                    } else {
                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, currSet.image);
                        gl.generateMipmap(gl.TEXTURE_2D);
                        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST );
                        currSet.image.textureLoaded = true
                    }
                }

                if (triangles.colorType == COLORTYPE.RAINBOW) {
                    gl.activeTexture(gl.TEXTURE1);
                    gl.bindTexture(gl.TEXTURE_2D, rainbowTexure.glTexture);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    if (!rainbowTexure.image.textureLoaded) {
                        if (!rainbowTexure.image.loaded) {
                            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                                new Uint8Array([0, 0, 255, 255]));
                        } else {
                            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, rainbowTexure.image);
                            gl.generateMipmap(gl.TEXTURE_2D);
                            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST );
                            rainbowTexure.image.textureLoaded = true
                        }
                    }
            
                }
            }
            //TODO HERE
            gl.bindBuffer(gl.ARRAY_BUFFER,triangles.uvBuffers[whichTriSet]); // activate that buffer
            
            gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangles.glUvs),gl.STATIC_DRAW);
            gl.vertexAttribPointer(vUvAttribLoc,2,gl.FLOAT,false,0,0); // feed
            
            
            gl.bindBuffer(gl.ARRAY_BUFFER,triangles.normalBuffers[whichTriSet]); // activate
            gl.vertexAttribPointer(vNormAttribLoc,3,gl.FLOAT,false,0,0); // feed
            // triangle buffer: activate and render
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,triangles.triangleBuffers[whichTriSet]); // activate
            gl.drawElements(gl.TRIANGLES,3*triangles.triSetSizes[whichTriSet],gl.UNSIGNED_SHORT,0); // render
        } // end for each triangle set
    }

    //Render just different position 
    function bulkRenderTies() {
        let triangles = null; 
        // gl.uniform1f(TimeLocation,time);
        for (let i = 0; i < numEnemies; i++) {
            if ( !enemies[i].active || (enemies[i].currModel != currentEnemyModel && !enemies[i].formation) ) {
                continue
            }
            makeModelTransform(enemies[i]);
            mat4.multiply(pvmMatrix,pvMatrix,mMatrix); // project * view * model
            enemies[i].mMatrix = mat4.clone(mMatrix)
            enemies[i].pvmMatrix = mat4.clone(pvmMatrix)
            triangles = enemies[i].triangles[currentEnemyModel]
            
        }
        if (triangles == null) {
            return
        }
        currSet = triangles[0];

        gl.uniform3fv(ambientULoc,currSet.material.ambient); // pass in the ambient reflectivity
        gl.uniform3fv(diffuseULoc,currSet.material.diffuse); // pass in the diffuse reflectivity
        gl.uniform3fv(specularULoc,currSet.material.specular); // pass in the specular reflectivity
        gl.uniform1f(shininessULoc,currSet.material.n); // pass in the specular exponent
        gl.uniform1f(AlphaLocation,currSet.material.alpha);
        gl.uniform1i(colorTypeLocation, triangles.colorType);

        

        for (var whichTriSet=0; whichTriSet<triangles.numTriangleSets; whichTriSet++) {
            currSet = triangles[whichTriSet];

            if (triangles.colorType == COLORTYPE.TEXTURE || triangles.colorType == COLORTYPE.RAINBOW) {
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, currSet.glTexture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                //TODO only make the texture once
                if (!currSet.image.textureLoaded) {
                    if (!currSet.image.loaded) {
                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                            new Uint8Array([0, 0, 255, 255]));
                    } else {
                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, currSet.image);
                        gl.generateMipmap(gl.TEXTURE_2D);
                        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST );
                        currSet.image.textureLoaded = true
                    }
                }
    
                if (triangles.colorType == COLORTYPE.RAINBOW) {
                    gl.activeTexture(gl.TEXTURE1);
                    gl.bindTexture(gl.TEXTURE_2D, rainbowTexure.glTexture);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    if (!rainbowTexure.image.textureLoaded) {
                        if (!rainbowTexure.image.loaded) {
                            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                                new Uint8Array([0, 0, 255, 255]));
                        } else {
                            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, rainbowTexure.image);
                            gl.generateMipmap(gl.TEXTURE_2D);
                            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST );
                            rainbowTexure.image.textureLoaded = true
                        }
                    }
            
                }
            }
            
            gl.bindBuffer(gl.ARRAY_BUFFER,triangles.uvBuffers[whichTriSet]); // activate that buffer
                
            gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangles.glUvs),gl.STATIC_DRAW);
            gl.vertexAttribPointer(vUvAttribLoc,2,gl.FLOAT,false,0,0); // feed

            gl.bindBuffer(gl.ARRAY_BUFFER,triangles.vertexBuffers[whichTriSet]); // activate
            gl.vertexAttribPointer(vPosAttribLoc,3,gl.FLOAT,false,0,0); // feed
            // gl.vertexAttribPointer(vUvAttribLoc,2,gl.FLOAT,false,0,0); // feed
            gl.bindBuffer(gl.ARRAY_BUFFER,triangles.normalBuffers[whichTriSet]); // activate
            gl.vertexAttribPointer(vNormAttribLoc,3,gl.FLOAT,false,0,0); // feed
            // triangle buffer: activate and render
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,triangles.triangleBuffers[whichTriSet]); // activate
            for (let i = 0; i < numEnemies; i++) {
                if ( !enemies[i].active|| (enemies[i].currModel != currentEnemyModel && !enemies[i].formation)) {
                    continue
                }
                gl.uniformMatrix4fv(mMatrixULoc, false, enemies[i].mMatrix); // pass in the m matrix
                gl.uniformMatrix4fv(pvmMatrixULoc, false, enemies[i].pvmMatrix); // pass in the hpvm matrix
                // vertex buffer: activate and feed into vertex shader
                gl.drawElements(gl.TRIANGLES,3*triangles.triSetSizes[whichTriSet],gl.UNSIGNED_SHORT,0); // render
            }
            
        } // end for each triangle set
    }
} // end render model

async function startGame(param) {
    if (param == "3d") {
        threeD = true
        numEnemies = enemiesPerRow * enemiesPerColumn
        numEnemiesAlive = numEnemies
        main()
    } else if (param == "vr") {
        threeD = true
        numEnemies = enemiesPerRow * enemiesPerColumn
        numEnemiesAlive = numEnemies
        vr = true
        webXRSetup()
        // main()
    }
}

function rotateObject(object, axis,direction) {

    var newRotation = mat4.create();

    mat4.fromRotation(newRotation,direction*object.rotateTheta /fps,axis); // get a rotation matrix around passed axis
    vec3.transformMat4(object.xAxis,object.xAxis,newRotation); // rotate model x axis tip
    vec3.transformMat4(object.yAxis,object.yAxis,newRotation); // rotate model y axis tip

} // end rotate model
function rotate(object, axis,direction) {

    var newRotation = mat4.create();
    mat4.fromRotation(newRotation,direction /fps,axis); // get a rotation matrix around passed axis
    vec3.transformMat4(object.xAxis,object.xAxis,newRotation); // rotate model x axis tip
    vec3.transformMat4(object.yAxis,object.yAxis,newRotation); // rotate model y axis tip

} // end rotate model


/* MAIN -- HERE is where execution begins after window load */
let backgroundMusic = new Audio(BASE_URL + "audio/backgroundMusic.mp3")
backgroundMusic.volume = 0.07
backgroundMusic.loop = true
    
backgroundMusic.addEventListener("canplaythrough", () => {
    backgroundMusic.play().catch(e => {
       window.addEventListener('click', () => {
        if (!mute) {
            backgroundMusic.play()
        }
       }, { once: true })
    })
 });


async function main() {
    
    document.getElementById("menuDiv").style.display = "none"
    document.getElementById("webglDiv").style.display = "block"
    window.addEventListener("gamepadconnected", (e) => {
        controller = navigator.getGamepads()[e.gamepad.index]; //Axes 0,1 are LS x,y, 2,3 are RS L,S 
        // 0=A, 1=B, 2=X, 3=Y, 4= LB, 5=RB, 6= LT, 7=RT, 8=select, 9=start, 10 = LS, 11 =RS, 12=dpad up, 13=dpad down, 14=dpad left, 15=dpadright, 
        console.log(controller)
        
      });
  setupWebGL(); // set up the webGL environment
//   await loadModels(); // load in the models from tri file
  await setUpObjects(); // load in the models from tri file
  setupShaders(); // setup the webGL shaders
//   renderModels(); // draw the triangles using webGL
currFrame = window.requestAnimationFrame(renderModels);
} // end main

async function webXRSetup() {

    if(navigator.xr) { // checks if our device supports WebXR
		navigator.xr.isSessionSupported("immersive-vr").then((supported) => { // we check if immersive-vr session is supported
			if(supported) { // if it is supported
				
                navigator.xr.requestSession("immersive-vr", {requiredFeatures: ["local-floor"]}).then(onSessionStarted); // request it (start the session), and when the request is handled, call onSessionStarted

			}
		});
	}
}

async function onSessionStarted(_session) { // this function defines what happens when the session is started
    backgroundMusic.volume = 0.07
    backgroundMusic.loop = true
    if (!mute) {
        backgroundMusic.play()
    }
    document.getElementById("menuDiv").style.display = "none"
    document.getElementById("webglDiv").style.display = "block"
    window.addEventListener("gamepadconnected", (e) => {
        controller = navigator.getGamepads()[e.gamepad.index]; //Axes 0,1 are LS x,y, 2,3 are RS L,S 
        // 0=A, 1=B, 2=X, 3=Y, 4= LB, 5=RB, 6= LT, 7=RT, 8=select, 9=start, 10 = LS, 11 =RS, 12=dpad up, 13=dpad down, 14=dpad left, 15=dpadright, 
        
      });
    setupWebGL(); // set up the webGL environment
    //   await loadModels(); // load in the models from tri file
    await setUpObjects(); // load in the models from tri file
    setupShaders(); // setup the webGL shaders
    //   renderModels(); // draw the triangles using webGL

	xrSession = _session; // we set our session to be the session our request created
	xrSession.addEventListener("end", onSessionEnded); // we set what happenes when our session is ended

	xrSession.updateRenderState({baseLayer: new XRWebGLLayer(xrSession, gl)}); // this line simply sets our session's WebGL context to our WebGL2 context
	
	
	// const renderer = new ezgfx.Renderer();
	// renderer.depthTesting(true); // if you don't know what that means - it means that our meshes will be rendered properly ¯\_(ツ)_/¯
	

	xrSession.requestReferenceSpace("local-floor").then((refSpace) => { // we request our referance space - an object that defines where the center of our space lies. Here we request a local-floor referance space - that one defines the center of the world to be where the center of the ground is
		xrRefSpace = refSpace; // we set our referance space to be the one returned by this function
		
		// xrSession.requestAnimationFrame(renderModels); // at this point everything has been set up, so we can finally request an animation frame, on a function with the name of onSessionFrame
        currFrame = xrSession.requestAnimationFrame(renderModels);
	});

	function onSessionFrame(t, frame) { // this function will happen every frame

		const session = frame.session; // frame is a frame handling object - it's used to get frame sessions, frame WebGL layers and some more things
		session.requestAnimationFrame(onSessionFrame); // we simply set our animation frame function to be this function again
		let pose = frame.getViewerPose(xrRefSpace); // gets the pose of the headset, relative to the previously gotten referance space
	
		if(pose) { // if the pose was possible to get (if the headset responds)
			let glLayer = session.renderState.baseLayer; // get the WebGL layer (it contains some important information we need)
	
			gl.bindFramebuffer(gl.FRAMEBUFFER, glLayer.framebuffer); // sets the framebuffer (drawing target of WebGL) to be our WebXR display's framebuffer
			
			renderer.clear([0.3, 1.0, 0.4, 1.0]);
			
			for(let view of pose.views) { // we go through every single view out of our camera's views
				let viewport = glLayer.getViewport(view); // we get the viewport of our view (the place on the screen where things will be drawn)
				gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height); // we set our viewport appropriately
	
				planeMaterial.setProjection(view.projectionMatrix);
				planeMaterial.setView(view.transform.inverse.matrix);
				
				renderer.draw(planeMesh, planeMaterial);

				cubeMaterial.setProjection(view.projectionMatrix);
				cubeMaterial.setView(view.transform.inverse.matrix);
				
				renderer.draw(cubeMesh, cubeMaterial);
			}
		}
	}

	
}
let vrButton = document.getElementById("vr-button")
if(navigator.xr) { // checks if our device supports WebXR
    navigator.xr.isSessionSupported("immersive-vr").then((supported) => { // we check if immersive-vr session is supported
        if(supported) { // if it is supported
            vrButton.disabled = false;
            vrButton.title = ""
            
        } else {
            vrButton.title = "Your hardware is not supported for Immersive VR"
        }
    });
    
}
let muteHtml = document.getElementById("mute")
if (mute) {
    muteHtml.innerText = "Unmute"
} else {
    muteHtml.innerText = "Mute"
}
function toggleMute() {
    if (mute) {
        muteHtml.innerText = "Mute"
        mute = false;
        if (player.invincible) {
            powerUps[0].sound.play()
        } else if (player.fast){
            powerUps[1].sound.play()
        } else {
            backgroundMusic.play()
        }
        
        
    } else {
        muteHtml.innerText = "Unmute"
        mute = true
        
        backgroundMusic.pause()
        powerUps[0].sound.pause()
        powerUps[1].sound.pause()
        
    }
}

function onSessionEnded() { // this function defines what happens when the session has ended
    xrSession = null; // we set our xrSession to be null, so that our button will be able to reinitialize it when we click it the next time
}

function finishLevel() {
    if (vr) {
        return
    }
    //Todo end screen
    document.getElementById("NextLevel").style.display = "block"
    nextLevelTimer = 3
    if (!vr) {
        cancelAnimationFrame( currFrame );
    } else {
        loading = true
    }
    nextLevel()
}

function gameOver() {
    document.getElementById("GameOver").style.display = "block"
    player.dead = true
    powerUps[0].sound.pause()
    
    if (!mute) {
        let temp = new Audio(BASE_URL + "audio/xWingExplode.mp3")
        temp.volume = 0.3
        temp.play()
    }
    
    player.deathTimer = 100
    if (threeD) {
        for (var whichTriSet=0; whichTriSet<cockpit.triangles.numTriangleSets; whichTriSet++) {
            // ship.triangles[whichTriSet].direction = vec3.normalize(vec3.create(),vec3.subtract(vec3.create(), ship.triangles[whichTriSet].center, ship.triangles.center))
            cockpit.triangles[whichTriSet].direction = vec3.normalize(vec3.create(), vec3.fromValues(Math.random(),Math.random(),Math.random()))
            cockpit.triangles[whichTriSet].speed = (Math.random() * 5 - 2.5 )
            if (cockpit.triangles[whichTriSet].speed > 0) {
                cockpit.triangles[whichTriSet].speed += 5
            } else {
                cockpit.triangles[whichTriSet].speed -= 5
            }
            cockpit.triangles[whichTriSet].translation = vec3.clone(cockpit.translation)
        }
    } else {
        for (var whichTriSet=0; whichTriSet<player.triangles.numTriangleSets; whichTriSet++) {
            // ship.triangles[whichTriSet].direction = vec3.normalize(vec3.create(),vec3.subtract(vec3.create(), ship.triangles[whichTriSet].center, ship.triangles.center))
            player.triangles[whichTriSet].direction = vec3.normalize(vec3.create(), vec3.fromValues(Math.random(),Math.random(),Math.random()))
            player.triangles[whichTriSet].speed = (Math.random() * 5 - 2.5 )
            if (player.triangles[whichTriSet].speed > 0) {
                player.triangles[whichTriSet].speed += 5
            } else {
                player.triangles[whichTriSet].speed -= 5
            }
            player.triangles[whichTriSet].translation = vec3.clone(player.translation)
        }
    }
    


    
    // cancelAnimationFrame( currFrame );
    // onSessionEnded()
}
let loading = false
async function nextLevel() {
    
    setup()
    difficulty++
    numEnemies += 10
    numEnemiesAlive = numEnemies
    enemyMaxSpeed += 2
    await setUpObjects(); // load in the models from tri file
    if (!vr) {
        currFrame = window.requestAnimationFrame(renderModels);
    } 
    
}