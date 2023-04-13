"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = exports.Triggerable = void 0;
const shapes_1 = require("./shapes");
const macros_1 = require("../macros");
class Triggerable {
    constructor(isTriggered, handleTrigger) {
        this._active = true;
        this.setTriggerState = () => {
            const current = this._isTriggered(this);
            //TODO Can do this with bit manipulation but idk how that goes in TS
            // and anyways this may be more readable ?
            if (this._state == macros_1.NONE && current == true)
                this._state = macros_1.TRIGGER_START;
            else if (this._state == macros_1.TRIGGER_START && current == false)
                this._state = macros_1.TRIGGER_END;
            else if (this._state == macros_1.TRIGGER_START && current == true)
                this._state = macros_1.TRIGGER_HELD;
            else if (this._state == macros_1.TRIGGER_END && current == false)
                this._state = macros_1.NONE;
            else if (this._state == macros_1.TRIGGER_END && current == true)
                this._state = macros_1.TRIGGER_START;
            else if (this._state == macros_1.TRIGGER_HELD && current == true)
                this._state = macros_1.TRIGGER_HELD;
            else if (this._state == macros_1.TRIGGER_HELD && current == false)
                this._state = macros_1.TRIGGER_END;
            else
                this._state = macros_1.NONE;
        };
        this._isTriggered = isTriggered;
        this._handleTrigger = handleTrigger;
    }
    get state() { return this._state; }
    ;
    get active() { return this._active; }
    ;
    set active(val) { this._active = val; }
    ;
}
exports.Triggerable = Triggerable;
function checkCircleTriggered(box, mouse) {
    return (0, shapes_1.PointInCircle)(mouse, box);
}
function checkRectTriggered(box, mouse) {
    return (0, shapes_1.PointInRect)(mouse, box);
}
function handleButtonTriggered(self) {
    if (self.state == macros_1.TRIGGER_HELD)
        self._hoverCallback(self);
    else if (self.state == macros_1.TRIGGER_END)
        self._touchEndCallback(self);
    else if (self.state == macros_1.TRIGGER_START)
        self._touchStartCallback(self);
}
class Button extends Triggerable {
    constructor(boundingBox, hoverCallback, touchStartCallback, touchEndCallback) {
        if ((0, shapes_1.isRect)(boundingBox))
            super(checkCircleTriggered, handleButtonTriggered);
        else if ((0, shapes_1.isCircle)(boundingBox))
            super(checkRectTriggered, handleButtonTriggered);
        else
            throw "Making a button from unknown type (not rectangle or Circle)";
        this._boundingBox = boundingBox;
        this._hoverCallback = hoverCallback;
        this._touchStartCallback = touchStartCallback;
        this._touchEndCallback = touchEndCallback;
    }
}
exports.Button = Button;
