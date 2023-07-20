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
	coords:Point;
    boundingBox:Rectangle;
    center:boolean;
    fill:boolean;
	font: string;
	color: string;
	text:string;
}

interface DrawableImage {
	dst:Rectangle | null,
    src:Rectangle | null,
	image: HTMLImageElement | null;
	scale: number;
	rotation: number;
}

export const DEFAULT_DRAWABLE_RECT:DrawableRect = {boundingBox:{x: 0, y: 0, w : 0, h : 0}, color : '#000000', stroke : 0};
export const DEFAULT_DRAWABLE_TEXT:DrawableText = {coords:{x: 0, y: 0}, boundingBox:{x: 0, y: 0, w : 0, h : 0}, center:true, fill: false, font: '24px serif', color : '#000000', text: "no_text"};
export const DEFAULT_DRAWABLE_IMG:DrawableImage = {src:null, dst:null, scale : 1, rotation: 0, image: null};


export const new_drawable_rect = () => {return ({boundingBox:{x: 0, y: 0, w : 0, h : 0}, color : '#000000', stroke : 0});}
export const new_drawable_text = () => {return ({coords:{x: 0, y: 0}, boundingBox:{x: 0, y: 0, w : 0, h : 0}, center:true, fill: false, font: '24px serif', color : '#000000', text: "no_text"});}
export const new_drawable_img = () => {return ({src:null, dst:null, scale : 1, rotation: 0, image: null});}
export { DrawableImage, DrawableRect, DrawableText}
