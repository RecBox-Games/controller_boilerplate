// -------- GameNite Controller App --------

// ---- Globals ----

var messages = [];
var logo_image = new Image();

// ---- onFlip ----

function onFlip(width, height) {
    SCREEN_WIDTH = width;
    SCREEN_HEIGHT = height;
    needs_draw = true;
}

// ---- Messages ----

// handle a single message from the console
function handleMessage(message) {
    console.log('got ' + message);
    text_drawables = [];
    const drbl = {
        type: 'text',
        text: message,
        font: '48px serif',
        x: 30,
        y: 100,
    };
    text_drawables.push(drbl);
    needs_draw = true;
}

// Specify the list of messages to be sent to the console
function outgoingMessages() {
    temp = messages;
    messages = [];
    return temp;
}

// function getDrawables() {
//     if (needs_draw) {
//         needs_draw = false;
//         return image_drawables.concat(text_drawables);
//     }
//     return [];
// }

// // ---- Touch Handlers ----

// handleClick should only be used for testing in PC browser

// ---- Start and Update ----

// Called once upon page load (load your resources here)
function controlpadStart(width, height) {
    SCREEN_WIDTH = width;
    SCREEN_HEIGHT = height;
    logo_image.src = "resources/logo.png";
    logo_image.onload = function () {
        console.log('loaded ' + this.width + ', ' + this.height);
        console.log('natural: ' + this.naturalWidth + ', ' + this.naturalHeight);
    };
}

// Called 30 times per second
