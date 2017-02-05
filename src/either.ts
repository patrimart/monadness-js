
import { Monad, FunctorFunc, ApplicativeFunc, MonadFunc } from "./interfaces";
import { Maybe }  from "./maybe";
import { Option } from "./option";

/**
 * The Either<L, R> abstract class.
 */
export abstract class Either <L, R> implements Monad<R> {

    abstract map <S> (f: (a: R) => S): Either<L, S>;
    abstract fmap <S> (f: FunctorFunc<R, S>): Either<L, S>;
    abstract applies <S, T> (f: ApplicativeFunc<R, S, T>): (mb: Either<L, S>) => Either<L, T>;
    abstract mbind <S> (f: Either<L, FunctorFunc<R, S>>): Either<L, S>;

    abstract bimap <M, S> (lf: (l: L) => M, rf: (r: R) => S): Either<M, S>;
    abstract cata <V> (lf: (l: L) => V, rf: (r: R) => V): V;
    abstract flatten <M, S> (): Either <M, S>;

    abstract get (): R | never;
    abstract getOrElse (f: () => R): R;
    abstract getOrElseGet (right: R): R;
    abstract getOrThrow (err?: Error): R;
    abstract orElse (f: () => Either<L, R>): Either<L, R>;
    abstract toObject (): {left?: L; right?: R};

    /**
     * Is this a Left.
     * @returns {boolean}
     */
    public isLeft (): boolean { return false; }

    /**
     * Is this a Right.
     * @returns {boolean}
     */
    public isRight (): boolean { return false; }

    /**
     * Returns an undefined Left value.
     * @returns {L}
     */
    public getLeft (): L { throw new ReferenceError("This either is Right."); }

    /**
     * Returns an undefined Right value.
     * @returns {R}
     */
    public getRight (): R { throw new ReferenceError("This either is Left."); }

    /**
     * Returns an Maybe.None<R>.
     * @returns {Maybe<R>}
     * @since 0.5.0
     */
    public toMaybe (): Maybe<R> {
        return Maybe.none<R>();
    }

    /**
     * Returns an Option.None<R>.
     * @returns {Option<R>}
     * @deprecated
     */
    public toOption (): Option<R> {
        return Option.none<R>();
    }

    /**
     * Tests equality of Eithers.
     * @params {Either<L, R>} other - the other Either to test
     * @returns {boolean}
     */
    public equals (other: Either<L, R>): boolean {
        if (this === other) return true;
        if (! other || other instanceof Either === false) return false;
        if (this.isRight() !== other.isRight()) return false;
        if (this.isRight() && this.getRight() === other.getRight()) return true;
        if (this.getLeft() && this.getLeft() === other.getLeft()) return true;
        return false;
    }

    /**
     * Returns the Either as a JSON object.
     * @returns {{left?: L; right?: R}}
     */
    public toJSON (): {left?: L; right?: R} {
        return this.toObject();
    }

    /**
     * Returns the Either as a string.
     * @returns {string} '{"right": R}' or '{"left": L}'
     */
    public toString (): string {
        return JSON.stringify(this.toJSON());
    }
}

/**
 * The Either namespace.
 */
export namespace Either {

    /**
     * Returns a new Either.Left<L, R> instance.
     * @returns {Either.Left<L, R>}
     */
    export function left <L, R> (left: L) {
        return new Left<L, R>(left);
    }

    /**
     * Returns a new Either.Right<L, R> instance.
     * @returns {Either.Right<L, R>}
     */
    export function right <L, R> (right: R) {
        return new Right<L, R>(right);
    }

    /**
     * Returns the singleton instance of Either.Left<void, void>.
     * @returns {Either.Left<void, void>}
     */
    export function nothing () {
        return nothingEither;
    }

