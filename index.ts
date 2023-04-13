import { init_context } from "./controller_lib/init";
import { cp_update } from "./controller_lib/update";

// interface BoardTile {
// 	drawab
// }

// interface Player {
// 	team:string,

// }

// const init_app = () => {

// }

const app = () => {

	cp_update();
	console.log("Hello");
}

window.onload = () => {
	init_context();
}

window.requestAnimationFrame(app);
//TODO: add layer to drawable & sort it before rendering + render functions
