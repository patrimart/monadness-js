"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var either_1 = require("./either");
var Maybe = (function () {
    function Maybe() {
    }
    Maybe.prototype.isDefined = function () {
        return false;
    };
    Maybe.prototype.isEmpty = function () {
        return false;
    };
    Maybe.prototype.toEither = function () {
        return either_1.Either.left(new ReferenceError("This either is Left."));
    };
    Maybe.prototype.equals = function (other) {
        if (!other || other instanceof Maybe === false)
            return false;
        if (this === other)
            return true;
        if (this.isDefined() === false && other.isDefined() === false)
            return true;
        return this.isDefined() === other.isDefined() && this.get() === other.get();
    };
    Maybe.prototype.toJSON = function () {
        return this.toObject();
    };
    Maybe.prototype.toString = function () {
        return JSON.stringify(this.toJSON());
    };
    return Maybe;
}());
exports.Maybe = Maybe;
(function (Maybe) {
    function just(value) {
        return new Just(value);
    }
    Maybe.just = just;
    function none() {
        return new None();
    }
    Maybe.none = none;
    function nothing() {
        return nothingMaybe;
    }
    Maybe.nothing = nothing;
    function fromNull(value) {
        if (value === null || value === undefined) {
            return Maybe.none();
        }
        else {
            return Maybe.just(value);
        }
    }
    Maybe.fromNull = fromNull;
    function sequence() {
        var maybes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            maybes[_i] = arguments[_i];
        }
        var arr = [];
        for (var i in maybes) {
            if (maybes[i].isEmpty()) {
                return new None();
            }
            arr[i] = maybes[i].get();
        }
        return new Just(arr);
    }
    Maybe.sequence = sequence;
    function traverse(f) {
        return function (as) {
            var arr = [];
            for (var i in as) {
                var r = f(as[i]);
                if (r.isEmpty()) {
                    return new None();
                }
                arr[i] = r.get();
            }
            return new Just(arr);
        };
    }
    Maybe.traverse = traverse;
    function lift(partialFunction) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            try {
                return Maybe.just(partialFunction.apply(partialFunction, args));
            }
            catch (err) {
                return Maybe.none();
            }
        };
    }
    Maybe.lift = lift;
    var None = (function (_super) {
        __extends(None, _super);
        function None() {
            return _super.call(this) || this;
        }
        None.prototype.map = function (f) {
            return new None();
        };
        None.prototype.fmap = function (f) {
            return new None();
        };
        None.prototype.applies = function (f) {
            return function (mb) {
                return new None();
            };
        };
        None.prototype.mbind = function (f) {
            return new None();
        };
        None.prototype.flatten = function () {
            return this;
        };
        None.prototype.isEmpty = function () {
            return true;
        };
        None.prototype.get = function () {
            throw new ReferenceError("This is option is None.");
        };
        None.prototype.getOrElse = function (f) {
            return f();
        };
        None.prototype.getOrElseGet = function (value) {
            return value;
        };
        None.prototype.getOrThrow = function (err) {
            throw err || new ReferenceError("This option is None.");
        };
        None.prototype.orElse = function (f) {
            return f();
        };
        None.prototype.toEither = function () {
            return either_1.Either.left(new ReferenceError("This either is Left."));
        };
        None.prototype.toObject = function () {
            return { just: null };
        };
        return None;
    }(Maybe));
    Maybe.None = None;
    var Just = (function (_super) {
        __extends(Just, _super);
        function Just(value) {
            var _this = _super.call(this) || this;
            _this.value = value;
            return _this;
        }
        Just.prototype.map = function (f) {
            return new Just(f(this.value));
        };
        Just.prototype.fmap = function (f) {
            return f(this.value);
        };
        Just.prototype.applies = function (f) {
            var _this = this;
            return function (mb) { return mb.fmap(f(_this.value)); };
        };
        Just.prototype.mbind = function (f) {
            return this.applies(function (a) { return function (b) { return b(a); }; })(f);
        };
        Just.prototype.flatten = function () {
            var val = this.get();
            if (val instanceof Maybe) {
                return val.flatten();
            }
            else {
                return this;
            }
        };
        Just.prototype.isDefined = function () {
            return true;
        };
        Just.prototype.get = function () {
            return this.value;
        };
        Just.prototype.getOrElse = function (value) {
            return this.value;
        };
        Just.prototype.getOrElseGet = function (value) {
            return this.value;
        };
        Just.prototype.getOrThrow = function (err) {
            return this.value;
        };
        Just.prototype.orElse = function (o) {
            return this;
        };
        Just.prototype.toEither = function () {
            return either_1.Either.right(this.value);
        };
        Just.prototype.toObject = function () {
            return { just: this.value };
        };
        return Just;
    }(Maybe));
    Maybe.Just = Just;
    var nothingMaybe = new None();
})(Maybe = exports.Maybe || (exports.Maybe = {}));
exports.Maybe = Maybe;
//# sourceMappingURL=maybe.js.map