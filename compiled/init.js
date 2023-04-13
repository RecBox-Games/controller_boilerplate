"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_context = void 0;
const utils_1 = require("./utils");
let context;
// globals
let drag_start_x = 0;
let drag_start_y = 0;
// websocket and main
const get_context = () => context;
exports.get_context = get_context;
window.onload = () => {
    const canvas = document.querySelector("canvas");
    context = {
        canvas: canvas,
        ctx: canvas.getContext("2d"),
        dimensions: { x: window.innerWidth - 1, y: window.innerHeight - 1 },
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
};
// wait for websocket to connect
window.onresize = screenChange;
window.onorientationchange = screenChange;
function screenChange() {
    context.canvas.width = window.innerWidth - 1;
    context.canvas.height = window.innerHeight - 1;
    context.ctx.fillStyle = "#808080";
    context.ctx.fillRect(0, 0, context.canvas.width, context.canvas.height);
    console.log('resize fill');
    // onFlip(window.innerWidth, window.innerHeight);
}
window.addEventListener("touchstart", (event) => {
    for (let touch of event.changedTouches) {
        (0, utils_1.handleTouchStart)(touch.identifier, touch.pageX, touch.pageY);
    }
    console.log("touch start");
});
window.addEventListener("touchmove", (event) => {
    for (let touch of event.changedTouches) {
        (0, utils_1.handleTouchMove)(touch.identifier, touch.pageX, touch.pageY);
    }
    console.log("touch move");
});
window.addEventListener("touchend", (event) => {
    for (let touch of event.changedTouches) {
        (0, utils_1.handleTouchEnd)(touch.identifier, touch.pageX, touch.pageY);
    }
    console.log("touch end");
});
window.addEventListener("touchcancel", (event) => {
    for (let touch of event.changedTouches) {
        (0, utils_1.handleTouchCancel)(touch.identifier, touch.pageX, touch.pageY);
    }
    console.log("touch cancel");
});
window.addEventListener('click', (event) => {
    (0, utils_1.handleClick)(event.clientX, event.clientY);
    console.log("click ONE");
});
