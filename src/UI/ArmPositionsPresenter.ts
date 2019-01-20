
import { Vector2, Angles } from "../Core/Vector2";
import { CalculateArmPositionsOutput } from "../Core/CalculateArmPositionsCommand";
import { IPresenter } from "../Core/Messages";
import { DisplayParams } from "../UI/DisplayParameters";

export class ArmPositionsPresenter implements IPresenter<CalculateArmPositionsOutput> {

    private displayParams: DisplayParams;

    constructor(displayParams: DisplayParams) {
        this.displayParams = displayParams;
    }

    present(output: CalculateArmPositionsOutput) {
        
        // draw the left servo
        var leftServo = document.getElementById("left-servo");
        var leftServoScreenPosition = this.displayParams.physicalToScreen(output.leftServoPosition);
        leftServo.setAttribute("cx", leftServoScreenPosition.x);
        leftServo.setAttribute("cy", leftServoScreenPosition.y);
        var leftServoCircle = document.getElementById("left-servo-circle");
        leftServoCircle.setAttribute("cx", leftServoScreenPosition.x);
        leftServoCircle.setAttribute("cy", leftServoScreenPosition.y);
        leftServoCircle.setAttribute("r", String(output.armLength1 * this.displayParams.scale));

        // draw the right servo
        var rightServo = document.getElementById("right-servo");
        var rightServoScreenPosition = this.displayParams.physicalToScreen(output.rightServoPosition);
        rightServo.setAttribute("cx", rightServoScreenPosition.x);
        rightServo.setAttribute("cy", rightServoScreenPosition.y);
        var rightServoCircle = document.getElementById("right-servo-circle");
        rightServoCircle.setAttribute("cx", rightServoScreenPosition.x);
        rightServoCircle.setAttribute("cy", rightServoScreenPosition.y);
        rightServoCircle.setAttribute("r", String(output.armLength1 * this.displayParams.scale));
        
        var cursorpt = this.displayParams.physicalToScreen(output.target);

        // draw the left arm
        var line1a = document.getElementById("left-servo-arm-one");
        var line1b = document.getElementById("left-servo-arm-two");
        line1a.setAttribute("x1", leftServoScreenPosition.x);
        line1a.setAttribute("y1", leftServoScreenPosition.y);
        var radians = Angles.D2R(output.leftServoAngle);
        var v1 = new Vector2(0, output.armLength1 * this.displayParams.scale).rotate(radians);
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
        var radians = -Angles.D2R(output.rightServoAngle);
        var v1 = new Vector2(0, output.armLength1 * this.displayParams.scale).rotate(radians);
        v1 = rightServoScreenPosition.add(v1);
        line2a.setAttribute("x2", String(v1.x));
        line2a.setAttribute("y2", String(v1.y));
        line2b.setAttribute("x1", String(v1.x));
        line2b.setAttribute("y1", String(v1.y));
        line2b.setAttribute("x2",String(cursorpt.x));
        line2b.setAttribute("y2", String(cursorpt.y));

    }
}