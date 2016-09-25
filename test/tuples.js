"use strict";
var lib_1 = require("../lib");
var tuple = lib_1.Tuple2.from("a", "b");
console.log("instanceof Tuple2", tuple instanceof lib_1.Tuple2);
console.log("typeof", tuple);
console.log("Length", tuple.length);
for (var i in tuple) {
    console.log("for...in", i, tuple[i]);
}
for (var _i = 0, tuple_1 = tuple; _i < tuple_1.length; _i++) {
    var i = tuple_1[_i];
    console.log("for...of", i);
}
var x = tuple[0], y = tuple[1];
console.log("Desctructure", x, y);
console.log("_*", tuple._1, tuple._2);
console.log("Iterator", tuple.slice());
console.log("JSON", JSON.stringify(tuple));
console.log("toString", tuple.toString());
console.log("equals in", "equals" in tuple);
