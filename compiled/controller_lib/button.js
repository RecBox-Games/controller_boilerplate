const _buttons = [];
// export const DEFAULTT_BUTTON_RECT:Button = new Button(<Rectangle>{x: 0, y:0, w:10, h:10,}, undefined, undefined, undefined)
export const buttons_flush = () => {
    _buttons.length = 0;
};
export const buttons_add = (button) => {
    _buttons.push(button);
};
export const buttons_update = (touch, touchType) => {
    console.log("updating buttons", _buttons);
    for (let item of _buttons) {
        item.tryTrigger(touch, touchType);
    }
};
