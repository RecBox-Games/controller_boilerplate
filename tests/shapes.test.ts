import { Rectangle, Circle, Point, PointInCircle, PointInRect } from "../controller_lib/shapes";

let points:Point[] = [
		{x: 0,  y: 1},
		{x: 0,  y: -1},
		{x: 1,  y: 0},
		{x: -1, y: 0},
		{x: 1,  y: 1},
		{x: 0,  y: 2},
		{x: 0,  y: -2},
		{x: 2,  y: 0},
		{x: -2, y: 0},
		{x: 2,  y: 2},
		{x: 0,  y: 0.5},
		{x: 0,  y: -0.5},
		{x: 0.5, y: 0},
		{x: -0.5,y: 0},
		{x: 0.5, y: 0.5},
		{x: 1, y: 0.5},
		]

let should_be_in_circle:Boolean[] = [true, true, true, true, false, false, false, false, false, false, true, true, true, true, true, false]
let should_be_in_rect:Boolean[] = [false, false, true, false, false, false, false, false, false, false, true, false, true, false, true, true]

test("Circle Tests", () => {
	let circle:Circle = {x:0, y: 0, radius:1};

	for (let idx in should_be_in_circle)
	{
		expect(PointInCircle(points[idx], circle)).toBe(should_be_in_circle[idx]);
	}

})

test("Rect test", () => {
	let rect:Rectangle = {x:0, y: 0, w: 1, h: 0.5};

		for (let idx in should_be_in_rect)
	{
		expect(PointInRect(points[idx], rect)).toBe(should_be_in_rect[idx]);
	}
})
