let test_array:Number[] = [];

 const get_test_arr = () => {
	return test_array;
}

 const  test_fn = () =>
{
	return test_array.length;
}
 const  update_test_fn = () =>
{
	return test_array.push(42);
}

export {get_test_arr, test_fn, update_test_fn}
// function draw_rect(x, y, w, h, color, outline) {
//         if (outline == 0) {
//             ctx.fillStyle = color;
//             ctx.fillRect(x, y, w, h);
//         } else {
//             ctx.strokeStyle = color;
//             ctx.lineWidth = outline;
//             ctx.strokeRect(x, y, w, h);
//         }
//     }

//  function draw_image(image, x, y, scalex, scaley, cx, cy, rotation) {
//         ctx.setTransform(scalex, 0, 0, scaley, x, y); // sets scale and origin
//         ctx.rotate(rotation);
//         ctx.drawImage(image, cx, cy);
//         ctx.setTransform(1,0,0,1,0,0);
//     }

//     function draw_text(text, x, y, font, color, centeredX, centeredY) {
//         ctx.font = font;
//         if (centeredX) {
//             x -= ctx.measureText(text).width / 2;
//         }
//         if (centeredY) {
//             y += parseInt(ctx.font) / 3;
//         }
//         ctx.fillStyle = color;
//         ctx.fillText(text, x, y);
//     }
//     // set defaults then call the appropriate draw function depending on the type
//     function draw_drawable(drbl) {
// 		// Object.assign(
// 		// 	{
// 		// 		//your defaults here
// 		// 	},
// 		// 	...drbl
// 		// )

//         if (! drbl) { console.log("none object for drawable");return; }
//         if (! drbl.type) { console.log("no type for drawable");return; }
//         if (drbl.type == 'text') {
//             if (! drbl.text) { console.log("no text for text drawable");return; }
//             if (! drbl.x) { drbl.x = 0; }
//             if (! drbl.y) { drbl.y = 0; }
//             if (! drbl.centeredX) { drbl.centeredX = false; }
//             if (! drbl.centeredY) { drbl.centeredY = false; }
//             if (! drbl.font) { drbl.font = '24px serif'; }
//             if (! drbl.color) { drbl.color = '#000000'; }
//             draw_text(drbl.text, drbl.x, drbl.y, drbl.font, drbl.color,
//                       drbl.centeredX, drbl.centeredY);
//         } else if (drbl.type == 'image') {
//             if (! drbl.image) { console.log("no image for image drawable");return; }
//             if (! drbl.image.complete) { return; }
//             if (drbl.image.naturalWidth === 0) { return; }
//             if (! drbl.x) { drbl.x = 0; }
//             if (! drbl.y) { drbl.y = 0; }
//             if (! drbl.scaleX) { drbl.scaleX = 1; }
//             if (! drbl.scaleY) { drbl.scaleY = 1; }
//             if (! drbl.centeredX) { drbl.centeredX = -drbl.image.width / 2; }
//             if (! drbl.centeredY) { drbl.centeredY = -drbl.image.height / 2; }
//             if (! drbl.rotation) { drbl.rotation = 0; }
//             draw_image(drbl.image, drbl.x, drbl.y, drbl.scaleX, drbl.scaleY,
//                        drbl.centeredX, drbl.centeredY, drbl.rotation);
//         } else if (drbl.type == 'rect') {
//             if (! drbl.x) { drbl.x = 0; }
//             if (! drbl.y) { drbl.y = 0; }
//             if (! drbl.w) { drbl.x = 10; }
//             if (! drbl.h) { drbl.y = 10; }
//             if (! drbl.color) { drbl.color = '#000000'; }
//             if (! drbl.outline) { drbl.outline = 0; }
//             draw_rect(drbl.x, drbl.y, drbl.w, drbl.h, drbl.color, drbl.outline);
//         } else {
//             console.log("Drawable type '" + drbl.type.toString() + "' not implemented");
//         }
//     }

//     function tick() {
//         controlpadUpdate();
//         let msgs = outgoingMessages();
//         for (msg of msgs) {
//             console.log("sending <" + msg + ">");
//             ws.send(msg);
//         }
//         let drbls = getDrawables();
//         if (drbls.length > 0) {
//             ctx.fillStyle = "#808080";
//             ctx.fillRect(0, 0, canvas.width, canvas.height);
//             for (drbl of drbls) {
//                 draw_drawable(drbl);
//             }
//         }
//     }
