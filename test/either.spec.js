"use strict";
var assert = require("assert");
var lib_1 = require("../lib");
describe('Either', function () {
    describe('basic functionality', function () {
        it('should return Either.Right("OK")', function () {
            var e = lib_1.Either.right("OK");
            assert(e.isRight());
            assert(!e.isLeft());
            assert(e.getRight() === "OK");
            assert(e.get() === "OK");
        });
        it('should return Either.Left("BAD")', function () {
            var e = lib_1.Either.left("BAD");
            assert.throws(function () { return e.get(); });
            assert(e.isLeft());
            assert(!e.isRight());
            assert(e.getLeft() === "BAD");
        });
        it('should return Either.nothing()', function () {
            var e = lib_1.Either.nothing();
            assert(e.isLeft());
            assert(e.getLeft() === void (0));
            assert(e === lib_1.Either.nothing());
        });
        it('should sequence', function () {
            var m = lib_1.Either.sequence(lib_1.Either.right(1), lib_1.Either.right(2), lib_1.Either.right(3));
            assert.deepEqual(m.get(), [1, 2, 3]);
        });
        it('should traverse', function () {
            var m = lib_1.Either.traverse(function (a) { return lib_1.Either.right(a * a); })([1, 2, 3, 4]);
            assert.deepEqual(m.get(), [1, 4, 9, 16]);
        });
        it('should bimap right', function () {
            var m = lib_1.Either.right(1);
            var n = m.bimap(function (a) { return a + 1; }, function (b) { return b + 2; });
            assert(n.get() === 3);
        });
        it('should bimap left', function () {
            var m = lib_1.Either.left(1);
            var n = m.bimap(function (a) { return a + 1; }, function (b) { return b + 2; });
            assert(n.getLeft() === 2);
        });
        it('should cata right', function () {
            var m = lib_1.Either.right(1);
            var n = m.cata(function (a) { return a + 1; }, function (b) { return b + 2; });
            assert(n === 3);
        });
        it('should cata left', function () {
            var m = lib_1.Either.left(1);
            var n = m.cata(function (a) { return a + 1; }, function (b) { return b + 2; });
            assert(n === 2);
        });
        it('should flatten right', function () {
            var m = lib_1.Either.right(lib_1.Either.right(lib_1.Either.right(1)));
            var n = m.flatten();
            assert(n.get() === 1);
        });
        it('should flatten left', function () {
            var m = lib_1.Either.right(lib_1.Either.right(lib_1.Either.left("left")));
            var n = m.flatten();
            assert(n.getLeft() === "left");
        });
    });
    describe('monadness', function () {
        it('should mbind with just', function () {
            var m = lib_1.Either.right("hello");
            var n = m.mbind(lib_1.Either.right(function (s) { return lib_1.Either.right(s + "goodbye"); }));
            assert(n.get() === "hellogoodbye");
        });
        it('should mbind with none', function () {
            var m = lib_1.Either.left("hello");
            var n = m.mbind(lib_1.Either.right(function (s) { return lib_1.Either.right(s + "goodbye"); }));
            assert(n.getLeft() === "hello");
        });
    });
    describe('overrides', function () {
        it('should test Right equality', function () {
            var e = lib_1.Either.right("OK");
            assert(e.equals(lib_1.Either.right("OK")), "Right == Right");
            assert(!e.equals(lib_1.Either.left(new Error("BAD"))), "Right != Left");
            assert(!e.equals(lib_1.Either.nothing()), "Right != Nothing");
            assert(!e.equals(null), "Right != null");
            assert(!e.equals("OK"), "Right != String(OK)");
        });
        it('should test Left equality', function () {
            var err = new Error("BAD");
            var e = lib_1.Either.left(err);
            assert(e.equals(lib_1.Either.left(err)), "Left == Left");
            assert(!e.equals(lib_1.Either.right("OK")), "Left != Right");
            assert(!e.equals(lib_1.Either.nothing()), "Left != Nothing");
            assert(!e.equals(null), "Left != null");
            assert(!e.equals("OK"), "Left != String(OK)");
        });
        it('should test Nothing equality', function () {
            var e = lib_1.Either.nothing();
            assert(e.equals(lib_1.Either.nothing()));
        });
        it('should toJSON Right', function () {
            var e = lib_1.Either.right("OK");
            assert.deepEqual(e.toJSON(), { right: "OK" });
        });
        it('should toJSON Left', function () {
            var e = lib_1.Either.left("BAD");
            assert.deepEqual(e.toJSON(), { left: "BAD" });
        });
        it('should toJSON Nothing', function () {
            var e = lib_1.Either.nothing();
            assert.deepEqual(e.toJSON(), { left: undefined });
        });
    });
    describe('lift', function () {
        it('should lift function', function () {
            var f = function (a, b) { return a[b]; };
            var lf = lib_1.Either.lift(f);
            assert(lf({ b: "OK" }, "b").get() === "OK", "Return OK");
            assert.doesNotThrow(function () { return lf(null, "b"); }, "Throws");
        });
    });
    describe('get ors', function () {
        it('should getOrElse returns OK', function () {
            var e = lib_1.Either.left("Bad");
            assert(e.getOrElse(function () { return "OK"; }) === "OK");
        });
        it('should getOrElseGet returns OK', function () {
            var e = lib_1.Either.left("Bad");
            assert(e.getOrElseGet("OK") === "OK");
        });
        it('should getOrThrow throws', function () {
            var e = lib_1.Either.left("Bad");
            assert.throws(function () { return e.getOrThrow(); });
            assert.throws(function () { return e.getOrThrow(new Error("BAD")); });
        });
    });
    describe('toOption', function () {
        it('should Right to Option.Some', function () {
            var e = lib_1.Either.right("OK");
            assert(e.toOption().get() === "OK");
            assert(e.toOption().isDefined());
        });
        it('should Left to Option.None', function () {
            var e = lib_1.Either.left("BAD");
            assert.throws(function () { return e.toOption().get(); });
            assert(!e.toOption().isDefined());
        });
        it('should Nothing to Option.Nothing', function () {
            var e = lib_1.Either.nothing();
            assert.throws(function () { return e.toOption().get(); });
            assert(!e.toOption().isDefined());
            assert(e.toOption().equals(lib_1.Option.nothing()));
        });
    });
    describe('finish coverage', function () {
        it('Either.Left should not throw errors', function () {
            var e = lib_1.Either.left("BAD");
            e.getLeft();
            e.orElse(function () { return lib_1.Either.left("BAD"); });
            e.toOption();
            e.toString();
        });
        it('Either.Right should not throw errors', function () {
            var e = lib_1.Either.right("GOOD");
            e.get();
            e.getRight();
            e.getOrElse(function () { return "Else"; });
            e.getOrElseGet("String");
            e.getOrThrow();
            e.orElse(function () { return lib_1.Either.right("Else"); });
            e.toOption();
            e.toString();
        });
        it('Either.nothing should not throw errors', function () {
            var e = lib_1.Either.nothing();
            e.toOption();
            e.toString();
        });
    });
});
