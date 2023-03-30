

const url_arg_str = window.location.search;
const url_params = new URLSearchParams(url_arg_str);
const subid = url_params.get('subid');
const box_ip = window.location.href.split('/')[2].split(':')[0];
console.log(subid);

// canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth-1;
canvas.height = window.innerHeight-1;

ctx.fillStyle = "#808080";
ctx.fillRect(0, 0, canvas.width, canvas.height);

window.onresize = (e) => {
    canvas.width = window.innerWidth-1;
    canvas.height = window.innerHeight-1;

    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log('resize fill');
}

// globals
let drag_start_x = 0;
let drag_start_y = 0;

// websocket and main
ws = new WebSocket("ws://" + box_ip + ":50079");

window.onload = () => {
    if (ws.readState == WebSocket.CLOSED) {
        ws = new WebSocket("ws://" + box_ip + ":50079");
    }
}
ws.onclose = (event) => {
    console.log("closed websocket");
    ws = new WebSocket("ws://" + box_ip + ":50079");    
}

// wait for websocket to connect
ws.onopen = (event) => {
    console.log("openned websocket")

    byte_array = new Uint8Array(1);
    byte_array[0] = subid;
    ws.send(byte_array.buffer);

    function send_datum(msg) {
	console.log('sending ' + msg);
	ws.send(msg);
    }

    ws.addEventListener('message', (event) => {
	msg = event.data;
	console.log('<' + msg + '>');
    });

    function draw_dot(x, y, color) {
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2*Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#000011';
        ctx.stroke();
        console.log("drew");
    }

    window.addEventListener("touchstart", (event) => {
        for (touch of event.changedTouches) {
            handleTouchStart(touch.identifier, touch.pageX, touch.pageY);
        }
    });
    
    window.addEventListener("touchmove", (event) => {
        for (touch of event.changedTouches) {
            handleTouchMove(touch.identifier, touch.pageX, touch.pageY);
        }
    });
    
    window.addEventListener("touchend", (event) => {
        for (touch of event.changedTouches) {
            handleTouchEnd(touch.identifier, touch.pageX, touch.pageY);
        }
    });
    
    window.addEventListener("touchcancel", (event) => {
        for (touch of event.changedTouches) {
            handleTouchCancel(touch.identifier, touch.pageX, touch.pageY);
        }
    });

    function tick() {
        let msgs = outgoingMessages()
        for (msg of msgs) {
            send_datum(msg);
        }
    }
    
    setInterval(tick, 33);
}
