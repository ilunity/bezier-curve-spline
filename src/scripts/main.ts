import '../normalize.css';
import '../style.css';
import {Point} from "./point.ts";
import {Spline} from "./spline.ts";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const clearBtn = document.getElementById('clear-btn') as HTMLButtonElement;
const ctx = canvas.getContext('2d');


let points: Point[] = [];
const clearCanvas = (ctx: CanvasRenderingContext2D) => ctx.clearRect(0, 0, canvas.width, canvas.height);

const getMousePoint = (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    return new Point(event.clientX - rect.left, event.clientY - rect.top);
};

if (ctx) {
    clearBtn.addEventListener("click", () => {
        points = [];
        clearCanvas(ctx);
    });


    canvas.addEventListener("mousedown", function (event) {
        const newPoint = getMousePoint(event);
        points.push(newPoint);

        clearCanvas(ctx);
        points.forEach(point => point.paint(ctx));

        const spline = new Spline(points);
        spline.paint(ctx);
    });
}
