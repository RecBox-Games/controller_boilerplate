import { Rectangle, Circle, Point, isCircle, isRect } from "./shapes.js";
import { Context } from "./context.js";
//  text : x, y, font, text,, center, color
//  imag : x, y, img, scale, center, rotation
//  rect : x,y, w, h, color, outline

interface DrawableRect{
	boundingBox:Rectangle,
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
	image: HTMLImageElement | null;
	scale: number;
	rotation: number;
}

export const DEFAULT_DRAWABLE_RECT:DrawableRect = {boundingBox:<Rectangle>{x: 0, y: 0, w : 0, h : 0}, color : '#000000', stroke : 0};
export const DEFAULT_DRAWABLE_TEXT:DrawableText = {x: 0, y: 0, font: '24px serif', color : '#000000', text: "no_text"};
export const DEFAULT_DRAWABLE_IMG:DrawableImage = {x: 0, y: 0, scale : 1, rotation: 0, image: null};

export { DrawableImage, DrawableRect, DrawableText}
