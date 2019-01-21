define(["require", "exports", "../Core/Vector2"], function (require, exports, Vector2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ParallelRobot = /** @class */ (function () {
        function ParallelRobot() {
            this.servoRange = 120;
            this.servoAngleOffset = 0;
            this.armLength1 = 4;
            this.armLength2 = 5;
        }
        ParallelRobot.prototype.calculateArmAngles = function (target) {
            var result = new Array(2);
            result[0] = this.calculateArmAngle(target, this.leftServoPosition, false);
            result[1] = this.calculateArmAngle(target, this.rightServoPosition, true);
            return result;
        };
        ParallelRobot.prototype.calculateArmAngle = function (target, position, flip) {
            var negate = 1;
            if (flip) {
                negate = -1;
            }
            var deltaVect = target.add(position.flip());
            var deltaLen = deltaVect.magnitude();
            var radians = negate * this.calcAngleFromThreeSides(deltaLen, this.armLength1, this.armLength2);
            var armPosition = deltaVect.normalize().rotate(radians);
            armPosition = new Vector2_1.Vector2(negate * armPosition.x, armPosition.y);
            var armAngle = -Math.atan2(armPosition.x, armPosition.y);
            var degrees = Vector2_1.Angles.R2D(armAngle);
            return degrees;
        };
        // calculate the angle opposite of side c
        ParallelRobot.prototype.calcAngleFromThreeSides = function (a, b, c) {
            var num = a * a + b * b - c * c;
            var denom = 2 * a * b;
            return Math.acos(num / denom);
        };
        return ParallelRobot;
    }());
    exports.ParallelRobot = ParallelRobot;
});
