"use strict";
function factory() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i - 0] = arguments[_i];
    }
    var tuple = new ClassMap[values.length](values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8]);
    Object.defineProperty(tuple, "length", {
        writable: false,
        enumerable: false,
        configurable: false,
    });
    for (var i = 0, len = values.length; i < len; i++) {
        tuple[i] = values[i];
        Object.defineProperty(tuple, "_" + (i + 1), {
            writable: false,
            enumerable: false,
            configurable: false,
        });
    }
    Object.defineProperty(tuple, "equals", {
        value: function (other) {
            if (this === other)
                return true;
            if (!other || "_1" in other === false)
                return false;
            if (this.length !== other.length)
                return false;
            for (var i = 0; i < this.length; i++) {
                if (this[i].equals !== undefined && !this[i].equals(other[i])) {
                    return false;
                }
                else if (this[i] !== other[i]) {
                    return false;
                }
            }
            return true;
        },
        enumerable: false,
        configurable: false,
    });
    Object.defineProperty(tuple, "toJSON", {
        value: function () {
            return this.slice(0).map(function (i) { return !!i && i.toJSON !== undefined ? i.toJSON() : i; });
        },
        enumerable: false,
        configurable: false,
    });
    Object.defineProperty(tuple, "toString", {
        value: function () {
            return JSON.stringify(this.toJSON());
        },
        enumerable: false,
        configurable: false,
    });
    return Object.freeze(tuple);
}
var Tuple0 = (function () {
    function Tuple0() {
        this.length = 0;
    }
    Tuple0.from = function () {
        return TUPLE_ZERO_SINGLETON;
    };
    return Tuple0;
}());
exports.Tuple0 = Tuple0;
var Tuple1 = (function () {
    function Tuple1(_1, length) {
        if (length === void 0) { length = 1; }
        this._1 = _1;
        this.length = length;
    }
    Tuple1.from = function (_1) {
        return factory(_1);
    };
    return Tuple1;
}());
exports.Tuple1 = Tuple1;
var Tuple2 = (function () {
    function Tuple2(_1, _2, length) {
        if (length === void 0) { length = 2; }
        this._1 = _1;
        this._2 = _2;
        this.length = length;
    }
    Tuple2.from = function (_1, _2) {
        return factory(_1, _2);
    };
    return Tuple2;
}());
exports.Tuple2 = Tuple2;
var Tuple3 = (function () {
    function Tuple3(_1, _2, _3, length) {
        if (length === void 0) { length = 3; }
        this._1 = _1;
        this._2 = _2;
        this._3 = _3;
        this.length = length;
    }
    Tuple3.from = function (_1, _2, _3) {
        return factory(_1, _2, _3);
    };
    return Tuple3;
}());
exports.Tuple3 = Tuple3;
var Tuple4 = (function () {
    function Tuple4(_1, _2, _3, _4, length) {
        if (length === void 0) { length = 4; }
        this._1 = _1;
        this._2 = _2;
        this._3 = _3;
        this._4 = _4;
        this.length = length;
    }
    Tuple4.from = function (_1, _2, _3, _4) {
        return factory(_1, _2, _3, _4);
    };
    return Tuple4;
}());
exports.Tuple4 = Tuple4;
var Tuple5 = (function () {
    function Tuple5(_1, _2, _3, _4, _5, length) {
        if (length === void 0) { length = 5; }
        this._1 = _1;
        this._2 = _2;
        this._3 = _3;
        this._4 = _4;
        this._5 = _5;
        this.length = length;
    }
    Tuple5.from = function (_1, _2, _3, _4, _5) {
        return factory(_1, _2, _3, _4, _5);
    };
    return Tuple5;
}());
exports.Tuple5 = Tuple5;
var Tuple6 = (function () {
    function Tuple6(_1, _2, _3, _4, _5, _6, length) {
        if (length === void 0) { length = 6; }
        this._1 = _1;
        this._2 = _2;
        this._3 = _3;
        this._4 = _4;
        this._5 = _5;
        this._6 = _6;
        this.length = length;
    }
    Tuple6.from = function (_1, _2, _3, _4, _5, _6) {
        return factory(_1, _2, _3, _4, _5, _6);
    };
    return Tuple6;
}());
exports.Tuple6 = Tuple6;
var Tuple7 = (function () {
    function Tuple7(_1, _2, _3, _4, _5, _6, _7, length) {
        if (length === void 0) { length = 7; }
        this._1 = _1;
        this._2 = _2;
        this._3 = _3;
        this._4 = _4;
        this._5 = _5;
        this._6 = _6;
        this._7 = _7;
        this.length = length;
    }
    Tuple7.from = function (_1, _2, _3, _4, _5, _6, _7) {
        return factory(_1, _2, _3, _4, _5, _6, _7);
    };
    return Tuple7;
}());
exports.Tuple7 = Tuple7;
var Tuple8 = (function () {
    function Tuple8(_1, _2, _3, _4, _5, _6, _7, _8, length) {
        if (length === void 0) { length = 8; }
        this._1 = _1;
        this._2 = _2;
        this._3 = _3;
        this._4 = _4;
        this._5 = _5;
        this._6 = _6;
        this._7 = _7;
        this._8 = _8;
        this.length = length;
    }
    Tuple8.from = function (_1, _2, _3, _4, _5, _6, _7, _8) {
        return factory(_1, _2, _3, _4, _5, _6, _7, _8);
    };
    return Tuple8;
}());
exports.Tuple8 = Tuple8;
var Tuple9 = (function () {
    function Tuple9(_1, _2, _3, _4, _5, _6, _7, _8, _9, length) {
        if (length === void 0) { length = 9; }
        this._1 = _1;
        this._2 = _2;
        this._3 = _3;
        this._4 = _4;
        this._5 = _5;
        this._6 = _6;
        this._7 = _7;
        this._8 = _8;
        this._9 = _9;
        this.length = length;
    }
    Tuple9.from = function (_1, _2, _3, _4, _5, _6, _7, _8, _9) {
        return factory(_1, _2, _3, _4, _5, _6, _7, _8, _9);
    };
    return Tuple9;
}());
exports.Tuple9 = Tuple9;
var ClassMap = [Tuple0, Tuple1, Tuple2, Tuple3, Tuple4, Tuple5, Tuple6, Tuple7, Tuple8, Tuple9]
    .map(function (c) {
    Object.getOwnPropertyNames(Array.prototype)
        .filter(function (p) { return p !== "length"; })
        .forEach(function (p) { return Object.defineProperty(c.prototype, p, { value: Array.prototype[p] }); });
    return c;
});
var TUPLE_ZERO_SINGLETON = factory();
//# sourceMappingURL=tuples.js.map