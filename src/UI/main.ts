import { CalculateArmPositionsCommandHandler, CalculateArmPositionsCommand } from "../Core/CalculateArmPositionsCommand"
import { ArmPositionsPresenter } from "../UI/ArmPositionsPresenter";
import { DisplayParams } from "../UI/DisplayParameters";

var display: any, cursorX=0, cursorY=0;

var displayParams = new DisplayParams();
var command = new CalculateArmPositionsCommand();
var presenter = new ArmPositionsPresenter(displayParams);
var handler = new CalculateArmPositionsCommandHandler(presenter);

function init() {
    display = document.getElementById("display");
    display.addEventListener("mousemove", onMouse)
    displayParams.offset.x = display.clientWidth / 2;
    displayParams.offset.y = display.clientHeight / 2;
    requestAnimationFrame(draw);
}

function onMouse(evt: any) {
    cursorX = evt.clientX;
    cursorY = evt.clientY;
}

function draw(now: any) {

    var temp;

    // figure out where the mouse is at
    var pt = display.createSVGPoint();
    pt.x = cursorX;
    pt.y = cursorY;

    // draw the cursor
    var cursorpt =  pt.matrixTransform(display.getScreenCTM().inverse());
    var cursor = document.getElementById("cursor");
    cursor.setAttribute("cx", cursorpt.x);
    cursor.setAttribute("cy", cursorpt.y);  
    var cursorCircle = document.getElementById("cursor-circle");
    cursorCircle.setAttribute("cx", cursorpt.x); 
    cursorCircle.setAttribute("cy", cursorpt.y);
    cursorCircle.setAttribute("r", String(command.armLength2 * displayParams.scale));

    // update the target on the model parameters
    var target = displayParams.screenToPhysical(cursorpt);
    command.target.x = roundToThou(target.x);
    command.target.y = roundToThou(target.y);

    // calculate the model from the parameters
    handler.execute(command);

    // update the parameter display
    updateParamDisplay();

    // request next frame
    requestAnimationFrame(draw);
}

function updateParamDisplay() {
    var distanceBetweenServos = <HTMLInputElement>document.getElementById("distance-between-servos");
    distanceBetweenServos.value = String(command.distanceBetweenServos);
    var targetx = <HTMLInputElement>document.getElementById("target-x");
    targetx.value = String(command.target.x);
    var targety = <HTMLInputElement>document.getElementById("target-y");
    targety.value = String(command.target.y);
}; 

function roundToThou(value: number): number {
    return Math.round(value * 1000) / 1000;
}

init();