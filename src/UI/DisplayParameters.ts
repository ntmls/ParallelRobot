import { Vector2 } from "../Core/Vector2";

export class DisplayParams {
    scale: number = 20;
    offset: Vector2 = new Vector2();

    public physicalToScreen(point: any) {
        var scaled = point.scale(this.scale);
        return scaled.add(this.offset);
    }
    
    public screenToPhysical(point: any) {
        var vect = new Vector2(point.x, point.y);
        var offset = vect.add(this.offset.flip());
        return offset.scale(1 / this.scale);
    }
};