import { checkAllFieldsExist } from "../utils"

interface Point {
	x: number,
	y: number,
}

interface Circle {
	x: number,
	y: number,
	radius: number
}

interface Rectangle {
	x: number,
	y: number,
	w: number,
	h: number
}

interface Line {
	coordA: Point,
	coordB: Point,
}



const isPoint = (compare): boolean => {
	const correct:Point = {x: 0, y: 0};

	return checkAllFieldsExist(correct, compare)
}
const isLine = (compare): boolean => {
	const correct:Line = {coordA: {x:0, y: 0}, coordB: {x:0, y:0}};

	return checkAllFieldsExist(correct, compare)
}
const isRect = (compare): boolean => {
	const correct:Rectangle = {x: 0, y: 0, w: 0, h: 0};
	return checkAllFieldsExist(correct, compare) && compare.w >= 0 && compare.h >= 0
}

const isCircle = (compare): boolean => {
	const correct:Circle = {x: 0, y: 0, radius: 0};

	return checkAllFieldsExist(correct, compare) && compare.radius >= 0;
}


const PointInCircle = (point:Point, circle:Circle): boolean =>  {
	return Math.sqrt( //??? IDK if this more comprehensible than a single line ?
			Math.pow(point.x - circle.x, 2)
					+
			Math.pow(point.y - circle.y, 2)
			) <= circle.radius;
}

const PointInRect = (point: Point, rect:Rectangle) : boolean => {
	return point.x >= rect.x &&
		   point.y >= rect.y &&
		   point.x <= rect.x + rect.w &&
		   point.y <= rect.y + rect.h;
}

export {Point, Circle, Rectangle, Line, isPoint, isLine, isRect, isCircle, PointInCircle, PointInRect};
