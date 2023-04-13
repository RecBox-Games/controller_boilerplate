import { Context } from "./types/context";
import { Point } from "./types/shapes";
import { handleTouchCancel, handleClick, handleTouchEnd, handleTouchMove, handleTouchStart } from "./utils";
let context:Context;



// globals
let drag_start_x = 0;
let drag_start_y = 0;

// websocket and main
export const get_context = () :Context => context;

export const init_context = () => {
	const canvas:HTMLCanvasElement = document.querySelector("canvas") as HTMLCanvasElement;
	context = {
		canvas: canvas,
		ctx: canvas.getContext("2d") as CanvasRenderingContext2D,
		dimensions: <Point>{x:  window.innerWidth - 1, y:  window.innerHeight - 1},
		backgroundColor: "#808080"
	};
    if (ws.readyState == WebSocket.CLOSED) {
        ws = new WebSocket("ws://" + box_ip + ":50079");
    }

	context.ctx.fillStyle = "#808080";
	context.ctx.fillRect(0, 0, canvas.width, canvas.height);
	context.ctx.fillStyle = "#000000";
	context.ctx.font = "48px serif";
	context.ctx.fillText("Touch", 100, 100);
}
// wait for websocket to connect
window.onresize = screenChange;
window.onorientationchange = screenChange;

function screenChange() {
    context.canvas.width = window.innerWidth-1;
    context.canvas.height = window.innerHeight-1;

    context.ctx.fillStyle = "#808080";
    context.ctx.fillRect(0, 0, context.canvas.width, context.canvas.height);
    console.log('resize fill');
    // onFlip(window.innerWidth, window.innerHeight);
}


window.addEventListener("touchstart", (event) => {
	for (let touch of event.changedTouches) {
		handleTouchStart(touch.identifier, touch.pageX, touch.pageY);
	}
	console.log("touch start")
});

window.addEventListener("touchmove", (event) => {
	for (let touch of event.changedTouches) {
		handleTouchMove(touch.identifier, touch.pageX, touch.pageY);
	}
	console.log("touch move")
});

window.addEventListener("touchend", (event) => {
	for (let touch of event.changedTouches) {
		handleTouchEnd(touch.identifier, touch.pageX, touch.pageY);
	}
	console.log("touch end")
});

window.addEventListener("touchcancel", (event) => {
	for (let touch of event.changedTouches) {
		handleTouchCancel(touch.identifier, touch.pageX, touch.pageY);
	}
	console.log("touch cancel")
});

window.addEventListener('click', (event) => {
	handleClick(event.clientX, event.clientY);
	console.log("click ONE")
});
