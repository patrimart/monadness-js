
/**
 * Builds a TupleN based on given value length.
 */
function factory (...values: any[]): any {

    const tuple: any = new (ClassMap[values.length].bind(null, ...values))();
    tuple.__proto__.__proto__ = Object.create(new Array(...values));

    Object.defineProperty(tuple, "length", {
        writable: false,
        enumerable: false,
        configurable: false,
    });

    for (let i = 0, len = values.length; i < len; i++) {
        Object.defineProperty(tuple, `_${i + 1}`, {
            writable: false,
            enumerable: false,
            configurable: false,
        });
    }

    Object.defineProperty(tuple, "equals", {
        value: function (other: ITuple) {
            if (! other || "_1" in other === false) return false;
            if (this === other) return true;
            if (this.length !== other.length) return false;
            for (let i = 0; i < this.length; i++) {
                if ("equals" in other[i] && ! other[i].equals(this[i])) {
                    return false;
                } else if (this[i] !== other[i]) {
                    return false;
                }
            }
            return true;
        },
        enumerable: false,
        configurable: false,
    })

    Object.defineProperty(tuple, "toJSON", {
        value: function () {
            return this.slice(0).map((i: any) => !! i && i.toJSON !== undefined ? i.toJSON() : i);
        },
        enumerable: false,
        configurable: false,
    })

    Object.defineProperty(tuple, "toString", {
        value: function () {
            return JSON.stringify(this.toJSON());
        },
        enumerable: false,
        configurable: false,
    })

    return Object.freeze(tuple) as any;
}


/**
 * Interface for Tuple extends Array<any>.
 */
export interface ITuple extends Array<any> {
    equals(o: ITuple): boolean;
    toJSON (): any[];
    toString(): string;
}


/**
 * Tuple0 interface and class.
 */

export interface ITuple0 extends ITuple {}

export class Tuple0 {

    static from (): ITuple0 {
        return TUPLE_ZERO;
    }
}


/**
 * Tuple1 interface and class.
 */

export interface ITuple1<T1> extends ITuple {
    _1: T1;
}

export class Tuple1<T1> {

    static from<T1> (_1: T1): ITuple1<T1> {
        return factory(_1) as ITuple1<T1>
    }

    constructor (public _1: T1, public length = 1) {}
}


/**
 * Tuple2 interface and class.
 */

export interface ITuple2<T1, T2> extends ITuple {
    _1: T1; _2: T2;
}

export class Tuple2<T1, T2> {

    static from<T1, T2> (_1: T1, _2: T2): ITuple2<T1, T2> {
        return factory(_1, _2) as ITuple2<T1, T2>
    }

    constructor (public _1: T1, public _2: T2, public length = 2) {}
}


/**
 * Tuple3 interface and class.
 */

export interface ITuple3<T1, T2, T3> extends ITuple {
    _1: T1; _2: T2; _3: T3;
}

export class Tuple3<T1, T2, T3> {

    static from<T1, T2, T3> (_1: T1, _2: T2, _3: T3): ITuple3<T1, T2, T3> {
        return factory(_1, _2, _3) as ITuple3<T1, T2, T3>
    }

    constructor (public _1: T1, public _2: T2, public _3: T3, public length = 3) {}
}


/**
 * Tuple4 interface and class.
 */

export interface ITuple4<T1, T2, T3, T4> extends ITuple {
    _1: T1; _2: T2; _3: T3; _4: T4;
}

export class Tuple4<T1, T2, T3, T4> {

    static from<T1, T2, T3, T4> (_1: T1, _2: T2, _3: T3, _4: T4): ITuple4<T1, T2, T3, T4> {
        return factory(_1, _2, _3, _4) as ITuple4<T1, T2, T3, T4>
    }

    constructor (public _1: T1, public _2: T2, public _3: T3, public _4: T4, public length = 4) {}
}


/**
 * Tuple5 interface and class.
 */

export interface ITuple5<T1, T2, T3, T4, T5> extends ITuple {
    _1: T1; _2: T2; _3: T3; _4: T4; _5: T5;
}

export class Tuple5<T1, T2, T3, T4, T5> {

    static from<T1, T2, T3, T4, T5> (_1: T1, _2: T2, _3: T3, _4: T4, _5: T5): ITuple5<T1, T2, T3, T4, T5> {
        return factory(_1, _2, _3, _4, _5) as ITuple5<T1, T2, T3, T4, T5>
    }

