
[![Build Status](https://travis-ci.org/patrimart/monadness-js.svg?branch=master)](https://travis-ci.org/patrimart/monadness-js)
[![Coverage Status](https://coveralls.io/repos/github/patrimart/monadness-js/badge.svg?branch=master)](https://coveralls.io/github/patrimart/monadness-js?branch=master)
[![npm version](https://badge.fury.io/js/monadness.svg)](https://badge.fury.io/js/monadness)

# monadness-js

A TypeScript/JavaScript library that implements some basic "objects" of functional programming.

- [Either](#either)
- [Maybe](#maybe)
- [Tuples](#tuples)
- Option (deprecated for Maybe)

The advantages of using these classes:

- Code that's easier to reason about.
- Better error handling.
- Avoid `null` and `undefined` issues.


## Install

`npm i -S monadness`


## Quick Examples

Example code for `Maybe`:

```js
import { Maybe } from "monadness";

function getFileContents (filePath: string): Maybe<string> {
    /* Code to sync read file */
    return Maybe.fromNull(contents);
}

const contents = getFileContents("path/to/filename.json");

if (contents.isDefined()) {
    console.log("File contents:", contents.get());
} else {
    console.error("File error: File not loaded.");
}

console.log("File contents:", contents.getOrElseGet(""));
```

Example code for `Either`:

```js
import { Either } from "monadness";

function getFileContents (filePath: string): Either<Error, string> {

    /* Code to sync read file */

    if (contents === undefined) {
        return Either.left<Error, string>(new Error(`File ${filePath} not found.`);
    } else {
        return Either.right<Error, string>(contents);
    }
}

const contents = getFileContents("path/to/filename.json");

if (contents.isRight()) {
    console.log("File contents:", contents.get());
} else {
    console.error("File error:", contents.getLeft());
}

contents.cata(
    content => console.log("File contents:", content),
    err => console.error("File error:", err),
);
```

Example code for `Tuples`:

```js
import { Tuples } from "monadness";

const tuple = Tuples.from(1, "two", true);

const [a, b, c] = tuple;
console.log(a, b, c);
// 1, "two", true

const newTuple1 = tuple.map(a => a + a);
console.log(newTuple1._1, newTuple1._2, newTuple1._3);
// 2, "twotwo", 2

const newTuple2 = tuple.mbind(Tuples.from(
    a => Tuples.from(a + a),
    b => Tuples.from(b + "three"),
    c => Tuples.from(!! c),
));
console.log(newTuple2._1, newTuple2._2, newTuple2._3);
// 2, "twothree", false
```


## Usage

**TypeScript / ES6**

```js
import { Either, Maybe, Tuples } from "monadness";
```

**NodeJS**

```js
const Monadness = require("monadness"),
      Either = Monadness.Either,
      Maybe = Monadness.Maybe,
      Tuples = Monadness.Tuples;
```

**Browser**

```html
<script src="node_modules/dist/monadness.min.js"></script>
<script src="node_modules/dist/monadness.es6.min.js"></script>
```

---

# Maybe


## Static Methods

### Maybe.just

```js
Maybe.just <T> (value: T): Maybe<T>
```

### Maybe.none

```js
Maybe.none <T> (): Maybe<T>
```

### Maybe.nothing

```js
Maybe.nothing (): Maybe<void>
```

### Maybe.fromNull

```js
Maybe.fromNull <T> (value: T): Maybe<T>
```

### Maybe.sequence

```js
Maybe.sequence <T> (...maybes: Array<Maybe<T>>): Maybe<T[]>
```

### Maybe.traverse

```js
Maybe.traverse <T, U> (f: (a: T) => Maybe<U>): (as: T[]) => Maybe<U[]>
```

### Maybe.lift

```js
Maybe.lift <T> (partialFunction: (...args: any[]) => T): (...args: any[]) => Maybe<T>
```

## Instance Methods

### map

```js
maybe.map <U> (f: (a: T) => U): Maybe<U>
```

### fmap

```js
maybe.fmap <U> (f: (a: T) => Maybe<U>): Maybe<U>
```

### applies

```js
maybe.applies <U, V> (f: (a: T) => (b: U) => Maybe<V>): (mb: Maybe<U>) => Maybe<V>
```

### mbind

```js
maybe.mbind <U> (f: Maybe<(a: T) => Maybe<U>>): Maybe<U>
```

### flatten

```js
flatten (): Maybe<T>
```

### isEmpty

```js
maybe.isEmpty (): boolean
```

### isDefined

```js
maybe.isDefined (): boolean
```

### get

```js
maybe.get (): T
```

### getOrElse

```js
maybe.getOrElse (value: () => T): T
```

### getOrElseGet

```js
maybe.getOrElseGet (value: T): T
```

### getOrThrow

```js
maybe.getOrThrow (err: Error): T
```

### orElse

```js
maybe.orElse (o: () => Maybe<T>): Maybe<T>
```

### toEither

```js
maybe.toEither (): Either.Right<Error, T>
```

### toObject

```js
maybe.toObject (): { just: T; }
```

### toJSON

```js
maybe.toJSON (): { just: T | null }
```

### toString

```js
maybe.toString (): string
```

### equals

```js
maybe.equals (other: Maybe<T>): boolean
```

---

# Either

**TypeScript Declaration:**

```typescript
namespace Either {

    function left <L, R> (left: L): Left<L, R>;
    function right <L, R> (right: R): Right<L, R>;
    function nothing (): Left<void, void>;
    function sequence <L, R> (...eithers: Array<Either<L, R>>): Either<L, R[]>;
    function traverse <L, R, S> (f: (a: R) => Either<L, S>): (as: R[]) => Either<L, S[]>;
    function lift <Error, T> (partialFunction: (...args: any[]) => T): (...args: any[]) => Either<Error, T>;

    class Left<L, R> extends Either<L, R> {
        map <S> (f: (a: R) => S): Left<L, S>;
        fmap <S> (f: (a: R) => Either<L, S>): Left<L, S>;
        applies <S, T> (f: (a: R) => (b: S) => Left<L, T>): (mb: Either<L, S>) => Left<L, T>;
        mbind <S> (f: Either<L, (a: R) => Either<L, S>>): Left<L, S>;
        bimap <M, S> (lf: (l: L) => M, rf: (r: R) => S): Left<M, S>;
        cata <V> (lf: (l: L) => V, rf: (r: R) => V): V;
        flatten (): Left<L, R>;
        isLeft (): boolean;
        get (): never;
        getLeft (): L;
        getOrElse (f: () => R): R;
        getOrElseGet (right: R): R;
        getOrThrow (err?: Error): R;
        orElse (f: () => Either<L, R>): Either<L, R>;
        toObject (): {
            left?: L;
            right?: R;
        };
    }

    class Right<L, R> extends Either<L, R> {
        map <S> (f: (a: R) => S): Right<L, S>;
        fmap <S> (f: FunctorFunc<R, S>): Either<L, S>;
        applies <S, T> (f: ApplicativeFunc<R, S, T>): (eb: Either<L, S>) => Either<L, T>;
        mbind <S> (f: Either<L, FunctorFunc<R, S>>): Either<L, S>;
        bimap <M, S> (lf: (l: L) => M, rf: (r: R) => S): Right<M, S>;
        cata <V> (lf: (l: L) => V, rf: (r: R) => V): V;
        flatten <M, S> (): Either<M, S>;
        isRight (): boolean;
        get (): R;
        getRight (): R;
        getOrElse (f: () => R): R;
        getOrElseGet (right: R): R;
        getOrThrow (): R;
        orElse (f: () => Either<L, R>): Either<L, R>;
        toMaybe (): Maybe<R>;
        toOption (): Option<R>;
        toObject (): {
            left?: L;
            right?: R;
        };
    }
}
```

---

## Tuples

**Example of Static Initializers and Usage:**

```js
import { Tuples } from "monadness";

const tuple0 = Tuples.from();
const tuple1 = Tuples.from("a");
const tuple2 = Tuples.from("a", 2);
const tuple3 = Tuples.from(123, "abc", true);
const tuple4 = Tuples.from(1, 2, 3, 4);
const tuple5 = Tuples.from(1, 2, 3, 4, 5);
const tuple6 = Tuples.from(1, 2, 3, 4, 5, 6);
const tuple7 = Tuples.from(1, 2, 3, 4, 5, 6, 7);
const tuple8 = Tuples.from(1, 2, 3, 4, 5, 6, 7, 8);
const tuple9 = Tuples.from(1, 2, 3, 4, 5, 6, 7, 8, 9);

console.log("First value:", tuple2._1, tuple[0]);
console.log("Second value:", tuple2._2, tuple[1]);

const [x, y] = tuple2; // Desctructuring

for (const i in tuple4) {
    console.log("Tuple4 values:", tuple4[i]);
}

for (const val of tuple5) {
    console.log("Tuple5 values:", val);
}
```


**TypeScript Declarations:**

```js
interface TupleN <T1, ...Tn> extends Tuple {
    _1: T1;
    _n: Tn;

    map <U1, ...Un> (f: (a: T1 | ...Tn) => U1 | ...Un): Tuple9<U1, ...Un>;
    fmap <U1, ...U9> (f: (a: T1 | ...Tn) => Tuple1<U1 | ...Un>): Tuple9<U1, ...Un>;
    applies <U1, U2, ...Un, V1, ...Vn> (f: ApplicativeFunc<T1 | ...Tn, U1 | ...Un, V1 | ...Vn>): (mb: Tuple9<U1, ...Un>) => Tuple9<V1, ...Vn>;
    mbind <U1, ...Un> (f: TupleN<TMF<T1, U1>, ...TMF<Tn, Un>>): Tuple9<U1, ...Un>;
}

class Tuples {
    static from <T1, ...Tn> (_1: T1, ..._n: Tn): Tuplen <T1, ...Tn> & [T1, ...Tn];
}
```

---

# License

(The MIT License)

Copyright (c) 2017 Patrick Martin

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
