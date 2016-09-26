export interface ITuple extends Array<any> {
    equals(o: ITuple): boolean;
    toJSON(): any[];
    toString(): string;
}
export interface ITuple0 extends ITuple {
}
export declare class Tuple0 {
    static from(): ITuple0;
    length: number;
}
export interface ITuple1<T1> extends ITuple {
    _1: T1;
}
export declare class Tuple1<T1> {
    _1: T1;
    length: number;
    static from<T1>(_1: T1): ITuple1<T1>;
    constructor(_1: T1, length?: number);
}
export interface ITuple2<T1, T2> extends ITuple {
    _1: T1;
    _2: T2;
}
export declare class Tuple2<T1, T2> {
    _1: T1;
    _2: T2;
    length: number;
    static from<T1, T2>(_1: T1, _2: T2): ITuple2<T1, T2>;
    constructor(_1: T1, _2: T2, length?: number);
}
export interface ITuple3<T1, T2, T3> extends ITuple {
    _1: T1;
    _2: T2;
    _3: T3;
}
export declare class Tuple3<T1, T2, T3> {
    _1: T1;
    _2: T2;
    _3: T3;
    length: number;
    static from<T1, T2, T3>(_1: T1, _2: T2, _3: T3): ITuple3<T1, T2, T3>;
    constructor(_1: T1, _2: T2, _3: T3, length?: number);
}
export interface ITuple4<T1, T2, T3, T4> extends ITuple {
    _1: T1;
    _2: T2;
    _3: T3;
    _4: T4;
}
export declare class Tuple4<T1, T2, T3, T4> {
    _1: T1;
    _2: T2;
    _3: T3;
    _4: T4;
    length: number;
    static from<T1, T2, T3, T4>(_1: T1, _2: T2, _3: T3, _4: T4): ITuple4<T1, T2, T3, T4>;
    constructor(_1: T1, _2: T2, _3: T3, _4: T4, length?: number);
}
export interface ITuple5<T1, T2, T3, T4, T5> extends ITuple {
    _1: T1;
    _2: T2;
    _3: T3;
    _4: T4;
    _5: T5;
}
export declare class Tuple5<T1, T2, T3, T4, T5> {
    _1: T1;
    _2: T2;
    _3: T3;
    _4: T4;
    _5: T5;
    length: number;
    static from<T1, T2, T3, T4, T5>(_1: T1, _2: T2, _3: T3, _4: T4, _5: T5): ITuple5<T1, T2, T3, T4, T5>;
    constructor(_1: T1, _2: T2, _3: T3, _4: T4, _5: T5, length?: number);
}
export interface ITuple6<T1, T2, T3, T4, T5, T6> extends ITuple {
    _1: T1;
    _2: T2;
    _3: T3;
    _4: T4;
    _5: T5;
    _6: T6;
}
export declare class Tuple6<T1, T2, T3, T4, T5, T6> {
    _1: T1;
    _2: T2;
    _3: T3;
    _4: T4;
    _5: T5;
    _6: T6;
    length: number;
    static from<T1, T2, T3, T4, T5, T6>(_1: T1, _2: T2, _3: T3, _4: T4, _5: T5, _6: T6): ITuple6<T1, T2, T3, T4, T5, T6>;
    constructor(_1: T1, _2: T2, _3: T3, _4: T4, _5: T5, _6: T6, length?: number);
}
export interface ITuple7<T1, T2, T3, T4, T5, T6, T7> extends ITuple {
    _1: T1;
    _2: T2;
    _3: T3;
    _4: T4;
    _5: T5;
    _6: T6;
    _7: T7;
}
export declare class Tuple7<T1, T2, T3, T4, T5, T6, T7> {
    _1: T1;
    _2: T2;
    _3: T3;
    _4: T4;
    _5: T5;
    _6: T6;
    _7: T7;
    length: number;
    static from<T1, T2, T3, T4, T5, T6, T7>(_1: T1, _2: T2, _3: T3, _4: T4, _5: T5, _6: T6, _7: T7): ITuple7<T1, T2, T3, T4, T5, T6, T7>;
    constructor(_1: T1, _2: T2, _3: T3, _4: T4, _5: T5, _6: T6, _7: T7, length?: number);
}
export interface ITuple8<T1, T2, T3, T4, T5, T6, T7, T8> extends ITuple {
    _1: T1;
    _2: T2;
    _3: T3;
    _4: T4;
    _5: T5;
    _6: T6;
    _7: T7;
    _8: T8;
}
export declare class Tuple8<T1, T2, T3, T4, T5, T6, T7, T8> {
    _1: T1;
    _2: T2;
    _3: T3;
    _4: T4;
    _5: T5;
    _6: T6;
    _7: T7;
    _8: T8;
    length: number;
    static from<T1, T2, T3, T4, T5, T6, T7, T8>(_1: T1, _2: T2, _3: T3, _4: T4, _5: T5, _6: T6, _7: T7, _8: T8): ITuple8<T1, T2, T3, T4, T5, T6, T7, T8>;
    constructor(_1: T1, _2: T2, _3: T3, _4: T4, _5: T5, _6: T6, _7: T7, _8: T8, length?: number);
}
export interface ITuple9<T1, T2, T3, T4, T5, T6, T7, T8, T9> extends ITuple {
    _1: T1;
    _2: T2;
    _3: T3;
    _4: T4;
    _5: T5;
    _6: T6;
    _7: T7;
    _8: T8;
    _9: T9;
}
export declare class Tuple9<T1, T2, T3, T4, T5, T6, T7, T8, T9> {
    _1: T1;
    _2: T2;
    _3: T3;
    _4: T4;
    _5: T5;
    _6: T6;
    _7: T7;
    _8: T8;
    _9: T9;
    length: number;
    static from<T1, T2, T3, T4, T5, T6, T7, T8, T9>(_1: T1, _2: T2, _3: T3, _4: T4, _5: T5, _6: T6, _7: T7, _8: T8, _9: T9): ITuple9<T1, T2, T3, T4, T5, T6, T7, T8, T9>;
    constructor(_1: T1, _2: T2, _3: T3, _4: T4, _5: T5, _6: T6, _7: T7, _8: T8, _9: T9, length?: number);
}
