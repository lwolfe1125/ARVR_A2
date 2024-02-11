/* CSCI 5619 Assignment 2, Fall 2020
 * Author: Evan Suma Rosenberg
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Color3, Vector3 } from "@babylonjs/core/Maths/math";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import "@babylonjs/inspector";
import "@babylonjs/core/Materials/standardMaterial"
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import "@babylonjs/core/Materials/standardMaterial";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { CubeTexture, DirectionalLight, MeshBuilder, SceneLoader, Texture, TransformNode } from "@babylonjs/core";


/******* Add the Game class with a static CreateScene function ******/
class Game 
{ 
    public static CreateScene(engine: Engine, canvas: HTMLCanvasElement): Scene 
    {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new Scene(engine);        

        // Create a camera above the origin
        var camera = new UniversalCamera("camera1", new Vector3(0, -330, 0), scene);
        camera.attachControl(canvas, true);
        camera.speed = 20;

        // add code to create your environment here

        //Creating a root node
        var root = new TransformNode("root", scene);

        //Setting up collisions
        camera.ellipsoid = new Vector3(1, 1, 1);
        camera.checkCollisions = true;
        scene.collisionsEnabled = true;

        //Setting up some lighting
        var light = new HemisphericLight("light", new Vector3(0,1,0), scene);
        light.diffuse = new Color3(0.32, 0.04, 0.7);
        light.intensity = 0.3;

        var dirLight = new DirectionalLight("dirLight", new Vector3(0, -1, 0), scene);
        dirLight.diffuse = new Color3(0.29, 0.06, 0);
        light.intensity = 0.8;

        //Making a skybox
        var skybox = MeshBuilder.CreateBox("sky", {size: 100}, scene);
        skybox.scaling = new Vector3(100, 100, 100);

        //Creating a skybox material with no reflections 
        var skyMaterial = new StandardMaterial("sky", scene);
        skyMaterial.backFaceCulling = false;
        skyMaterial.disableLighting = true;

        //Setting up the texture
        var skyTexture = new CubeTexture("textures/sky/corona", scene);
        skyTexture.coordinatesMode = Texture.SKYBOX_MODE;
        skyMaterial.reflectionTexture = skyTexture;

        //Applying it to the sky
        skybox.material =  skyMaterial;

        //Making the sky infinite
        skybox.infiniteDistance = true;

        //Importing and adjusting the ground
        SceneLoader.ImportMesh("", "textures/snowyMountain/", "scene.gltf", scene, (meshes)=>{
            meshes.forEach(mesh => {
                mesh.scaling = new Vector3(200, 200, 200);
                mesh.position = new Vector3(0, 10, 0);
                mesh.checkCollisions = true;
                mesh.setParent(root);
            });

        });


        //Importing & adjusting a tree 
        SceneLoader.ImportMesh("", "textures/tree/", "scene.gltf", scene, (meshes)=>{
            meshes.forEach(mesh=> {
                mesh.scaling = new Vector3(5, 5, 5);
                mesh.position = new Vector3(150, 44, 150);
                mesh.checkCollisions = true;
                mesh.setParent(root);
            })
        });

        
        //Importing & adjusting a stone platform
        SceneLoader.ImportMesh("", "textures/stone_platform/", "scene.gltf", scene, (meshes)=>{
            meshes[0].position = new Vector3(0, -444, 0);
            meshes[0].checkCollisions = true;
            meshes[0].setParent(root);
        });

        //Importing & adjusting some crystals
        SceneLoader.ImportMesh("", "textures/crystal_pack/", "scene.gltf", scene, (meshes)=>{
            meshes[0].getChildMeshes().forEach(crystal => {
                crystal.scaling = new Vector3(150, 150, 150);
                crystal.checkCollisions = true;
            });

            meshes[0].setParent(root);

            var crystals = meshes[0].getChildMeshes();

            crystals[0].position = new Vector3(-10500, -39600, -2500);
            crystals[1].position = new Vector3(10500, -39600, 0);
            crystals[2].position = new Vector3(0, -39600, -10500);
            crystals[3].position = new Vector3(6000, -39600, 9000);
            crystals[4].position = new Vector3(-6000, -39600, 9000);
        });

        //A tent
        SceneLoader.ImportMesh("", "textures/tent/", "scene.gltf", scene, (meshes) => {
            meshes.forEach(mesh=>{
                mesh.position = new Vector3(2, 10, -4.5);
                mesh.scaling = new Vector3(1.25, 1.25, 1.25);
                mesh.checkCollisions = true;
                mesh.setParent(root);
            })  
        });

        return scene;
    }
}
/******* End of the Game class ******/   
 

// Get the canvas element 
const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

// Generate the BABYLON 3D engine
const engine = new Engine(canvas, true); 

// Call the createScene function
const scene = Game.CreateScene(engine, canvas);

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () 
{ 
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () 
{ 
    engine.resize();
});

