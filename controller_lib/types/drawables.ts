import { Rectangle, Circle, Point, isCircle, isRect } from "./shapes.js";
import { Context } from "./context.js";
//  text : x, y, font, text,, center, color
//  imag : x, y, img, scale, center, rotation
//  rect : x,y, w, h, color, outline

interface DrawableRect extends Rectangle {
	x: number;
	y: number;
	w: number;
	h: number;
	color: string;
	stroke: number;
}

interface DrawableText {
	x: number;
	y: number;
	font: string;
	color: string;
	text:string;
}

interface DrawableImage {
	x: number;
	y: number;
	w: number;
	h: number;
	image: HTMLImageElement | null;
	scale: number;
	rotation: number;
}

export const DEFAULT_DRAWABLE_RECT:DrawableRect = {x: 0, y: 0, w : 0, h : 0, color : '#000000', stroke : 0};
export const DEFAULT_DRAWABLE_TEXT:DrawableText = {x: 0, y: 0, font: '24px serif', color : '#000000', text: "no_text"};
export const DEFAULT_DRAWABLE_IMG:DrawableImage = {x: 0, y: 0, w : 100, h : 100, scale : 1, rotation: 0, image: null};
// ---------------- ???? ------------------
class Drawable {
	_coord:Point = {x:0, y:0};
	_dimensions:Point = {x:0, y:0}
	_center: Point = {x:0, y:0};
	_scale: Point = {x: 1, y:1};
	_color: string = '#000000';
	_font: string = '24px serif';
	_rotation: number = 0;
	_stroke: number = 1;
	_ctx:Context;
	object: HTMLImageElement | string | Circle | Rectangle;
	draw: Function;

	constructor(ctx:Context, image:HTMLImageElement, coord:Point, scale:Point, dimensions:Point);
	constructor(ctx:Context, text:string,  coord:Point, color:string, font:string);
	constructor(ctx:Context, rect:Rectangle, color:string, stroke:number);
	// constructor(circle:Circle, color:string, stroke:number);
	//What even am I doing
	constructor(ctx:Context, object:HTMLImageElement | string | Circle | Rectangle, arg1:any, arg2:any, arg3?:any) {
		this._ctx = ctx;
		this.object = object;
		this.draw = () => {};
		this.recycle(object, arg1, arg2, arg3);
	}

	recycle(image:any, coord:Point, scale:Point, dimensions:Point) :void;
	recycle(text:any,  coord:Point, color:string, font:string) :void;
	recycle(rect:any, color:string, stroke:number) : void;

	recycle(object:any, arg1:any, arg2:any, arg3?:any) : void
	{
		this.object = object;
		if (typeof(object) === typeof(HTMLImageElement))//I don't know if this works but I dont see why not
		{
			this._coord = arg1;
			this._scale = arg2;
			this._dimensions
			this.draw = draw_image;
		}
		else if (typeof(object) === 'string')
		{
			this._coord = arg1;
			this._color = arg2;
			this._font = arg3;
			this.draw = draw_text;
		}
		else if (isRect(object))
		{
			const rect:Rectangle = object as Rectangle;
			this._coord = <Point>{x:rect.x, y:rect.y};
			this._dimensions
			this._color = arg1;
			this._stroke = arg2;
			this.draw = draw_rect;
		}
	}

	set coord (new_coords:Point) {this._coord = new_coords};
	set dimension (new_dimensions:Point) {this._dimensions = new_dimensions};
}

function draw_rect(context:Context, rect:Drawable) {
	if (rect._stroke == 0) {
		context.ctx.fillStyle = rect._color;
		context.ctx.fillRect(rect._coord.x, rect._coord.y, rect._dimensions.x, rect._dimensions.y);
	} else {
		context.ctx.strokeStyle = rect._color;
		context.ctx.lineWidth = rect._stroke;
		context.ctx.strokeRect(rect._coord.x, rect._coord.y, rect._dimensions.x, rect._dimensions.y);
	}
}

 function draw_image(context:Context, img:Drawable) {
	context.ctx.setTransform(img._scale.x, 0, 0, img._scale.y, img._coord.x, img._coord.y); // sets scale and origin
	context.ctx.rotate(img._rotation);
	context.ctx.drawImage(img.object as HTMLImageElement, img._coord.x, img._coord.y);
	context.ctx.setTransform(1,0,0,1,0,0);
}

function draw_text(context:Context, text:Drawable) {
	// if (centeredX) {
	// 	x -= context.ctx.measureText(text).width / 2;
	// }
	// if (centeredY) {
	// 	y += parseInt(context.ctx.font) / 3;
	// }
	context.ctx.fillStyle = text._color;
	context.ctx.fillText(text.object as string, text._coord.x, text._coord.y);
}


export {Drawable, DrawableImage, DrawableRect, DrawableText}
