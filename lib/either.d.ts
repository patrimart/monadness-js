import { Monad, FunctorFunc, ApplicativeFunc } from "./interfaces";
import { Maybe } from "./maybe";
import { Option } from "./option";
export declare abstract class Either<L, R> implements Monad<R> {
    abstract map<S>(f: (a: R) => S): Either<L, S>;
    abstract fmap<S>(f: FunctorFunc<R, S>): Either<L, S>;
    abstract applies<S, T>(f: ApplicativeFunc<R, S, T>): (mb: Either<L, S>) => Either<L, T>;
    abstract mbind<S>(f: Either<L, FunctorFunc<R, S>>): Either<L, S>;
    abstract bimap<M, S>(lf: (l: L) => M, rf: (r: R) => S): Either<M, S>;
    abstract cata<V>(lf: (l: L) => V, rf: (r: R) => V): V;
    abstract flatten<M, S>(): Either<M, S>;
    abstract get(): R | never;
    abstract getOrElse(f: () => R): R;
    abstract getOrElseGet(right: R): R;
    abstract getOrThrow(err?: Error): R;
    abstract orElse(f: () => Either<L, R>): Either<L, R>;
    abstract toObject(): {
        left?: L;
        right?: R;
    };
    isLeft(): boolean;
    isRight(): boolean;
    getLeft(): L;
    getRight(): R;
    toMaybe(): Maybe<R>;
    toOption(): Option<R>;
    equals(other: Either<L, R>): boolean;
    toJSON(): {
        left?: L;
        right?: R;
    };
    toString(): string;
}
export declare namespace Either {
    function left<L, R>(left: L): Left<L, R>;
    function right<L, R>(right: R): Right<L, R>;
    function nothing(): Left<void, void>;
    function sequence<L, R>(...eithers: Array<Either<L, R>>): Either<L, R[]>;
    function traverse<L, R, S>(f: (a: R) => Either<L, S>): (as: R[]) => Either<L, S[]>;
    function lift<Error, T>(partialFunction: (...args: any[]) => T): (...args: any[]) => Either<Error, T>;
    class Left<L, R> extends Either<L, R> {
        private left;
        constructor(left: L);
        map<S>(f: (a: R) => S): Left<L, S>;
        fmap<S>(f: (a: R) => Either<L, S>): Left<L, S>;
        applies<S, T>(f: (a: R) => (b: S) => Left<L, T>): (mb: Either<L, S>) => Left<L, T>;
        mbind<S>(f: Either<L, (a: R) => Either<L, S>>): Left<L, S>;
        bimap<M, S>(lf: (l: L) => M, rf: (r: R) => S): Left<M, S>;
        cata<V>(lf: (l: L) => V, rf: (r: R) => V): V;
        flatten(): Left<L, R>;
        isLeft(): boolean;
        get(): never;
        getLeft(): L;
        getOrElse(f: () => R): R;
        getOrElseGet(right: R): R;
        getOrThrow(err?: Error): R;
        orElse(f: () => Either<L, R>): Either<L, R>;
        toObject(): {
            left?: L;
            right?: R;
        };
    }
    class Right<L, R> extends Either<L, R> {
        private right;
        constructor(right: R);
        map<S>(f: (a: R) => S): Right<L, S>;
        fmap<S>(f: FunctorFunc<R, S>): Either<L, S>;
        applies<S, T>(f: ApplicativeFunc<R, S, T>): (eb: Either<L, S>) => Either<L, T>;
        mbind<S>(f: Either<L, FunctorFunc<R, S>>): Either<L, S>;
        bimap<M, S>(lf: (l: L) => M, rf: (r: R) => S): Right<M, S>;
        cata<V>(lf: (l: L) => V, rf: (r: R) => V): V;
        flatten<M, S>(): Either<M, S>;
        isRight(): boolean;
        get(): R;
        getRight(): R;
        getOrElse(f: () => R): R;
        getOrElseGet(right: R): R;
        getOrThrow(): R;
        orElse(f: () => Either<L, R>): Either<L, R>;
        toMaybe(): Maybe<R>;
        toOption(): Option<R>;
        toObject(): {
            left?: L;
            right?: R;
        };
    }
}
