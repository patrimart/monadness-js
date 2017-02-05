
/**
 * Expanded: (a: A) => Functor<B>
 */
export type FunctorFunc<A, B> = (a: A) => Functor<B>;

/**
 * Expanded: (a: A) => (a: B) => Applicative<C>
 */
export type ApplicativeFunc<A, B, C> = (a: A) => FunctorFunc<B, C>;

/**
 * Expanded: Monad<(a: A) => Monad<B>>
 */
export type MonadFunc<A, B> = Monad<FunctorFunc<A, B>>;

/**
 * Functor interface.
 */
export interface Functor<A> {

    map <B> (f: (a: A) => B): Functor<B>;
    fmap <B> (f: FunctorFunc<A, B>): Functor<B>;
}

/**
 * Applicative interface, extends Functor interface.
 */
export interface Applicative<A> extends Functor<A> {

    applies <B, C> (f: ApplicativeFunc<A, B, C>): (ab: Applicative<B>) => Applicative<C>;
}

/**
 * Monad interface: extends Applicative and Functor interfaces.
 */
export interface Monad<A> extends Applicative<A> {

    mbind <B> (f: MonadFunc<A, B>): Monad<B>;
}
