"use strict";
function factory() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    var tuple = values.slice(0);
    Object.defineProperty(tuple, "length", { value: tuple.length });
    for (var i = 0, len = tuple.length; i < len; i++) {
        Object.defineProperty(tuple, "_" + (i + 1), { value: tuple[i] });
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
    });
    Object.defineProperty(tuple, "toJSON", {
        value: function () {
            return this.slice(0).map(function (i) { return !!i && i.toJSON !== undefined ? i.toJSON() : i; });
        },
    });
    Object.defineProperty(tuple, "toString", { value: function () { return JSON.stringify(this.toJSON()); } });
    Object.defineProperty(tuple, "map", {
        value: function (f) {
            if (tuple.length === 0) {
                return TUPLE_ZERO_SINGLETON;
            }
            var arr = new Array(tuple.length);
            for (var i in tuple) {
                arr[i] = f(tuple[i]);
            }
            return factory.apply(void 0, arr);
        },
    });
    Object.defineProperty(tuple, "fmap", {
        value: function (f) {
            if (tuple.length === 0) {
                return TUPLE_ZERO_SINGLETON;
            }
            var arr = new Array(tuple.length);
            for (var i in tuple) {
                arr[i] = f(tuple[i])[0];
            }
            return factory.apply(void 0, arr);
        },
    });
    Object.defineProperty(tuple, "applies", {
        value: function (f) {
            return function (tb) {
                if (tuple.length === 0) {
                    return TUPLE_ZERO_SINGLETON;
                }
                var arr = new Array(tuple.length);
                for (var i in tuple) {
                    arr[i] = f(tuple[i])(tb[i])[0];
                }
                return factory.apply(void 0, arr);
            };
        },
    });
    Object.defineProperty(tuple, "mbind", {
        value: function (f) {
            if (tuple.length === 0) {
                return TUPLE_ZERO_SINGLETON;
            }
            var arr = new Array(tuple.length);
            for (var i in tuple) {
                arr[i] = f[i](tuple[i])[0];
            }
            return factory.apply(void 0, arr);
        },
    });
    return Object.freeze(tuple);
}
var TUPLE_ZERO_SINGLETON = factory();
var Tuples = (function () {
    function Tuples() {
    }
    Tuples.from = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 0) {
            return TUPLE_ZERO_SINGLETON;
        }
        return factory.apply(this, args);
    };
    return Tuples;
}());
exports.Tuples = Tuples;
//# sourceMappingURL=tuples.js.map