import { buttons_add } from "./controller_lib/button.js";
import { drawablesAdd, drawablesRenderAll } from "./controller_lib/draw.js";
import { get_context, init_context } from "./controller_lib/init.js";
import { DEFAULT_DRAWABLE_IMG, DrawableImage } from "./controller_lib/types/drawables.js";
import { Point, Rectangle } from "./controller_lib/types/shapes";
import { Button } from "./controller_lib/types/triggerable.js";
import { cp_update } from "./controller_lib/update.js";

const app = () => {
	cp_update();
	window.requestAnimationFrame(app);
}


window.onload = () => {
	init_context();

}

window.requestAnimationFrame(app);
