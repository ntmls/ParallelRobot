export class Vector2 {
    x: number;
    y: number;
    
    public constructor(x?: number, y?: number) {
        this.x = x || 0;
        this.y = y || 0;
    }

    public magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public add(vect: Vector2) {
        return new Vector2(this.x + vect.x, this.y + vect.y);
    };
    
    public flip() {
        return new Vector2(-this.x, -this.y);
    };
    
    public normalize() {
        var len = this.magnitude();
        return new Vector2(this.x / len, this.y / len);
    };
    
    public dot(vect: Vector2) {
        return this.x * vect.x + this.y * vect.y;
    };
    
    public scale(scale: number) {
        return new Vector2(this.x * scale, this.y * scale);
    };

    public rotate(radians: number) {
        var ca = Math.cos(radians);
        var sa = Math.sin(radians);
        return new Vector2(ca * this.x - sa * this.y, sa * this.x + ca * this.y);
    };
}

 export module Angles {
    export function D2R(degrees: number): number {
        return degrees * (Math.PI / 180);
    };
    
    export function R2D(radians: number): number {
        return radians * (180 / Math.PI);
    };
}