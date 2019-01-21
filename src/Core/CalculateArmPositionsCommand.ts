import { ICommandHandler, IPresenter } from "../Core/Messages";
import { Vector2, Angles } from "../Core/Vector2";
import { ParallelRobot } from "./ParallelRobot";

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

        var robot = new ParallelRobot();
        robot.armLength1 = command.armLength1;
        robot.armLength2 = command.armLength2;
        robot.leftServoPosition = command.origin.add(leftOffset);
        robot.rightServoPosition = command.origin.add(rightOffset);
        robot.servoAngleOffset = command.servoAngleOffset;
        robot.servoRange = command.servoRange;

        var angles = robot.calculateArmAngles(command.target);

        // calculate the output
        var output = new CalculateArmPositionsOutput();
        output.leftServoPosition = robot.leftServoPosition;
        output.rightServoPosition = robot.rightServoPosition;
        output.leftServoAngle = angles[0];
        output.rightServoAngle = angles[1];
        output.armLength1 = robot.armLength1;
        output.armLength2 = robot.armLength2;
        output.target = command.target;

        // send the output to be transformed by the display
        this.presener.present(output);
    }

}