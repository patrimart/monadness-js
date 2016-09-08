"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var either_1 = require("./either");
var Option = (function () {
    function Option() {
    }
    Option.prototype.isDefined = function () {
        return false;
    };
    Option.prototype.isEmpty = function () {
        return false;
    };
    Option.prototype.get = function () {
        throw new ReferenceError("This is option is None.");
    };
    Option.prototype.toEither = function () {
        return either_1.Either.left(new ReferenceError("This either is Left."));
    };
    Option.prototype.equals = function (other) {
        if (!other || other instanceof Option === false)
            return false;
        if (this === other)
            return true;
        if (this.isDefined() === false && other.isDefined() === false)
            return true;
        return this.isDefined() === other.isDefined() && this.get() === other.get();
    };
    Option.prototype.toJSON = function () {
        return this.toObject();
    };
    Option.prototype.toString = function () {
        return JSON.stringify(this.toJSON());
    };
    return Option;
}());
exports.Option = Option;
var Option;
(function (Option) {
    function some(value) {
        return new Some(value);
    }
    Option.some = some;
    function none() {
        return new None();
    }
    Option.none = none;
    function nothing() {
        return nothingOption;
    }
    Option.nothing = nothing;
    function lift(partialFunction) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            try {
                return Option.some(partialFunction.apply(partialFunction, args));
            }
            catch (err) {
                return Option.none();
            }
        };
    }
    Option.lift = lift;
    var None = (function (_super) {
        __extends(None, _super);
        function None() {
            _super.call(this);
        }
        None.prototype.isEmpty = function () {
            return true;
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
            return { some: null };
        };
        return None;
    }(Option));
    Option.None = None;
    var Some = (function (_super) {
        __extends(Some, _super);
        function Some(value) {
            _super.call(this);
            this.value = value;
        }
        Some.prototype.isDefined = function () {
            return true;
        };
        Some.prototype.get = function () {
            return this.value;
        };
        Some.prototype.getOrElse = function (value) {
            return this.value;
        };
        Some.prototype.getOrElseGet = function (value) {
            return this.value;
        };
        Some.prototype.getOrThrow = function (err) {
            return this.value;
        };
        Some.prototype.orElse = function (o) {
            return this;
        };
        Some.prototype.toEither = function () {
            return either_1.Either.right(this.value);
        };
        Some.prototype.toObject = function () {
            return { some: this.value };
        };
        return Some;
    }(Option));
    Option.Some = Some;
    var nothingOption = new None();
})(Option = exports.Option || (exports.Option = {}));
//# sourceMappingURL=option.js.map