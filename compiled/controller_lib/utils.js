import { addCList, addIList } from "./draw";
import { get_context } from "./init";
import { Drawable } from "./types/drawables";
export const checkAllFieldsExist = (correct, compare) => {
    const correctKeys = Object.keys(correct);
    const compKeys = Object.keys(compare);
    return correctKeys.every((val, i) => val == compKeys[i]) && correctKeys.length == compKeys.length;
};
export const handleClick = (x, y) => {
    handleTouchStart(0, x, y);
};
// Handle a single touch as it starts
export const handleTouchStart = (id, x, y) => {
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
// Handle a single touch that has moved
export const handleTouchMove = (id, x, y) => {
    // let msg = "TouchMove(" + x.toString() + "," + y.toString() + ")";
    // messages.push(msg);
};
// Handle a single touch that has ended
export const handleTouchEnd = (id, x, y) => {
    // let msg = "TouchEnd(" + x.toString() + "," + y.toString() + ")";
    // messages.push(msg);
    let ctx = get_context();
    let rect = { x: 0, y: 0, w: 10, h: 10 };
    let Crect = new Drawable(ctx, rect, "#FFFFF", 3);
    let Irect = { ...rect, color: "#FFFFF", stroke: 3 };
    addCList(Crect);
    addIList(Irect);
};
// Handle a single touch that has ended in an unexpected way
export const handleTouchCancel = (id, x, y) => {
    // let msg = "TouchCancel(" + x.toString() + "," + y.toString() + ")";
    // messages.push(msg);
};
