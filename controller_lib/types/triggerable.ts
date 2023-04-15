import { Rectangle, Circle, Point, isCircle, isRect, PointInCircle, PointInRect } from "./shapes.js";
import { NONE, TRIGGER_END, TRIGGER_HELD, TRIGGER_START } from "../macros.js";
import { TOUCH_END, TOUCH_START } from "../utils.js";
class Triggerable {
	_active: boolean = true;
	_state: number = NONE;
	_isTriggered: Function;
	_handleTrigger: Function;

	constructor(isTriggered:Function, handleTrigger:Function){
		this._isTriggered = isTriggered;
		this._handleTrigger = handleTrigger;
		this._state = NONE;
	}
	get state() {return this._state};
	get active() {return this._active};

	set active(val:boolean) {this._active = val};
    tryTrigger = (...args:any) =>
	{
		const current = this._isTriggered(this, args);
		//TODO Can do this with bit manipulation but idk how that goes in TS
		// and anyways this may be more readable ?
		if (this._state == NONE && current == true)
			this._state = TRIGGER_START
		else if (this._state == TRIGGER_START && current == false)
			this._state = TRIGGER_END;
		else if (this._state == TRIGGER_START && current == true)
			this._state = TRIGGER_HELD;
		else if (this._state == TRIGGER_END && current == false)
			this._state = NONE;
		else if (this._state == TRIGGER_END && current == true)
			this._state = TRIGGER_START;
		else if (this._state == TRIGGER_HELD && current == true)
			this._state = TRIGGER_HELD;
		else if (this._state == TRIGGER_HELD && current == false)
			this._state = TRIGGER_END;
		else
			this._state = NONE;
		if (this._state != NONE)
			this._handleTrigger(this, args)
	}

}


class  Button extends Triggerable{

	_boundingBox: Rectangle | Circle;
	_hoverCallback?: Function;
	_touchStartCallback?: Function;
	_touchEndCallback?: Function;

	constructor(boundingBox: Rectangle | Circle, hoverCallback:Function |undefined, touchStartCallback:Function | undefined, touchEndCallback:Function | undefined) {
		if (isRect(boundingBox))
			super(checkRectTriggered, handleButtonTriggered)
		else if (isCircle(boundingBox))
			super(checkCircleTriggered, handleButtonTriggered)
		else
			throw "Making a button from unknown type (not rectangle or Circle)"
		this._boundingBox = boundingBox;
		this._hoverCallback = hoverCallback;
		this._touchStartCallback = touchStartCallback;
		this._touchEndCallback = touchEndCallback;
	}

    tryTrigger = (touch:Point, touchType:number) =>
	{
		const current = this._isTriggered(this, touch);
		//TODO Can do this with bit manipulation but idk how that goes in TS
		// and anyways this may be more readable ?
        if (current)
            this._state = touchType;
		if (this._state != NONE)
			this._handleTrigger(this)
        // console.log("troggered", current, "event", touchType);
         if (touchType == TOUCH_END)
            this._state = NONE;
	}
}

export const handleButtonTriggered = (self: Button) => {
	if (self.state == TRIGGER_HELD && self._hoverCallback)
		self._hoverCallback(self);
	else if (self.state == TRIGGER_END && self._touchEndCallback)
		self._touchEndCallback(self);
	else if (self.state == TRIGGER_START && self._touchStartCallback)
		self._touchStartCallback(self);
}

export const checkCircleTriggered = (button: Button, mouse: Point) => {
	return PointInCircle(mouse, button._boundingBox as Circle);
}

export const checkRectTriggered = (button: Button, mouse: Point) => {
	return PointInRect(mouse, button._boundingBox as Rectangle);
}



export {Triggerable, Button}
