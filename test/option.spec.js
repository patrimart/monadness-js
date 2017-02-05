"use strict";
var assert = require("assert");
var lib_1 = require("../lib");
describe('Option', function () {
    describe('basic functionality', function () {
        it('should return Option.Some("OK")', function () {
            var e = lib_1.Option.some("OK");
            assert(e.isDefined());
            assert(!e.isEmpty());
            assert(e.get() === "OK");
        });
        it('should return Option.None()', function () {
            var e = lib_1.Option.none();
            assert.throws(function () { return e.get(); });
            assert(!e.isDefined());
            assert(e.isEmpty());
        });
        it('should return Option.nothing()', function () {
            var e = lib_1.Option.nothing();
            assert.throws(function () { return e.get(); });
            assert(!e.isDefined());
            assert(e.isEmpty());
        });
    });
    describe('overrides', function () {
        it('should test Some equality', function () {
            var e = lib_1.Option.some("OK");
            assert(e.equals(lib_1.Option.some("OK")), "Some == Some");
            assert(!e.equals(lib_1.Option.none()), "Some != None");
            assert(!e.equals(lib_1.Option.nothing()), "Some != Nothing");
            assert(!e.equals(null), "Some != null");
            assert(!e.equals("OK"), "Some != String(OK)");
        });
        it('should test None equality', function () {
            var e = lib_1.Option.none();
            assert(e.equals(lib_1.Option.none()), "None == None");
            assert(!e.equals(lib_1.Option.some("OK")), "None != Some");
            assert(e.equals(lib_1.Option.nothing()), "None == Nothing");
            assert(!e.equals(null), "None != null");
            assert(!e.equals("OK"), "None != String(OK)");
        });
        it('should test Nothing equality', function () {
            var e = lib_1.Option.nothing();
            assert(e.equals(lib_1.Option.nothing()));
        });
        it('should toJSON Some', function () {
            var e = lib_1.Option.some("OK");
            assert.deepEqual(e.toJSON(), { some: "OK" });
        });
        it('should toJSON None', function () {
            var e = lib_1.Option.none();
            assert.deepEqual(e.toJSON(), { some: null });
        });
        it('should toJSON Nothing', function () {
            var e = lib_1.Option.nothing();
            assert.deepEqual(e.toJSON(), { some: null });
        });
    });
    describe('lift', function () {
        it('should lift function', function () {
            var f = function (a, b) { return a[b]; };
            var lf = lib_1.Option.lift(f);
            assert(lf({ b: "OK" }, "b").get() === "OK", "Return OK");
            assert.doesNotThrow(function () { return lf(null, "b"); }, "Throws");
        });
    });
    describe('get ors', function () {
        it('should getOrElse returns OK', function () {
            var e = lib_1.Option.none();
            assert(e.getOrElse(function () { return "OK"; }) === "OK");
        });
        it('should getOrElseGet returns OK', function () {
            var e = lib_1.Option.none();
            assert(e.getOrElseGet("OK") === "OK");
        });
        it('should getOrThrow throws', function () {
            var e = lib_1.Option.none();
            assert.throws(function () { return e.getOrThrow(); });
            assert.throws(function () { return e.getOrThrow(new Error("BAD")); });
        });
    });
    describe('toEither', function () {
        it('should Some to Either.Right', function () {
            var e = lib_1.Option.some("OK");
            assert(e.toEither().get() === "OK");
            assert(e.toEither().isRight());
            assert(!e.toEither().isLeft());
        });
        it('should None to Either.Left', function () {
            var e = lib_1.Option.none();
            assert.throws(function () { return e.toEither().get(); });
            assert(e.toEither().isLeft());
            assert(!e.toEither().isRight());
        });
        it('should Nothing to Either.Nothing', function () {
            var e = lib_1.Option.nothing();
            assert.throws(function () { return e.get(); });
            assert(!e.toEither().isRight());
            assert(e.toEither().isLeft());
            assert(!e.toEither().equals(lib_1.Either.nothing()));
            assert(!e.toEither().equals(lib_1.Either.nothing()));
        });
    });
    describe('finish coverage', function () {
        it('Option.some should not throw errors', function () {
            var o = lib_1.Option.some("OK");
            o.getOrElse(function () { return "OK"; });
            o.getOrElseGet("OK");
            o.getOrThrow(new Error("OK"));
            o.orElse(function () { return lib_1.Option.some("Else"); });
            o.toEither();
        });
        it('Option.none should not throw errors', function () {
            var o = lib_1.Option.none();
            o.orElse(function () { return lib_1.Option.none(); });
            o.toEither();
            o.toString();
        });
    });
});
