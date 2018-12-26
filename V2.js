function V2(x, y) {
    if (x === undefined) {
        this.x = 0;
    } else {
        this.x = x;
    }
    if (y === undefined) {
        this.y = 0;
    } else {
        this.y = y;
    }
}

var VADD = function(a, b) {
    return new V2(a.x + b.x, a.y + b.y);
};

var VFLIP = function(a) {
    return new V2(-a.x, -a.y);
};

var VLEN = function(a) {
    return Math.sqrt(a.x * a.x + a.y * a.y);
};

var VNORM = function(a) {
    var len = VLEN(a);
    return new V2(a.x / len, a.y / len);
};

var VMULT = function(vect, scale) {
    return new V2(vect.x * scale, vect.y * scale);
};

var VDOT = function(a, b) {
    return a.x * b.x + a.y * b.y;
};

var D2R = function(degrees) {
    return degrees * (Math.PI / 180);
};

var R2D = function(radians) {
    return radians * (180 / Math.PI);
};

var VROT = function(vect, radians) {
    var ca = Math.cos(radians);
    var sa = Math.sin(radians);
    return new V2(ca * vect.x - sa * vect.y, sa * vect.x + ca * vect.y);
};