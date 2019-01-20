import { ICommand } from "Messages";
import { Vector2 } from "../Core/Vector2";

export class CalculateArmPositionsCommand {
    origin: Vector2 =  new Vector2();
    target: Vector2 =  new Vector2();
    distanceBetweenServos: number = 2;
    servoRange: number =  120;
    servoAngleOffset: number = 0;
    armLength1: number = 4;
    armLength2: number = 5;
}

export class CalculateArmPositionsResponse {

}

export class CalculateArmPositionsCommandHandler implements ICommand<CalculateArmPositionsCommand> {
    execute(request: CalculateArmPositionsCommand): void {
        return;
    }
}