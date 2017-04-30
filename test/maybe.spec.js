"use strict";
var assert = require("assert");
var lib_1 = require("../lib");
describe("Maybe", function () {
    describe("basic functionality", function () {
        it("should return Maybe.Just(OK)", function () {
            var e = lib_1.Maybe.just("OK");
            assert(e.isDefined());
            assert(!e.isEmpty());
            assert(e.get() === "OK");
        });
        it("should return Maybe.None()", function () {
            var e = lib_1.Maybe.none();
            assert.throws(function () { return e.get(); });
            assert(!e.isDefined());
            assert(e.isEmpty());
        });
        it("should return Maybe.nothing()", function () {
            var e = lib_1.Maybe.nothing();
            assert.throws(function () { return e.get(); });
            assert(!e.isDefined());
            assert(e.isEmpty());
        });
        it("should get fromNull", function () {
            var m = lib_1.Maybe.fromNull("string");
            var n = lib_1.Maybe.fromNull(null);
            assert(m.get() === "string");
            assert.throws(function () { return n.get(); });
        });
        it("should sequence", function () {
            var m = lib_1.Maybe.sequence(lib_1.Maybe.just(1), lib_1.Maybe.just(2), lib_1.Maybe.just(3));
            assert.deepEqual(m.get(), [1, 2, 3]);
        });
        it("is valid for union types with undefined or null", function () {
            assert(lib_1.Maybe.fromNull([1, 2, 3].find(function (i) { return i > 4; })).isEmpty());
            assert(lib_1.Maybe.fromNull(null).isEmpty());
            assert(lib_1.Maybe.fromNull(1).isDefined());
        });
        it("should traverse", function () {
            var m = lib_1.Maybe.traverse(function (a) { return lib_1.Maybe.just(a * a); })([1, 2, 3, 4]);
            assert.deepEqual(m.get(), [1, 4, 9, 16]);
        });
        it("should flatten just", function () {
            var m = lib_1.Maybe.just(lib_1.Maybe.just(lib_1.Maybe.just(1)));
            var n = m.flatten();
            assert(n.get() === 1);
        });
        it("should flatten none", function () {
            var m = lib_1.Maybe.just(lib_1.Maybe.just(lib_1.Maybe.none()));
            var n = m.flatten();
            assert(n.isEmpty());
        });
    });
    describe("monadness", function () {
        it("should mbind with just", function () {
            var m = lib_1.Maybe.just("hello");
            var n = m.mbind(lib_1.Maybe.just(function (s) { return lib_1.Maybe.just(s + "goodbye"); }));
            assert(n.get() === "hellogoodbye");
        });
        it("should mbind with none", function () {
            var m = lib_1.Maybe.none();
            var n = m.mbind(lib_1.Maybe.just(function (s) { return lib_1.Maybe.just(s + "goodbye"); }));
            assert(n.isEmpty());
        });
    });
    describe("overrides", function () {
        it("should test Just equality", function () {
            var e = lib_1.Maybe.just("OK");
            assert(e.equals(lib_1.Maybe.just("OK")), "Just == Just");
            assert(!e.equals(lib_1.Maybe.none()), "Just != None");
            assert(!e.equals(lib_1.Maybe.nothing()), "Just != Nothing");
            assert(!e.equals(null), "Just != null");
            assert(!e.equals("OK"), "Just != String(OK)");
        });
        it("should test None equality", function () {
            var e = lib_1.Maybe.none();
            assert(e.equals(lib_1.Maybe.none()), "None == None");
            assert(!e.equals(lib_1.Maybe.just("OK")), "None != Just");
            assert(e.equals(lib_1.Maybe.nothing()), "None == Nothing");
            assert(!e.equals(null), "None != null");
            assert(!e.equals("OK"), "None != String(OK)");
        });
        it("should test Nothing equality", function () {
            var e = lib_1.Maybe.nothing();
            assert(e.equals(lib_1.Maybe.nothing()));
        });
        it("should toJSON Just", function () {
            var e = lib_1.Maybe.just("OK");
            assert.deepEqual(e.toJSON(), { just: "OK" });
        });
        it("should toJSON None", function () {
            var e = lib_1.Maybe.none();
            assert.deepEqual(e.toJSON(), { just: null });
        });
        it("should toJSON Nothing", function () {
            var e = lib_1.Maybe.nothing();
            assert.deepEqual(e.toJSON(), { just: null });
        });
    });
    describe("lift", function () {
        it("should lift function", function () {
            var f = function (a, b) { return a[b]; };
            var lf = lib_1.Maybe.lift(f);
            assert(lf({ b: "OK" }, "b").get() === "OK", "Return OK");
            assert.doesNotThrow(function () { return lf(null, "b"); }, "Throws");
        });
    });
    describe("get ors", function () {
        it("should getOrElse returns OK", function () {
            var e = lib_1.Maybe.none();
            assert(e.getOrElse(function () { return "OK"; }) === "OK");
        });
        it("should getOrElseGet returns OK", function () {
            var e = lib_1.Maybe.none();
            assert(e.getOrElseGet("OK") === "OK");
        });
        it("should getOrThrow throws", function () {
            var e = lib_1.Maybe.none();
            assert.throws(function () { return e.getOrThrow(); });
            assert.throws(function () { return e.getOrThrow(new Error("BAD")); });
        });
    });
    describe("toEither", function () {
        it("should Just to Either.Right", function () {
            var e = lib_1.Maybe.just("OK");
            assert(e.toEither().get() === "OK");
            assert(e.toEither().isRight());
            assert(!e.toEither().isLeft());
        });
        it("should None to Either.Left", function () {
            var e = lib_1.Maybe.none();
            assert.throws(function () { return e.toEither().get(); });
            assert(e.toEither().isLeft());
            assert(!e.toEither().isRight());
        });
        it("should Nothing to Either.Nothing", function () {
            var e = lib_1.Maybe.nothing();
            assert.throws(function () { return e.get(); });
            assert(!e.toEither().isRight());
            assert(e.toEither().isLeft());
            assert(!e.toEither().equals(lib_1.Either.nothing()));
            assert(!e.toEither().equals(lib_1.Either.nothing()));
        });
    });
    describe("finish coverage", function () {
        it("Maybe.just should not throw errors", function () {
            var o = lib_1.Maybe.just("OK");
            o.getOrElse(function () { return "OK"; });
            o.getOrElseGet("OK");
            o.getOrThrow(new Error("OK"));
            o.orElse(function () { return lib_1.Maybe.just("OK"); });
            o.toEither();
        });
        it("Maybe.none should not throw errors", function () {
            var o = lib_1.Maybe.none();
            o.orElse(function () { return lib_1.Maybe.none(); });
            o.toEither();
            o.toString();
        });
    });
});
