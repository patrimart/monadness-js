
import { Monad, FunctorFunc, ApplicativeFunc, MonadFunc } from "./interfaces";
import { Either } from "./either";

/**
 * The Maybe<T> abstract class.
 * @since 0.5.0
 */
export abstract class Maybe <T> implements Monad<T> {

    abstract map <U> (f: (a: T) => U): Maybe<U>;
    abstract fmap <U> (f: FunctorFunc<T, U>): Maybe<U>;
    abstract applies <U, V> (f: ApplicativeFunc<T, U, V>): (mb: Maybe<U>) => Maybe<V>;
    abstract mbind <U> (f: Maybe<FunctorFunc<T, U>>): Maybe<U>;

    abstract flatten <U> (): Maybe<U>;

    abstract get (): T | never;
    abstract getOrElse (f: () => T): T;
    abstract getOrElseGet (value: T): T;
    abstract getOrThrow (err: Error): T;
    abstract orElse (o: () => Maybe<T>): Maybe<T>;
    abstract toObject (): {just: T | null};

    /**
     * Returns that this is None.
     * returns {boolean}
     */
    public isDefined (): boolean {
        return false;
    }

    /**
     * Returns that this is Just.
     * @returns {boolean}
     */
    public isEmpty (): boolean {
        return false;
    }

    /**
     * Returns a Either.Left<Error, T>.
     * @returns {Either.Left<Error, T>}
     */
    public toEither (): Either<Error, T> {
        return Either.left<Error, T>(new ReferenceError("This either is Left."));
    }

    /**
     * Tests equality of Maybes.
     * @param {Maybe<T>} other - the other Maybe to test
     * @returns {boolean}
     */
    public equals (other: Maybe<T>): boolean {
        if (! other || other instanceof Maybe === false) return false;
        if (this === other) return true;
        if (this.isDefined() === false && other.isDefined() === false) return true;
        return this.isDefined() === other.isDefined() && this.get() === other.get();
    }

    /**
     * Returns the Maybe as a JSON object.
     * @returns {{just: T | null}}
     */
    public toJSON (): {just: T | null} {
        return this.toObject();
    }

    /**
     * Returns the Maybe as a string.
     * @returns {string} '{"just": T | null}'
     */
    public toString (): string {
        return JSON.stringify(this.toJSON());
    }
}

/**
 * The Maybe namespace.
 * @since 0.5.0
 */
export namespace Maybe {

    /**
     * Returns a new Maybe.Just<T> instance.
     * @returns {Maybe.just<T>}
     */
    export function just <T> (value: T) {
        return new Just<T>(value);
    }

    /**
     * Returns a new Maybe.None<T> instance.
     * @returns {Maybe.None<T>}
     */
    export function none <T> () {
        return new None<T>();
    }

    /**
     * Returns the singleton instance of Maybe.None<void>.
     * @returns {Maybe.None<void>}
     */
    export function nothing () {
        return nothingMaybe;
    }

    /**
     * Returns a Maybe.Just<T> instance, or Maybe.None<T> for null and undefined.
     * @returns {Maybe<T>}
     */
    export function fromNull <T> (value: T): Maybe<T> {
        if (value === null || value === undefined) {
            return Maybe.none<T>();
        } else {
            return Maybe.just(value);
        }
    }

    /**
     * Iterates over an Array of Maybe values. If any Maybe.None, the iteration
     * stops and a Maybe.None is returned.
     * @since 0.5.0
     */
    export function sequence <T> (...maybes: Array<Maybe<T>>): Maybe<T[]> {
        
        const arr = [] as T[];
        for (const i in maybes) {
            if (maybes[i].isEmpty()) {
                return new None<T[]>();
            }
            arr[i] = maybes[i].get();
        }
        return new Just(arr);
    }

    /**
     * Maps over an Array with the given function. If the function ever returns
     * a Maybe.None, the iteration stops and a Maybe.None is returned.
     * @since 0.5.0
     */
    export function traverse <T, U> (f: (a: T) => Maybe<U>): (as: T[]) => Maybe<U[]> {

        return function (as: T[]): Maybe<U[]> {

            const arr = [] as U[];
            for (const i in as) {
                const r = f(as[i]);
                if (r.isEmpty()) {
                    return new None<U[]>();
                }
                arr[i] = r.get();
            }
            return new Just(arr);
        }
    }

    /**
     * Lifts the given partialFunction into a total function that returns an Maybe result.
     * Basically, wraps the function in try/catch and returns Maybe.Just() or Maybe.None().
     * @param {(...args: any[]) => T} partialFunction - the function to lift
     * @returns (...args: any[]) => Maybe<T>
     */
    export function lift <T> (partialFunction: (...args: any[]) => T): (...args: any[]) => Maybe<T> {

        return (...args: any[]) => {
            try {
                return Maybe.just<T>(partialFunction.apply(partialFunction, args) as T);
            } catch (err) {
                return Maybe.none<T>();
            }
        };
    }

    /**
     * The Maybe.None<T> class.
     * @since 0.5.0
     */
    export class None<T> extends Maybe<T> {

