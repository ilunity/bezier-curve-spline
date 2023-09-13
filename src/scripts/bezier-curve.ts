import {Point} from "./point.ts";

export class BezierCurve {
    points: Point[];
    curvePointNumber = 1000;

    constructor(points: Point[]) {
        this.points = points.slice();
    }

    defineBezierCurve(): Point[] {
        const curvePoints: Point[] = [];
        for (let i = 0; i < this.curvePointNumber; i++) {
            const t = i / this.curvePointNumber;
            const newPoint = this.defineBezierPoint(t);
            curvePoints.push(newPoint);
        }

        return curvePoints;
    }

    defineBezierPoint(t: number): Point {
        const n = this.points.length - 1;
        return this.points.reduce((previousValue, currentValue, i) => {
            const newPoint = currentValue.multiply(this.bernsteinBasisPolynomial(i, n, t));
            return previousValue.sum(newPoint);
        }, new Point(0, 0));
    }

    bernsteinBasisPolynomial(i: number, n: number, t: number): number {
        return this.binomialCoefficient(i, n) * (t ** i) * ((1 - t) ** (n - i));
    }

    binomialCoefficient(i: number, n: number): number {
        const numerator = this.factorial(n);
        const denominator = this.factorial(i) * this.factorial(n - i);
        return (numerator / denominator);
    }

    factorial(num: number): number {
        if (num == 0) {
            return 1;
        }
        return num * this.factorial(num - 1);
    }

    paint(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        const bezierCurvePoint = this.defineBezierCurve();

        bezierCurvePoint.forEach(point => {
            ctx.rect(point.x, point.y, 1, 1,);
        });
        ctx.strokeStyle = "red";
        ctx.stroke();
    }
}
