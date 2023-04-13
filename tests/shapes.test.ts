import { Rectangle, Circle, Point,isPoint, isLine, isCircle, isRect, PointInCircle, PointInRect } from "../controller_lib/types/shapes";

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

interface FakePoint {
	x: number,
}
test("Is Circle", () => {
	const circle:Circle = {x:0, y: 0, radius:1};
	const badcircle:Circle = {x:0, y: 0, radius:-42};
	const rect:Rectangle = {x:0, y: 0, w: 1, h: 0.5};
	const point:Point = {x: 0, y: 0};

	expect(isCircle(circle)).toBe(true);
	expect(isCircle(rect)).toBe(false);
	expect(isCircle(point)).toBe(false);
	expect(isCircle(badcircle)).toBe(false);
})

test("Is Point", () => {
	const circle:Circle = {x:0, y: 0, radius:1};
	const badcircle:Circle = {x:0, y: 0, radius:-42};
	const rect:Rectangle = {x:0, y: 0, w: 1, h: 0.5};
	const point:Point = {x: 0, y: 0};
	const fakepoint:FakePoint = {x: 0};

	expect(isPoint(circle)).toBe(false);
	expect(isPoint(rect)).toBe(false);
	expect(isPoint(point)).toBe(true);
	expect(isPoint(fakepoint)).toBe(false);
})

test("Is Rect", () => {
	const circle:Circle = {x:0, y: 0, radius:1};
	const rect:Rectangle = {x:0, y: 0, w: 1, h: 0.5};
	const point:Point = {x: 0, y: 0};
	const badrect:Rectangle = {x: 0, y: 0, w: -1, h: 2};

	expect(isRect(circle)).toBe(false);
	expect(isRect(rect)).toBe(true);
	expect(isRect(point)).toBe(false);
	expect(isRect(badrect)).toBe(false);
})

test("Circle Tests", () => {
	const circle:Circle = {x:0, y: 0, radius:1};

	for (let idx in should_be_in_circle)
	{
		expect(PointInCircle(points[idx], circle)).toBe(should_be_in_circle[idx]);
	}

})

test("Rect test", () => {
	const rect:Rectangle = {x:0, y: 0, w: 1, h: 0.5};

		for (let idx in should_be_in_rect)
	{
		expect(PointInRect(points[idx], rect)).toBe(should_be_in_rect[idx]);
	}
})
