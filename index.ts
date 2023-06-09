import { buttons_add } from "./controller_lib/button.js";
import { drawablesAdd, drawablesRenderAll } from "./controller_lib/draw.js";
import { get_context, init_context } from "./controller_lib/init.js";
import { DEFAULT_DRAWABLE_IMG, DrawableImage } from "./controller_lib/types/drawables.js";
import { Point, Rectangle } from "./controller_lib/types/shapes";
import { Button } from "./controller_lib/types/triggerable.js";
import { cp_update } from "./controller_lib/update.js";

interface Controller {
	left:DrawableImage,
	right:DrawableImage,
	up:DrawableImage,
	down:DrawableImage,
	exit:DrawableImage,
	enter:DrawableImage,
}

const controller:Controller = {
	left:{...DEFAULT_DRAWABLE_IMG},
	right:{...DEFAULT_DRAWABLE_IMG},
	up:{...DEFAULT_DRAWABLE_IMG},
	down:{...DEFAULT_DRAWABLE_IMG},
	exit:{...DEFAULT_DRAWABLE_IMG},
	enter:{...DEFAULT_DRAWABLE_IMG},
}

const init_controller = () => {
	const up:HTMLImageElement = new Image();
	const down:HTMLImageElement = new Image();
	const left:HTMLImageElement = new Image();
	const right:HTMLImageElement = new Image();
	const enter:HTMLImageElement = new Image();
	const exit:HTMLImageElement = new Image();


	up.addEventListener('load', () => {console.log('Loaded Arrow')});
	down.addEventListener('load', () => {console.log('Loaded Arrow')});
	left.addEventListener('load', () => {console.log('Loaded Arrow')});
	right.addEventListener('load', () => {console.log('Loaded Arrow')});
	enter.addEventListener('load', () => {console.log('Loaded enter')});
	exit.addEventListener('load', () => {console.log('Loaded exit')});

	up.src = 'resources/up.svg';
	down.src = 'resources/down.svg';
	left.src = 'resources/left.svg';
	right.src = 'resources/right.svg';
	enter.src = 'resources/enter.svg';
	exit.src = 'resources/exit.svg';

	controller.up.image = up;
	controller.down.image = down;
	controller.left.image = left;
	controller.right.image = right;
	controller.enter.image = enter;
	controller.exit.image = exit;

	size_controller();

	buttons_add(new Button(controller.enter.dst as Rectangle, undefined, undefined, () => {console.log("enter"); get_context().ws.send('')}))
	buttons_add(new Button(controller.exit.dst as Rectangle, undefined, undefined, () => {console.log("exit")}))
	buttons_add(new Button(controller.up.dst as Rectangle, undefined, undefined, () => {console.log("up")}))
	buttons_add(new Button(controller.down.dst as Rectangle, undefined, undefined, () => {console.log("down")}))
	buttons_add(new Button(controller.left.dst as Rectangle, undefined, undefined, () => {console.log("left")}))
	buttons_add(new Button(controller.right.dst as Rectangle, undefined, undefined, () => {console.log("right")}))
}

const size_landscape = () => {
	const dims = get_context().dimensions;
	const pad = 15;
	const enter_origin:Point  = {x: dims.x * 0.15 , y:dims.y * 0.5 - dims.y * 0.125};
	const exit_origin:Point  = {x: dims.x - dims.x * 0.35 , y:dims.y * 0.5 - dims.y * 0.25 };

	controller.enter.dst = {x: enter_origin.x, y: enter_origin.y, h: dims.y * 0.29, w: dims.y * 0.29};
	controller.exit.dst = {x: exit_origin.x, y: exit_origin.y, h: dims.y * 0.5, w: dims.y * 0.5};
	controller.left.dst = {...controller.enter.dst, x: controller.enter.dst.x - controller.enter.dst.w * 0.8 - pad};
	controller.right.dst = {...controller.enter.dst, x: controller.enter.dst.x + controller.enter.dst.w * 0.8 + pad};
	controller.down.dst = {...controller.enter.dst,x: controller.enter.dst.x - 5, y: controller.enter.dst.y + controller.enter.dst.h * 0.8 + pad};
	controller.up.dst = {...controller.enter.dst,x: controller.enter.dst.x + 5, y: controller.enter.dst.y - controller.enter.dst.h * 0.8 - pad};


}

const size_controller = () => {
	const ctx = get_context();

	if (ctx.dimensions.x > ctx.dimensions.y)
		size_landscape();
}


const app = () => {

	const ctx = get_context();
	cp_update();
	// console.log("Hello");
	if (ctx)
	{
		ctx.ctx.fillStyle = '#3c3c3d';
		ctx.ctx.fillRect(0,0, ctx.dimensions.x, ctx.dimensions.y);
	}
	drawablesAdd(controller.enter);
	drawablesAdd(controller.left);
	drawablesAdd(controller.right);
	drawablesAdd(controller.up);
	drawablesAdd(controller.down);
	drawablesAdd(controller.exit);
	drawablesRenderAll();
	window.requestAnimationFrame(app);
}

// window.addEventListener("orientationchange", (event) => {
//   console.log(
//     `the orientation of the device is now`, event.target
//   );
// });

window.onload = () => {
	init_context();
	init_controller();

	window.addEventListener('resize', (e) => {
		size_controller();
	})
}

window.requestAnimationFrame(app);
//TODO: add layer to+ drawable & sort it before rendering + render functions
