define(["require", "exports", "../Core/Vector2", "../Core/CalculateArmPositionsCommand"], function (require, exports, Vector2_1, CalculateArmPositionsCommand_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var display, cursorX = 0, cursorY = 0;
    var DisplayParams = /** @class */ (function () {
        function DisplayParams() {
            this.scale = 20;
            this.offset = new Vector2_1.Vector2();
        }
        return DisplayParams;
    }());
    ;
    var displayParams = new DisplayParams();
    var command = new CalculateArmPositionsCommand_1.CalculateArmPositionsCommand();
    var handler = new CalculateArmPositionsCommand_1.CalculateArmPositionsCommandHandler();
    function calculateModel(params) {
        var rightOffset = new Vector2_1.Vector2(params.distanceBetweenServos / 2, 0);
        var leftOffset = rightOffset.flip();
        return {
            leftServoPosition: params.origin.add(leftOffset),
            rightServoPosition: params.origin.add(rightOffset),
            leftServoAngle: calculateArmAngle(params.target, leftOffset, params.armLength1, params.armLength2, false),
            rightServoAngle: calculateArmAngle(params.target, rightOffset, params.armLength1, params.armLength2, true)
        };
    }
    function calculateArmAngle(target, servoOffset, armLength1, armLength2, flip) {
        var negate = 1;
        if (flip) {
            negate = -1;
        }
        var deltaVect = target.add(servoOffset.flip());
        var deltaLen = deltaVect.magnitude();
        var radians = negate * calcAngleFromThreeSides(deltaLen, armLength1, armLength2);
        var armPosition = deltaVect.normalize().rotate(radians);
        armPosition = new Vector2_1.Vector2(negate * armPosition.x, armPosition.y);
        var armAngle = -Math.atan2(armPosition.x, armPosition.y);
        var degrees = Vector2_1.Angles.R2D(armAngle);
        return degrees;
    }
    // calculate the angle opposite of side c
    function calcAngleFromThreeSides(a, b, c) {
        var num = a * a + b * b - c * c;
        var denom = 2 * a * b;
        return Math.acos(num / denom);
    }
    function physicalToScreen(point, displayParam) {
        var scaled = point.scale(displayParams.scale);
        return scaled.add(displayParams.offset);
    }
    function screenToPhysical(point, displayParams) {
        var vect = new Vector2_1.Vector2(point.x, point.y);
        var offset = vect.add(displayParams.offset.flip());
        return offset.scale(1 / displayParams.scale);
    }
    function init() {
        display = document.getElementById("display");
        display.addEventListener("mousemove", onMouse);
        displayParams.offset.x = display.clientWidth / 2;
        displayParams.offset.y = display.clientHeight / 2;
        requestAnimationFrame(draw);
    }
    function onMouse(evt) {
        cursorX = evt.clientX;
        cursorY = evt.clientY;
    }
    function draw(now) {
        var temp;
        // figure out where the mouse is at
        var pt = display.createSVGPoint();
        pt.x = cursorX;
        pt.y = cursorY;
        // draw the cursor
        var cursorpt = pt.matrixTransform(display.getScreenCTM().inverse());
        var cursor = document.getElementById("cursor");
        cursor.setAttribute("cx", cursorpt.x);
        cursor.setAttribute("cy", cursorpt.y);
        var cursorCircle = document.getElementById("cursor-circle");
        cursorCircle.setAttribute("cx", cursorpt.x);
        cursorCircle.setAttribute("cy", cursorpt.y);
        cursorCircle.setAttribute("r", String(command.armLength2 * displayParams.scale));
        // update the target on the model parameters
        var target = screenToPhysical(cursorpt, displayParams);
        command.target.x = roundToThou(target.x);
        command.target.y = roundToThou(target.y);
        // calculate the model from the parameters
        var model = calculateModel(command);
        // draw the left servo
        var leftServo = document.getElementById("left-servo");
        var leftServoScreenPosition = physicalToScreen(model.leftServoPosition, displayParams);
        leftServo.setAttribute("cx", leftServoScreenPosition.x);
        leftServo.setAttribute("cy", leftServoScreenPosition.y);
        var leftServoCircle = document.getElementById("left-servo-circle");
        leftServoCircle.setAttribute("cx", leftServoScreenPosition.x);
        leftServoCircle.setAttribute("cy", leftServoScreenPosition.y);
        leftServoCircle.setAttribute("r", String(command.armLength1 * displayParams.scale));
        // draw the right servo
        var rightServo = document.getElementById("right-servo");
        var rightServoScreenPosition = physicalToScreen(model.rightServoPosition, displayParams);
        rightServo.setAttribute("cx", rightServoScreenPosition.x);
        rightServo.setAttribute("cy", rightServoScreenPosition.y);
        var rightServoCircle = document.getElementById("right-servo-circle");
        rightServoCircle.setAttribute("cx", rightServoScreenPosition.x);
        rightServoCircle.setAttribute("cy", rightServoScreenPosition.y);
        rightServoCircle.setAttribute("r", String(command.armLength1 * displayParams.scale));
        // draw the left arm
        var line1a = document.getElementById("left-servo-arm-one");
        var line1b = document.getElementById("left-servo-arm-two");
        line1a.setAttribute("x1", leftServoScreenPosition.x);
        line1a.setAttribute("y1", leftServoScreenPosition.y);
        var radians = Vector2_1.Angles.D2R(model.leftServoAngle);
        var v1 = new Vector2_1.Vector2(0, command.armLength1 * displayParams.scale).rotate(radians);
        v1 = leftServoScreenPosition.add(v1);
        line1a.setAttribute("x2", String(v1.x));
        line1a.setAttribute("y2", String(v1.y));
        line1b.setAttribute("x1", String(v1.x));
        line1b.setAttribute("y1", String(v1.y));
        line1b.setAttribute("x2", String(cursorpt.x));
        line1b.setAttribute("y2", String(cursorpt.y));
        // draw the right arm
        var line2a = document.getElementById("right-servo-arm-one");
        var line2b = document.getElementById("right-servo-arm-two");
        line2a.setAttribute("x1", rightServoScreenPosition.x);
        line2a.setAttribute("y1", rightServoScreenPosition.y);
        var radians = -Vector2_1.Angles.D2R(model.rightServoAngle);
        var v1 = new Vector2_1.Vector2(0, command.armLength1 * displayParams.scale).rotate(radians);
        v1 = rightServoScreenPosition.add(v1);
        line2a.setAttribute("x2", String(v1.x));
        line2a.setAttribute("y2", String(v1.y));
        line2b.setAttribute("x1", String(v1.x));
        line2b.setAttribute("y1", String(v1.y));
        line2b.setAttribute("x2", String(cursorpt.x));
        line2b.setAttribute("y2", String(cursorpt.y));
        // update the parameter display
        updateParamDisplay();
        requestAnimationFrame(draw);
    }
    function updateParamDisplay() {
        var distanceBetweenServos = document.getElementById("distance-between-servos");
        distanceBetweenServos.value = String(command.distanceBetweenServos);
        var targetx = document.getElementById("target-x");
        targetx.value = String(command.target.x);
        var targety = document.getElementById("target-y");
        targety.value = String(command.target.y);
    }
    ;
    function roundToThou(value) {
        return Math.round(value * 1000) / 1000;
    }
    init();
});
