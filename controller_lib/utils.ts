import { addCList, addIList } from "./draw.js";
import { get_context } from "./init.js";
import { DEFAULT_DRAWABLE_IMG, DEFAULT_DRAWABLE_TEXT, Drawable, DrawableImage, DrawableText } from "./types/drawables.js";
import { Context } from "./types/context.js";
import { Rectangle } from "./types/shapes.js";
import { DrawableRect } from "./types/drawables.js";

export const checkAllFieldsExist = (correct:any, compare:any) => {
	const correctKeys = Object.keys(correct);
	const compKeys = Object.keys(compare);
	return  correctKeys.every((val, i) => val == compKeys[i]) && correctKeys.length == compKeys.length;
}


export const handleClick = (x, y) => {
    // handleTouchStart(0, x, y);
	let logo = new Image();
	let ctx:Context = get_context();
	let rect:Rectangle = {x: x, y:y, w: 10, h:10};
	let Irect:DrawableRect = {...rect, x: x -10, color:"#FFFFFF", stroke:3}
	// addCList(Crect);

	let text:DrawableText = {...DEFAULT_DRAWABLE_TEXT,x:x, y:y, text: "Hello!"}
	console.log("should add", Irect);
	logo.src = "resources/logo.png";
    logo.onload = function () {
        console.log("loaded");
    };
	let image:DrawableImage = {...DEFAULT_DRAWABLE_IMG, x:x, y:y, image:logo};
	addIList(Irect);
	addIList(text);
	addIList(image);
}

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
}

// Handle a single touch that has moved
export const handleTouchMove = (id, x, y) => {
    // let msg = "TouchMove(" + x.toString() + "," + y.toString() + ")";
    // messages.push(msg);
}

// Handle a single touch that has ended
export const handleTouchEnd = (id, x, y) => {
    // let msg = "TouchEnd(" + x.toString() + "," + y.toString() + ")";
    // messages.push(msg);
	let ctx:Context = get_context();
	let rect:Rectangle = {x: 0, y:0, w: 10, h:10};
	let Crect:Drawable = new Drawable(ctx, rect, "#FFFFF", 3);
	let Irect:DrawableRect = {...rect, color:"#FFFFF", stroke:3}
	addCList(Crect);
	addIList(Irect);
}

// Handle a single touch that has ended in an unexpected way
export const handleTouchCancel = (id, x, y) => {
    // let msg = "TouchCancel(" + x.toString() + "," + y.toString() + ")";
    // messages.push(msg);
}
