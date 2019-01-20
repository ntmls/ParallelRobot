define(["require", "exports", "../Core/Vector2"], function (require, exports, Vector2_1) {
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
        };
        CalculateArmPositionsCommandHandler.prototype.calculateArmAngle = function (target, servoOffset, armLength1, armLength2, flip) {
            var negate = 1;
            if (flip) {
                negate = -1;
            }
            var deltaVect = target.add(servoOffset.flip());
            var deltaLen = deltaVect.magnitude();
            var radians = negate * this.calcAngleFromThreeSides(deltaLen, armLength1, armLength2);
            var armPosition = deltaVect.normalize().rotate(radians);
            armPosition = new Vector2_1.Vector2(negate * armPosition.x, armPosition.y);
            var armAngle = -Math.atan2(armPosition.x, armPosition.y);
            var degrees = Vector2_1.Angles.R2D(armAngle);
            return degrees;
        };
        // calculate the angle opposite of side c
        CalculateArmPositionsCommandHandler.prototype.calcAngleFromThreeSides = function (a, b, c) {
            var num = a * a + b * b - c * c;
            var denom = 2 * a * b;
            return Math.acos(num / denom);
        };
        return CalculateArmPositionsCommandHandler;
    }());
    exports.CalculateArmPositionsCommandHandler = CalculateArmPositionsCommandHandler;
});
