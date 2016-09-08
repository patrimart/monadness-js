import { Either } from "./either";
export declare abstract class Option<T> {
    abstract getOrElse(f: () => T): T;
    abstract getOrElseGet(value: T): T;
    abstract getOrThrow(err: Error): T;
    abstract orElse(o: () => Option<T>): Option<T>;
    abstract toObject(): {
        some: T;
    };
    isDefined(): boolean;
    isEmpty(): boolean;
    get(): T;
    toEither(): Either<Error, T>;
    equals(other: Option<T>): boolean;
    toJSON(): {
        some: T;
    };
    toString(): string;
}
export declare namespace Option {
    function some<T>(value: T): Some<T>;
    function none<T>(): None<T>;
    function nothing(): None<void>;
    function lift<T>(partialFunction: (...args: any[]) => T): (...args: any[]) => Option<T>;
    class None<T> extends Option<T> {
        constructor();
        isEmpty(): boolean;
        getOrElse(f: () => T): T;
        getOrElseGet(value: T): T;
        getOrThrow(err?: Error): T;
        orElse(f: () => Option<T>): Option<T>;
        toEither(): Either.Left<Error, T>;
        toObject(): {
            some: T;
        };
    }
    class Some<T> extends Option<T> {
        private value;
        constructor(value: T);
        isDefined(): boolean;
        get(): T;
        getOrElse(value: () => T): T;
        getOrElseGet(value: T): T;
        getOrThrow(err: Error): T;
        orElse(o: () => Option<T>): Option<T>;
        toEither(): Either.Right<Error, T>;
        toObject(): {
            some: T;
        };
    }
}
