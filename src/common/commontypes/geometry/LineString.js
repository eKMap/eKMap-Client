import { Ekmap } from '../../Ekmap';
import { Point } from './Point';
import { Curve } from './Curve';

export class LineString extends Curve {

    constructor(points) {
        super(points);
        this.CLASS_NAME = "Ekmap.Geometry.LineString";
        this.geometryType = "LineString";
    }
    removeComponent(point) { // eslint-disable-line no-unused-vars
        var removed = this.components && (this.components.length > 2);
        if (removed) {
            super.removeComponent.apply(this, arguments);
        }
        return removed;
    }

    getSortedSegments() {
        var numSeg = this.components.length - 1;
        var segments = new Array(numSeg),
            point1, point2;
        for (var i = 0; i < numSeg; ++i) {
            point1 = this.components[i];
            point2 = this.components[i + 1];
            if (point1.x < point2.x) {
                segments[i] = {
                    x1: point1.x,
                    y1: point1.y,
                    x2: point2.x,
                    y2: point2.y
                };
            } else {
                segments[i] = {
                    x1: point2.x,
                    y1: point2.y,
                    x2: point1.x,
                    y2: point1.y
                };
            }
        }

        // more efficient to define this somewhere static
        function byX1(seg1, seg2) {
            return seg1.x1 - seg2.x1;
        }

        return segments.sort(byX1);
    }

    getVertices(nodes) {
        var vertices;
        if (nodes === true) {
            vertices = [
                this.components[0],
                this.components[this.components.length - 1]
            ];
        } else if (nodes === false) {
            vertices = this.components.slice(1, this.components.length - 1);
        } else {
            vertices = this.components.slice();
        }
        return vertices;
    }
    static calculateCircle(points) {
        if (points.length < 3) {
            return points
        }
        var centerPoint = {},
            p1 = points[0],
            p2 = points[1],
            p3 = points[2];
        var R = 0,
            dStep = 0,
            direc = true,
            dRotation = 0,
            dRotationBegin = 0,
            dRotationAngle = 0,
            nSegmentCount = 72,
            circlePoints = [];

        var KTan13 = (p3.y - p1.y) / (p3.x - p1.x);
        var B13 = p3.y - KTan13 * p3.x;
        if ((((p3.x != p1.x) && (p3.y != p1.y)) && (p2.y == KTan13 * p2.x + B13)) ||
            ((p3.x == p1.x) && (p2.x == p1.x)) || ((p3.y == p1.y) && (p2.y == p1.y)) ||
            ((p3.x == p1.x) && (p3.y == p1.y)) || ((p3.x == p2.x) && (p3.y == p2.y)) || ((p1.x == p2.x) && (p1.y == p2.y))) {
            circlePoints.push(p1);
            circlePoints.push(p2);
            circlePoints.push(p3);
        } else {
            var D = ((p2.x * p2.x + p2.y * p2.y) - (p1.x * p1.x + p1.y * p1.y)) * (2 * (p3.y - p1.y)) - ((p3.x * p3.x + p3.y * p3.y) -
                (p1.x * p1.x + p1.y * p1.y)) * (2 * (p2.y - p1.y));
            var E = (2 * (p2.x - p1.x)) * ((p3.x * p3.x + p3.y * p3.y) - (p1.x * p1.x + p1.y * p1.y)) -
                (2 * (p3.x - p1.x)) * ((p2.x * p2.x + p2.y * p2.y) - (p1.x * p1.x + p1.y * p1.y));
            var F = 4 * ((p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y));
            centerPoint.x = D / F;
            centerPoint.y = E / F;
            R = Math.sqrt((p1.x - centerPoint.x) * (p1.x - centerPoint.x) + (p1.y - centerPoint.y) * (p1.y - centerPoint.y));

            var dis = (p1.x - p3.x) * (p1.x - p3.x) + (p1.y - p3.y) * (p1.y - p3.y);
            var cons = (2 * R * R - dis) / (2 * R * R);
            cons = cons >= 1 ? 1 : cons;
            cons = cons <= -1 ? -1 : cons;
            dRotationAngle = Math.acos(cons) * 180 / Math.PI;

            if (p3.x == p1.x) {
                dRotationAngle = ((centerPoint.x > p1.x && p2.x > p1.x) || (centerPoint.x < p1.x && p2.x < p1.x)) ? (360 - dRotationAngle) : dRotationAngle;
            } else {
                dRotationAngle = ((centerPoint.y > (KTan13 * centerPoint.x + B13) && p2.y > (KTan13 * p2.x + B13)) ||
                    (centerPoint.y < (KTan13 * centerPoint.x + B13) && p2.y < (KTan13 * p2.x + B13))) ? (360 - dRotationAngle) : dRotationAngle;
            }
            dStep = dRotationAngle / 72;

            if (p3.y != p1.y) {
                if (p3.x == p1.x) {
                    if (p3.y > p1.y) {
                        if (p2.x < p1.x) {
                            direc = false;
                        }
                    } else {
                        if (p2.x > p1.x) {
                            direc = false;
                        }
                    }
                } else if (p3.x < p1.x) {
                    if (p2.y < KTan13 * p2.x + B13) {
                        direc = false;
                    }
                } else {
                    if (p2.y > KTan13 * p2.x + B13) {
                        direc = false;
                    }
                }
            } else {
                if (p3.x > p1.x) {
                    if (p2.y > p1.y) {
                        direc = false;
                    }
                } else {
                    if (p2.y < p1.y) {
                        direc = false;
                    }
                }
            }

            var K10 = (p1.y - centerPoint.y) / (p1.x - centerPoint.x);
            var atan10 = K10 >= 0 ? Math.atan(K10) * 180 / Math.PI : Math.abs(Math.atan(K10) * 180 / Math.PI) + 90;

            var CY = Math.abs(centerPoint.y);
            if ((p1.y == CY) && (CY == p3.y)) {
                if (p1.x < p3.x) {
                    atan10 = atan10 + 180;
                }
            }

            var newPY = p1.y - centerPoint.y;
            circlePoints.push(p1);
            for (var i = 1; i < nSegmentCount; i++) {
                dRotation = dStep * i;
                dRotationBegin = atan10;

                if (direc) {
                    if (newPY >= 0) {
                        if (K10 >= 0) {
                            dRotationBegin = dRotationBegin + dRotation;
                        } else {
                            dRotationBegin = (180 - (dRotationBegin - 90)) + dRotation;
                        }
                    } else {
                        if (K10 > 0) {
                            dRotationBegin = (dRotationBegin - 180) + dRotation;
                        } else {
                            dRotationBegin = (90 - dRotationBegin) + dRotation;
                        }
                    }
                } else {
                    if (newPY >= 0) {
                        if (K10 >= 0) {
                            dRotationBegin = dRotationBegin - dRotation;
                        } else {
                            dRotationBegin = (180 - (dRotationBegin - 90)) - dRotation;
                        }
                    } else {
                        if (K10 >= 0) {
                            dRotationBegin = (dRotationBegin - 180) - dRotation;
                        } else {
                            dRotationBegin = (90 - dRotationBegin) - dRotation;
                        }
                    }
                }

                dRotationBegin = dRotationBegin * Math.PI / 180;
                var x = centerPoint.x + R * Math.cos(dRotationBegin);
                var y = centerPoint.y + R * Math.sin(dRotationBegin);
                circlePoints.push(new Point(x, y));
            }
            circlePoints.push(p3);
        }
        return circlePoints;
    }

