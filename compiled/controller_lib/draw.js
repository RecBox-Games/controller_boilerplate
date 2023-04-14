import { get_context } from "./init.js";
import { DEFAULT_DRAWABLE_IMG, DEFAULT_DRAWABLE_RECT, DEFAULT_DRAWABLE_TEXT } from "./types/drawables.js";
import { checkAllFieldsExist } from "./utils.js";
let Idrawables = [];
let Cdrawables = [];
export const printIList = () => {
    console.log("Ilist", Idrawables);
    for (let item of Idrawables)
        console.log(item);
};
export const printCList = () => {
    console.log("C lists", Cdrawables);
    for (let item of Idrawables)
        console.log(item);
};
export const drawIlist = () => {
    let ctx = get_context();
    // printIList();
    ctx.ctx.fillStyle = "#808080";
    ctx.ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let item of Idrawables) {
        draw_drawable(ctx, item);
    }
};
export const drawClist = () => {
    let ctx = get_context();
    for (let item of Cdrawables) {
        item.draw(ctx, item.object);
    }
};
export const addCList = (item) => {
    Cdrawables.push(item);
};
export const addIList = (item) => {
    Idrawables.push(item);
};
export const draw_drawable = (ctx, drawable) => {
    // console.log('resize fill', ctx);
    if (checkAllFieldsExist(DEFAULT_DRAWABLE_RECT, drawable)) {
        const rect = drawable;
        if (rect.stroke == 0) {
            ctx.ctx.fillStyle = rect.color;
            ctx.ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
        }
        else {
            ctx.ctx.strokeStyle = rect.color;
            ctx.ctx.lineWidth = rect.stroke;
            ctx.ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
        }
    }
    else if (checkAllFieldsExist(DEFAULT_DRAWABLE_IMG, drawable)) {
        const img = drawable;
        if (img.image) {
            ctx.ctx.setTransform(img.scale, 0, 0, img.scale, 0, 0); // sets scale and origin
            ctx.ctx.rotate(img.rotation);
            ctx.ctx.drawImage(img.image, img.x, img.y);
            ctx.ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    }
    else if (checkAllFieldsExist(DEFAULT_DRAWABLE_TEXT, drawable)) {
        const text = drawable;
        ctx.ctx.fillStyle = text.color;
        ctx.ctx.fillText(text.text, text.x, text.y);
    }
    else
        throw "Drawable types matches none";
};
// // set defaults then call the appropriate draw function depending on the type
// function draw_drawable(drbl) {
// 	// Object.assign(
// 	// 	{
// 	// 		//your defaults here
// 	// 	},
// 	// 	...drbl
// 	// )
//     if (! drbl) { console.log("none object for drawable");return; }
//     if (! drbl.type) { console.log("no type for drawable");return; }
//     if (drbl.type == 'text') {
//         if (! drbl.text) { console.log("no text for text drawable");return; }
//         if (! drbl.x) { drbl.x = 0; }
//         if (! drbl.y) { drbl.y = 0; }
//         if (! drbl.centeredX) { drbl.centeredX = false; }
//         if (! drbl.centeredY) { drbl.centeredY = false; }
//         if (! drbl.font) { drbl.font = '24px serif'; }
//         if (! drbl.color) { drbl.color = '#000000'; }
//         draw_text(drbl.text, drbl.x, drbl.y, drbl.font, drbl.color,
//                   drbl.centeredX, drbl.centeredY);
//     } else if (drbl.type == 'image') {
//         if (! drbl.image) { console.log("no image for image drawable");return; }
//         if (! drbl.image.complete) { return; }
//         if (drbl.image.naturalWidth === 0) { return; }
//         if (! drbl.x) { drbl.x = 0; }
//         if (! drbl.y) { drbl.y = 0; }
//         if (! drbl.scaleX) { drbl.scaleX = 1; }
//         if (! drbl.scaleY) { drbl.scaleY = 1; }
//         if (! drbl.centeredX) { drbl.centeredX = -drbl.image.width / 2; }
//         if (! drbl.centeredY) { drbl.centeredY = -drbl.image.height / 2; }
//         if (! drbl.rotation) { drbl.rotation = 0; }
//         draw_image(drbl.image, drbl.x, drbl.y, drbl.scaleX, drbl.scaleY,
//                    drbl.centeredX, drbl.centeredY, drbl.rotation);
//     } else if (drbl.type == 'rect') {
//         if (! drbl.x) { drbl.x = 0; }
//         if (! drbl.y) { drbl.y = 0; }
//         if (! drbl.w) { drbl.x = 10; }
//         if (! drbl.h) { drbl.y = 10; }
//         if (! drbl.color) { drbl.color = '#000000'; }
//         if (! drbl.outline) { drbl.outline = 0; }
//         draw_rect(drbl.x, drbl.y, drbl.w, drbl.h, drbl.color, drbl.outline);
//     } else {
//         console.log("Drawable type '" + drbl.type.toString() + "' not implemented");
//     }
// }
