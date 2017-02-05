export declare type FunctorFunc<A, B> = (a: A) => Functor<B>;
export declare type ApplicativeFunc<A, B, C> = (a: A) => FunctorFunc<B, C>;
export declare type MonadFunc<A, B> = Monad<FunctorFunc<A, B>>;
export interface Functor<A> {
    map<B>(f: (a: A) => B): Functor<B>;
    fmap<B>(f: FunctorFunc<A, B>): Functor<B>;
}
export interface Applicative<A> extends Functor<A> {
    applies<B, C>(f: ApplicativeFunc<A, B, C>): (ab: Applicative<B>) => Applicative<C>;
}
export interface Monad<A> extends Applicative<A> {
    mbind<B>(f: MonadFunc<A, B>): Monad<B>;
}
