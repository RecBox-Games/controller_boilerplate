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

    const touch_start = (event) => {
        if (event.touches.length >= 2) {
            let t1 = event.touches[0];
            let t2 = event.touches[1];
            drag_start_x = (t1.pageX + t2.pageX)/2;
            drag_start_y = (t1.pageY + t2.pageY)/2;
            draw_dot(drag_start_x, drag_start_y);
        }
    };

    const touch_move = (event) => {
        if (event.touches.length >= 2) {
            let t1 = event.touches[0];
            let t2 = event.touches[1];
            let drag_x = (t1.pageX + t2.pageX)/2;
            let drag_y = (t1.pageY + t2.pageY)/2;
            let dx = drag_x - drag_start_x;
            let dy = drag_y - drag_start_y;        
            msg = dx.toString() + ', ' + dy.toString();
            send_datum(msg);
        }
    };

    const touch_end = (event) => {
        send_datum("touch end");
        draw_dot(event.touch.pageX, event.touch.pageY, 'green');
    };

    const touch_cancel = (event) => {
        send_datum("touch cancel");
    };

    window.addEventListener("touchstart", touch_start);
    window.addEventListener("touchmove", touch_move);
    window.addEventListener("touchend", touch_end);
    window.addEventListener("touchcancel", touch_cancel);
    
}
