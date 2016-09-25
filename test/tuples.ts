
import { Tuple2 } from "../lib";


const tuple = Tuple2.from("a", "b");

console.log("instanceof Tuple2", tuple instanceof Tuple2);
console.log("typeof", tuple);

console.log("Length", tuple.length);

for (let i in tuple) {
    console.log("for...in", i, tuple[i]);
}

for (let i of tuple) {
    console.log("for...of", i);
}

const [x, y] = tuple;
console.log("Desctructure", x, y);

console.log("_*", tuple._1, tuple._2);

console.log("Iterator", [...tuple]);

console.log("JSON", JSON.stringify(tuple));

console.log("toString", tuple.toString());

console.log("equals in", "equals" in tuple);
