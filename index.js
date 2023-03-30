/*let myArray = []; // Define an empty global array

function createObject() {
  const myObject = { // Define a new object inside the function
    id: 1,
    name: "John Doe",
    age: 30
  };
  
  myArray.push(myObject); // Append the new object to the global array
}

createObject(); // Call the function to create and append the object
console.log(myArray); // Output: [{id: 1, name: "John Doe", age: 30}]

// Access the object from the global array later
const myObjectFromArray = myArray[0];
console.log(myObjectFromArray); // Output: {id: 1, name: "John Doe", age: 30}
console.log('aight');
*/




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
ctx.fillStyle = "#000000";
ctx.font = "48px serif";
ctx.fillText("Touch", 100, 100);


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

    ws.addEventListener('message', (event) => {
	msg = event.data;
        handleMessage(msg);
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

    window.addEventListener('click', (event) => {
        handleClick(event.clientX, event.clientY);
    });

    function draw_drawable(drbl) {
        if (drbl.type == 'text') {
            ctx.fillStyle = "#000000";
            console.log('drawing');
            ctx.font = drbl.font;
            ctx.fillText(drbl.text, drbl.x, drbl.y);
        } else if (drbl.type == 'image') {
            // TODO
        } else {
            console.log("Drawable type '" + drbl.type.toString() + "' not implemented");
        }
    }
    
    function tick() {
        controlpadUpdate();
        let msgs = outgoingMessages();
        for (msg of msgs) {
            ws.send(msg);
        }
        let drbls = getDrawables();
        if (drbls.length > 0) {
            ctx.fillStyle = "#808080";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            for (drbl of drbls) {
                draw_drawable(drbl);
            }
        }
    }
    
    setInterval(tick, 33);
}