    /**
     * Iterates over an Array of Either values. If any Either.Left, the iteration
     * stops and a Maybe.Left is returned.
     * @since 0.5.0
     */
    export function sequence <L, R> (...eithers: Array<Either<L, R>>): Either<L, R[]> {
        
        const arr = [] as R[];
        for (const i in eithers) {
            if (eithers[i].isLeft()) {
                return new Left<L, R[]>(eithers[i].getLeft() as L);
            }
            arr[i] = eithers[i].get();
        }
        return new Right<L, R[]>(arr);
    }

    /**
     * Maps over an Array with the given function. If the function ever returns
     * an Either.Left, the iteration stops and a Either.Left is returned.
     * @since 0.5.0
     */
    export function traverse <L, R, S> (f: (a: R) => Either<L, S>): (as: R[]) => Either<L, S[]> {

        return function (as: R[]): Either<L, S[]> {

            const arr = [] as S[];
            for (const i in as) {
                const r = f(as[i]);
                if (r.isLeft()) {
                    return new Left<L, S[]>(r.getLeft() as L);
                }
                arr[i] = r.get();
            }
            return new Right<L, S[]>(arr);
        }
    }

    /**
     * Lifts the given partialFunction into a total function that returns an Either result.
     * Basically, wraps the function in try/catch and return Either.Right() or Either.Left().
     * @param {(...args: any[]) => T} partialFunction - the function to lift
     * @returns (...args: any[]) => Either<Error, T>
     */
    export function lift <Error, T> (partialFunction: (...args: any[]) => T): (...args: any[]) => Either<Error, T> {

        return (...args: any[]) => {
            try {
                return Either.right<Error, T>(partialFunction.apply(partialFunction, args) as T);
            } catch (err) {
                return Either.left<Error, T>(err);
            }
        };
    }

    /**
     * The Either.Left<L, R> class.
     */
    export class Left <L, R> extends Either <L, R> {

        constructor (private left: L) {
            super();
        }

        /**
         * 
         * @since 0.5.0
         */
        public map <S> (f: (a: R) => S): Left<L, S> {
            return new Left<L, S>(this.left);
        }

        /**
         * 
         * @since 0.5.0
         */
        public fmap <S> (f: (a: R) => Either<L, S>): Left<L, S> {
            return new Left<L, S>(this.left);
        }

        /**
         * 
         * @since 0.5.0
         */
        public applies <S, T> (f: (a: R) => (b: S) => Left<L, T>): (mb: Either<L, S>) => Left<L, T> {
            return function (mb: Either<L, S>): Left<L, T> {
                return new Left<L, T>(this.left);
            }
        }

        /**
         * 
         * @since 0.5.0
         */
        public mbind <S> (f: Either<L, (a: R) => Either<L, S>>): Left<L, S> {
            return new Left<L, S>(this.left);
        }

        /**
         * 
         * @since 0.5.0
         */
        public bimap <M, S> (lf: (l: L) => M, rf: (r: R) => S): Left<M, S> {
            return new Left<M, S>(lf(this.left));
        }

        /**
         * 
         * @since 0.5.0
         */
        public cata <V> (lf: (l: L) => V, rf: (r: R) => V): V {
            return lf(this.left);
        }

        /**
         * 
         * @since 0.5.0
         */
        public flatten (): Left<L, R> {
            return this;
        }

        /**
         * Returns that this is a Left.
         * @returns {boolean}
         */
        public isLeft (): boolean {
            return true;
        }

        /**
         * Throws a ReferenceError.
         */
        public get (): never {
            throw new ReferenceError("This either is Left.");
        }

        /**
         * Returns the Left value.
         * @returns {L}
         */
        public getLeft (): L {
            return this.left;
        }

        /**
         * Returns the evaluated given function.
         * @param {() => R} f - the or else function to evaluate
         * @returns {R}
         */
        public getOrElse (f: () => R): R {
            return f();
        }

        /**
         * Returns the given R value.
         * @param {R} right - the or else value
         * @returns {R}
         */
        public getOrElseGet (right: R): R {
            return right;
        }

