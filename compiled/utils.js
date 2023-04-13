"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleTouchCancel = exports.handleTouchEnd = exports.handleTouchMove = exports.handleTouchStart = exports.handleClick = exports.checkAllFieldsExist = void 0;
const draw_1 = require("./draw");
const init_1 = require("./init");
const drawables_1 = require("./types/drawables");
const checkAllFieldsExist = (correct, compare) => {
    const correctKeys = Object.keys(correct);
    const compKeys = Object.keys(compare);
    return correctKeys.every((val, i) => val == compKeys[i]) && correctKeys.length == compKeys.length;
};
exports.checkAllFieldsExist = checkAllFieldsExist;
const handleClick = (x, y) => {
    (0, exports.handleTouchStart)(0, x, y);
};
exports.handleClick = handleClick;
// Handle a single touch as it starts
const handleTouchStart = (id, x, y) => {
    let msg = "TouchStart(" + x.toString() + "," + y.toString() + ")";
    // messages.push(msg);
    // //
    // image_drawables.push({
    //     type: 'image',
    //     image: logo_image,
    //     x: x,
    //     y: y,
    //     rotation: 0,
    // });
    // needs_draw = true;
};
exports.handleTouchStart = handleTouchStart;
// Handle a single touch that has moved
const handleTouchMove = (id, x, y) => {
    // let msg = "TouchMove(" + x.toString() + "," + y.toString() + ")";
    // messages.push(msg);
};
exports.handleTouchMove = handleTouchMove;
// Handle a single touch that has ended
const handleTouchEnd = (id, x, y) => {
    // let msg = "TouchEnd(" + x.toString() + "," + y.toString() + ")";
    // messages.push(msg);
    let ctx = (0, init_1.get_context)();
    let rect = { x: 0, y: 0, w: 10, h: 10 };
    let Crect = new drawables_1.Drawable(ctx, rect, "#FFFFF", 3);
    let Irect = Object.assign(Object.assign({}, rect), { color: "#FFFFF", stroke: 3 });
    (0, draw_1.addCList)(Crect);
    (0, draw_1.addIList)(Irect);
};
exports.handleTouchEnd = handleTouchEnd;
// Handle a single touch that has ended in an unexpected way
const handleTouchCancel = (id, x, y) => {
    // let msg = "TouchCancel(" + x.toString() + "," + y.toString() + ")";
    // messages.push(msg);
};
exports.handleTouchCancel = handleTouchCancel;
