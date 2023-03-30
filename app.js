
let messages = [];


function outgoingMessages() {
    temp = messages;
    messages = [];
    return temp;
}

function handleTouchStart(id, x, y) {
    let msg = "TouchStart(" + x.toString() + "," + y.toString() + ")";
    messages.push(msg);
}

function handleTouchMove(id, x, y) {
    let msg = "TouchMove(" + x.toString() + "," + y.toString() + ")";
    messages.push(msg);
}

function handleTouchEnd(id, x, y) {
    let msg = "TouchEnd(" + x.toString() + "," + y.toString() + ")";
    messages.push(msg);
}

function handleTouchCancel(id, x, y) {
    let msg = "TouchCancel(" + x.toString() + "," + y.toString() + ")";
    messages.push(msg);
}
