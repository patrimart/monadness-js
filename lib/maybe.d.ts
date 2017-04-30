import { Monad, FunctorFunc, ApplicativeFunc } from "./interfaces";
import { Either } from "./either";
export declare abstract class Maybe<T> implements Monad<T> {
    abstract map<U>(f: (a: T) => U): Maybe<U>;
    abstract fmap<U>(f: FunctorFunc<T, U>): Maybe<U>;
    abstract applies<U, V>(f: ApplicativeFunc<T, U, V>): (mb: Maybe<U>) => Maybe<V>;
    abstract mbind<U>(f: Maybe<FunctorFunc<T, U>>): Maybe<U>;
    abstract flatten<U>(): Maybe<U>;
    abstract get(): T | never;
    abstract getOrElse(f: () => T): T;
    abstract getOrElseGet(value: T): T;
    abstract getOrThrow(err?: Error): T | never;
    abstract orElse(o: () => Maybe<T>): Maybe<T>;
    abstract toObject(): {
        just: T | null;
    };
    isDefined(): boolean;
    isEmpty(): boolean;
    toEither(): Either<Error, T>;
    equals(other: Maybe<T>): boolean;
    toJSON(): {
        just: T | null;
    };
    toString(): string;
}
export declare namespace Maybe {
    function just<T>(value: T): Just<T>;
    function none<T>(): None<T>;
    function nothing(): None<void>;
    function fromNull<T>(value: T | undefined | null): Maybe<T>;
    function sequence<T>(...maybes: Array<Maybe<T>>): Maybe<T[]>;
    function traverse<T, U>(f: (a: T) => Maybe<U>): (as: T[]) => Maybe<U[]>;
    function lift<T>(partialFunction: (...args: any[]) => T): (...args: any[]) => Maybe<T>;
    class None<T> extends Maybe<T> {
        constructor();
        map<U>(f: (a: T) => U): None<U>;
        fmap<U>(f: (a: T) => Maybe<U>): None<U>;
        applies<U, V>(f: (a: T) => (b: U) => Maybe<V>): (mb: Maybe<U>) => None<V>;
        mbind<U>(f: Maybe<(a: T) => Maybe<U>>): None<U>;
        flatten(): None<T>;
        isEmpty(): boolean;
        get(): never;
        getOrElse(f: () => T): T;
        getOrElseGet(value: T): T;
        getOrThrow(err?: Error): never;
        orElse(f: () => Maybe<T>): Maybe<T>;
        toEither(): Either.Left<Error, T>;
        toObject(): {
            just: null;
        };
    }
    class Just<T> extends Maybe<T> {
        private value;
        constructor(value: T);
        map<U>(f: (a: T) => U): Just<U>;
        fmap<U>(f: (a: T) => Maybe<U>): Maybe<U>;
        applies<U, V>(f: (a: T) => (b: U) => Maybe<V>): (mb: Maybe<U>) => Maybe<V>;
        mbind<U>(f: Maybe<(a: T) => Maybe<U>>): Maybe<U>;
        flatten<U>(): Maybe<U>;
        isDefined(): boolean;
        get(): T;
        getOrElse(value: () => T): T;
        getOrElseGet(value: T): T;
        getOrThrow(err?: Error): T;
        orElse(o: () => Maybe<T>): Maybe<T>;
        toEither(): Either.Right<Error, T>;
        toObject(): {
            just: T;
        };
    }
}
