"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drawable = void 0;
const shapes_1 = require("./shapes");
// ---------------- ???? ------------------
class Drawable {
    // constructor(circle:Circle, color:string, stroke:number);
    //What even am I doing
    constructor(ctx, object, arg1, arg2, arg3) {
        this._coord = { x: 0, y: 0 };
        this._dimensions = { x: 0, y: 0 };
        this._center = { x: 0, y: 0 };
        this._scale = { x: 1, y: 1 };
        this._color = '#000000';
        this._font = '24px serif';
        this._rotation = 0;
        this._stroke = 1;
        this._ctx = ctx;
        this.object = object;
        this._draw = () => { };
        this.recycle(object, arg1, arg2, arg3);
    }
    recycle(object, arg1, arg2, arg3) {
        this.object = object;
        if (typeof (object) === typeof (HTMLImageElement)) //I don't know if this works but I dont see why not
         {
            this._coord = arg1;
            this._scale = arg2;
            this._dimensions;
            this._draw = draw_image;
        }
        else if (typeof (object) === 'string') {
            this._coord = arg1;
            this._color = arg2;
            this._font = arg3;
            this._draw = draw_text;
        }
        else if ((0, shapes_1.isRect)(object)) {
            const rect = object;
            this._coord = { x: rect.x, y: rect.y };
            this._dimensions;
            this._color = arg1;
            this._stroke = arg2;
            this._draw = draw_rect;
        }
    }
    set coord(new_coords) { this._coord = new_coords; }
    ;
    set dimension(new_dimensions) { this._dimensions = new_dimensions; }
    ;
}
exports.Drawable = Drawable;
function draw_rect(context, rect) {
    if (rect._stroke == 0) {
        context.ctx.fillStyle = rect._color;
        context.ctx.fillRect(rect._coord.x, rect._coord.y, rect._dimensions.x, rect._dimensions.y);
    }
    else {
        context.ctx.strokeStyle = rect._color;
        context.ctx.lineWidth = rect._stroke;
        context.ctx.strokeRect(rect._coord.x, rect._coord.y, rect._dimensions.x, rect._dimensions.y);
    }
}
function draw_image(context, img) {
    context.ctx.setTransform(img._scale.x, 0, 0, img._scale.y, img._coord.x, img._coord.y); // sets scale and origin
    context.ctx.rotate(img._rotation);
    context.ctx.drawImage(img.object, img._coord.x, img._coord.y);
    context.ctx.setTransform(1, 0, 0, 1, 0, 0);
}
function draw_text(context, text) {
    // if (centeredX) {
    // 	x -= context.ctx.measureText(text).width / 2;
    // }
    // if (centeredY) {
    // 	y += parseInt(context.ctx.font) / 3;
    // }
    context.ctx.fillStyle = text._color;
    context.ctx.fillText(text.object, text._coord.x, text._coord.y);
}
