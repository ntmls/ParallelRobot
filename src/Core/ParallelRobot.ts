import { Vector2, Angles } from "../Core/Vector2";

export class ParallelRobot {
    leftServoPosition: Vector2;
    rightServoPosition: Vector2;
    servoRange: number = 120;
    servoAngleOffset: number =  0;
    armLength1: number = 4;
    armLength2: number = 5;

    public calculateArmAngles(target: Vector2): number[] {
        var result: number[] = new Array(2);
        result[0] = this.calculateArmAngle(target, this.leftServoPosition, false);
        result[1] = this.calculateArmAngle(target, this.rightServoPosition, true);
        return result;
    }

    private calculateArmAngle(target: Vector2, position: Vector2, flip: boolean) {
        var negate = 1;
        if (flip) { 
            negate = -1;
        }
        var deltaVect = target.add(position.flip());
        var deltaLen = deltaVect.magnitude();
        var radians = negate * this.calcAngleFromThreeSides(deltaLen, this.armLength1, this.armLength2);
        var armPosition = deltaVect.normalize().rotate(radians);
        armPosition = new Vector2(negate * armPosition.x, armPosition.y)
        var armAngle = -Math.atan2(armPosition.x, armPosition.y);
        var degrees = Angles.R2D(armAngle);
        return degrees;
    }
    
    // calculate the angle opposite of side c
    private calcAngleFromThreeSides(a: number, b: number, c: number) {
        var num = a * a + b * b - c * c;
        var denom = 2 * a * b;
        return Math.acos(num / denom);
    }
}