import { Monad, ApplicativeFunc } from "./interfaces";
export declare type TMF<A, B> = (a: A) => Tuple1<B>;
export interface Tuple extends Array<any> {
    map(callbackfn: (value: any, index?: number, array?: any) => any, thisArg?: any): any;
    equals(o: Tuple): boolean;
    toJSON(): any[];
    toString(): string;
}
export interface Tuple0 extends Tuple, Monad<void> {
    map(f: (a: void) => void): Tuple0;
    fmap(f: TMF<void, void>): Tuple0;
    applies(f: ApplicativeFunc<void, void, void>): (mb: Tuple0) => Tuple0;
    mbind(f: Tuple1<TMF<void, void>>): Tuple0;
}
export interface Tuple1<T1> extends Tuple, Monad<T1> {
    _1: T1;
    map<U1>(f: (a: T1) => U1): Tuple1<U1>;
    fmap<U1>(f: TMF<T1, U1>): Tuple1<U1>;
    applies<U1, V1>(f: ApplicativeFunc<T1, U1, V1>): (mb: Tuple1<U1>) => Tuple1<V1>;
    mbind<U1>(f: Tuple1<TMF<T1, U1>>): Tuple1<U1>;
}
export interface Tuple2<T1, T2> extends Tuple, Monad<T1 | T2> {
    _1: T1;
    _2: T2;
    map<U1, U2>(f: (a: T1 | T2) => U1 | U2): Tuple2<U1, U2>;
    fmap<U1, U2>(f: (a: T1 | T2) => Tuple1<U1 | U2>): Tuple2<U1, U2>;
    applies<U1, U2, V1, V2>(f: ApplicativeFunc<T1 | T2, U1 | U2, V1 | V2>): (mb: Tuple2<U1, U2>) => Tuple2<V1, V2>;
    mbind<U1, U2>(f: Tuple2<TMF<T1, U1>, TMF<T2, U2>>): Tuple2<U1, U2>;
}
export interface Tuple3<T1, T2, T3> extends Tuple, Monad<T1 | T2 | T3> {
    _1: T1;
    _2: T2;
    _3: T3;
    map<U1, U2, U3>(f: (a: T1 | T2 | T3) => U1 | U2 | U3): Tuple3<U1, U2, U3>;
    fmap<U1, U2, U3>(f: (a: T1 | T2 | T3) => Tuple1<U1 | U2 | U3>): Tuple3<U1, U2, U3>;
    applies<U1, U2, U3, V1, V2, V3>(f: ApplicativeFunc<T1 | T2 | T3, U1 | U2 | U3, V1 | V2 | V3>): (mb: Tuple3<U1, U2, U3>) => Tuple3<V1, V2, V3>;
    mbind<U1, U2, U3>(f: Tuple3<TMF<T1, U1>, TMF<T2, U2>, TMF<T3, U3>>): Tuple3<U1, U2, U3>;
}
export interface Tuple4<T1, T2, T3, T4> extends Tuple, Monad<T1 | T2 | T3 | T4> {
    _1: T1;
    _2: T2;
    _3: T3;
    _4: T4;
    map<U1, U2, U3, U4>(f: (a: T1 | T2 | T3 | T4) => U1 | U2 | U3 | U4): Tuple4<U1, U2, U3, U4>;
    fmap<U1, U2, U3, U4>(f: (a: T1 | T2 | T3 | T4) => Tuple1<U1 | U2 | U3 | U4>): Tuple4<U1, U2, U3, U4>;
    applies<U1, U2, U3, U4, V1, V2, V3, V4>(f: ApplicativeFunc<T1 | T2 | T3 | T4, U1 | U2 | U3 | U4, V1 | V2 | V3 | V4>): (mb: Tuple4<U1, U2, U3, U4>) => Tuple4<V1, V2, V3, V4>;
    mbind<U1, U2, U3, U4>(f: Tuple4<TMF<T1, U1>, TMF<T2, U2>, TMF<T3, U3>, TMF<T4, U4>>): Tuple4<U1, U2, U3, U4>;
}
export interface Tuple5<T1, T2, T3, T4, T5> extends Tuple, Monad<T1 | T2 | T3 | T4 | T5> {
    _1: T1;
    _2: T2;
    _3: T3;
    _4: T4;
    _5: T5;
    map<U1, U2, U3, U4, U5>(f: (a: T1 | T2 | T3 | T4 | T5) => U1 | U2 | U3 | U4 | U5): Tuple5<U1, U2, U3, U4, U5>;
    fmap<U1, U2, U3, U4, U5>(f: (a: T1 | T2 | T3 | T4 | T5) => Tuple1<U1 | U2 | U3 | U4 | U5>): Tuple5<U1, U2, U3, U4, U5>;
    applies<U1, U2, U3, U4, U5, V1, V2, V3, V4, V5>(f: ApplicativeFunc<T1 | T2 | T3 | T4 | T5, U1 | U2 | U3 | U4 | U5, V1 | V2 | V3 | V4 | V5>): (mb: Tuple5<U1, U2, U3, U4, U5>) => Tuple5<V1, V2, V3, V4, V5>;
    mbind<U1, U2, U3, U4, U5>(f: Tuple5<TMF<T1, U1>, TMF<T2, U2>, TMF<T3, U3>, TMF<T4, U4>, TMF<T5, U5>>): Tuple5<U1, U2, U3, U4, U5>;
}
export interface Tuple6<T1, T2, T3, T4, T5, T6> extends Tuple, Monad<T1 | T2 | T3 | T4 | T5 | T6> {
    _1: T1;
    _2: T2;
    _3: T3;
    _4: T4;
    _5: T5;
    _6: T6;
    map<U1, U2, U3, U4, U5, U6>(f: (a: T1 | T2 | T3 | T4 | T5 | T6) => U1 | U2 | U3 | U4 | U5 | U6): Tuple6<U1, U2, U3, U4, U5, U6>;
    fmap<U1, U2, U3, U4, U5, U6>(f: (a: T1 | T2 | T3 | T4 | T5 | T6) => Tuple1<U1 | U2 | U3 | U4 | U5 | U6>): Tuple6<U1, U2, U3, U4, U5, U6>;
    applies<U1, U2, U3, U4, U5, U6, V1, V2, V3, V4, V5, V6>(f: ApplicativeFunc<T1 | T2 | T3 | T4 | T5 | T6, U1 | U2 | U3 | U4 | U5 | U6, V1 | V2 | V3 | V4 | V5 | V6>): (mb: Tuple6<U1, U2, U3, U4, U5, U6>) => Tuple6<V1, V2, V3, V4, V5, V6>;
    mbind<U1, U2, U3, U4, U5, U6>(f: Tuple6<TMF<T1, U1>, TMF<T2, U2>, TMF<T3, U3>, TMF<T4, U4>, TMF<T5, U5>, TMF<T6, U6>>): Tuple6<U1, U2, U3, U4, U5, U6>;
}
export interface Tuple7<T1, T2, T3, T4, T5, T6, T7> extends Tuple, Monad<T1 | T2 | T3 | T4 | T5 | T6 | T7> {
    _1: T1;
    _2: T2;
    _3: T3;
    _4: T4;
    _5: T5;
    _6: T6;
    _7: T7;
    map<U1, U2, U3, U4, U5, U6, U7>(f: (a: T1 | T2 | T3 | T4 | T5 | T6 | T7) => U1 | U2 | U3 | U4 | U5 | U6 | U7): Tuple7<U1, U2, U3, U4, U5, U6, U7>;
    fmap<U1, U2, U3, U4, U5, U6, U7>(f: (a: T1 | T2 | T3 | T4 | T5 | T6 | T7) => Tuple1<U1 | U2 | U3 | U4 | U5 | U6 | U7>): Tuple7<U1, U2, U3, U4, U5, U6, U7>;
    applies<U1, U2, U3, U4, U5, U6, U7, V1, V2, V3, V4, V5, V6, V7>(f: ApplicativeFunc<T1 | T2 | T3 | T4 | T5 | T6 | T7, U1 | U2 | U3 | U4 | U5 | U6 | U7, V1 | V2 | V3 | V4 | V5 | V6 | V7>): (mb: Tuple7<U1, U2, U3, U4, U5, U6, U7>) => Tuple7<V1, V2, V3, V4, V5, V6, V7>;
    mbind<U1, U2, U3, U4, U5, U6, U7>(f: Tuple7<TMF<T1, U1>, TMF<T2, U2>, TMF<T3, U3>, TMF<T4, U4>, TMF<T5, U5>, TMF<T6, U6>, TMF<T7, U7>>): Tuple7<U1, U2, U3, U4, U5, U6, U7>;
}
export interface Tuple8<T1, T2, T3, T4, T5, T6, T7, T8> extends Tuple, Monad<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8> {
    _1: T1;
    _2: T2;
    _3: T3;
    _4: T4;
    _5: T5;
    _6: T6;
    _7: T7;
    _8: T8;
    map<U1, U2, U3, U4, U5, U6, U7, U8>(f: (a: T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8) => U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8): Tuple8<U1, U2, U3, U4, U5, U6, U7, U8>;
    fmap<U1, U2, U3, U4, U5, U6, U7, U8>(f: (a: T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8) => Tuple1<U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8>): Tuple8<U1, U2, U3, U4, U5, U6, U7, U8>;
    applies<U1, U2, U3, U4, U5, U6, U7, U8, V1, V2, V3, V4, V5, V6, V7, V8>(f: ApplicativeFunc<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8, U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8, V1 | V2 | V3 | V4 | V5 | V6 | V7 | V8>): (mb: Tuple8<U1, U2, U3, U4, U5, U6, U7, U8>) => Tuple8<V1, V2, V3, V4, V5, V6, V7, V8>;
    mbind<U1, U2, U3, U4, U5, U6, U7, U8>(f: Tuple8<TMF<T1, U1>, TMF<T2, U2>, TMF<T3, U3>, TMF<T4, U4>, TMF<T5, U5>, TMF<T6, U6>, TMF<T7, U7>, TMF<T8, U8>>): Tuple8<U1, U2, U3, U4, U5, U6, U7, U8>;
}
export interface Tuple9<T1, T2, T3, T4, T5, T6, T7, T8, T9> extends Tuple, Monad<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9> {
    _1: T1;
    _2: T2;
    _3: T3;
    _4: T4;
    _5: T5;
    _6: T6;
    _7: T7;
    _8: T8;
    _9: T9;
    map<U1, U2, U3, U4, U5, U6, U7, U8, U9>(f: (a: T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9) => U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8 | U9): Tuple9<U1, U2, U3, U4, U5, U6, U7, U8, U9>;
    fmap<U1, U2, U3, U4, U5, U6, U7, U8, U9>(f: (a: T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9) => Tuple1<U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8 | U9>): Tuple9<U1, U2, U3, U4, U5, U6, U7, U8, U9>;
    applies<U1, U2, U3, U4, U5, U6, U7, U8, U9, V1, V2, V3, V4, V5, V6, V7, V8, V9>(f: ApplicativeFunc<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9, U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8 | U9, V1 | V2 | V3 | V4 | V5 | V6 | V7 | V8 | V9>): (mb: Tuple9<U1, U2, U3, U4, U5, U6, U7, U8, U9>) => Tuple9<V1, V2, V3, V4, V5, V6, V7, V8, V9>;
    mbind<U1, U2, U3, U4, U5, U6, U7, U8, U9>(f: Tuple9<TMF<T1, U1>, TMF<T2, U2>, TMF<T3, U3>, TMF<T4, U4>, TMF<T5, U5>, TMF<T6, U6>, TMF<T7, U7>, TMF<T8, U8>, TMF<T9, U9>>): Tuple9<U1, U2, U3, U4, U5, U6, U7, U8, U9>;
}
export declare class Tuples {
    private constructor();
    static from(): Tuple0 & [void];
    static from<T1>(_1: T1): Tuple1<T1> & [T1];
    static from<T1, T2>(_1: T1, _2: T2): Tuple2<T1, T2> & [T1, T2];
    static from<T1, T2, T3>(_1: T1, _2: T2, _3: T3): Tuple3<T1, T2, T3> & [T1, T2, T3];
    static from<T1, T2, T3, T4>(_1: T1, _2: T2, _3: T3, _4: T4): Tuple4<T1, T2, T3, T4> & [T1, T2, T3, T4];
    static from<T1, T2, T3, T4, T5>(_1: T1, _2: T2, _3: T3, _4: T4, _5: T5): Tuple5<T1, T2, T3, T4, T5> & [T1, T2, T3, T4, T5];
    static from<T1, T2, T3, T4, T5, T6>(_1: T1, _2: T2, _3: T3, _4: T4, _5: T5, _6: T6): Tuple6<T1, T2, T3, T4, T5, T6> & [T1, T2, T3, T4, T5, T6];
    static from<T1, T2, T3, T4, T5, T6, T7>(_1: T1, _2: T2, _3: T3, _4: T4, _5: T5, _6: T6, _7: T7): Tuple7<T1, T2, T3, T4, T5, T6, T7> & [T1, T2, T3, T4, T5, T6, T7];
    static from<T1, T2, T3, T4, T5, T6, T7, T8>(_1: T1, _2: T2, _3: T3, _4: T4, _5: T5, _6: T6, _7: T7, _8: T8): Tuple8<T1, T2, T3, T4, T5, T6, T7, T8> & [T1, T2, T3, T4, T5, T6, T7, T8];
    static from<T1, T2, T3, T4, T5, T6, T7, T8, T9>(_1: T1, _2: T2, _3: T3, _4: T4, _5: T5, _6: T6, _7: T7, _8: T8, _9: T9): Tuple9<T1, T2, T3, T4, T5, T6, T7, T8, T9> & [T1, T2, T3, T4, T5, T6, T7, T8, T9];
}
