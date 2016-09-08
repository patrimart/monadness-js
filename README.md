monadnass-js
========
A functional-style Node.js library with improved error handling, flattened asyncronous handling and parallel processing.

**This library is under development and very unstable. Do not use.**

- Supports Node >= 4.3
- Languages JavaScript and TypeScript
- Does not support the browser

This library is an attempt to bring pleasant error handling to JavaScript. The Domain module is deprecated without a replacement. Zone.js is promising, but feels incomplete. **try-func** catches all thrown Errors, all uncaught errors and all unhandled rejections by running functions in child processes.

Ideally, this library will help prevent common bugs caused by thrown errors and undefined variables. By using Either and Option, method signatures can be more predictable.


Install
-------
`npm install monadness`


Quick Examples
--------------
Let's start with some sample JS code:

```javascript
var Try = require('try-func').Try;
Try.ofFork(() => {
    var fs = require('fs');
    return fs.readFileSync(__dirname + '/path/to/filename.txt', 'utf8');
}).andThenFork(function* (fileContent) {
    var asyncCountWords = require('../utils/asyncCountWords');
    var wordCount = yield asyncCountWords(fileContent);
    return wordCount;
})
.get().then(result => console.log(result.get()));

```



License
-------
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