    static createLineEPS(points) {
        var list = [],
            len = points.length;
        if (len < 2) {
            return points;
        }
        for (var i = 0; i < len;) {
            var type = points[i].type;
            if (type == 'LTypeArc') {
                var listObj = LineString.createLineArc(list, i, len, points);
                list = listObj[0];
                i = listObj[1];
            } else {
                list.push(points[i]);
                i++;
            }
        }
        return list;
    }

    static createLineArc(list, i, len, points) {
        if (i == 0) {
            let bezierPtsObj = LineString.addPointEPS(points, i, len, 'LTypeArc');
            Array.prototype.push.apply(list, bezierPtsObj[0]);
            i = bezierPtsObj[1] + 1;
        } else if (i == len - 1) {
            var bezierP = [points[i - 1], points[i]],
                bezierPts = LineString.calculateCircle(bezierP);
            Array.prototype.push.apply(list, bezierPts);
            i++;
        } else {
            let bezierPtsObj = LineString.addPointEPS(points, i, len, 'LTypeArc');
            list.pop();
            Array.prototype.push.apply(list, bezierPtsObj[0]);
            i = bezierPtsObj[1] + 1;
        }
        return [list, i];
    }

    static addPointEPS(points, i, len, type) {
        var bezierP = [],
            j = i + 1;
        if (i == 0) {
            Array.prototype.push.apply(bezierP, [points[i], points[i + 1]]);
        } else if (i == len - 1) {
            Array.prototype.push.apply(bezierP, [points[i - 1], points[i]]);
        } else {
            Array.prototype.push.apply(bezierP, [points[i - 1], points[i], points[i + 1]]);
        }
        var bezierPts;
        if (type == 'LTypeCurve') {
            bezierPts = LineString.calculatePointsFBZN(bezierP);
        } else if (type == 'LTypeArc') {
            bezierPts = LineString.calculateCircle(bezierP);
        }
        return [bezierPts, j];
    }
}

Ekmap.Geometry.LineString = LineString;