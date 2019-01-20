define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ParallelRobot = /** @class */ (function () {
        function ParallelRobot() {
            this.distanceBetweenServos = 2;
            this.servoRange = 120;
            this.servoAngleOffset = 0;
            this.armLength1 = 4;
            this.armLength2 = 5;
        }
        return ParallelRobot;
    }());
    exports.ParallelRobot = ParallelRobot;
});
