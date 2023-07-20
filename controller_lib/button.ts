import { Circle, Rectangle, Point, PointInCircle, PointInRect } from "./types/shapes.js";
import { TRIGGER_END, TRIGGER_HELD, TRIGGER_START } from "./macros.js";
import { Button } from "./types/triggerable.js";

const _buttons:Button[] = [];

// export const DEFAULTT_BUTTON_RECT:Button = new Button(<Rectangle>{x: 0, y:0, w:10, h:10,}, undefined, undefined, undefined)
export const buttons_len = () => _buttons.length;

export const buttons_log = () => console.log('log buttons', _buttons)

export const buttons_set = (state:boolean) => {
    for (let item of _buttons){
        item._active = state;
    }
}

export const buttons_flush = () => {
	_buttons.length = 0;
}
export const buttons_add = (button:Button) => {
	_buttons.push(button);
}

export const buttons_update = (touch:Point, touchType:number) =>{
	for (let item of _buttons){
        if (item._active)
        {
            if (item.tryTrigger(touch, touchType))
            {
                return ;
            }
        }
	}
}

