
import {Either} from "./either";

/**
 * The Option<T> abstract class.
 */
export abstract class Option <T> {

    abstract getOrElse (f: () => T): T;
    abstract getOrElseGet (value: T): T;
    abstract getOrThrow (err: Error): T;
    abstract orElse (o: () => Option<T>): Option<T>;
    abstract toObject (): {some: T};

    /**
     * Returns that this is None.
     * returns {boolean}
     */
    public isDefined (): boolean {
        return false;
    }

    /**
     * Returns that this is Some.
     * @returns {boolean}
     */
    public isEmpty (): boolean {
        return false;
    }

    /**
     * Throws a ReferenceError.
     */
    public get (): T {
        throw new ReferenceError("This is option is None.")
    }

    /**
     * Returns a Either.Left<Error, T>.
     * @returns {Either.Left<Error, T>}
     */
    public toEither (): Either<Error, T> {
        return Either.left<Error, T>(new ReferenceError("This either is Left."));
    }

    /**
     * Tests equality of Options.
     * @param {Option<T>} other - the other Option to test
     * @returns {boolean}
     */
    public equals (other: Option<T>): boolean {
        if (! other || other instanceof Option === false) return false;
        if (this === other) return true;
        if (this.isDefined() === false && other.isDefined() === false) return true;
        return this.isDefined() === other.isDefined() && this.get() === other.get();
    }

    /**
     * Returns the Option as a JSON object.
     * @returns {string} '{"some": T | null}'
     */
    public toJSON (): {some: T} {
        return this.toObject();
    }

    /**
     * Returns the Option as a string.
     * @returns {string} '{"some": T | null}'
     */
    public toString (): string {
        return JSON.stringify(this.toJSON());
    }
}

/**
 * The Option namespace.
 */
export namespace Option {

    /**
     * Returns a new Option.Some<T> instance.
     * @returns {Option.some<T>}
     */
    export function some <T> (value: T) {
        return new Some<T>(value);
    }

    /**
     * Returns a new Option.None<T> instance.
     * @returns {Option.None<T>}
     */
    export function none <T> () {
        return new None<T>();
    }

    /**
     * Returns the singleton instance of Option.None<void>.
     * @returns {Option.None<void>}
     */
    export function nothing () {
        return nothingOption;
    }

    /**
     * Lifts the given partialFunction into a total function that returns an Option result.
     * Basically, wraps the function in try/catch and returns Option.Some() or Option.None().
     * @param {(...args: any[]) => T} partialFunction - the function to lift
     * @returns (...args: any[]) => Option<T>
     */
    export function lift <T> (partialFunction: (...args: any[]) => T): (...args: any[]) => Option<T> {

        return (...args: any[]) => {
            try {
                return Option.some<T>(partialFunction.apply(partialFunction, args) as T);
            } catch (err) {
                return Option.none<T>();
            }
        };
    }

    /**
     * The Option.None<T> class.
     */
    export class None<T> extends Option<T> {

        constructor () {
            super();
        }

        /**
         * Returns that this option is empty.
         * @returns {boolean}
         */
        public isEmpty () {
            return true;
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
         * @param {() => Option<T>} f - the or else function to evaluate
         * @returns {Option<T>}
         */
        public orElse (f: () => Option<T>): Option<T> {
            return f();
        }

        /**
         * Returns an Either.Left<Error, T>.
         */
        public toEither () {
            return Either.left<Error, T>(new ReferenceError("This either is Left."));
        }

        /**
         * Returns the Option as a plain-old JS object.
         * @returns {{some: null}}
         */
        public toObject (): {some: T} {
            return { some: null };
        }
    }

    /**
     * The Option.Some<T> class.
     */
    export class Some<T> extends Option<T> {

        constructor (private value: T) {
            super();
        }

        /**
         * Returns that this option is Option.Some<T>.
         * @returns {boolean}
         */
        public isDefined () {
            return true;
        }

        /**
         * Returns the Some value.
         * @returns {T}
         */
        public get (): T {
            return this.value;
        }

        /**
         * Returns the Some value.
         * @param {() => T} f - the function to evaluate if Left
         * @returns {T}
         */
        public getOrElse (value: () => T): T {
            return this.value;
        }

        /**
         * Returns the Some value.
         * @param {T} value - the value to return if None
         * @return {T}
         */
        public getOrElseGet (value: T): T {
            return this.value;
        }

        /**
         * Returns the Some value.
         * @returns {T}
         */
        public getOrThrow (err: Error) {
            return this.value;
        }

        /**
         * Returns this Some value.
         * @param {Option<T>} f - the function to evaluate if Left
         */
        public orElse (o: () => Option<T>): Option<T> {
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
         * Returns the Option as a plain-old JS object.
         * @returns {{some: T}}
         */
        public toObject (): {some: T} {
            return { some: this.value };
        }
    }

    const nothingOption = new None<void>();
}
