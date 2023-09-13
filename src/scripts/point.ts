export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /** Returns new point multiplied by number */
    multiply(num: number) {
        return new Point(this.x * num, this.y * num);
    }

    /** Returns new point which is result of summation */
    sum(point: Point): Point {
        return new Point(this.x + point.x, this.y + point.y);
    }

    differanceTo(point: Point) {
        return new Point(this.x - point.x, this.y - point.y);
    }

    getOffsetPointTo(offset: Point) {
        return new Point(this.x + offset.x, this.y + offset.y);
    }

    definePointOnSegment(point: Point, proportion = 0.5) {
        const x = this.x + (point.x - this.x) * proportion;
        const y = this.y + (point.y - this.y) * proportion;

        return new Point(x, y);
    }

    distanceTo(point: Point) {
        const xDistance = Math.abs(this.x - point.x);
        const yDistance = Math.abs(this.y - point.y);
        return Math.sqrt(xDistance ** 2 + yDistance ** 2);
    }

    paint(ctx: CanvasRenderingContext2D, color = "blue") {
        ctx.beginPath();
        ctx.rect(this.x - 1, this.y - 1, 3, 3);
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}
