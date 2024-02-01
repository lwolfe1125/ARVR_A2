/* CSCI 5619 Assignment 2, Fall 2020
 * Author: Evan Suma Rosenberg
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";

/******* Add the Game class with a static CreateScene function ******/
class Game 
{ 
    public static CreateScene(engine: Engine, canvas: HTMLCanvasElement): Scene 
    {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new Scene(engine);

        // Create a camera above the origin
        var camera = new UniversalCamera("camera1", new Vector3(0, 2, 0), scene);
        camera.attachControl(canvas, true);

        // add code to create your environment here

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

