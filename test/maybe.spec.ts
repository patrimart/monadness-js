
import * as assert from "assert";
import { Either, Maybe } from "../lib";

describe("Maybe", function () {

    describe("basic functionality", function () {

        it("should return Maybe.Just(OK)", function () {
            let e = Maybe.just("OK");
            assert(e.isDefined());
            assert(!e.isEmpty());
            assert(e.get() === "OK");
        });

        it("should return Maybe.None()", function () {
            let e = Maybe.none();
            assert.throws(() => e.get());
            assert(!e.isDefined());
            assert(e.isEmpty());
        });

        it("should return Maybe.nothing()", function () {
            let e = Maybe.nothing();
            assert.throws(() => e.get());
            assert(!e.isDefined());
            assert(e.isEmpty());
        });

        it ("should get fromNull", function () {

            let m = Maybe.fromNull("string");
            let n = Maybe.fromNull(null);

            assert(m.get() === "string");
            assert.throws(() => n.get());
        });

        it ("should sequence", function () {

            let m = Maybe.sequence(Maybe.just(1), Maybe.just(2), Maybe.just(3));
            assert.deepEqual(m.get(), [1, 2, 3]);
        });

        it ("is valid for union types with undefined or null", function() {
            assert(Maybe.fromNull([1, 2, 3].find(i => i > 4)).isEmpty());
            assert(Maybe.fromNull(null).isEmpty());
            assert(Maybe.fromNull(1).isDefined());
        })

        it ("should traverse", function () {

            let m = Maybe.traverse((a: number) => Maybe.just(a * a))([1, 2, 3, 4]);
            assert.deepEqual(m.get(), [1, 4, 9, 16]);
        });

        it ("should flatten just", function () {

            let m = Maybe.just(Maybe.just(Maybe.just(1)));
            let n = m.flatten<number>();
            assert(n.get() === 1);
        });

        it ("should flatten none", function () {

            let m = Maybe.just(Maybe.just(Maybe.none<number>()));
            let n = m.flatten<number>();
            assert(n.isEmpty());
        });
    });

    describe("monadness", function () {

        it ("should mbind with just", function () {

            let m = Maybe.just("hello");
            let n = m.mbind(Maybe.just((s: string) => Maybe.just(s + "goodbye")));
            assert(n.get() === "hellogoodbye");
        });

        it ("should mbind with none", function () {

            let m = Maybe.none<string>();
            let n = m.mbind(Maybe.just((s: string) => Maybe.just(s + "goodbye")));
            assert(n.isEmpty());
        });
    });

    describe("overrides", function () {

        it("should test Just equality", function () {
            let e = Maybe.just("OK");
            assert(e.equals(Maybe.just("OK")), "Just == Just");
            assert(!e.equals(Maybe.none<string>()), "Just != None");
            assert(!e.equals(Maybe.nothing() as any), "Just != Nothing");
            assert(!e.equals(null as any), "Just != null");
            assert(!e.equals("OK" as any), "Just != String(OK)")
        });

        it("should test None equality", function () {
            let e = Maybe.none();
            assert(e.equals(Maybe.none()), "None == None");
            assert(!e.equals(Maybe.just("OK")), "None != Just");
            assert(e.equals(Maybe.nothing() as any), "None == Nothing");
            assert(!e.equals(null as any), "None != null");
            assert(!e.equals("OK" as any), "None != String(OK)")
        });

        it("should test Nothing equality", function () {
            let e = Maybe.nothing();
            assert(e.equals(Maybe.nothing()));
        });

        it("should toJSON Just", function () {
            let e = Maybe.just("OK");
            assert.deepEqual(e.toJSON(), {just: "OK"});
        });

        it("should toJSON None", function () {
            let e = Maybe.none();
            assert.deepEqual(e.toJSON(), {just: null});
        });

        it("should toJSON Nothing", function () {
            let e = Maybe.nothing();
            assert.deepEqual(e.toJSON(), {just: null});
        });
    });

    describe("lift", function () {

        it("should lift function", function () {
            let f = (a: any, b: any) => a[b];
            let lf = Maybe.lift(f);
            assert(lf({b: "OK"}, "b").get() === "OK", "Return OK");
            assert.doesNotThrow(() => lf(null, "b"), "Throws");
        });
    });

    describe("get ors", function () {

        it("should getOrElse returns OK", function () {
            let e = Maybe.none();
            assert(e.getOrElse(() => "OK") === "OK");
        });

        it("should getOrElseGet returns OK", function () {
            let e = Maybe.none();
            assert(e.getOrElseGet("OK") === "OK");
        });

        it("should getOrThrow throws", function () {
            let e = Maybe.none();
            assert.throws(() => e.getOrThrow());
            assert.throws(() => e.getOrThrow(new Error("BAD")));
        });
    });

    describe("toEither", function () {

        it("should Just to Either.Right", function () {
            let e = Maybe.just("OK");
            assert(e.toEither().get() === "OK");
            assert(e.toEither().isRight());
            assert(!e.toEither().isLeft());
        });

        it("should None to Either.Left", function () {
            let e = Maybe.none();
            assert.throws(() => e.toEither().get());
            assert(e.toEither().isLeft());
            assert(!e.toEither().isRight());
        });

        it("should Nothing to Either.Nothing", function () {
            let e = Maybe.nothing();
            assert.throws(() => e.get());
            assert(!e.toEither().isRight());
            assert(e.toEither().isLeft());
            assert(!e.toEither().equals(Either.nothing() as any));
            assert(!e.toEither().equals(Either.nothing() as any));
        });
    });

    describe("finish coverage", function () {

        it("Maybe.just should not throw errors", function () {
            let o = Maybe.just("OK");
            o.getOrElse(() => "OK");
            o.getOrElseGet("OK");
            o.getOrThrow(new Error("OK"));
            o.orElse(() => Maybe.just("OK"));
            o.toEither();
        });

        it("Maybe.none should not throw errors", function () {
            let o = Maybe.none();
            o.orElse(() => Maybe.none());
            o.toEither();
            o.toString();
        });

    });
});
