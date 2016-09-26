
var assert = require("assert");
var Tuples = require('../lib/tuples');


describe ("Tuples", function () {

    describe ("Tuple0", function () {
        it ("should instantiate Tuple0 to length 0", function () {
            var tuple = Tuples.Tuple0.from();
            assert.ok(tuple);
            assert.equal(tuple.length, 0);
        });
    })

    describe ("Tuple1", function () {
        it ("should instantiate Tuple1 to length 1", function () {
            var tuple = Tuples.Tuple1.from(1);
            assert.ok(tuple);
            assert.equal(tuple.length, 1);
            assert.equal(tuple._1, 1);
        });
    })

    describe ("Tuple2", function () {

        var tuple = Tuples.Tuple2.from(123, "abc");

        it ("should have basic properties", function () {
            assert.ok(tuple instanceof Tuples.Tuple2);
            assert.equal(tuple.length, 2);
            assert.deepEqual(tuple[0], 123);
            assert.deepEqual(tuple[1], "abc");
            assert.deepEqual(tuple._1, 123);
            assert.deepEqual(tuple._2, "abc");
        });

        it ("should iterate with for...in", function () {
            var vals = [];
            for (var i in tuple) vals.push(tuple[i]);
            assert.deepEqual(vals, [123, "abc"]);
        });

        it ("should produce JSON with toJSON()", function () {
            assert.deepEqual(tuple.toJSON(), [123, "abc"]);
        });

        it ("should JSON.stringify === toString()", function () {
            assert.equal(tuple.toString(), JSON.stringify(tuple));
        });

        it ("should equal other resolve", function () {
            var other = Tuples.Tuple2.from(123, "abc");
            assert.equal(tuple.equals(other), true);
            assert.equal(tuple.equals(null), false);
            assert.equal(tuple.equals(tuple), true);
            assert.equal(tuple.equals(Tuples.Tuple1.from()), false);
            assert.equal(tuple.equals(Tuples.Tuple2.from("abc", 123)), false);
        });
    });

    describe ("Tuple3", function () {
        it ("should instantiate Tuple3 to length 3", function () {
            var tuple = Tuples.Tuple3.from(1, 2, 3);
            assert.ok(tuple);
            assert.equal(tuple.length, 3);
            assert.equal(tuple._1, 1);
            assert.equal(tuple._2, 2);
            assert.equal(tuple._3, 3);
        });
    })

    describe ("Tuple4", function () {
        it ("should instantiate Tuple4 to length 4", function () {
            var tuple = Tuples.Tuple4.from(1, 2, 3, 4);
            assert.ok(tuple);
            assert.equal(tuple.length, 4);
            assert.equal(tuple._1, 1);
            assert.equal(tuple._2, 2);
            assert.equal(tuple._3, 3);
            assert.equal(tuple._4, 4);
        });
    })

    describe ("Tuple5", function () {
        it ("should instantiate Tuple5 to length 5", function () {
            var tuple = Tuples.Tuple5.from(1, 2, 3, 4, 5);
            assert.ok(tuple);
            assert.equal(tuple.length, 5);
            assert.equal(tuple._1, 1);
            assert.equal(tuple._2, 2);
            assert.equal(tuple._3, 3);
            assert.equal(tuple._4, 4);
            assert.equal(tuple._5, 5);
        });
    })

    describe ("Tuple6", function () {
        it ("should instantiate Tuple6 to length 6", function () {
            var tuple = Tuples.Tuple6.from(1, 2, 3, 4, 5, 6);
            assert.ok(tuple);
            assert.equal(tuple.length, 6);
            assert.equal(tuple._1, 1);
            assert.equal(tuple._2, 2);
            assert.equal(tuple._3, 3);
            assert.equal(tuple._4, 4);
            assert.equal(tuple._5, 5);
            assert.equal(tuple._6, 6);
        });
    })

    describe ("Tuple7", function () {
        it ("should instantiate Tuple7 to length 7", function () {
            var tuple = Tuples.Tuple7.from(1, 2, 3, 4, 5, 6, 7);
            assert.ok(tuple);
            assert.equal(tuple.length, 7);
            assert.equal(tuple._1, 1);
            assert.equal(tuple._2, 2);
            assert.equal(tuple._3, 3);
            assert.equal(tuple._4, 4);
            assert.equal(tuple._5, 5);
            assert.equal(tuple._6, 6);
            assert.equal(tuple._7, 7);
        });
    })

    describe ("Tuple8", function () {
        it ("should instantiate Tuple8 to length 8", function () {
            var tuple = Tuples.Tuple8.from(1, 2, 3, 4, 5, 6, 7, 8);
            assert.ok(tuple);
            assert.equal(tuple.length, 8);
            assert.equal(tuple._1, 1);
            assert.equal(tuple._2, 2);
            assert.equal(tuple._3, 3);
            assert.equal(tuple._4, 4);
            assert.equal(tuple._5, 5);
            assert.equal(tuple._6, 6);
            assert.equal(tuple._7, 7);
            assert.equal(tuple._8, 8);
       });
    })

    describe ("Tuple9", function () {
        it ("should instantiate Tuple3 to length 9", function () {
            var tuple = Tuples.Tuple9.from(1, 2, 3, 4, 5, 6, 7, 8, 9);
            assert.ok(tuple);
            assert.equal(tuple.length, 9);
            assert.equal(tuple._1, 1);
            assert.equal(tuple._2, 2);
            assert.equal(tuple._3, 3);
            assert.equal(tuple._4, 4);
            assert.equal(tuple._5, 5);
            assert.equal(tuple._6, 6);
            assert.equal(tuple._7, 7);
            assert.equal(tuple._8, 8);
            assert.equal(tuple._9, 9);
        });
    })

});
