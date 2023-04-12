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


function screenChange() {
    canvas.width = window.innerWidth-1;
    canvas.height = window.innerHeight-1;

    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log('resize fill');
    onFlip(window.innerWidth, window.innerHeight);
}

window.onresize = screenChange;
window.onOrientationChange = screenChange;

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


    window.addEventListener("touchstart", (event) => {
        for (touch of event.changedTouches) {
            handleTouchStart(touch.identifier, touch.pageX, touch.pageY);
        }
		console.log("touch start")
    });

    window.addEventListener("touchmove", (event) => {
        for (touch of event.changedTouches) {
            handleTouchMove(touch.identifier, touch.pageX, touch.pageY);
        }
		console.log("touch move")
    });

    window.addEventListener("touchend", (event) => {
        for (touch of event.changedTouches) {
            handleTouchEnd(touch.identifier, touch.pageX, touch.pageY);
        }
		console.log("touch end")
    });

    window.addEventListener("touchcancel", (event) => {
        for (touch of event.changedTouches) {
            handleTouchCancel(touch.identifier, touch.pageX, touch.pageY);
        }
		console.log("touch cancel")
    });

    window.addEventListener('click', (event) => {
        handleClick(event.clientX, event.clientY);
		console.log("click ONE")
    });





    controlpadStart();
    setInterval(tick, 33);
}
