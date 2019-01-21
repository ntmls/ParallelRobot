define(["require", "exports", "../Core/Vector2", "./ParallelRobot"], function (require, exports, Vector2_1, ParallelRobot_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CalculateArmPositionsCommand = /** @class */ (function () {
        function CalculateArmPositionsCommand() {
            this.origin = new Vector2_1.Vector2();
            this.target = new Vector2_1.Vector2();
            this.distanceBetweenServos = 2;
            this.servoRange = 120;
            this.servoAngleOffset = 0;
            this.armLength1 = 4;
            this.armLength2 = 5;
        }
        return CalculateArmPositionsCommand;
    }());
    exports.CalculateArmPositionsCommand = CalculateArmPositionsCommand;
    var CalculateArmPositionsOutput = /** @class */ (function () {
        function CalculateArmPositionsOutput() {
        }
        return CalculateArmPositionsOutput;
    }());
    exports.CalculateArmPositionsOutput = CalculateArmPositionsOutput;
    var CalculateArmPositionsCommandHandler = /** @class */ (function () {
        function CalculateArmPositionsCommandHandler(presenter) {
            this.presener = presenter;
        }
        CalculateArmPositionsCommandHandler.prototype.execute = function (command) {
            var rightOffset = new Vector2_1.Vector2(command.distanceBetweenServos / 2, 0);
            var leftOffset = rightOffset.flip();
            var robot = new ParallelRobot_1.ParallelRobot();
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
        };
        return CalculateArmPositionsCommandHandler;
    }());
    exports.CalculateArmPositionsCommandHandler = CalculateArmPositionsCommandHandler;
});
