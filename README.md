
[![Build Status](https://travis-ci.org/patrimart/monadness-js.svg?branch=master)](https://travis-ci.org/patrimart/monadness-js)
[![Coverage Status](https://coveralls.io/repos/github/patrimart/monadness-js/badge.svg?branch=master)](https://coveralls.io/github/patrimart/monadness-js?branch=master)
[![npm version](https://badge.fury.io/js/monadness.svg)](https://badge.fury.io/js/monadness)

# monadness-js


A TypeScript/JavaScript library that implements basic monad functionality. Currently, this young library only offers the following:

- Either
- Option
- Tuples (with arity 0-9)

This library is in active development.


## Install

`npm install monadness`


## Usage

**TypeScript:**

```ts
import { Either, Option, Tuples } from "monadness";
```

**NodeJS:**

```js
var Monadness = require("monadness"),
	Either = Monadness.Either,
    Option = Monadness.Option,
    Tuples = Monadness.Tuples;
```

**Browser:**

```html
<script src="node_modules/dist/monadness.min.js"></script>
```


## Supports

- Node >= 4.0
- All major browsers
- TypeScript and JavaScript



## Quick Examples

Let's start with some sample TypeScript code:

```ts
import { Either, Option } from "monadness";

function getFileContents (filePath: string): Either<Error, String> {

    /* Code to read file */

    if (contents === undefined) {
        return Either.left(new Error(`File ${filePath} not found.`);
    } else {
        return Either.right(contents);
    }
}

const contents = getFileContents ("path/to/filename.json");
if (contents.isRight()) {
    console.log("File contents:", contents.get());
} else {
    console.error(contents.getLeft());
}
```


## Either

**TypeScript Declaration:**

```ts
export declare namespace Either {

    function left<L, R> (left: L): Left<L, R>;
    function right<L, R> (right: R): Right<L, R>;
    function nothing (): Left<void, void>;
    function lift<Error, T> (partialFunction: (...args: any[]) => T): (...args: any[]) => Either<Error, T>;

    class Left<L, R> extends Either<L, R> {

        isLeft (): boolean;
        getLeft (): L;
        getOrElse (f: () => R): R;
        getOrElseGet (right: R): R;
        getOrThrow (err?: Error): R;
        orElse (f: () => Either<L, R>): Either<L, R>;
        toOption (): Option<R>;
        toObject (): {
            left?: L;
            right?: R;
        };
    }

    class Right<L, R> extends Either<L, R> {

        isRight (): boolean;
        get (): R;
        getRight (): R;
        getOrElse (f: () => R): R;
        getOrElseGet (right: R): R;
        getOrThrow (): R;
        orElse (f: () => Either<L, R>): Either<L, R>;
        toOption (): Option<R>;
        toObject (): {
            left?: L;
            right?: R;
        };
    }
}

```


## Option

**TypeScript Definition**

```ts
export declare namespace Option {

    function some<T> (value: T): Some<T>;
    function none<T> (): None<T>;
    function nothing (): None<void>;
    function lift<T> (partialFunction: (...args: any[]) => T): (...args: any[]) => Option<T>;

    class None<T> extends Option<T> {

        isEmpty (): boolean;
        getOrElse (f: () => T): T;
        getOrElseGet (value: T): T;
        getOrThrow (err?: Error): T;
        orElse (f: () => Option<T>): Option<T>;
        toEither (): Either.Left<Error, T>;
        toObject (): {
            some: T;
        };
    }

    class Some<T> extends Option<T> {

		isDefined (): boolean;
        get (): T;
        getOrElse (value: () => T): T;
        getOrElseGet (value: T): T;
        getOrThrow (err: Error): T;
        orElse (o: () => Option<T>): Option<T>;
        toEither (): Either.Right<Error, T>;
        toObject (): {
            some: T;
        };
    }
}
```


## Tuples

#### Tuple0.from (): ITuple;

#### Tuple1.from<T1> (_1: T1): ITuple1<T1>

#### TupleN.from (_1: T1 [, ..._n: Tn]): ITuple1<T1 [, ...Tn]>

**Example of Static Initializers and Usage:**
```ts
import { Tuples } from "monadness";

const tuple0 = Tuples.Tuple0.from();
const tuple1 = Tuples.Tuple1.from("a");
const tuple2 = Tuples.Tuple2.from("a", 2");
const tuple3 = Tuples.Tuple3.from(123, "abc", true);
const tuple4 = Tuples.Tuple4.from(1, 2, 3, 4);
const tuple5 = Tuples.Tuple5.from(1, 2, 3, 4, 5);
const tuple6 = Tuples.Tuple6.from(1, 2, 3, 4, 5, 6);
const tuple7 = Tuples.Tuple7.from(1, 2, 3, 4, 5, 6, 7);
const tuple8 = Tuples.Tuple8.from(1, 2, 3, 4, 5, 6, 7, 8);
const tuple9 = Tuples.Tuple9.from(1, 2, 3, 4, 5, 6, 7, 8, 9);

console.log("First value:", tuple2._1, tuple[0]);
console.log("Second value:", tuple2._2, tuple[1]);

const [x, y] = tuple2; // Desctructuring

for (let val in tuple4) {
    console.log("Tuple4 values:", val);
}

for (let val of tuple5) {
    console.log("Tuple5 values:", val);
}
```

**TypeScript Declarations:**
```ts
export interface ITuple extends Array<any> {
    equals (o: ITuple): boolean;
    toJSON (): any[];
    toString (): string;
}

export interface ITuple0 extends ITuple {}

export interface ITuple1<T1> extends ITuple {
    _1: T1;
}

export interface ITuple2<T1, T2> extends ITuple {
    _1: T1; _2: T2;
}

export interface ITuple3<T1, T2, T3> extends ITuple {
    _1: T1; _2: T2; _3: T3;
}

export interface ITuple4<T1, T2, T3, T4> extends ITuple {
    _1: T1; _2: T2; _3: T3; _4: T4;
}

export interface ITuple5<T1, T2, T3, T4, T5> extends ITuple {
    _1: T1; _2: T2; _3: T3; _4: T4; _5: T5;
}

export interface ITuple6<T1, T2, T3, T4, T5, T6> extends ITuple {
    _1: T1; _2: T2; _3: T3; _4: T4; _5: T5; _6: T6;
}

export interface ITuple7<T1, T2, T3, T4, T5, T6, T7> extends ITuple {
    _1: T1; _2: T2; _3: T3; _4: T4; _5: T5; _6: T6; _7: T7;
}

export interface ITuple8<T1, T2, T3, T4, T5, T6, T7, T8> extends ITuple {
    _1: T1; _2: T2; _3: T3; _4: T4, _5: T5; _6: T6; _7: T7; _8: T8;
}

export interface ITuple9<T1, T2, T3, T4, T5, T6, T7, T8, T9> extends ITuple {
    _1: T1; _2: T2; _3: T3; _4: T4, _5: T5; _6: T6; _7: T7; _8: T8; _9: T9;
}
```


# License

(The MIT License)

Copyright (c) 2016 Patrick Martin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
associated documentation files (the 'Software'), to deal in the Software without restriction, 
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial 
portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN 
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
