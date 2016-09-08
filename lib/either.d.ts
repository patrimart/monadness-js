import { Option } from "./option";
export declare abstract class Either<L, R> {
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
    get(): R;
    getLeft(): L;
    getRight(): R;
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
    function lift<Error, T>(partialFunction: (...args: any[]) => T): (...args: any[]) => Either<Error, T>;
    class Left<L, R> extends Either<L, R> {
        private left;
        constructor(left: L);
        isLeft(): boolean;
        getLeft(): L;
        getOrElse(f: () => R): R;
        getOrElseGet(right: R): R;
        getOrThrow(err?: Error): R;
        orElse(f: () => Either<L, R>): Either<L, R>;
        toOption(): Option<R>;
        toObject(): {
            left?: L;
            right?: R;
        };
    }
    class Right<L, R> extends Either<L, R> {
        private right;
        constructor(right: R);
        isRight(): boolean;
        get(): R;
        getRight(): R;
        getOrElse(f: () => R): R;
        getOrElseGet(right: R): R;
        getOrThrow(): R;
        orElse(f: () => Either<L, R>): Either<L, R>;
        toOption(): Option<R>;
        toObject(): {
            left?: L;
            right?: R;
        };
    }
}
