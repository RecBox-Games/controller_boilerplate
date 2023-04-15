import { buttons_update } from "./button.js";
export const TOUCH_START = 1;
export const TOUCH_MOVE = 2;
export const TOUCH_END = 3;
export const checkAllFieldsExist = (correct, compare) => {
    const correctKeys = Object.keys(correct);
    const compKeys = Object.keys(compare);
    return correctKeys.every((val, i) => val == compKeys[i]) && correctKeys.length == compKeys.length;
};
export const handleClick = (x, y) => {
};
// Handle a single touch as it starts
export const handleTouchStart = (id, x, y) => {
    let msg = "TouchStart(" + x.toString() + "," + y.toString() + ")";
    // messages.push(msg);
    // //
    // image_drawables.push({
    //     type: 'image',
    //     image: logo,
    //     x: x,
    //     y: y,
    //     rotation: 0,
    // });
    // needs_draw = true;
    buttons_update({ x: x, y: y }, TOUCH_START);
};
// Handle a single touch that has moved
export const handleTouchMove = (id, x, y) => {
    // let msg = "TouchMove(" + x.toString() + "," + y.toString() + ")";
    // messages.push(msg);
    buttons_update({ x: x, y: y }, TOUCH_MOVE);
};
// Handle a single touch that has ended
export const handleTouchEnd = (id, x, y) => {
    // let msg = "TouchEnd(" + x.toString() + "," + y.toString() + ")";
    // messages.push(msg);
    buttons_update({ x: x, y: y }, TOUCH_END);
};
// Handle a single touch that has ended in an unexpected way
export const handleTouchCancel = (id, x, y) => {
    // let msg = "TouchCancel(" + x.toString() + "," + y.toString() + ")";
    // messages.push(msg);
};
