import {Point} from "./point.ts";
import {BezierCurve} from "./bezier-curve.ts";

export class Spline {
    points: Point[];

    constructor(points: Point[]) {
        this.points = points;
    }

    defineMiddlePoints(): Point[] {
        const middlePoints: Point[] = [];

        for (let i = 0; i < this.points.length - 1; i++) {
            const middlePoint = this.points[i].definePointOnSegment(this.points[i + 1]);
            middlePoints.push(middlePoint);
        }

        return middlePoints;
    }

    defineProportionalPoints(middlePoints: Point[]) {
        const proportionalPoints: Point[] = [];

        for (let i = 0; i < this.points.length - 2; i++) {
            const firstSegmentDistance = this.points[i].distanceTo(this.points[i + 1]);
            const secondSegmentDistance = this.points[i + 1].distanceTo(this.points[i + 2]);
            const proportion = firstSegmentDistance / (firstSegmentDistance + secondSegmentDistance);

            const proportionalPoint = middlePoints[i].definePointOnSegment(middlePoints[i + 1], proportion);
            proportionalPoints.push(proportionalPoint);
        }

        return proportionalPoints;
    }

    defineAuxillaryPoints(middlePoints: Point[], proportionalPoints: Point[]) {
        const auxillaryPoints: Point[] = [];

        auxillaryPoints.push(this.points[0]);
        for (let i = 0; i < proportionalPoints.length; i++) {
            const pointsDifferance = this.points[i + 1].differanceTo(proportionalPoints[i]);
            const firstNewAuxillaryPoint = middlePoints[i].getOffsetPointTo(pointsDifferance);
            const secondNewAuxillaryPoint = middlePoints[i + 1].getOffsetPointTo(pointsDifferance);

            auxillaryPoints.push(firstNewAuxillaryPoint, secondNewAuxillaryPoint);
        }
        auxillaryPoints.push(this.points[this.points.length - 1]);

        return auxillaryPoints;
    }

    paint(ctx: CanvasRenderingContext2D) {
        const middlePoints = this.defineMiddlePoints();
        const proportionalPoints = this.defineProportionalPoints(middlePoints);
        const auxillaryPoints = this.defineAuxillaryPoints(middlePoints, proportionalPoints);

        const bezierCurves: BezierCurve[] = [];

        for (let i = 0; i < this.points.length - 1; i++) {
            const newBezierCurve = new BezierCurve([
                this.points[i],
                auxillaryPoints[2 * i],
                auxillaryPoints[2 * i + 1],
                this.points[i + 1],
            ]);

            bezierCurves.push(newBezierCurve);
        }

        bezierCurves.forEach(bezierCurve => bezierCurve.paint(ctx));
    }
}
