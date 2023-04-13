"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addIList = exports.addCList = exports.printCList = exports.printIList = void 0;
let Idrawables = [];
let Cdrawables = [];
const printIList = () => {
    for (let item of Idrawables)
        console.log(item);
};
exports.printIList = printIList;
const printCList = () => {
    for (let item of Idrawables)
        console.log(item);
};
exports.printCList = printCList;
const addCList = (item) => {
    Cdrawables.push(item);
};
exports.addCList = addCList;
const addIList = (item) => {
    Idrawables.push(item);
};
exports.addIList = addIList;
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