        /**
         * Throws a ReferenceError or the given Error.
         * @param {Error} [err] - the optional Error to throw
         * @returns {R}
         */
        public getOrThrow (err?: Error): R {
            throw err || new ReferenceError("This either is Left.")
        }

        /**
         * Returns the evaluated function.
         * @param {() => Either<L, R>} f - the or else function to evaluate
         * @returns {Either<L, R>}
         */
        public orElse (f: () => Either<L, R>): Either<L, R> {
            return f();
        }

        /**
         * Returs the Either as a plain-old JS object.
         * @returns {{left: L}}
         */
        public toObject (): {left?: L; right?: R} {
            return { left : this.left };
        }
    }

    /**
     * The Either.Right<L, R> class.
     */
    export class Right <L, R> extends Either <L, R> {

        constructor (private right: R) {
            super();
        }

        /**
         * 
         * @since 0.5.0
         */
        public map <S> (f: (a: R) => S): Right<L, S> {
            return new Right<L, S>(f(this.right));
        }

        /**
         * 
         * @since 0.5.0
         */
        public fmap <S> (f: FunctorFunc<R, S>): Either<L, S> {
            return f(this.right) as any;
        }

        /**
         * 
         * @since 0.5.0
         */
        public applies <S, T> (f: ApplicativeFunc<R, S, T>): (eb: Either<L, S>) => Either<L, T> {
            return eb => eb.fmap(f(this.right));
        }

        /**
         * 
         * @since 0.5.0
         */
        public mbind <S> (f: Either<L, FunctorFunc<R, S>>): Either<L, S> {
            return this.applies(a => (b: FunctorFunc<R, S>) => b(a))(f);
        }

        /**
         * 
         * @since 0.5.0
         */
        public bimap <M, S> (lf: (l: L) => M, rf: (r: R) => S): Right<M, S> {
            return new Right<M, S>(rf(this.right));
        }

        /**
         * 
         * @since 0.5.0
         */
        public cata <V> (lf: (l: L) => V, rf: (r: R) => V): V {
            return rf(this.right);
        }

        /**
         * 
         * @since 0.5.0
         */
        public flatten <M, S> (): Either<M, S> {

            const val = this.get();
            if (val instanceof Either) {
                return val.flatten() as any;
            } else {
                return this as any;
            }
        }

        /**
         * This is a Right.
         * @returns {boolean}
         */
        public isRight (): boolean {
            return true;
        }

        /**
         * Returns the Right value.
         * @returns {R}
         */
        public get (): R {
            return this.right;
        }

        /**
         * Returns the Right value.
         * @returns {R}
         */
        public getRight (): R {
            return this.right;
        }

        /**
         * Returns the Right value.
         * @param {() => R} f - the function to evaluate if Left
         * @returns {R}
         */
        public getOrElse (f: () => R): R {
            return this.right;
        }

        /**
         * Returns the Right value.
         * @param {R} right - the value to return if Left
         * @return {R}
         */
        public getOrElseGet (right: R): R {
            return this.right;
        }

        /**
         * Returns the Right value.
         * @returns {R}
         */
        public getOrThrow (): R {
            return this.right;
        }

        /**
         * Returns this Right.
         * @param {Either<L, R>} f - the function to evaluate if Left
         * @returns {Either<L, R>}
         */
        public orElse (f: () => Either<L, R>): Either<L, R> {
            return this;
        }

        /**
         * Returns an Maybe.Just<R>.
         * @returns {Maybe<R>}
         * @since 0.5.0
         */
        public toMaybe (): Maybe<R> {
            return Maybe.just<R>(this.right);
        }

        /**
         * Returns an Option.Some<R>.
         * @returns {Option<R>}
         * @deprecated
         */
        public toOption (): Option<R> {
            return Option.some<R>(this.right);
        }

        /**
         * Returs the Either as a plain-old JS object.
         * @returns {{left: L | undefined; right: R | undefined;}}
         */
        public toObject (): {left?: L; right?: R} {
            return { right: this.right };
        }
    }
}

const nothingEither = new Either.Left<void, void>(void(0));
