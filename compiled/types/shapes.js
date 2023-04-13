"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointInRect = exports.PointInCircle = exports.isCircle = exports.isRect = exports.isLine = exports.isPoint = void 0;
const utils_1 = require("../utils");
const isPoint = (compare) => {
    const correct = { x: 0, y: 0 };
    return (0, utils_1.checkAllFieldsExist)(correct, compare);
};
exports.isPoint = isPoint;
const isLine = (compare) => {
    const correct = { coordA: { x: 0, y: 0 }, coordB: { x: 0, y: 0 } };
    return (0, utils_1.checkAllFieldsExist)(correct, compare);
};
exports.isLine = isLine;
const isRect = (compare) => {
    const correct = { x: 0, y: 0, w: 0, h: 0 };
    return (0, utils_1.checkAllFieldsExist)(correct, compare) && compare.w >= 0 && compare.h >= 0;
};
exports.isRect = isRect;
const isCircle = (compare) => {
    const correct = { x: 0, y: 0, radius: 0 };
    return (0, utils_1.checkAllFieldsExist)(correct, compare) && compare.radius >= 0;
};
exports.isCircle = isCircle;
const PointInCircle = (point, circle) => {
    return Math.sqrt(//??? IDK if this more comprehensible than a single line ?
    Math.pow(point.x - circle.x, 2)
        +
            Math.pow(point.y - circle.y, 2)) <= circle.radius;
};
exports.PointInCircle = PointInCircle;
const PointInRect = (point, rect) => {
    return point.x >= rect.x &&
        point.y >= rect.y &&
        point.x <= rect.x + rect.w &&
        point.y <= rect.y + rect.h;
};
exports.PointInRect = PointInRect;
