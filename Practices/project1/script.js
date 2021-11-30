// OBJECTS
// in JS
/*
    const obj = {
        name: "logesh",
        age: 21
    }
*/
// in TS
// We should create the type of the each and every KEYS
var obj = {
    name: "logesh",
    age: 21
};
console.log(obj.name);
// NESTED OBJECTS
var obj1 = {
    name: "logesh",
    age: 21,
    address: {
        dno: 311,
        street: "Nehru Street",
        city: "Virudhunagar"
    }
};
console.log("\n" + obj1.name + " " + obj1.address.city);
// ARRAYS
// Speciality: We can have the elements with ANY DATA TYPE
var arr = ['logesh', 21];
console.log(arr[1]);
// TUPLES (Fixed Length ARRAY)
var tuple;
tuple = [36, 'Kaala'];
console.log(tuple[1]);
// ENUM
var MONDAY = "Monday";
var TUESDAY = "Tuesday";
var WEDNESDAY = "Wednesday";
var Days;
(function (Days) {
    Days[Days["MONDAY"] = 0] = "MONDAY";
    Days[Days["TUESDAY"] = 1] = "TUESDAY";
    Days[Days["WEDNESDAY"] = 2] = "WEDNESDAY";
})(Days || (Days = {}));
console.log(Days[Days.MONDAY] + " " + Days[Days.TUESDAY] + " " + Days[Days.WEDNESDAY]);
// UNION  (by make use of '|' symbol)
function combine(input1, input2) {
    var result;
    if (typeof input1 === "number" && typeof input2 === "number") {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
var added = combine(3, 5);
var combined = combine("Logesh", "Mano");
console.log("Integer Addition : " + added + " String Combined : " + combined);
