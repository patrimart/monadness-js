
var assert = require("assert");
var Either = require('../lib/either').Either;
var Option = require('../lib/option').Option;

describe('Option', function () {

    describe('basic functionality', function () {

        it('should return Option.Some("OK")', function () {
            var e = Option.some("OK");
            assert(e.isDefined());
            assert(! e.isEmpty());
            assert(e.get() === "OK");
        });

        it('should return Option.None()', function () {
            var e = Option.none();
            assert.throws(() => e.get());
            assert(! e.isDefined());
            assert(e.isEmpty());
        });

        it('should return Option.nothing()', function () {
            var e = Option.nothing();
            assert.throws(() => e.get());
            assert(! e.isDefined());
            assert(e.isEmpty());
        });
    });

    describe('overrides', function () {

        it('should test Some equality', function () {
            var e = Option.some("OK");
            assert(e.equals(Option.some("OK")), "Some == Some");
            assert(! e.equals(Option.none()), "Some != None");
            assert(! e.equals(Option.nothing()), "Some != Nothing");
            assert(! e.equals(null), "Some != null");
            assert(! e.equals(new String("OK")), "Some != String(OK)")
        });

        it('should test None equality', function () {
            var e = Option.none();
            assert(e.equals(Option.none()), "None == None");
            assert(! e.equals(Option.some("OK")), "None != Some");
            assert(e.equals(Option.nothing()), "None == Nothing");
            assert(! e.equals(null), "None != null");
            assert(! e.equals(new String("OK")), "None != String(OK)")
        });

        it('should test Nothing equality', function () {
            var e = Option.nothing();
            assert(e.equals(Option.nothing()));
        });

        it('should toJSON Some', function () {
            var e = Option.some("OK");
            assert.deepEqual(e.toJSON(), {some: "OK"});
        });

        it('should toJSON None', function () {
            var e = Option.none();
            assert.deepEqual(e.toJSON(), {some: null});
        });

        it('should toJSON Nothing', function () {
            var e = Option.nothing();
            assert.deepEqual(e.toJSON(), {some: null});
        });
    });

    describe('lift', function () {

        it('should lift function', function () {
            var f = (a, b) => a[b];
            var lf = Option.lift(f);
            assert(lf({b:"OK"}, "b").get() === "OK", "Return OK");
            assert.doesNotThrow(() => lf(null, "b"), "Throws");
        });
    });

    describe('get ors', function () {

        it('should getOrElse returns OK', function () {
            var e = Option.none();
            assert(e.getOrElse(() => "OK") === "OK");
        });

        it('should getOrElseGet returns OK', function () {
            var e = Option.none();
            assert(e.getOrElseGet("OK") === "OK");
        });

        it('should getOrThrow throws', function () {
            var e = Option.none();
            assert.throws(() => e.getOrThrow());
            assert.throws(() => e.getOrThrow(new Error("BAD")));
        });
    });

    describe('toEither', function () {

        it('should Some to Either.Right', function () {
            var e = Option.some("OK");
            assert(e.toEither().get() === "OK");
            assert(e.toEither().isRight());
            assert(! e.toEither().isLeft());
        });

        it('should None to Either.Left', function () {
            var e = Option.none();
            assert.throws(() => e.toEither().get());
            assert(e.toEither().isLeft());
            assert(! e.toEither().isRight());
        });

        it('should Nothing to Either.Nothing', function () {
            var e = Option.nothing();
            assert.throws(() => e.toOption().get());
            assert(! e.toEither().isRight());
            assert(e.toEither().isLeft());
            assert(! e.toEither().equals(Either.nothing()));
            assert(! e.toEither().equals(Either.nothing()));
        });
    })
});
