var V2 = /** @class */ (function () {
    function V2(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    V2.prototype.magnitude = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    V2.prototype.add = function (vect) {
        return new V2(this.x + vect.x, this.y + vect.y);
    };
    ;
    V2.prototype.flip = function () {
        return new V2(-this.x, -this.y);
    };
    ;
    V2.prototype.normalize = function () {
        var len = this.magnitude();
        return new V2(this.x / len, this.y / len);
    };
    ;
    V2.prototype.dot = function (vect) {
        return this.x * vect.x + this.y * vect.y;
    };
    ;
    V2.prototype.scale = function (scale) {
        return new V2(this.x * scale, this.y * scale);
    };
    ;
    V2.prototype.rotate = function (radians) {
        var ca = Math.cos(radians);
        var sa = Math.sin(radians);
        return new V2(ca * this.x - sa * this.y, sa * this.x + ca * this.y);
    };
    ;
    return V2;
}());
var D2R = function (degrees) {
    return degrees * (Math.PI / 180);
};
var R2D = function (radians) {
    return radians * (180 / Math.PI);
};
