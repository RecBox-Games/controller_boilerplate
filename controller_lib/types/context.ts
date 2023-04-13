import { Point } from "./shapes"

export interface Context {
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D,
	dimensions: Point,
	backgroundColor: string
}
