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

export {Point, Circle, Rectangle, Line, PointInCircle, PointInRect};
