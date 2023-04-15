// import { DEFAULTT_BUTTON_RECT, buttons_add } from "./button.js";
import { buttons_add } from "./button.js";
import { drawablesAdd } from "./draw.js";
import { DEFAULT_DRAWABLE_RECT } from "./types/drawables.js";
import { Button } from "./types/triggerable.js";
import { handleTouchCancel, handleClick, handleTouchEnd, handleTouchMove, handleTouchStart } from "./utils.js";
let context;
// globals
let drag_start_x = 0;
let drag_start_y = 0;
// websocket and main
export const get_context = () => context;
export const init_context = () => {
    // (document.querySelector("body")as HTMLBodyElement).requestFullscreen();
    const canvas = document.querySelector("canvas");
    const url_arg_str = window.location.search;
    const url_params = new URLSearchParams(url_arg_str);
    const subid = url_params.get('subid');
    const box_ip = window.location.href.split('/')[2].split(':')[0];
    const rect = { x: 0, y: 0, w: 100, h: 100 };
    const button = new Button(rect, undefined, undefined, undefined);
    const sprite = { ...DEFAULT_DRAWABLE_RECT, boundingBox: rect };
    console.log(subid);
    let ws = new WebSocket("ws://" + box_ip + ":50079");
    context = {
        canvas: canvas,
        ctx: canvas.getContext("2d"),
        dimensions: { x: canvas.width, y: canvas.width },
        ws: ws,
        subid: subid,
        box_ip: box_ip
    };
    // if (ws.readyState == WebSocket.CLOSED) {
    //     ws = new WebSocket("ws://" + box_ip + ":50079");
    // }
    buttons_add(button);
    button._hoverCallback = () => console.log("Hover");
    button._touchStartCallback = () => console.log("Start");
    button._touchEndCallback = () => console.log("End");
    button._boundingBox = sprite.boundingBox;
    drawablesAdd(sprite);
    window.onload = () => {
        context.dimensions.x = window.innerWidth;
        context.dimensions.y = window.innerHeight;
        // if (context.ws.readyState == WebSocket.CLOSED) {
        // 	context.ws = new WebSocket("ws://" + box_ip + ":50079");
        // }
    };
    context.ws.onclose = (event) => {
        console.log("closed websocket");
        ws = new WebSocket("ws://" + box_ip + ":50079");
    };
    // wait for websocket to connect
    context.ws.onopen = (event) => {
        console.log("openned websocket");
        // let byte_array: Uint8Array = new Uint8Array(1);
        // byte_array[0] = subid;
        // context.ws.send(byte_array.buffer);
        context.ws.addEventListener('message', (event) => {
            // let msg = event.data;
            //     handleMessage(msg);
        });
    };
};
// window.onload = () => {
//     if (context.ws.readyState == WebSocket.CLOSED) {
//         context.ws = new WebSocket("ws://" + box_ip + ":50079");
//     }
// }
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
        handleTouchStart(touch.identifier, touch.pageX, touch.pageY);
    }
    console.log("touch start");
});
window.addEventListener("touchmove", (event) => {
    for (let touch of event.changedTouches) {
        handleTouchMove(touch.identifier, touch.pageX, touch.pageY);
    }
    console.log("touch move");
});
window.addEventListener("touchend", (event) => {
    for (let touch of event.changedTouches) {
        handleTouchEnd(touch.identifier, touch.pageX, touch.pageY);
    }
    console.log("touch end");
});
window.addEventListener("touchcancel", (event) => {
    for (let touch of event.changedTouches) {
        handleTouchCancel(touch.identifier, touch.pageX, touch.pageY);
    }
    console.log("touch cancel");
});
window.addEventListener('click', (event) => {
    handleClick(event.clientX, event.clientY);
    console.log("click ONE");
});