        constructor () {
            super();
        }

        /**
         *
         * @since 0.5.0
         */
        public map <U> (f: (a: T) => U): None<U> {
            return new None<U>();
        }

        /**
         *
         * @since 0.5.0
         */
        public fmap <U> (f: (a: T) => Maybe<U>): None<U> {
            return new None<U>();
        }

        /**
         *
         * @since 0.5.0
         */
        public applies <U, V> (f: (a: T) => (b: U) => Maybe<V>): (mb: Maybe<U>) => None<V> {
            return function (mb: Maybe<U>): None<V> {
                return new None<V>();
            }
        }

        /**
         *
         * @since 0.5.0
         */
        public mbind <U> (f: Maybe<(a: T) => Maybe<U>>): None<U> {
            return new None<U>();
        }

        /**
         * 
         * @since 0.5.0
         */
        public flatten (): None<T> {
            return this;
        }

        /**
         * Returns that this option is empty.
         * @returns {boolean}
         */
        public isEmpty () {
            return true;
        }

        /**
         * Throws a ReferenceError.
         */
        public get (): never {
            throw new ReferenceError("This is option is None.")
        }

        /**
         * Returns the evaluated given function.
         * @param {() => T} f - the or else function to evaluate
         * @returns {T}
         */
        public getOrElse (f: () => T): T {
            return f();
        }

        /**
         * Returns the T value.
         * @param {T} value - the or else value
         * @returns {T}
         */
        public getOrElseGet (value: T): T {
            return value;
        }

        /**
         * Throws a ReferenceError or the given Error.
         * @param {Error} [err] - the optional Error to throw
         * @returns {T}
         */
        public getOrThrow (err?: Error): T {
            throw err || new ReferenceError("This option is None.")
        }

        /**
         * Returns the evaluated function.
         * @param {() => Maybe<T>} f - the or else function to evaluate
         * @returns {Maybe<T>}
         */
        public orElse (f: () => Maybe<T>): Maybe<T> {
            return f();
        }

        /**
         * Returns an Either.Left<Error, T>.
         */
        public toEither () {
            return Either.left<Error, T>(new ReferenceError("This either is Left."));
        }

        /**
         * Returns the Maybe as a plain-old JS object.
         * @returns {{just: null}}
         */
        public toObject (): {just: null} {
            return { just: null };
        }
    }

    /**
     * The Maybe.Just<T> class.
     * @since 0.5.0
     */
    export class Just<T> extends Maybe<T> {

        constructor (private value: T) {
            super();
        }

        /**
         *
         * @since 0.5.0
         */
        public map <U> (f: (a: T) => U): Just<U> {
            return new Just<U>(f(this.value));
        }

        /**
         *
         * @since 0.5.0
         */
        public fmap <U> (f: (a: T) => Maybe<U>): Maybe<U> {
            return f(this.value);
        }

        /**
         *
         * @since 0.5.0
         */
        public applies <U, V> (f: (a: T) => (b: U) => Maybe<V>): (mb: Maybe<U>) => Maybe<V> {
            return mb => mb.fmap(f(this.value));
        }

        /**
         *
         * @since 0.5.0
         */
        public mbind <U> (f: Maybe<(a: T) => Maybe<U>>): Maybe<U> {
            return this.applies(a => (b: (a: T) => Maybe<U>) => b(a))(f);
        }

        /**
         * If this Maybe is a Maybe of a Maybe, etc., then it will unwrap to the last Maybe.
         * @since 0.5.0
         */
        public flatten <U> (): Maybe<U> {

            const val = this.get();
            if (val instanceof Maybe) {
                return val.flatten() as any;
            } else {
                return this as any;
            }
        }

        /**
         * Returns that this option is Maybe.Just<T>.
         * @returns {boolean}
         */
        public isDefined () {
            return true;
        }

        /**
         * Returns the Just value.
         * @returns {T}
         */
        public get (): T {
            return this.value;
        }

        /**
         * Returns the Just value.
         * @param {() => T} f - the function to evaluate if Left
         * @returns {T}
         */
        public getOrElse (value: () => T): T {
            return this.value;
        }

        /**
         * Returns the Just value.
         * @param {T} value - the value to return if None
         * @return {T}
         */
        public getOrElseGet (value: T): T {
            return this.value;
        }

        /**
         * Returns the Just value.
         * @returns {T}
         */
        public getOrThrow (err: Error) {
            return this.value;
        }

        /**
         * Returns this Just value.
         * @param {Maybe<T>} f - the function to evaluate if Left
         */
        public orElse (o: () => Maybe<T>): Maybe<T> {
            return this;
        }

        /**
         * Returns an Either.Right<Error, T>.
         * @returns {Either.Right<Error, T>}
         */
        public toEither () {
            return Either.right<Error, T>(this.value);
        }

        /**
         * Returns the Maybe as a plain-old JS object.
         * @returns {{just: T}}
         */
        public toObject (): {just: T} {
            return { just: this.value };
        }
    }

    const nothingMaybe = new None<void>();
}
