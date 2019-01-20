define(["require", "exports", "../Core/Vector2"], function (require, exports, Vector2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DisplayParams = /** @class */ (function () {
        function DisplayParams() {
            this.scale = 20;
            this.offset = new Vector2_1.Vector2();
        }
        DisplayParams.prototype.physicalToScreen = function (point) {
            var scaled = point.scale(this.scale);
            return scaled.add(this.offset);
        };
        DisplayParams.prototype.screenToPhysical = function (point) {
            var vect = new Vector2_1.Vector2(point.x, point.y);
            var offset = vect.add(this.offset.flip());
            return offset.scale(1 / this.scale);
        };
        return DisplayParams;
    }());
    exports.DisplayParams = DisplayParams;
    ;
});
