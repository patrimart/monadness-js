
import * as assert from "assert";
import { Either, Maybe, Option } from "../lib";

describe('Either', function () {

    describe('basic functionality', function () {

        it('should return Either.Right("OK")', function () {
            var e = Either.right("OK");
            assert(e.isRight());
            assert(! e.isLeft());
            assert(e.getRight() === "OK");
            assert(e.get() === "OK");
        });

        it('should return Either.Left("BAD")', function () {
            var e = Either.left("BAD");
            assert.throws(() => e.get());
            assert(e.isLeft());
            assert(! e.isRight());
            assert(e.getLeft() === "BAD");
        });

        it('should return Either.nothing()', function () {
            var e = Either.nothing();
            assert(e.isLeft());
            assert(e.getLeft() === void(0));
            assert(e === Either.nothing());
        });

        it ('should sequence', function () {

            var m = Either.sequence(Either.right(1), Either.right(2), Either.right(3));
            assert.deepEqual(m.get(), [1, 2, 3]);
        });

        it ('should traverse', function () {

            var m = Either.traverse((a: number) => Either.right(a * a))([1, 2, 3, 4]);
            assert.deepEqual(m.get(), [1, 4, 9, 16]);
        });

        it ('should bimap right', function () {

            var m = Either.right<number, number>(1);
            var n = m.bimap(a => a + 1, b => b + 2);
            assert(n.get() === 3);
        });

        it ('should bimap left', function () {

            var m = Either.left<number, number>(1);
            var n = m.bimap(a => a + 1, b => b + 2);
            assert(n.getLeft() === 2);
        });

        it ('should cata right', function () {

            var m = Either.right<number, number>(1);
            var n = m.cata(a => a + 1, b => b + 2);
            assert(n === 3);
        });

        it ('should cata left', function () {

            var m = Either.left<number, number>(1);
            var n = m.cata(a => a + 1, b => b + 2);
            assert(n === 2);
        });

        it ('should flatten right', function () {

            var m = Either.right(Either.right(Either.right(1)));
            var n = m.flatten<any, number>();
            assert(n.get() === 1);
        });

        it ('should flatten left', function () {

            var m = Either.right(Either.right(Either.left<string, number>("left")));
            var n = m.flatten<string, number>();
            assert(n.getLeft() === "left");
        });
    });

    describe('monadness', function () {

        it ('should mbind with just', function () {

            var m = Either.right("hello");
            var n = m.mbind(Either.right((s: string) => Either.right(s + "goodbye")));
            assert(n.get() === "hellogoodbye");
        });

        it ('should mbind with none', function () {

            var m = Either.left<string, string>("hello");
            var n = m.mbind(Either.right<string, any>((s: string) => Either.right(s + "goodbye")));
            assert(n.getLeft() === "hello");
        });
    });

    describe('overrides', function () {

        it('should test Right equality', function () {
            var e = Either.right<Error, string>("OK");
            assert(e.equals(Either.right<Error, string>("OK")), "Right == Right");
            assert(! e.equals(Either.left<Error, string>(new Error("BAD"))), "Right != Left");
            assert(! e.equals(Either.nothing() as any), "Right != Nothing");
            assert(! e.equals(null as any), "Right != null");
            assert(! e.equals("OK" as any), "Right != String(OK)")
        });

        it('should test Left equality', function () {
            var err = new Error("BAD");
            var e = Either.left<Error, string>(err);
            assert(e.equals(Either.left<Error, string>(err)), "Left == Left");
            assert(! e.equals(Either.right<Error, string>("OK")), "Left != Right");
            assert(! e.equals(Either.nothing() as any), "Left != Nothing");
            assert(! e.equals(null as any), "Left != null");
            assert(! e.equals("OK" as any), "Left != String(OK)")
        });

        it('should test Nothing equality', function () {
            var e = Either.nothing();
            assert(e.equals(Either.nothing()));
        });

        it('should toJSON Right', function () {
            var e = Either.right("OK");
            assert.deepEqual(e.toJSON(), {right: "OK"});
        });

        it('should toJSON Left', function () {
            var e = Either.left("BAD");
            assert.deepEqual(e.toJSON(), {left: "BAD"});
        });

        it('should toJSON Nothing', function () {
            var e = Either.nothing();
            assert.deepEqual(e.toJSON(), {left: undefined});
        });
    });

    describe('lift', function () {

        it('should lift function', function () {
            var f = (a: any, b: any) => a[b];
            var lf = Either.lift(f);
            assert(lf({b:"OK"}, "b").get() === "OK", "Return OK");
            assert.doesNotThrow(() => lf(null, "b"), "Throws");
        });
    });

    describe('get ors', function () {

        it('should getOrElse returns OK', function () {
            var e = Either.left("Bad");
            assert(e.getOrElse(() => "OK") === "OK");
        });

        it('should getOrElseGet returns OK', function () {
            var e = Either.left("Bad");
            assert(e.getOrElseGet("OK") === "OK");
        });

        it('should getOrThrow throws', function () {
            var e = Either.left("Bad");
            assert.throws(() => e.getOrThrow());
            assert.throws(() => e.getOrThrow(new Error("BAD")));
        });
    });

    describe('toOption', function () {

        it('should Right to Option.Some', function () {
            var e = Either.right("OK");
            assert(e.toOption().get() === "OK");
            assert(e.toOption().isDefined());
        });

        it('should Left to Option.None', function () {
            var e = Either.left("BAD");
            assert.throws(() => e.toOption().get());
            assert(! e.toOption().isDefined());
        });

        it('should Nothing to Option.Nothing', function () {
            var e = Either.nothing();
            assert.throws(() => e.toOption().get());
            assert(! e.toOption().isDefined());
            assert(e.toOption().equals(Option.nothing()));
        });
    });

    describe('finish coverage', function () {

        it('Either.Left should not throw errors', function () {
            var e = Either.left<string, string>("BAD");
            e.getLeft();
            e.orElse(() => Either.left<string, string>("BAD"));
            e.toOption();
            e.toString();
        });

        it('Either.Right should not throw errors', function () {
            var e = Either.right("GOOD");
            e.get();
            e.getRight();
            e.getOrElse(() => "Else");
            e.getOrElseGet("String");
            e.getOrThrow();
            e.orElse(() => Either.right("Else"));
            e.toOption();
            e.toString();
        });

        it('Either.nothing should not throw errors', function () {
            var e = Either.nothing();
            e.toOption();
            e.toString();
        });

    });
});
