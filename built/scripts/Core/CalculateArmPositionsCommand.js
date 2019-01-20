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
    var CalculateArmPositionsResponse = /** @class */ (function () {
        function CalculateArmPositionsResponse() {
        }
        return CalculateArmPositionsResponse;
    }());
    exports.CalculateArmPositionsResponse = CalculateArmPositionsResponse;
    var CalculateArmPositionsCommandHandler = /** @class */ (function () {
        function CalculateArmPositionsCommandHandler() {
        }
        CalculateArmPositionsCommandHandler.prototype.execute = function (request) {
            return;
        };
        return CalculateArmPositionsCommandHandler;
    }());
    exports.CalculateArmPositionsCommandHandler = CalculateArmPositionsCommandHandler;
});
