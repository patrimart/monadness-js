"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var option_1 = require("./option");
var Either = (function () {
    function Either() {
    }
    Either.prototype.isLeft = function () { return false; };
    Either.prototype.isRight = function () { return false; };
    Either.prototype.get = function () {
        throw new ReferenceError("This either is Left.");
    };
    Either.prototype.getLeft = function () { return undefined; };
    Either.prototype.getRight = function () { return undefined; };
    Either.prototype.toOption = function () {
        return option_1.Option.none();
    };
    Either.prototype.equals = function (other) {
        if (!other || other instanceof Either === false)
            return false;
        if (this === other)
            return true;
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
var Either;
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
    function lift(partialFunction) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
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
            _super.call(this);
            this.left = left;
        }
        Left.prototype.isLeft = function () {
            return true;
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
        Left.prototype.toOption = function () {
            return option_1.Option.none();
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
            _super.call(this);
            this.right = right;
        }
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
        Right.prototype.toOption = function () {
            return option_1.Option.some(this.right);
        };
        Right.prototype.toObject = function () {
            return { right: this.right };
        };
        return Right;
    }(Either));
    Either.Right = Right;
    var nothingEither = new Left(void (0));
})(Either = exports.Either || (exports.Either = {}));
//# sourceMappingURL=either.js.map