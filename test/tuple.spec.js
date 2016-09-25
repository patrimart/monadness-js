
var assert = require("assert");

var Tuple = require("../lib").Tuple;


describe ("Tuples", function () {


    it ("work", function () {

        var tuple = new Tuple("a", "b");

        console.log(tuple.length);

        for (var i in tuple) {
            console.log(i, tuple[i]);
        }

        var [x, y] = tuple;

    });

});



