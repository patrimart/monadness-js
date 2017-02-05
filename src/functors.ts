
import { Either } from "./either";
import { Option } from "./option";


const ArrayInstanceOf = [ Array, Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array ];


export type Monoid<A> = Either<Error, A> | Option<A> | Promise<A> | Set<A> | Array<A> | ArrayLike<A> | Map<any, A> | { [key: string]: A } |
                        Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array |
                        Float32Array | Float64Array;


export const Identity = (a: any) => a;


export type Functor<A, B> = (f: (a: A) => B) => (m: Monoid<A>) => Monoid<B>;


export function fmap <A, B> (getter: (g: Monoid<A>) => A, setter: (s: B) => Monoid<B>, err: (e: Error) => Monoid<B> ): Functor<A, B> {

    return (func: (a: A) => B) => (m: Monoid<A>): Monoid<B> => {
        try {
            let val: any = getter(m);
            if (typeof val === "object" && ArrayInstanceOf.some(i => val instanceof i)) {
                val = val.map(func);
            }
            return setter(func(val));
        } catch (e) {
            return err(e);
        }
    };
};


export function compose <A, B> (f: (a: A) => B) {

    const funcIterator: Function[] = [];

    function _compose <C, D, E> (f2?: (a: C) => D): ((b: D) => E) | ((a: A) => D) {
        if (f2 === undefined) {
            return (a: A): D => {
                let val: any = a;
                for (let i in funcIterator) {
                    val = funcIterator[i](val);
                }
                return val;
            };
        }
        funcIterator.push(f2);
        return _compose.bind(this);
    };

    return _compose.call(this, f);
}



function filter <T> (f: (f: T) => boolean): (arr: T[]) => T[] {
    return (arr: T[]) => Array.prototype.filter.call(arr, f);
}


function sum (arr: number[]): number {
    return arr.reduce((p, c) => p + c, 0);
}


function minus (arr: number[]): number {
    return arr.reduce((p, c) => p - c, 0);
}

