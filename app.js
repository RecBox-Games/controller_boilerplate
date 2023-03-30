
var messages = [];
var drawables = [];
var needs_draw = false;

function handleMessage(message) {
    
    drawables = [];
    const drbl = {
        type: 'text',
        text: message,
        font: '48px serif',
        x: 30,
        y: 100,
    };
    drawables.push(drbl);
    needs_draw = true;
}

function outgoingMessages() {
    temp = messages;
    messages = [];
    return temp;
}

function getDrawables() {
    if (needs_draw) {
        needs_draw = false;
        return drawables;
    }
    return [];
}

function handleClick(x, y) {
    let msg = "Click(" + x.toString() + "," + y.toString() + ")";
    messages.push(msg);
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

function controlpadStart() {

}

function controlpadUpdate() {
    let x = 0;
}
