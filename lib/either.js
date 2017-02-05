"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var maybe_1 = require("./maybe");
var option_1 = require("./option");
var Either = (function () {
    function Either() {
    }
    Either.prototype.isLeft = function () { return false; };
    Either.prototype.isRight = function () { return false; };
    Either.prototype.getLeft = function () { throw new ReferenceError("This either is Right."); };
    Either.prototype.getRight = function () { throw new ReferenceError("This either is Left."); };
    Either.prototype.toMaybe = function () {
        return maybe_1.Maybe.none();
    };
    Either.prototype.toOption = function () {
        return option_1.Option.none();
    };
    Either.prototype.equals = function (other) {
        if (this === other)
            return true;
        if (!other || other instanceof Either === false)
            return false;
        if (this.isRight() !== other.isRight())
            return false;
        if (this.isRight() && this.getRight() === other.getRight())
            return true;
        if (this.getLeft() && this.getLeft() === other.getLeft())
            return true;
        return false;
    };
    Either.prototype.toJSON = function () {
        return this.toObject();
    };
    Either.prototype.toString = function () {
        return JSON.stringify(this.toJSON());
    };
    return Either;
}());
exports.Either = Either;
(function (Either) {
    function left(left) {
        return new Left(left);
    }
    Either.left = left;
    function right(right) {
        return new Right(right);
    }
    Either.right = right;
    function nothing() {
        return nothingEither;
    }
    Either.nothing = nothing;
    function sequence() {
        var eithers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            eithers[_i] = arguments[_i];
        }
        var arr = [];
        for (var i in eithers) {
            if (eithers[i].isLeft()) {
                return new Left(eithers[i].getLeft());
            }
            arr[i] = eithers[i].get();
        }
        return new Right(arr);
    }
    Either.sequence = sequence;
    function traverse(f) {
        return function (as) {
            var arr = [];
            for (var i in as) {
                var r = f(as[i]);
                if (r.isLeft()) {
                    return new Left(r.getLeft());
                }
                arr[i] = r.get();
            }
            return new Right(arr);
        };
    }
    Either.traverse = traverse;
    function lift(partialFunction) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            try {
                return Either.right(partialFunction.apply(partialFunction, args));
            }
            catch (err) {
                return Either.left(err);
            }
        };
    }
    Either.lift = lift;
    var Left = (function (_super) {
        __extends(Left, _super);
        function Left(left) {
            var _this = _super.call(this) || this;
            _this.left = left;
            return _this;
        }
        Left.prototype.map = function (f) {
            return new Left(this.left);
        };
        Left.prototype.fmap = function (f) {
            return new Left(this.left);
        };
        Left.prototype.applies = function (f) {
            return function (mb) {
                return new Left(this.left);
            };
        };
        Left.prototype.mbind = function (f) {
            return new Left(this.left);
        };
        Left.prototype.bimap = function (lf, rf) {
            return new Left(lf(this.left));
        };
        Left.prototype.cata = function (lf, rf) {
            return lf(this.left);
        };
        Left.prototype.flatten = function () {
            return this;
        };
        Left.prototype.isLeft = function () {
            return true;
        };
        Left.prototype.get = function () {
            throw new ReferenceError("This either is Left.");
        };
        Left.prototype.getLeft = function () {
            return this.left;
        };
        Left.prototype.getOrElse = function (f) {
            return f();
        };
        Left.prototype.getOrElseGet = function (right) {
            return right;
        };
        Left.prototype.getOrThrow = function (err) {
            throw err || new ReferenceError("This either is Left.");
        };
        Left.prototype.orElse = function (f) {
            return f();
        };
        Left.prototype.toObject = function () {
            return { left: this.left };
        };
        return Left;
    }(Either));
    Either.Left = Left;
    var Right = (function (_super) {
        __extends(Right, _super);
        function Right(right) {
            var _this = _super.call(this) || this;
            _this.right = right;
            return _this;
        }
        Right.prototype.map = function (f) {
            return new Right(f(this.right));
        };
        Right.prototype.fmap = function (f) {
            return f(this.right);
        };
        Right.prototype.applies = function (f) {
            var _this = this;
            return function (eb) { return eb.fmap(f(_this.right)); };
        };
        Right.prototype.mbind = function (f) {
            return this.applies(function (a) { return function (b) { return b(a); }; })(f);
        };
        Right.prototype.bimap = function (lf, rf) {
            return new Right(rf(this.right));
        };
        Right.prototype.cata = function (lf, rf) {
            return rf(this.right);
        };
        Right.prototype.flatten = function () {
            var val = this.get();
            if (val instanceof Either) {
                return val.flatten();
            }
            else {
                return this;
            }
        };
        Right.prototype.isRight = function () {
            return true;
        };
        Right.prototype.get = function () {
            return this.right;
        };
        Right.prototype.getRight = function () {
            return this.right;
        };
        Right.prototype.getOrElse = function (f) {
            return this.right;
        };
        Right.prototype.getOrElseGet = function (right) {
            return this.right;
        };
        Right.prototype.getOrThrow = function () {
            return this.right;
        };
        Right.prototype.orElse = function (f) {
            return this;
        };
        Right.prototype.toMaybe = function () {
            return maybe_1.Maybe.just(this.right);
        };
        Right.prototype.toOption = function () {
            return option_1.Option.some(this.right);
        };
        Right.prototype.toObject = function () {
            return { right: this.right };
        };
        return Right;
    }(Either));
    Either.Right = Right;
})(Either = exports.Either || (exports.Either = {}));
exports.Either = Either;
var nothingEither = new Either.Left(void (0));
//# sourceMappingURL=either.js.map