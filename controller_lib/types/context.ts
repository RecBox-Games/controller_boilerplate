import { Point } from "./shapes.js"

export interface Context {
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D,
	dimensions: Point,
	ws:WebSocket,
	subid:string,
	box_ip:string
}
