import { Circle, Rectangle, Point, PointInCircle, PointInRect } from "./types/shapes.js";
import { TRIGGER_END, TRIGGER_HELD, TRIGGER_START } from "./macros.js";
import { Button } from "./types/triggerable.js";

const _buttons:Button[] = [];

// export const DEFAULTT_BUTTON_RECT:Button = new Button(<Rectangle>{x: 0, y:0, w:10, h:10,}, undefined, undefined, undefined)

export const buttons_flush = () => {
	_buttons.length = 0;
}
export const buttons_add = (button:Button) => {
	_buttons.push(button);
}

export const buttons_update = (touch:Point, touchType:number) =>{
    console.log("updating buttons", _buttons);
	for (let item of _buttons){
		item.tryTrigger(touch, touchType);
	}
}

