import { Point } from "./shapes.js"

export interface Context {
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D,
	dimensions: Point,
	ws:WebSocket,
	subid:number,
	box_ip:string,
    wsState: number,
    wsMessage: string | null
}