    constructor (public _1: T1, public _2: T2, public _3: T3, public _4: T4, public _5: T5, public length = 5) {}
}


/**
 * Tuple6 interface and class.
 */

export interface ITuple6<T1, T2, T3, T4, T5, T6> extends ITuple {
    _1: T1; _2: T2; _3: T3; _4: T4; _5: T5; _6: T6;
}

export class Tuple6<T1, T2, T3, T4, T5, T6> {

    static from<T1, T2, T3, T4, T5, T6> (_1: T1, _2: T2, _3: T3, _4: T4, _5: T5, _6: T6): ITuple6<T1, T2, T3, T4, T5, T6> {
        return factory(_1, _2, _3, _4, _5, _6) as ITuple6<T1, T2, T3, T4, T5, T6>
    }

    constructor (
        public _1: T1, public _2: T2, public _3: T3, public _4: T4, public _5: T5,
        public _6: T6, public length = 6
    ) {}
}


/**
 * Tuple7 interface and class.
 */

export interface ITuple7<T1, T2, T3, T4, T5, T6, T7> extends ITuple {
    _1: T1; _2: T2; _3: T3; _4: T4; _5: T5; _6: T6; _7: T7;
}

export class Tuple7<T1, T2, T3, T4, T5, T6, T7> {

    static from<T1, T2, T3, T4, T5, T6, T7> (_1: T1, _2: T2, _3: T3, _4: T4, _5: T5, _6: T6, _7: T7): ITuple7<T1, T2, T3, T4, T5, T6, T7> {
        return factory(_1, _2, _3, _4, _5, _6, _7) as ITuple7<T1, T2, T3, T4, T5, T6, T7>
    }

    constructor (
        public _1: T1, public _2: T2, public _3: T3, public _4: T4, public _5: T5,
        public _6: T6, public _7: T7, public length = 7
    ) {}
}


/**
 * Tuple8 interface and class.
 */

export interface ITuple8<T1, T2, T3, T4, T5, T6, T7, T8> extends ITuple {
    _1: T1; _2: T2; _3: T3; _4: T4, _5: T5; _6: T6; _7: T7; _8: T8;
}

export class Tuple8<T1, T2, T3, T4, T5, T6, T7, T8> {

    static from<T1, T2, T3, T4, T5, T6, T7, T8> (_1: T1, _2: T2, _3: T3, _4: T4, _5: T5, _6: T6, _7: T7, _8: T8): ITuple8<T1, T2, T3, T4, T5, T6, T7, T8> {
        return factory(_1, _2, _3, _4, _5, _6, _7, _8) as ITuple8<T1, T2, T3, T4, T5, T6, T7, T8>
    }

    constructor (
        public _1: T1, public _2: T2, public _3: T3, public _4: T4, public _5: T5,
        public _6: T6, public _7: T7, public _8: T8, public length = 5
    ) {}
}


/**
 * Tuple9 interface and class.
 */

export interface ITuple9<T1, T2, T3, T4, T5, T6, T7, T8, T9> extends ITuple {
    _1: T1; _2: T2; _3: T3; _4: T4, _5: T5; _6: T6; _7: T7; _8: T8; _9: T9;
}

export class Tuple9<T1, T2, T3, T4, T5, T6, T7, T8, T9> {

    static from<T1, T2, T3, T4, T5, T6, T7, T8, T9> (_1: T1, _2: T2, _3: T3, _4: T4, _5: T5, _6: T6, _7: T7, _8: T8, _9: T9): ITuple9<T1, T2, T3, T4, T5, T6, T7, T8, T9> {
        return factory(_1, _2, _3, _4, _5, _6, _7, _8, _9) as ITuple9<T1, T2, T3, T4, T5, T6, T7, T8, T9>
    }

    constructor (
        public _1: T1, public _2: T2, public _3: T3, public _4: T4, public _5: T5,
        public _6: T6, public _7: T7, public _8: T8, public _9: T9, public length = 5
    ) {}
}


/**
 * Map of Tuple classes.
 */
const ClassMap: any = [ Tuple0, Tuple1, Tuple2, Tuple3, Tuple4, Tuple5, Tuple6, Tuple7, Tuple8, Tuple9 ];
const TUPLE_ZERO = Tuple0.from();
