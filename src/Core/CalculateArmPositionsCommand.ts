import { ICommandHandler, IPresenter } from "../Core/Messages";
import { Vector2, Angles } from "../Core/Vector2";

export class CalculateArmPositionsCommand {
    origin: Vector2 =  new Vector2();
    target: Vector2 =  new Vector2();
    distanceBetweenServos: number = 2;
    servoRange: number =  120;
    servoAngleOffset: number = 0;
    armLength1: number = 4;
    armLength2: number = 5;
}

export class CalculateArmPositionsOutput {
    public leftServoPosition: Vector2;
    public rightServoPosition: Vector2;
    leftServoAngle: number;
    rightServoAngle: number;
    armLength1: number;
    armLength2: number;
    target: Vector2;
}

export class CalculateArmPositionsCommandHandler implements ICommandHandler<CalculateArmPositionsCommand> {
    private presener: IPresenter<CalculateArmPositionsOutput>;

    constructor(presenter: IPresenter<CalculateArmPositionsOutput>) {
        this.presener = presenter;
    }

    execute(command: CalculateArmPositionsCommand): void {
        var rightOffset = new Vector2(command.distanceBetweenServos / 2, 0);
        var leftOffset = rightOffset.flip();

        // calculate the output
        var output = new CalculateArmPositionsOutput();
        output.leftServoPosition = command.origin.add(leftOffset);
        output.rightServoPosition = command.origin.add(rightOffset);
        output.leftServoAngle = this.calculateArmAngle(command.target, leftOffset, command.armLength1, command.armLength2, false);
        output.rightServoAngle = this.calculateArmAngle(command.target, rightOffset, command.armLength1, command.armLength2, true);
        output.armLength1 = command.armLength1;
        output.armLength2 = command.armLength2;
        output.target = command.target;

        // send the ouput
        this.presener.present(output);
    }

    private calculateArmAngle(target: Vector2, servoOffset: Vector2, armLength1: number, armLength2: number, flip: boolean) {
        var negate = 1;
        if (flip) { 
            negate = -1;
        }
        var deltaVect = target.add(servoOffset.flip());
        var deltaLen = deltaVect.magnitude();
        var radians = negate * this.calcAngleFromThreeSides(deltaLen, armLength1, armLength2);
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