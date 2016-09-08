# monadness-js

A TypeScript/JavaScript library that implements basic monad functionality. Currently, this young library only supports the following:

- Either
- Option

This library is in active development.


## Install

`npm install monadness`


## Supports

- Node >= 4.0
- All major browsers
- TypeScript and JavaScript



## Quick Examples

Let's start with some sample TypeScript code:

```ts
import { Either, Option } from "monadness";


```

And, now, the same code in plain JavaScript:

```js
var Monadness = require("monadness"),
	Either = Monadness.Either,
    Option = Monadness.Option;



```

## Either


**TypeScript Declaration:**

```ts
export declare namespace Either {

    function left<L, R>(left: L): Left<L, R>;
    function right<L, R>(right: R): Right<L, R>;
    function nothing(): Left<void, void>;
    function lift<Error, T>(partialFunction: (...args: any[]) => T): (...args: any[]) => Either<Error, T>;

    class Left<L, R> extends Either<L, R> {

        isLeft(): boolean;
        getLeft(): L;
        getOrElse(f: () => R): R;
        getOrElseGet(right: R): R;
        getOrThrow(err?: Error): R;
        orElse(f: () => Either<L, R>): Either<L, R>;
        toOption(): Option<R>;
        toObject(): {
            left?: L;
            right?: R;
        };
    }

    class Right<L, R> extends Either<L, R> {

        isRight(): boolean;
        get(): R;
        getRight(): R;
        getOrElse(f: () => R): R;
        getOrElseGet(right: R): R;
        getOrThrow(): R;
        orElse(f: () => Either<L, R>): Either<L, R>;
        toOption(): Option<R>;
        toObject(): {
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

    function some<T>(value: T): Some<T>;
    function none<T>(): None<T>;
    function nothing(): None<void>;
    function lift<T>(partialFunction: (...args: any[]) => T): (...args: any[]) => Option<T>;

    class None<T> extends Option<T> {

        isEmpty(): boolean;
        getOrElse(f: () => T): T;
        getOrElseGet(value: T): T;
        getOrThrow(err?: Error): T;
        orElse(f: () => Option<T>): Option<T>;
        toEither(): Either.Left<Error, T>;
        toObject(): {
            some: T;
        };
    }

    class Some<T> extends Option<T> {

		isDefined(): boolean;
        get(): T;
        getOrElse(value: () => T): T;
        getOrElseGet(value: T): T;
        getOrThrow(err: Error): T;
        orElse(o: () => Option<T>): Option<T>;
        toEither(): Either.Right<Error, T>;
        toObject(): {
            some: T;
        };
    }
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
