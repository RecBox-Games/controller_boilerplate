import { Rectangle, Circle, Point, isCircle, isRect, PointInCircle, PointInRect } from "./shapes.js";
import { NONE, TRIGGER_END, TRIGGER_HELD, TRIGGER_START } from "../macros.js";
import { TOUCH_END, TOUCH_START, checkAllFieldsExist } from "../utils.js";
import { DEFAULT_DRAWABLE_IMG, DEFAULT_DRAWABLE_RECT, DEFAULT_DRAWABLE_TEXT, DrawableImage, DrawableRect, DrawableText } from "./drawables.js";
class Triggerable {
	_active: boolean = true;
	_state: number = NONE;
	_isTriggered: Function;
	_handleTrigger: Function;
    data?: any;

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

//TODO add a drawble optional field to buttons
class  Button extends Triggerable{

	_boundingBox: Rectangle | Circle;
	_hoverCallback?: Function;
	_touchStartCallback?: Function;
	_touchEndCallback?: Function;
    drawable?: DrawableText|DrawableImage|DrawableRect;

	constructor(boundingBox: Rectangle | Circle, hoverCallback:Function |undefined, touchStartCallback:Function | undefined, touchEndCallback:Function | undefined) {
        let fn;

        if (isRect(boundingBox))
            fn = checkRectTriggered;
		else if (isCircle(boundingBox))
            fn = checkCircleTriggered
		else
			throw "Making a button from unknown type (not rectangle or Circle)"
        super(fn, handleButtonTriggered)
		this._boundingBox = boundingBox;
		this._hoverCallback = hoverCallback;
		this._touchStartCallback = touchStartCallback;
		this._touchEndCallback = touchEndCallback;
	}

    set_drawable = (drawable: DrawableText|DrawableImage|DrawableRect, linkBoudningBox:boolean) =>
    {
        this.drawable = drawable;
        if (linkBoudningBox)
        {
            if (checkAllFieldsExist(DEFAULT_DRAWABLE_RECT,this.drawable))
                (this.drawable as DrawableRect).boundingBox = (this._boundingBox as Rectangle);
            if (checkAllFieldsExist(DEFAULT_DRAWABLE_IMG,this.drawable))
                (this.drawable as DrawableImage).dst = (this._boundingBox as Rectangle);
            if (checkAllFieldsExist(DEFAULT_DRAWABLE_TEXT,this.drawable))
                (this.drawable as DrawableText).boundingBox = (this._boundingBox as Rectangle);
        }
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
        return current;
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
