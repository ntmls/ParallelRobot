define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Vector2 = /** @class */ (function () {
        function Vector2(x, y) {
            this.x = x || 0;
            this.y = y || 0;
        }
        Vector2.prototype.magnitude = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        Vector2.prototype.add = function (vect) {
            return new Vector2(this.x + vect.x, this.y + vect.y);
        };
        ;
        Vector2.prototype.flip = function () {
            return new Vector2(-this.x, -this.y);
        };
        ;
        Vector2.prototype.normalize = function () {
            var len = this.magnitude();
            return new Vector2(this.x / len, this.y / len);
        };
        ;
        Vector2.prototype.dot = function (vect) {
            return this.x * vect.x + this.y * vect.y;
        };
        ;
        Vector2.prototype.scale = function (scale) {
            return new Vector2(this.x * scale, this.y * scale);
        };
        ;
        Vector2.prototype.rotate = function (radians) {
            var ca = Math.cos(radians);
            var sa = Math.sin(radians);
            return new Vector2(ca * this.x - sa * this.y, sa * this.x + ca * this.y);
        };
        ;
        return Vector2;
    }());
    exports.Vector2 = Vector2;
    var Angles;
    (function (Angles) {
        function D2R(degrees) {
            return degrees * (Math.PI / 180);
        }
        Angles.D2R = D2R;
        ;
        function R2D(radians) {
            return radians * (180 / Math.PI);
        }
        Angles.R2D = R2D;
        ;
    })(Angles = exports.Angles || (exports.Angles = {}));
});
