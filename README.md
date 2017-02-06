
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

The Maybe class can be an instance with a defined value (Maybe.Just) or no value (Maybe.None).

## Static Methods

### Maybe.just

Creates a Maybe.Just with the given value.

```js
Maybe.just <T> (value: T): Maybe<T>
```

### Maybe.none

Creates a Maybe.None.

```js
Maybe.none <T> (): Maybe<T>
```

### Maybe.nothing

Returns the Maybe.nothing singleton.

```js
Maybe.nothing (): Maybe<void>
```

### Maybe.fromNull

Creates a Maybe.Just with the given value or, if the value is `null` or `undefined`, a Maybe.None.

```js
Maybe.fromNull <T> (value: T): Maybe<T>
```

### Maybe.sequence

Turns an array of Maybes into a Maybe of arrays.

```js
Maybe.sequence <T> (...maybes: Array<Maybe<T>>): Maybe<T[]>
```

### Maybe.traverse

Maps an array into a Maybe of arrays.

```js
Maybe.traverse <T, U> (f: (a: T) => Maybe<U>): (as: T[]) => Maybe<U[]>
```

### Maybe.lift

```js
Maybe.lift <T> (partialFunction: (...args: any[]) => T): (...args: any[]) => Maybe<T>
```


## Instance Methods

### isEmpty

```js
isEmpty (): boolean
```

### isDefined

```js
isDefined (): boolean
```

### get

```js
get (): T | never
```

### getOrElse

```js
getOrElse (value: () => T): T
```

### getOrElseGet

```js
getOrElseGet (value: T): T
```

### getOrThrow

```js
getOrThrow (err: Error): T | never
```

### orElse

```js
orElse (o: () => Maybe<T>): Maybe<T>
```

### map

```js
map <U> (f: (a: T) => U): Maybe<U>
```

### fmap

```js
fmap <U> (f: (a: T) => Maybe<U>): Maybe<U>
```

### applies

```js
applies <U, V> (f: (a: T) => (b: U) => Maybe<V>): (mb: Maybe<U>) => Maybe<V>
```

### mbind

```js
mbind <U> (f: Maybe<(a: T) => Maybe<U>>): Maybe<U>
```

### flatten

```js
flatten (): Maybe<T>
```

### toEither

```js
toEither (): Either.Right<Error, T>
```

### toObject

```js
toObject (): { just: T; }
```

### toJSON

```js
toJSON (): { just: T | null }
```

### toString

```js
toString (): string
```

### equals

```js
equals (other: Maybe<T>): boolean
```

---

# Either

### Static Methods

### right

```js
Either.right <L, R> (right: R)
```

### left

```js
Either.left <L, R> (left: L)
```

### nothing

```js
Either.nothing (): Left<void, void>
```

### sequence

```js
Either.sequence <L, R> (...eithers: Array<Either<L, R>>): Either<L, R[]>
```

### traverse

```js
Either.traverse <L, R, S> (f: (a: R) => Either<L, S>): (as: R[]) => Either<L, S[]>
```

### lift

```js
Either.lift <Error, T> (partialFunction: (...args: any[]) => T): (...args: any[]) => Either<Error, T>
```


### Instance Methods

### isLeft

```js
isLeft (): boolean
```

### isRight

```js
isRight (): boolean
```

### get

```js
get (): R | never;
```

## getRight

```js
getRight (): R | never
```

## getLeft

```js
getLeft (): L | never
```

### getOrElse

```js
getOrElse (f: () => R): R
```

### getOrElseGet

```js
getOrElseGet (right: R): R
```

### getOrThrow

```js
getOrThrow (err?: Error): R | never
```

### orElse

```js
orElse (f: () => Either<L, R>)
```

### map

```js
map <S> (f: (a: R) => S): Either<L, S>
```

### fmap

```js
fmap <S> (f: FunctorFunc<R, S>): Either<L, S>
```

### applies

```js
applies <S, T> (f: ApplicativeFunc<R, S, T>): (mb: Either<L, S>) => Either<L, T>
```

###mbind

```js
mbind <S> (f: Either<L, FunctorFunc<R, S>>): Either<L, S>
```

### bimap

```js
bimap <M, S> (lf: (l: L) => M, rf: (r: R) => S): Either<M, S>
```

### cata

```js
cata <V> (lf: (l: L) => V, rf: (r: R) => V): V
```

### flatten

```js
flatten <M, S> (): Either <M, S>
```

### toMaybe

```js
toMaybe (): Maybe<R>
```

### toObject

```js
toObject (): { left?: L; right?: R }
```

### toJSON

```js
toJSON (): { left?: L; right?: R }
```

### toString

Returns the Either as a string: '{"right": R}' or '{"left": L}'

```js
toString (): string
```

### equals

```js
equals (other: Either<L, R>): boolean
```


---

## Tuples

Monadness tuples are simply arrays with some extra methods.

### Static Methods

### Tuples.from

```js
Tuples.from <T1, ...Tn> (_1: T1, ..._n: Tn): TupleN <T1, ...Tn> & [T1, ...Tn]
```


### Instance Getters

```js
_1: T1;
_n: Tn;
```


### Instance Methods

In addition to all of the regular array methods, the Tuple class has the following methods.

### map

```js
map <U1, ...Un> (f: (a: T1 | ...Tn) => U1 | ...Un): Tuple9<U1, ...Un>
```

### fmap

```js
fmap <U1, ...U9> (f: (a: T1 | ...Tn) => Tuple1<U1 | ...Un>): Tuple9<U1, ...Un>
```

### applies

```js
applies <U1, U2, ...Un, V1, ...Vn> (f: ApplicativeFunc<T1 | ...Tn, U1 | ...Un, V1 | ...Vn>): (mb: Tuple9<U1, ...Un>) => Tuple9<V1, ...Vn>
```

### mbind

```js
mbind <U1, ...Un> (f: TupleN<TMF<T1, U1>, ...TMF<Tn, Un>>): TupleN<U1, ...Un>
```

### toJSON

```js
toJSON (): { just: T | null }
```

### equals

```js
equals (other: TupleN<T>): boolean
```


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
